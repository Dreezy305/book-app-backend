import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookService } from './book.service';
import { BookDto } from './dto/book.dto';
import { Book } from './models/book.model';

@Resolver(Book)
export class BookResolver {
  constructor(private bookService: BookService) {}

  // CREATE BOOK VIA PRISMA SERVICE
  @Mutation(() => Book)
  async createBook(
    @Args('bookDto') bookDto: BookDto,
    @Args('authorId') authorId: string,
    @Context() ctx,
  ): Promise<Book> {
    return this.bookService.createBook(bookDto, authorId);
  }

  // FIND ALL BOOKS VIA PRISMA SERVICE
  @Query(() => [Book], { nullable: true })
  async books(@Context() ctx) {
    return this.bookService.findBooks();
  }

  // FIND A BOOK VIA PRISMA SERVICE
  @Query(() => Book, { nullable: true })
  async book(@Args('id', { type: () => ID }) id: string, @Context() ctx) {
    return this.bookService.findBook(id);
  }
}
