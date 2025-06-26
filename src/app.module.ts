import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
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
import { BlogPostsModule } from './blog-posts/blog-posts.module';
import { UploadController } from './upload/upload.controller';
import { UploadService } from './upload/upload.service';
import { UploadModule } from './upload/upload.module';
import { AppointmentSlotsModule } from './appointment-slots/appointment-slots.module';
import { DateTimeScalar } from './common/scalars/date.scalar';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { EmailService } from './api/send-email/email.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      autoSchemaFile: 'src/schema.gql',
      sortSchema: true,
      playground: true,
      resolvers: { DateTime: DateTimeScalar },
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST || 'smtp.sendgrid.net',
        port:  587,
        secure: false, // Sử dụng STARTTLS
        auth: {
          user: process.env.MAIL_USER || 'apikey',
          pass: process.env.MAIL_PASS || 'your-sendgrid-api-key',
        },
      },
      defaults: {
        from: 'thanhhien.work.2004@gmail.com', // Thay bằng email đã xác thực
      },
      template: {
        dir: join(__dirname,'..', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    UserModule,
    MedicationsModule,
    DoctorsModule,
    AuthModule,
    DoctorSchedulesModule,
    BlogPostsModule,
    PatientsModule,
    AppointmentsModule,
    TreatmentPlanModule,
    ExaminationReportModule,
    RegimenModule,
    UploadModule,
    AppointmentSlotsModule,
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