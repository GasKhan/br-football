import { CustomError } from './customError';

export class NotFoundError extends CustomError {
  private static readonly _statusCode = 404;
  private static readonly _name = 'NotFoundError';
  private readonly _logging: boolean;
  private readonly _code: number;
  private readonly _context: { [key: string]: any };

  constructor(params: {
    message: string;
    logging?: boolean;
    code?: number;
    context?: { [key: string]: any };
  }) {
    super(params.message);
    this._logging = params.logging ?? true;
    this._code = params.code ?? NotFoundError._statusCode;
    this._context = params.context ?? {};
  }

  get name(): string {
    return NotFoundError._name;
  }

  get statusCode(): number {
    return this._code;
  }
  get logging(): boolean {
    return this._logging;
  }
  get errors() {
    return [{ message: this.message, context: this._context }];
  }
}
