import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsAlpha, IsEmail, IsString } from 'class-validator';
import { Book } from 'src/book/models/book.model';

@ObjectType()
export class Author {
  @Field(() => ID, { nullable: true })
  id: number;

  @Field(() => String, { nullable: true })
  @IsAlpha()
  firstName: string;

  @Field(() => String, { nullable: true })
  @IsAlpha()
  lastName: string;

  @Field(() => String, { nullable: true })
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  @IsString()
  address?: string;

  @Field(() => [Book], { nullable: true })
  books?: [Book];
}
