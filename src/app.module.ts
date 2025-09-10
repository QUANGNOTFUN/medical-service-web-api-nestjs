import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { UploadController } from './upload/upload.controller';
import { UploadService } from './upload/upload.service';
import { UploadModule } from './upload/upload.module';
import { EmailService } from './api/send-email/email.service';
import { OtpModule } from './mail/otp.module';
import { MailModule } from './mail/mail.module';
import { EmployeeModule } from './employee/employee.module';
import { UserAccountModule } from './user-account/user-account.module';
import { PositionAssignmentModule } from './position-assignment/position-assignment.module';
import { DepartmentModule } from './department/department.module';
import { PositionModule } from './position/position.module';
import { OvertimeModule } from './overtime/overtime.module';
import { TimekeepingModule } from './time-keeping/timekeeping.module';
import { WorkTypeModule } from './work-type/work-type.module';
import { SalaryAdvanceModule } from './salary-advance/salary-advance.module';
import { OvertimeTypeModule } from './overtime-type/overtime-type.module';
import { ContractModule } from './contract/contract.module';
import { LeaveModule } from './leave/leave.module';
import { LeaveTypeModule } from './leave-type/leave-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true, // bật GraphQL Playground
      path: '/graphql',
    }),
    LeaveModule,
    LeaveTypeModule,
    ContractModule,
    OvertimeModule,
    TimekeepingModule,
    WorkTypeModule,
    SalaryAdvanceModule,
    OvertimeTypeModule,
    PositionAssignmentModule,
    DepartmentModule,
    PositionModule,
    EmployeeModule,
    UserAccountModule,
    AuthModule,
    UploadModule,
    OtpModule,
    MailModule,
  ],
  controllers: [AppController, UploadController],
  providers: [
    AppService,
    JwtStrategy,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    UploadService,
    EmailService,
  ],
  exports: [EmailService],
})
export class AppModule {}