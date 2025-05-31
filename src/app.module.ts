import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {GraphQLModule} from '@nestjs/graphql';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { APP_PIPE } from '@nestjs/core';
import { MedicationsModule } from './medications/medications.module';
import { DoctorsModule } from './doctors/doctors.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { DoctorSchedulesModule } from './doctor_schedules/doctor_schedules.module';
import { PatientsModule } from './patients/patients.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { TreatmentPlanModule } from './treatment-plan/treatment-plan.module';
import { ExaminationReportModule } from './examination-report/examination-report.module';
import { RegimenModule } from './regimen/regimen.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // Ensure .env file is loaded
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      autoSchemaFile: 'src/schema.gql',
      sortSchema: true,
      playground: true, // Bật GraphQL Playground để debug
    }),
    UserModule,
    MedicationsModule,
    DoctorsModule,
    AuthModule,
    DoctorSchedulesModule,
    PatientsModule,
    AppointmentsModule,
    TreatmentPlanModule,
    ExaminationReportModule,
    RegimenModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    }
  ],
})
export class AppModule {}
