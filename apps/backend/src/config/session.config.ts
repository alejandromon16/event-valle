import RedisStoreCLient from 'connect-redis'
import session from 'express-session'
import RedisClient from 'ioredis'
import { UserEntity } from '../gql-resources/users/entities/user.entity'
import { v4 as uuidv4 } from 'uuid';

const client = new RedisClient(process.env['REDIS_URL'] as string, {})

const store = new RedisStoreCLient({
  client: client,
})

export const redisSession = session({
  secret: process.env['SESSION_SECRET'],
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  },
  store: store,
  genid: (req) => {
    return uuidv4();
  }
})

declare module 'express' {
  interface Request {
    user: UserEntity
  }
}
