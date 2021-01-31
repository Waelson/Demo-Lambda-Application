
/**
 * Classe utilitaria para tratamento de Strings
 */
export class StringUtil {

    /**
     * Verifica se o valor informado e UNDEFINED ou VAZIA
     * @param valor string
     */
    static isVazia(valor: string): boolean {
        return valor == undefined || valor.trim().length === 0;
    }

    /**
     * Complementa uma string com 'X' caracteres a esquerda
     * @param valor Variavel que sera a base do padding
     * @param caracter Caracter 
     * @param quantidade Quantidade
     */
    static padLeft(valor: string, caracter: string, quantidade: number): string {
        if(!valor || !caracter || !quantidade){
            return valor;
        }
        if(valor.length >= quantidade){
            return valor;
        }
        while(valor.length < quantidade){
            valor = caracter + valor; 
        }
        return valor;
    }

}