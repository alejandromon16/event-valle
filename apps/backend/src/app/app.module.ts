import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../gql-resources/users/users.module';
import { DatabaseModule } from '../common/services/database/prisma.module';
import { AuthModule } from '../gql-resources/auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RolesModule } from '../gql-resources/roles/roles.module';
import { RequestsEventsModule } from '../gql-resources/requests-events/requests-events.module';
import { WhatsappService } from '../common/services/whatsapp/ultrasmg.service';
import { EventsModule } from '../gql-resources/events/events.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: true,
      context: ({req , res}) => ({req, res}),
    }),
    EventEmitterModule.forRoot(),
    UsersModule,
    DatabaseModule,
    RolesModule,
    RequestsEventsModule,
    AuthModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService, WhatsappService],
})
export class AppModule {}
