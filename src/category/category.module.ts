import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CategoryService } from './category.service';
import { CategoryProvider } from './category.provider';
import { CategoryController } from './category.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...CategoryProvider, CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
