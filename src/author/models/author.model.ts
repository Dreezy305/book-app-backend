import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Book } from 'src/book/models/book.model';
// import { Post } from './post';

@ObjectType()
export class Author {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  address?: string;

  //   @Field(() => [Book], { nullable: true })
  //   books: Book[];
}
