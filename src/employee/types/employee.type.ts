import { Field, ID, ObjectType, InputType, registerEnumType } from '@nestjs/graphql';
import { GraphQLISODateTime } from '@nestjs/graphql';
import { Department } from '../../department/types/department.type';
import { PositionAssignment } from '../../position-assignment/types/position-assignment.type';
import { Position } from '../../position/types/position.type';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}
registerEnumType(Gender, { name: 'Gender' });

@ObjectType()
export class Employee {
  @Field(() => ID)
  employee_id: string;

  @Field()
  full_name: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  dob?: Date;

  @Field(() => Gender)
  gender: Gender;

  @Field({ nullable: true })
  place_of_birth?: string;

  @Field({ nullable: true })
  hometown?: string;

  @Field({ nullable: true })
  nationality?: string;

  @Field({ nullable: true })
  ethnicity?: string;

  @Field({ nullable: true })
  religion?: string;

  @Field({ nullable: true })
  marital_status?: string;

  @Field({ nullable: true })
  health_status?: string;

  @Field({ nullable: true })
  avatar_url?: string;

  @Field(() => [Department], { nullable: true })
  departments?: Department[];

  @Field(() => [PositionAssignment], { nullable: true })
  positionAssignments?: PositionAssignment[];

  // thêm field position
  @Field(() => Position, { nullable: true })
  position?: Position;
}

@InputType()
export class CreateEmployeeInput {
  @Field()
  full_name: string;

  @Field( { nullable: true })
  gender?: string;

  @Field(() => GraphQLISODateTime)
  dob: Date;

  @Field({ nullable: true })
  place_of_birth?: string;

  @Field({ nullable: true })
  hometown?: string;

  @Field({ nullable: true })
  nationality?: string;

  @Field({ nullable: true })
  ethnicity?: string;

  @Field({ nullable: true })
  religion?: string;

  @Field({ nullable: true })
  marital_status?: string;

  @Field({ nullable: true })
  health_status?: string;

  @Field({ nullable: true })
  avatar_url?: string;

  @Field(() => [String], { nullable: true })
  department_ids?: string[];
}

@InputType()
export class UpdateEmployeeInput {
  @Field({ nullable: true })
  full_name?: string;

  @Field({ nullable: true })
  gender?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  dob?: Date;

  @Field({ nullable: true })
  place_of_birth?: string;

  @Field({ nullable: true })
  hometown?: string;

  @Field({ nullable: true })
  nationality?: string;

  @Field({ nullable: true })
  ethnicity?: string;

  @Field({ nullable: true })
  religion?: string;

  @Field({ nullable: true })
  marital_status?: string;

  @Field({ nullable: true })
  health_status?: string;

  @Field({ nullable: true })
  avatar_url?: string;

  @Field(() => [String], { nullable: true })
  department_ids?: string[];


  // 👇 Thêm 2 field này
  @Field({ nullable: true })
  department_id?: string;

  @Field({ nullable: true })
  position_id?: string;

}
