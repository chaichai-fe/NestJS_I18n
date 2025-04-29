import { Injectable } from '@nestjs/common';

interface Lang {
  id: number;
  name: string;
}

@Injectable()
export class LangService {
  private readonly langs: Lang[] = [];

  create(lang: Lang) {
    this.langs.push(lang);
  }

  findAll(): Lang[] {
    return this.langs;
  }
}
