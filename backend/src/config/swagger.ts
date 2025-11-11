import swaggerJsdoc, {
  type OAS3Definition,
  type OAS3Options,
} from 'swagger-jsdoc'

const definition: OAS3Definition = {
  openapi: '3.0.0',
  info: {
    title: 'Menu Order API',
    version: '1.0.0',
    description: 'API documentation for Menu Order backend',
  },
  servers: [{ url: 'http://localhost:3000' }],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      Category: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'Burgers' },
          description: {
            type: 'string',
            nullable: true,
            example: 'Tasty burgers',
          },
          isActive: { type: 'boolean', example: true },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
        required: ['id', 'name', 'isActive', 'createdAt', 'updatedAt'],
      },
      CreateCategory: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          description: { type: 'string', nullable: true },
          isActive: { type: 'boolean' },
        },
        required: ['name'],
      },
      UpdateCategory: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          description: { type: 'string', nullable: true },
          isActive: { type: 'boolean' },
        },
      },
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          firstName: { type: 'string', example: 'John' },
          lastName: { type: 'string', example: 'Doe' },
          email: {
            type: 'string',
            format: 'email',
            example: 'john@example.com',
          },
          role: {
            type: 'string',
            enum: ['admin', 'cashier'],
            example: 'cashier',
          },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
        required: [
          'id',
          'firstName',
          'lastName',
          'email',
          'role',
          'createdAt',
          'updatedAt',
        ],
      },
      RegisterUser: {
        type: 'object',
        properties: {
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string', format: 'password' },
          role: { type: 'string', enum: ['admin', 'cashier'] },
        },
        required: ['firstName', 'lastName', 'email', 'password'],
      },
      Login: {
        type: 'object',
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', format: 'password' },
        },
        required: ['email', 'password'],
      },
      ApiResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: {},
        },
      },
    },
  },
  paths: {
    '/api/categories': {
      get: {
        tags: ['Categories'],
        summary: 'Get all categories',
        responses: {
          200: {
            description: 'List of categories',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Category' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Categories'],
        summary: 'Create category (admin only)',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateCategory' },
            },
          },
        },
        responses: {
          201: {
            description: 'Created',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    data: { $ref: '#/components/schemas/Category' },
                  },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden' },
        },
      },
    },
    '/api/categories/{id}': {
      get: {
        tags: ['Categories'],
        summary: 'Get category by id',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'integer', minimum: 1 },
          },
        ],
        responses: {
          200: {
            description: 'Category',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    data: { $ref: '#/components/schemas/Category' },
                  },
                },
              },
            },
          },
          404: { description: 'Not found' },
        },
      },
      put: {
        tags: ['Categories'],
        summary: 'Update category (admin only)',
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'integer', minimum: 1 },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateCategory' },
            },
          },
        },
        responses: {
          200: {
            description: 'Updated',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    data: { $ref: '#/components/schemas/Category' },
                  },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden' },
          404: { description: 'Not found' },
        },
      },
      delete: {
        tags: ['Categories'],
        summary: 'Delete category (admin only)',
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'integer', minimum: 1 },
          },
        ],
        responses: {
          204: { description: 'No Content' },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden' },
          404: { description: 'Not found' },
        },
      },
    },
    '/api/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RegisterUser' },
            },
          },
        },
        responses: {
          201: {
            description: 'Registered',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    data: {
                      type: 'object',
                      properties: {
                        user: { $ref: '#/components/schemas/User' },
                        token: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
          400: { description: 'Bad request' },
        },
      },
    },
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Login' },
            },
          },
        },
        responses: {
          200: {
            description: 'Logged in',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    data: {
                      type: 'object',
                      properties: {
                        user: { $ref: '#/components/schemas/User' },
                        token: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
        },
      },
    },
    '/api/auth/me': {
      get: {
        tags: ['Auth'],
        summary: 'Get current user',
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'Current user',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    data: { $ref: '#/components/schemas/User' },
                  },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
        },
      },
    },
  },
}

const options: OAS3Options = {
  definition,
  apis: [],
}

export const swaggerSpec = swaggerJsdoc(options)
