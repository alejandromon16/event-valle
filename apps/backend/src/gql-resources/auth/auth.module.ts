import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { UsersModule } from '../users/users.module'
import { PasswordResetListener } from './listeners/password-reset.listener'
import { LocalStrategy } from './strategies/local.strategy'
import { SessionSerializer } from './session/session.serializer'
import { EmailService } from '../../common/services'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { jwtConstants } from './constants/jwt.constants'

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    LocalStrategy,
    SessionSerializer,
    PasswordResetListener,
    JwtModule,
    { provide: EmailService, useValue: new EmailService() },
  ],
  exports: [LocalStrategy, AuthService],
})
export class AuthModule {}
