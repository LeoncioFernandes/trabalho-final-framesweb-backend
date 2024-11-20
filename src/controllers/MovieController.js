import Movie from "../models/Movie.js";

export default class MovieController {

  static async findAll(_request, response){

    /*
      #swagger.tags = ['MOVIE ROUTES']
      #swagger.summary = 'Encontrar TODOS os Filmes'
      #swagger.description = 'Retorna TODOS os Filmes ordenados pelo TÍTULO ASCENDENTEMENTE'
    */

    try {

      const movies = await Movie.findAll({order: [['title', 'ASC']]})

      response.status(200).json({movies: movies});
      
    } catch (error) {
      response.status(422).json({
        message: "Erro pegar todos os filmes",
        error: error
      })
    }

    return;
   
  }

  static async findOne(request, response){

    /*
      #swagger.tags = ['MOVIE ROUTES']
      #swagger.summary = 'Encontrar UM Filme'
      #swagger.description = 'RETORNA UM Filme pelo ID'

      #swagger.parameters['id'] = {
        in: 'path',
        description: 'Movie ID',
        required: true,
        type: 'integer'
      }
    */

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

  }

  static async create(request, response){

    /*
      #swagger.tags = ['MOVIE ROUTES']
      #swagger.summary = 'Inserir UM novo Filme'
      #swagger.description = 'Insere um NOVO filme na Base de Dados'

      #swagger.parameters['body'] = { 
        in: 'body',
        description: 'Movie Data',
        required: true,
        '@schema': { $ref: "#/components/movieSchema/@schema" },
      }
    */

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
        response.status(400).json({
          message: "Erro ao criar o filme",
          error: "Todos os campos devem estar preenchidos"
        })
        return;
      }

      if(title.length > 50){
        response.status(400).json({
          message: "Erro ao criar o filme",
          error: 'O TITLE não pode ser maior que 50 caracteres.'
        })
        return;
      }

      if(actor.length > 300){
        response.status(400).json({
          message: "Erro ao criar o filme",
          error: 'O ACTOR não pode ser maior que 300 caracteres.'
        })
        return;
      }

      if(ageGroup.length > 20){
        response.status(400).json({
          message: "Erro ao criar o filme",
          error: 'O AGEGROUP não pode ser maior que 20 caracteres.'
        })
        return;
      }

      if(genre.length > 100){
        response.status(400).json({
          message: "Erro ao criar o filme",
          error: 'O GENRE não pode ser maior que 100 caracteres.'
        })
        return;
      }

      if(duration.length > 10){
        response.status(400).json({
          message: "Erro ao criar o filme",
          error: 'O DURATION não pode ser maior que 10 caracteres.'
        })
        return;
      }

      if(releaseYear.length > 10){
        response.status(400).json({
          message: "Erro ao criar o filme",
          error: 'O RELEASEYEAR não pode ser maior que 10 caracteres.'
        })
        return;
      }

      const scoreConv = Number(score.replace(",", "."))

      if(!scoreConv || scoreConv < 0 || scoreConv > 5){
        response.status(400).json({
          message: "Erro ao criar o filme",
          error: 'O SCORE deve ser um valor entre 0 e 5.'
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

  }

  static async update(request, response){

    /*
      #swagger.tags = ['MOVIE ROUTES']
      #swagger.summary = 'Atualizar UM Filme'
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
        '@schema': { $ref: "#/components/movieSchema/@schema" },
      }
    */
    
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
        response.status(400).json({
          message: "Erro ao atualizar o filme",
          error: "Todos os campos devem estar preenchidos"
        })
        return;
      }

      if(title.length > 50){
        response.status(400).json({
          message: "Erro ao atualizar o filme",
          error: "O TITLE não pode ser maior que 50 caracteres."
        })
        return;
      }

      if(actor.length > 300){
        response.status(400).json({
          message: "Erro ao atualizar o filme",
          error: 'O ACTOR não pode ser maior que 300 caracteres.'
        })
        return;
      }

      if(ageGroup.length > 20){
        response.status(400).json({
          message: "Erro ao atualizar o filme",
          error: 'O AGEGROUP não pode ser maior que 20 caracteres.'
        })
        return;
      }

      if(genre.length > 100){
        response.status(400).json({
          message: "Erro ao atualizar o filme",
          error: 'O GENRE não pode ser maior que 100 caracteres.'
        })
        return;
      }

      if(duration.length > 10){
        response.status(400).json({
          message: "Erro ao atualizar o filme",
          error: 'O DURATION não pode ser maior que 10 caracteres.'
        })
        return;
      }

      if(releaseYear.length > 10){
        response.status(400).json({
          message: "Erro ao atualizar o filme",
          error: 'O RELEASEYEAR não pode ser maior que 10 caracteres.'
        })
        return;
      }

      const scoreConv = Number(score.replace(",", "."))

      if(!scoreConv || scoreConv < 0 || scoreConv > 5){
        response.status(400).json({
          message: "Erro ao criar o filme",
          error: 'O SCORE deve ser um valor entre 0 e 5.'
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
    
  }

  static async delete(request, response){

    /*
      #swagger.tags = ['MOVIE ROUTES']
      #swagger.summary = 'Excluir UM Filme'
      #swagger.description = 'EXCLUI UM Filme pelo ID'

      #swagger.parameters['id'] = {
        in: 'path',
        description: 'Movie ID',
        required: true,
        type: 'integer'
      }
    */

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

    return
    
  }
}