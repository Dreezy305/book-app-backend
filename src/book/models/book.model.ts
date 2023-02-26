import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsAlpha, IsString } from 'class-validator';
import { Author } from 'src/author/models/author.model';

@ObjectType()
export class Book {
  @Field(() => ID, { nullable: true })
  id: number;

  @Field(() => String, { nullable: true })
  @IsAlpha()
  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  @IsAlpha()
  description?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  authorId: string;

  @Field(() => Author, { nullable: true })
  author?: Author | null;
}
