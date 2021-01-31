import { v4 as uuid } from 'uuid';

/**
 * Classe central para geracao de UUIDs
 */
export class UuidUtil {

    /**
     * Gera um UUID
     */
    static gerar(): string{
        return uuid();
    }
}