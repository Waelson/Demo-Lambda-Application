import { Body, Controller, Get, Param, Post, Res } 
  from '@nestjs/common';
import { ClienteService } from '../service/cliente.service';
import { Cliente } from '../entity/cliente.entity';
import { Logger } from '@nestjs/common';
import { Response } from 'express';
import { BaseController } from './base.controller';
import { NumeroUtil } from '../util/numero.util';
import { BusinessException } from '../infra/exception/business.exception';

/**
 * Controller da entidade cliente
 */
@Controller("api/v1/cliente")
export class ClienteController extends BaseController{

  private readonly METODO_INCLUIR: string = 'ClienteController.incluir';
  private readonly METODO_OBTER_POR_ID: string = 'ClienteController.obterPorId';
  private readonly METODO_OBTER_TODOS: string = 'ClienteController.obterTodos';

  /**
   * Logger
   */
  private readonly logger = new Logger(ClienteController.name);

  /**
   * Construtor
   * @param clienteService ClienteService
   */
  constructor(private readonly clienteService: ClienteService) {
    super();
  }

  /**
   * Processa inclusao de um cliente
   * @param cliente Cliente
   * @param res Response
   */
  @Post()
  async incluir(@Body() cliente: Cliente, @Res() res: Response){
    try{
      this.logger.log('Parametros: ' + 
        JSON.stringify(cliente), this.METODO_INCLUIR);
      const resultado = await this.clienteService.salvar(cliente);
      this.ok(res, resultado);
    }catch(exception){
      this.error(res, exception, this.METODO_INCLUIR);
    }
  }

  /**
   * Processa a requisicao para recuperar um registro por ID
   * @param param Parametros da Requisicao
   * @param res Response 
   */
  @Get("/:id")
  async obterPorId(@Param("id") id, @Res() res: Response) {
    try{
      this.logger.log(`Valor do parametro ID ${id}`, this.METODO_OBTER_POR_ID);

      if(!NumeroUtil.isNumeroValido(id)){
        throw new BusinessException(0, 'O parametro ID nao e um numero valido.');
      }

      const resultado = await this.clienteService.buscarPorId(id);
      this.ok(res, resultado);
    }catch(exception){
      this.error(res, exception, this.METODO_OBTER_POR_ID);
    }

  }

  /**
   * Processa a requisicao para recuperar todos os clientes
   * @param res Response
   */
  @Get()
  async obterTodos(@Res() res: Response){ 
    try{
      this.logger.log('Processando a requisicao para obterTodos');
      const clientes = await this.clienteService.obterTodos();
      this.ok(res, clientes);
    }catch(exception){
      this.error(res, exception, this.METODO_OBTER_TODOS);
    }

  }
}