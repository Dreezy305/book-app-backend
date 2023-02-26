import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsString } from 'class-validator';

@InputType()
export class UpdateAuthorDto {
  @IsAlpha()
  @Field()
  firstName?: string;

  @IsAlpha()
  @Field()
  lastName?: string;

  @IsString()
  @Field()
  address?: string;
}
