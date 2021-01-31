import { Injectable, Logger } from '@nestjs/common';
import { AWSError, SQS } from 'aws-sdk';
import { EnvsConfig } from '../infra/config/envs.config';
import { UuidUtil } from '../util/uuid.util';

/**
 * Classe utilizada como camada de abstracao para o servico SQS da AWS
 */
@Injectable()
export class SqsAwsProxy {

    /**
     * Metodo enviar mensagem
     */
    private readonly METODO_ENVIAR_MENSAGEM = "SqsAwsSenderProxy.enviarMensagem";

    /**
     * API do SQL
     */
    private readonly sqs = new SQS();

    /**
     * Regiao da AWS onde a fila esta localizada
     */
    private readonly SQS_AWS_REGION: string = 
        process.env.SURFBANK_SQS_AWS_REGION;

    /**
     * Logger
     */
    private readonly logger = new Logger(SqsAwsProxy.name);

    /**
     * Monta e retorna o nome da fila SQS
     * @param nomeFila Nome da fila
     */
    private getUrlSqs(nomeFila: string): string{
        const retorno: string = 
                'https://sqs.' + EnvsConfig.getEnvSqsAwsRegion() + 
                '.amazonaws.com/' + 
                EnvsConfig.getEnvSqsAwsAccountId() + 
                '/' + nomeFila;
        return retorno;
    }

    /**
     * Monta o payload da mensagem
     * @param url URL do servico SQS
     * @param mensagem Mensagem que sera enviada
     * @param correlationId ID de correlacao
     * @param origem 
     */
    private montarPayload(url: string, mensagem: string, correlationId: string, 
        origem: string): any {
        const payload = {
            QueueUrl: url,
            MessageBody: mensagem,
            MessageAttributes: {
                correlationId: {
                    StringValue: correlationId,
                    DataType: 'String'
                },
                origem: {
                    StringValue: origem,
                    DataType: 'String'
                }
            }
        };
        return payload;
    }

    /**
     * Envia uma mensagem para a fila SQS
     * @param nomeFila Nome da fila SQS
     * @param mensagem Mensagem que se deseja enviar
     * @param correlationId ID de correlacao
     * @param origem Originador da mensagem
     */
    async enviarMensagem(nomeFila: string, mensagem: any, 
        correlationId: string | undefined, origem: string | undefined) {
        
        const inicio = new Date().getTime();
        origem = (origem ? origem : 'SURFBANK_DEPOSITO');
        correlationId = (correlationId ? correlationId : UuidUtil.gerar());

        try{
            this.logger.log('[' + correlationId + 
                '] Iniciando a execucao do metodo', 
                this.METODO_ENVIAR_MENSAGEM);

            const URL: string = this.getUrlSqs(nomeFila);

            const body = JSON.stringify(mensagem);

            const payload = this.montarPayload(URL,
                body, correlationId, origem);

            this.logger.debug('[' + correlationId + '] Payload: ' + 
                JSON.stringify(payload), 
                this.METODO_ENVIAR_MENSAGEM);
            
            const inicioEnvioSqs = new Date().getTime();
            this.sqs.sendMessage(payload).promise().then((result)=> {
                this.logger.log('[' + correlationId + 
                '] Mensagem enviada com sucesso para o SQS. ID Message: ' + 
                result.MessageId, 
                this.METODO_ENVIAR_MENSAGEM);   

                this.logger.log('[' + correlationId + 
                '] A mensagem foi enviada para o SQS em ' + 
                (new Date().getTime() - inicioEnvioSqs) + ' ms', 
                this.METODO_ENVIAR_MENSAGEM);                
            }).catch((erro)=>{
                this.logger.error('[' + correlationId + 
                '] Ocorreu um erro ao enviar a mensagem para o SQS. ', 
                erro.stack,
                this.METODO_ENVIAR_MENSAGEM);                            
            });
        }catch(ex){
            this.logger.error('[' + correlationId + 
                '] Ocorreu um erro durante a execucao do metodo. ', 
                this.METODO_ENVIAR_MENSAGEM);
            this.logger.error(ex, this.METODO_ENVIAR_MENSAGEM);
        }finally{
            this.logger.log('[' + correlationId + 
                '] O metodo foi executado em ' + 
                (new Date().getTime()- inicio) + ' ms', 
                this.METODO_ENVIAR_MENSAGEM);
        }

    }

}