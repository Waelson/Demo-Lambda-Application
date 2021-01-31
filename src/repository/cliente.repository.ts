import { Cliente } from "../entity/cliente.entity";
import { EntityRepository, Repository } from "typeorm";

/**
 * Classe repositorio da entidade Cliente
 */
@EntityRepository(Cliente)
export class ClienteRepository extends Repository<Cliente>{

    /**
     * Recupera um cliente pela chave-primaria
     * @param id Chave primaria
     */
    buscarPorId(id: number): Promise<Cliente> {
        return this.findOne(id, {relations: ["contas"]});
    }

    /**
     * Recupera todos o registros de clientes
     */
    obterTodos(): Promise<Cliente[]> {
        return this.find({relations: ['contas']});
    }

}