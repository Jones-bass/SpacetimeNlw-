import 'dotenv/config'

import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'
import { fastifyCors } from '@fastify/cors'
import { authRoutes } from './routes/auth'
import jwt from '@fastify/jwt'
import { resolve } from 'node:path'
import multipart from '@fastify/multipart'
import { uploadRoutes } from './routes/upload'

const app = fastify()

app.register(multipart)

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(fastifyCors, {
  origin: true,
})

app.register(jwt, {
  secret: 'spacetime',
})

app.register(authRoutes)
app.register(uploadRoutes)
app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀 HTTP Server Running on 3333')
  })
