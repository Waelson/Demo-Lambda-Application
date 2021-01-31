import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

/**
 * Interceptador responsavel por calcular o tempo
 * de execucao de cada controller
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {

  /**
   * Logger
   */
  private readonly logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const metodo = `${context.getClass().name}.${context.getHandler().name}`;

    this.logger.log('Iniciando a execucao do metodo.', metodo)
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => this.logger.log(`O metodo executou em ${Date.now() - now} ms.`, metodo)),
      );
  }
}