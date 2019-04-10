import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Req,
} from '@nestjs/common';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Article } from './article.entity';
import { ArticleService } from './article.service';
import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { IPaginationResponse } from 'src/typing/base';
import { CreateArticleDto } from './dto/create-article.dto';

@ApiBearerAuth()
@ApiUseTags('文章')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @Get()
  @ApiOperation({ title: '获取文章列表' })
  async findAll(@Query() params: PaginationDto = { pageIndex: 1, pageSize: 10 }): Promise<IPaginationResponse<Article[]>> {
    return await this.articleService.findAll(params.pageIndex, params.pageSize);
  }

  @Post()
  @ApiOperation({ title: '创建文章' })
  async createArticle(@Body() article: CreateArticleDto, @Req() req) {
    return await this.articleService.createArticle({
      ...article,
      userId: req.session.userId
    })
  }
}
