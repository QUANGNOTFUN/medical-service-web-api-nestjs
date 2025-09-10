import { Field, ID, ObjectType, InputType } from '@nestjs/graphql';
import { GraphQLISODateTime } from '@nestjs/graphql';
import { LeaveType } from '../../leave-type/types/leave-type.type';
import { Employee } from '../../employee/types/employee.type';

@ObjectType()
export class Leave {
  @Field(() => ID)
  leave_id: number;

  @Field()
  employee_id: string;

  @Field(() => LeaveType, { nullable: true })
  leaveType?: LeaveType;

  @Field(() => GraphQLISODateTime)
  start_date: Date;

  @Field(() => GraphQLISODateTime)
  end_date: Date;

  @Field({ nullable: true })
  reason?: string;

  @Field()
  status: string; // Pending, Approved, Rejected

  @Field(() => Employee, { nullable: true })
  employee?: Employee;
}

@InputType()
export class CreateLeaveInput {
  @Field()
  employee_id: string;

  @Field()
  leave_type_id: number;

  @Field(() => GraphQLISODateTime)
  start_date: Date;

  @Field(() => GraphQLISODateTime)
  end_date: Date;

  @Field({ nullable: true })
  reason?: string;

  @Field()
  status: string; // Pending, Approved, Rejected
}

@InputType()
export class UpdateLeaveInput {
  @Field({ nullable: true })
  leave_type_id?: number;

  @Field(() => GraphQLISODateTime, { nullable: true })
  start_date?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  end_date?: Date;

  @Field({ nullable: true })
  reason?: string;

  @Field({ nullable: true })
  status?: string;
}
