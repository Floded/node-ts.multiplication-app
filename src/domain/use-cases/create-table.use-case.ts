export interface CreateTebleUserCase {
  execute: (options: CreateTebleOptions) => string;
}

export interface CreateTebleOptions {
  base: number;
  limit?: number;
}

export class CreateTable implements CreateTebleUserCase {
  constructor() /**
   * DI - Dependency Inyection
   */ {}

  execute({ base, limit = 10 }: CreateTebleOptions) {
    let outputMessage = "";
    for (let i = 1; i <= limit; i++) {
      const result = base * i;
      outputMessage += `${base} x ${i} = ${result}\n`;
    }
    return outputMessage;
  }
}
