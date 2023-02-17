import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { AuthorDto } from './dto/author.dto';
import { Author } from './models/author.model';

@Resolver(Author)
export class AuthorResolver {
  constructor(private authorsService: AuthorService) {}

  @Mutation((returns) => Author)
  async createAuthor(
    @Args('authorDto') authorDto: AuthorDto,
    @Context() ctx,
  ): Promise<Author> {
    return this.authorsService.createAuthor(authorDto);
  }

  @Query((returns) => [Author], { nullable: true })
  async author() {
    return this.authorsService.findAuthors();
  }
}
