
/**
 * Classe que centralizada todos os acessos as variaveis 
 * de ambiente
 */
export class EnvsConfig {

    /**
     * Endereco do servidor de banco de dados.
     * Variavel: SURFBANK_DB_HOST
     */
    static getEnvDbHost(): string{
        return process.env.SURFBANK_DB_HOST;
    }

    /**
     * Porta do servidor de banco de dados.
     * Variavel: SURFBANK_DB_PORTA
     */
    static getEnvDbPorta(): number{
        return parseInt(process.env.SURFBANK_DB_PORTA);
    }    

    /**
     * Usuario do servidor de banco de dados.
     * Variavel: SURFBANK_DB_USUARIO
     */
    static getEnvDbUsuario(): string{
        return process.env.SURFBANK_DB_USUARIO;
    }

    /**
     * Senha do servidor de banco de dados.
     * Variavel: SURFBANK_DB_SENHA
     */
    static getEnvDbSenha(): string{
        return process.env.SURFBANK_DB_SENHA;
    }

    /**
     * Nome do banco de dados.
     * Variavel: SURFBANK_DB_BANCO
     */
    static getEnvDbBanco(): string{
        return process.env.SURFBANK_DB_BANCO;
    }

    /**
     * URL da API Spec.
     * Variavel: SURFBANK_API_SPEC
     */
    static getEnvSpecApiUrl(): string{
        return process.env.SURFBANK_API_SPEC;
    }

    /**
     * Numero do AccountID utilizado no servico SQS.
     * Variavel: SURFBANK_SQS_AWS_ACCOUNT_ID
     */
    static getEnvSqsAwsAccountId(): string{
        return process.env.SURFBANK_SQS_AWS_ACCOUNT_ID;
    }

    /**
     * Regiao utilizada no servico SQS.
     * Variavel: SURFBANK_SQS_AWS_REGION
     */
    static getEnvSqsAwsRegion(): string{
        return process.env.SURFBANK_SQS_AWS_REGION;
    }

    /**
     * Nome da fila SQS para tratamento de erros.
     * Variavel: SURFBANK_SQS_AWS_QUEUE_ERROR
     */
    static getEnvSqsAwsQueueErro(): string{
        return process.env.SURFBANK_SQS_AWS_QUEUE_ERROR;
    }                
}