// --------------------- TYPES ---------------------
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { GraphQLTimestamp } from 'graphql-scalars';
import { IsArray, IsBoolean, IsString } from 'class-validator';

@ObjectType()
export class Regimen {
  @Field(() => ID)
  id: number;

  @Field()
  care_stage: string;

  @Field()
  regimen_type: string;

  @Field(() => [String])
  medication_list: string[];

  @Field()
  user_guide: string;

  @Field()
  is_default: boolean;

  @Field(() => GraphQLTimestamp)
  created_at: Date;

  @Field(() => GraphQLTimestamp)
  updated_at: Date;
}

@InputType()
export class CreateRegimenInput {
  @Field()
  @IsString()
  care_stage: string;

  @Field()
  @IsString()
  regimen_type: string;

  @Field(() => [String])
  @IsArray()
  medication_list: string[];

  @Field()
  @IsString()
  user_guide: string;

  @Field()
  @IsBoolean()
  is_default: boolean;
}
