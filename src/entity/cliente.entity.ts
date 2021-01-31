import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Conta } from "./conta.entity";

@Entity({name: "tb_cliente"})
export class Cliente {

    @PrimaryGeneratedColumn({name: "idcliente"})
    idCliente: number;

    @Column()
    nome: string;

    @Column({name: "cpfcnpj"})
    cpfCnpj: string;

    @Column({name: "codtipocliente"})
    codTipoCliente: number;

    @OneToMany(() => Conta, conta => conta.cliente)
    contas: Conta[];
}