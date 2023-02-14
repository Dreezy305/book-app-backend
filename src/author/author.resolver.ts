import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { AuthorDto } from './dto/author.dto';
import { Author } from './models/author.model';

@Resolver((of) => Author)
export class AuthorResolver {
  constructor(private authorsService: AuthorService) {}

  @Query(() => Author)
  async author() {
    return this.authorsService.findAuthors();
  }

  @Mutation(() => Author)
  createAuthor(@Args('authorDto') authorDto: AuthorDto) {
    return this.authorsService.createAuthor(authorDto);
  }
}
