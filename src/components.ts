import { ClienteController } from "./controller/cliente.controller";
import { IntegracaoSpecController } from "./controller/integracao-spec.controller";
import { Cliente } from "./entity/cliente.entity";
import { Conta } from "./entity/conta.entity";
import { ApiSpecProxy } from "./proxy/api-spec.proxy";
import { SqsAwsProxy } from "./proxy/sqs-aws.proxy";
import { ClienteRepository } from "./repository/cliente.repository";
import { ClienteService } from "./service/cliente.service";
import { IntegracaoSpecService } from "./service/integracao-spec.service";

/**
 * Lista de entidades
 */
const ENTITIES: any[] = [
    Cliente, 
    Conta
];

/**
 * Lista de proxies
 */
const PROXIES :any[] = [
    ApiSpecProxy, 
    SqsAwsProxy
];

/**
 * Lista de servicos
 */
const SERVICES: any[] = [
    ClienteService, 
    IntegracaoSpecService
].concat(PROXIES);

/**
 * Lista de controllers
 */
const CONTROLLERS: any[] = [
    ClienteController,
    IntegracaoSpecController
];

/**
 * Lista de repositorios
 */
const REPOSITORIES: any[] = [
    ClienteRepository
];


/**
 * Exporta as entidade
 */
export { 
    ENTITIES, 
    SERVICES, 
    PROXIES, 
    REPOSITORIES, 
    CONTROLLERS 
};