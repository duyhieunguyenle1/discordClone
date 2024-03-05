import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'RestfulAPI with Swagger',
      version: '0.1.0',
      description: 'This is a chat application API made with Express and documented with Swagger',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Duy Hieu',
        // url: 'https://logrocket.com',
        email: 'info@email.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5002',
      },
    ],
  },
  apis: ['./src/docs/*.ts'],
};

export default options;
