import { Injectable, Logger } from '@nestjs/common';
import { ClienteRepository } from '../repository/cliente.repository';
import { Connection, Repository } from 'typeorm';
import { Cliente } from '../entity/cliente.entity';
import { BusinessException } from '../infra/exception/business.exception';
import { ApiSpecProxy } from '../proxy/api-spec.proxy';
import { SqsAwsProxy } from '../proxy/sqs-aws.proxy';
import { EnvsConfig } from '../infra/config/envs.config';
import { TipoPessoaEnum } from '../enums/tipo-pessoa.enum';

/**
 *  Classe de regra de negocio da entidade cliente
 */
@Injectable()
export class ClienteService {

  private readonly METODO_SALVAR: string = "ClienteService.salvar";
  private readonly METODO_BUSCAR_POR_ID: string = "ClienteService.buscarPorId";
  private readonly METODO_BUSCAR_TODOS: string = "ClienteService.buscarTodos";

  /**
   * Logger
   */
  private readonly logger = new Logger(ClienteService.name);  

  /**
   * Construtor
   * @param clienteRepository 
   * @param connection 
   * @param specAuthProxy
   */
  constructor(
    private clienteRepository: ClienteRepository,
    private sqsAwsProxy: SqsAwsProxy,
    private connection: Connection, 
    private specAuthProxy: ApiSpecProxy ){
  }

  /**
   * Salva uma entidade cliente
   * @param cliente Objeto cliente
   */
  async salvar(cliente: Cliente){
    this.logger.log('Salvando o cliente: ' + JSON.stringify(cliente), 
      this.METODO_SALVAR);

    if(cliente && !cliente.codTipoCliente){
      throw new BusinessException(1, 'Parametro codTipoCliente nao informado.');
    }

    if(cliente.codTipoCliente != TipoPessoaEnum.PESSOA_FISICA.valueOf()
      && cliente.codTipoCliente != TipoPessoaEnum.PESSOA_JURIDICA.valueOf()){
      throw new BusinessException(2, 'Codido do tipo de pessoa invalido.')
    }
    
    const resultado = await this.clienteRepository.save(cliente);
    return resultado;
  }
  
  /**
   * Recupera um cliente por ID
   * @param id Chave primaria do cliente
   */
  async buscarPorId(id: number){
    const resultado = await this.clienteRepository.buscarPorId(id);    
    if(!resultado){
      const fila = EnvsConfig.getEnvSqsAwsQueueErro();
      const mensagem = {
        mensagem: 'Nao foi possivel localizar o ID ' + id
      };
      await this.sqsAwsProxy.enviarMensagem(fila, mensagem, 
        undefined, this.METODO_BUSCAR_POR_ID);      
      throw new BusinessException(0, 'Nenhum registro encontrado.');
    }
    return resultado;
  }

  /**
   * Recupera todos os clientes
   */
  async obterTodos() {
    const todosClientes: Cliente[] = await this.clienteRepository.obterTodos();

    if(!todosClientes){
      throw new BusinessException(0, 'Nenhum registro encontrado.');
    }

    return todosClientes;
  }


}
