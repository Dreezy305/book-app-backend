import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';
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

  @Field(() => ID, { nullable: true })
  authorId: number;

  @Field((type) => Author, { nullable: true })
  author?: Author | null;
}
