export type ErrorContent = {
  message: string;
  context?: { [key: string]: any };
};

export abstract class CustomError extends Error {
  abstract readonly statusCode: number;
  abstract readonly logging: boolean;
  abstract readonly errors: ErrorContent[];

  constructor(message: string) {
    super(message);
  }
}
