
/**
 * Classe utilitaria para tratamento de numeros
 */
export class NumeroUtil {

    /**
     * Verifica se a valor informado e um numero valido
     * @param numero Valor
     */
    static isNumeroValido(numero: string): boolean{
        return !isNaN(parseFloat(numero));
    }
}