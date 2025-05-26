import { Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Decimal } from 'generated/prisma/runtime/library';
import { GraphQLDate } from 'graphql-scalars';
import { IsInt, IsString, Min, MinLength } from 'class-validator';

@ObjectType()
export class Medication {
  @Field(() => Int)
  id: number;

  @Field()
  acronym: string;

  @Field()
  name: string;

  @Field(() => Float)
  price: Decimal;

  @Field(() => Int)
  available_quantity: number;

  @Field(() => GraphQLDate)
  created_at: Date;

  @Field(() => GraphQLDate)
  updated_at: Date;
}

@InputType()
export class SearchMedicationsInput {
  @Field()
  @IsString({ message: 'Từ khóa phải là chuỗi' })
  keyword: string;
}

@InputType()
export class GetMedicationByIdInput {
  @Field()
  @IsInt({ message: 'ID phải là số nguyên' })
  @Min(0, { message: 'ID phải lớn hơn 0 hoặc bằng 0' })
  id: number;
}

@InputType()
export class CreateMedicationInput {
  @Field()
  acronym: string;

  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  available_quantity: number;
}

@InputType()
export class UpdateMedicationInput {
  @Field({nullable: true})
  acronym?: string;

  @Field({nullable: true})
  name?: string;

  @Field(() => Int, {nullable: true})
  @IsInt({ message: 'Giá phải là số nguyên' })
  @Min(0, { message: 'Giá phải lớn hơn 0 hoặc bằng 0' })
  price?: number;

  @Field(() => Int, {nullable: true})
  available_quantity?: number;
}