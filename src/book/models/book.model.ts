import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';

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
  @Field({ nullable: true })
  description?: string;
}
