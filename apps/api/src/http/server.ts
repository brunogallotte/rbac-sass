import fastifyCors from '@fastify/cors'
import { fastify } from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifyJwt from '@fastify/jwt'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'
import { createAccount } from './routes/auth/create-account'
import { authenticateWithPassword } from './routes/auth/authenticate-with-password'
import { getProfile } from './routes/auth/get-profile'

const app = fastify().withTypeProvider<ZodTypeProvider>()



app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Next.js SaaS',
        description: 'Full-stack SaaS app with multi-tenant & RBAC.',
        version: '1.0.0'
      },
      servers: [],
    },
    transform: jsonSchemaTransform
})

app.register(fastifySwaggerUI, {
    routePrefix: '/docs',
})

app.register(fastifyJwt, {
    secret: 'my-jwt-secret',
})

app.register(fastifyCors)

app.register(createAccount)
app.register(authenticateWithPassword)
app.register(getProfile)

app.listen({ port: 3333 }).then(() => console.log('HTTP server running!'))

