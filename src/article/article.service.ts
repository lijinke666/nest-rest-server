import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { IPaginationResponse } from 'src/typing/base';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async findAll(pageIndex, pageSize): Promise<IPaginationResponse<Article[]>> {
    const [resource, total] = await this.articleRepository
    .createQueryBuilder()
    .skip((pageIndex - 1) * pageSize)
    .take(pageSize)
    .getManyAndCount()

    return {
      total,
      resource
    }
  }

  async createArticle(createArticleDto: CreateArticleDto) {
    const article = await this.articleRepository.create(createArticleDto);
    return await this.articleRepository.save(article);
  }
}
