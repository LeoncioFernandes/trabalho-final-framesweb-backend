import express from 'express';
import db from './db/db.js';
import cors from 'cors'

import MovieRouter from './routers/MovieRouter.js'

//CONFIGURAÇÕES SWAGGER INI...
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { readFile } from 'fs/promises';

const swaggerDefinition = JSON.parse(
  await readFile(new URL('./swagger-output.json', import.meta.url))
);
// const swaggerDefinition = dataDefinitionSwagger
const swaggerOptions = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./routers/**.js']
}
const swaggerSpec = swaggerJSDoc(swaggerOptions);
//...END

const server = express();
const PORT = 5000;

server.use(cors({origin: '*'}));
server.use(express.json());
server.use(MovieRouter);

//ROTA DO SWAGGER
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

db.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Server listen on port: ${PORT}`);
  });
})