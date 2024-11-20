import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API MOVIES',
    description: 'Está é uma API desenvolvida como atividade final para a disciplina de Programação com Frameworks Web',
    version: "1.0.0"
  },
  host: '206.42.23.7:59610',
  components: {
    movieSchema: {
      '@schema': { 
        "required": ["urlImage", "title", "actor", "ageGroup", "genre", "duration", "score", "description", "releaseYear"], 
        "properties": { 
          "urlImage": { 
            "type": "string", 
            "minLength": 2, 
            "example": "https://exemplo-url-imagem.png" 
          },
          "title": { 
            "type": "string", 
            "minLength": 1, 
            "maxLength": 50, 
            "example": "Exemplo de título..." 
          },
          "actor": { 
            "type": "string", 
            "minLength": 1, 
            "maxLength": 300, 
            "example": "Ator A, Ator B..." 
          },
          "ageGroup": { 
            "type": "string", 
            "minLength": 1, 
            "maxLength": 20, 
            "example": "Livre, 12, 14, 16, 18" 
          },
          "genre": { 
            "type": "string", 
            "minLength": 1, 
            "maxLength": 100, 
            "example": "Ação, Drama, Comédia..." 
          },
          "duration": { 
            "type": "string", 
            "minLength": 1, 
            "maxLength": 10, 
            "example": "110 min" 
          },
          "score": { 
            "type": "string", 
            "minLength": 1, 
            "maxLength": 10, 
            "example": "3,12" 
          },
          "description": { 
            "type": "string", 
            "minLength": 1, 
            "example": "Alguma descrição do Filme..." 
          },
          "releaseYear": { 
            "type": "string", 
            "minLength": 1, 
            "maxLength": 10, 
            "example": "2014" 
          },
        } 
      }
    }
  }
};

const outputFile = './swagger-output.json';
const routes = ['./routers/**.js'];

swaggerAutogen()(outputFile, routes, doc);