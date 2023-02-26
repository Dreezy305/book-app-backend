import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsNotEmpty } from 'class-validator';

@InputType()
export class BookDto {
  @IsAlpha()
  @IsNotEmpty()
  @Field()
  title: string;

  @IsAlpha()
  @IsNotEmpty()
  @Field({ nullable: true })
  description: string;
}
