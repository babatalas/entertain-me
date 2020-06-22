const MovieModel = require("../models/MovieModel");

class MovieController {
  static async insertOne(req, res) {
    try {
      const movie = await MovieModel.insertOne(req.body);
      return res.status(201).json(movie.ops[0]);
    } catch (error) {
      res.status(500).json({ err: "SERVER_ERROR" });
    }
  }

  static async findAll(req, res) {
    try {
      const movies = await MovieModel.findAll();
      return res.status(200).json(movies);
    } catch (error) {
      return res.status(500).json({ err: "SERVER_ERROR" });
    }
  }

  static async findOneById(req, res) {
    try {
      const movie = await MovieModel.findOneById(req.params.id);
      return res.status(200).json(movie);
    } catch (error) {
      return res.status(500).json({ err: "SERVER_ERROR" });
    }
  }

  static async updateOneById(req, res) {
    try {
      const result = await MovieModel.updateOneById(req.body, req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ err: "SERVER_ERROR" });
    }
  }

  static async deleteOneById(req, res) {
    try {
      const { result } = await MovieModel.deleteOneById(req.params.id);
      if (!result.n) return res.status(404).json(result);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ err: "SERVER_ERROR" });
    }
  }
}

module.exports = MovieController;
