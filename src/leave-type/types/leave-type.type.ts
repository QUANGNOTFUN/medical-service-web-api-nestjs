import { Field, ID, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
export class LeaveType {
  @Field(() => ID)
  leave_type_id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  max_days?: number;
}

@InputType()
export class CreateLeaveTypeInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  max_days?: number;
}

@InputType()
export class UpdateLeaveTypeInput {
  @Field(() => ID)
  leave_type_id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  max_days?: number;
}
