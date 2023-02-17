import { Field, InputType } from '@nestjs/graphql';
import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { BookDto } from 'src/book/dto/book.dto';
import { Book } from 'src/book/models/book.model';

@InputType()
export class AuthorDto {
  @IsAlpha()
  @IsNotEmpty()
  @Field()
  firstName: string;

  @IsAlpha()
  @IsNotEmpty()
  @Field()
  lastName: string;

  @IsAlpha()
  @IsString()
  @Field()
  address?: string;

  @IsNotEmpty()
  @Matches(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    { message: 'email must be a valid email' },
  )
  @Field()
  @IsEmail()
  email: string;

  // @Field((type) => [BookDto], { nullable: true })
  // @IsArray()
  // books: [BookDto];
}
