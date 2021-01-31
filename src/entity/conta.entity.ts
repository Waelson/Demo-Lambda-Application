import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./cliente.entity";

@Entity({name: "tb_conta"})
export class Conta {

    @PrimaryGeneratedColumn({name: "idconta"})
    idConta: number;

    @Column({nullable: false})
    numero: number;

    @Column({name: "datacriacao", nullable: false})
    dataCriacao: Date;

    @ManyToOne(() => Cliente, cliente => cliente.contas)
    @JoinColumn({name: "idcliente"})
    cliente: Cliente;
}