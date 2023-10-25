import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { EmailService } from '../../common/services'
import { UsersModule } from '../users/users.module'
import { PasswordResetListener } from './listeners/password-reset.listener'
import { LocalStrategy } from './strategies/local.strategy'
import { SessionSerializer } from './session/session.serializer'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [UsersModule, PassportModule],
  providers: [
    AuthResolver,
    AuthService,
    LocalStrategy,
    SessionSerializer,
    PasswordResetListener,
    { provide: EmailService, useValue: new EmailService() },
  ],
  exports: [LocalStrategy],
})
export class AuthModule {}
