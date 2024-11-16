import Movie from "../models/Movie.js";

export default class MovieController {

  static async findAll(_request, response){

    try {

      const movies = await Movie.findAll()

      response.status(200).json({movies: movies});
      
    } catch (error) {
      response.status(422).json({
        message: "Erro pegar todos os filmes",
        error: error
      })
    }

    return;

    /*
      #swagger.tags = ['MOVIE ROUTES']
      #swagger.description = 'Retorna TODOS os Filmes'
    */
   
  }

  static async findOne(request, response){

    try {

      const {id} = request.params;

      const movie = await Movie.findByPk(id);

      if(!movie){
        response.status(404).json({error: "Filme não encontrado!"});
        return;
      }

      response.status(200).json({movie: movie});
      return;
      
    } catch (error) {
      response.status(422).json({
        message: "Erro pegar um filme",
        error: error
      })
    }

    return;

    /*
      #swagger.tags = ['MOVIE ROUTES']
      #swagger.description = 'RETORNA UM Filme pelo ID'

      #swagger.parameters['id'] = {
        in: 'path',
        description: 'Movie ID',
        required: true,
        type: 'integer'
      }
    */

  }

  static async create(request, response){

    try {

      const {
        urlImage,
        title,
        actor,
        ageGroup,
        genre,
        duration,
        score,
        description,
        releaseYear
      } = request.body;

      if(!urlImage || !title || !actor || !ageGroup || !genre || !duration || !score || !description || !releaseYear){
        response.status(422).json({
          message: "Erro ao criar o filme",
          error: "Todos os campos devem estar preenchidos"
        })
        return;
      }

      const movie = {
        urlImage,
        title,
        actor,
        ageGroup,
        genre,
        duration,
        score,
        description,
        releaseYear
      }

      const createdMovie = await Movie.create(movie);

      response.status(201).json({
        message: "Filme criado com sucesso!",
        movie: createdMovie
      });
      return;
      
    } catch (error) {
      response.status(422).json({
        message: "Erro ao criar o filme",
        error: error
      })
    }

    return;

    /*
      #swagger.tags = ['MOVIE ROUTES']
      #swagger.description = 'Insere um NOVO filme na Base de Dados'

      #swagger.parameters['body'] = {
        in: 'body',
        description: 'Movie Data',
        required: true,
        schema: {
          urlImage: "string",
          title: "string",
          actor: "string",
          ageGroup: "string",
          genre: "string",
          duration: "string",
          score: "string",
          description: "string",
          releaseYear: "string"
        }
      }
    */
  }

  static async update(request, response){
    
    try {

      //RECEBENDO e VALIDANDO os campos
      const {
        urlImage,
        title,
        actor,
        ageGroup,
        genre,
        duration,
        score,
        description,
        releaseYear
      } = request.body;

      if(!urlImage || !title || !actor || !ageGroup || !genre || !duration || !score || !description || !releaseYear){
        response.status(422).json({
          message: "Erro ao atualizar o filme",
          error: "Todos os campos devem estar preenchidos"
        })
        return;
      }

      //CAPTURANDO O ID e chamando o método UPDATE do Sequelize
      const {id} = request.params;
      const [updated] = await Movie.update({
        urlImage: urlImage,
        title: title,
        actor: actor,
        ageGroup: ageGroup,
        genre: genre,
        duration: duration,
        score: score,
        description: description,
        releaseYear: releaseYear
      }, {
        where: { id: id }
      });

      //SE o UPDATE ocorreu CORRETAMENTE
      if (updated) {

        const updatedMovie = await Movie.findByPk(id);
        response.status(200).json({
          message: "Filme atualizado com sucesso!",
          movie: updatedMovie
        });
        return;

      }else{ 
        response.status(404).json({error: "Filme não encontrado!"});
        return;
      }
      
    } catch (error) {
      response.status(422).json({
        message: "Erro ao atualizar o filme",
        error: error
      })
    }

    return;

    /*
      #swagger.tags = ['MOVIE ROUTES']
      #swagger.description = 'ATUALIZA UM Filme pelo ID'

      #swagger.parameters['id'] = {
        in: 'path',
        description: 'Movie ID',
        required: true,
        type: 'integer'
      }
    
      #swagger.parameters['body'] = {
        in: 'body',
        description: 'Movie Data',
        required: true,
        schema: {
          urlImage: "string",
          title: "string",
          actor: "string",
          ageGroup: "string",
          genre: "string",
          duration: "string",
          score: "string",
          description: "string",
          releaseYear: "string"
        }
      }
    */
    
  }

  static async delete(request, response){

    try {

      const {id} = request.params;

      const deleted = await Movie.destroy({
        where: { id: id }
      });
      
      if (deleted) {
        response.status(200).json({
          message: "Filme deletado com sucesso!",
          movieId: id
        });
        return;

      } else {
        response.status(404).json({
          error: "Filme não encontrado!",
          movieId: id
        });
        return
      }
      
    } catch (error) {
      response.status(422).json({
        message: "Erro ao deletar o filme",
        error: error
      })
    }

    /*
      #swagger.tags = ['MOVIE ROUTES']
      #swagger.description = 'EXCLUI UM Filme pelo ID'

      #swagger.parameters['id'] = {
        in: 'path',
        description: 'Movie ID',
        required: true,
        type: 'integer'
      }
    */

    return
    
  }
}