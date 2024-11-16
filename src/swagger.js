import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API MOVIES',
    description: 'Está é uma API desenvolvida como atividade final para a disciplina de Programação com Frameworks Web',
    version: "1.0.0"
  },
  host: '206.42.23.7:59610'
};

const outputFile = './swagger-output.json';
const routes = ['./routers/**.js'];

swaggerAutogen()(outputFile, routes, doc);