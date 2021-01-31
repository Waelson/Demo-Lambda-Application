/**
 * Representa o formulario para envio dos
 * dados de autenticacao
 */
export interface ReqFormAutenticacaoDto {
    
    /**
     * Email do usuario
     */
    email: string;

    /** 
     * Senha do usuario
     */
    senha: string;
}