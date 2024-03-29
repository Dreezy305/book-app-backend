/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { AuthorDto } from './dto/author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './models/author.model';

@Resolver(Author)
export class AuthorResolver {
  constructor(private authorsService: AuthorService) {}

  @Mutation(() => Author)
  async createAuthor(
    @Args('authorDto') authorDto: AuthorDto,
    @Context() ctx,
  ): Promise<Author> {
    return this.authorsService.createAuthor(authorDto);
  }

  // FIND ALL AUTHORS
  @Query(() => [Author], { nullable: true })
  async authors(@Context() ctx) {
    return this.authorsService.findAuthors();
  }

  // FIND A SINGLE AUTHOR
  @Query(() => Author, { nullable: true })
  async author(@Args('id', { type: () => ID }) id: string, @Context() ctx) {
    return this.authorsService.findAuthor(id);
  }

  // UPDATE AUTHOR RECORD
  @Mutation(() => Author)
  async editAuthor(
    @Args('authorDto') authorDto: UpdateAuthorDto,
    @Args('id', { type: () => ID }) id: string,
    @Context()
    ctx,
  ): Promise<Author> {
    return this.authorsService.updateAuthor(authorDto, id);
  }

  // DELETE AUTHOR RECORD
  @Mutation(() => Author)
  async deleteAuthor(
    @Args('id', { type: () => ID }) id: string,
    @Context()
    ctx,
  ) {
    return this.authorsService.deleteAuthor(id);
  }
}
