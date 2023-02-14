import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsEmail, IsNotEmpty, Matches } from 'class-validator';

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
  @Field()
  address?: string;

  @IsEmail()
  @IsNotEmpty()
  @Matches(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    { message: 'email must be a valid email' },
  )
  @Field()
  email: string;
}
