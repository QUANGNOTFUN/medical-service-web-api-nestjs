import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';

@ObjectType()
export class Insurance {
  @Field(() => Int)
  insurance_id: number;

  @Field()
  insurance_number: string;

  @Field()
  issue_date: Date;

  @Field()
  expiry_date: Date;

  @Field()
  employee_id: string;
}

@InputType()
export class CreateInsuranceInput {
  @Field()
  insurance_number: string;

  @Field()
  issue_date: Date;

  @Field()
  expiry_date: Date;

  @Field()
  employee_id: string;
}

@InputType()
export class UpdateInsuranceInput {
  @Field({ nullable: true })
  insurance_number?: string;

  @Field({ nullable: true })
  issue_date?: Date;

  @Field({ nullable: true })
  expiry_date?: Date;
}
