import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { BookService } from './book.service';
import { BookDto } from './dto/book.dto';
import { Book } from './models/book.model';

@Resolver(Book)
export class BookResolver {
  constructor(private bookService: BookService) {}

  // CREATE BOOK VIA PRISMA SERVICE
  @Mutation((returns) => Book)
  async createBook(
    @Args('bookDto') bookDto: BookDto,
    @Args('authorId') authorId: string,
    @Context() ctx,
  ): Promise<Book> {
    return this.bookService.createBook(bookDto, authorId);
  }
}
