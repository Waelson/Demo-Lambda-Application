import { Logger } from '@nestjs/common';
import  * as moment  from 'moment';
import { DurationInputArg2 } from 'moment';

/**
 * Classe utilitaria para tratamento de datas
 */
export class DataUtil {    


    /**
     * Adiciona 'X' semanas a data
     * @param data Data
     * @param quantidade Quantidade de semanas
     */
    static adicionarSemanas(data: Date, quantidade: number): Date {
        return this.adicionar(data, quantidade, 'w');
    }

    /**
     * Adiciona 'X' anos a data
     * @param data Data
     * @param quantidade Quantidade de anos
     */    
    static adicionarAnos(data: Date, quantidade: number): Date {
        return this.adicionar(data, quantidade, 'y');
    }
    
    /**
     * Adiciona 'X' meses a data
     * @param data Data
     * @param quantidade Quantidade de meses
     */    
    static adicionarMeses(data: Date, quantidade: number): Date {
        return this.adicionar(data, quantidade, 'M');
    }


    /**
     * Adiciona 'X' dias a data
     * @param data Data
     * @param quantidade Quantidade de dias
     */    
    static adicionarDias(data: Date, quantidade: number): Date {
        return this.adicionar(data, quantidade, 'd');
    }

    /**
     * 
     * @param data Data
     * @param quantidade Quantidade
     * @param tipo DurationInputArg2
     */
    static adicionar(data: Date, quantidade: number, 
        tipo: DurationInputArg2): Date {
        try{
            const retorno = moment(data).add(quantidade, tipo);
            return retorno.toDate(); 
        }catch(ex){
            return null;
        }
    }


    /**
     * Verifica se a data e valida
     * @param data Data no formato string
     * @param formato Formato da data
     */
    static isDataValida(data: string, formato: string): boolean {
        try{
            const retorno = moment(data, formato, true).isValid();
            return retorno;
        }catch(ex){
            console.error(ex);
            return false;
        }
    }

    /**
     * Converte uma data do tipo string em tipo Date
     * @param data Data no formato string
     * @param formato Formato da data
     */
    static stringToDate(data: string, formato: string): Date {
        try{
            const retorno = moment(data, formato).toDate();
            return retorno;
        }catch(ex){
            return null;
        }
    }

    /**
     * Converte uma data para string
     * @param data Data no tipo Date
     * @param formato Formato da data
     */
    static dataParaString(data: Date, formato: string): string {
        try{
            const retorno = moment(data);
            return retorno.format(formato);
        }catch(ex){
            console.error(ex);
            return null;
        }
    }


}