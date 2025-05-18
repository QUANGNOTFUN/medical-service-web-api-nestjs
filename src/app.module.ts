
import {GraphQLModule} from '@nestjs/graphql';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { MedicationsModule } from './medications/medications.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      autoSchemaFile: 'src/schema.gql',
      sortSchema: true,
    }),
    UserModule,
    MedicationsModule,
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
