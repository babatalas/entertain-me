const TvSeriesModel = require("../models/TvSeriesModel");

class TvSeriesController {
  static async insertOne(req, res) {
    try {
      const movie = await TvSeriesModel.insertOne(req.body);
      return res.status(201).json(movie.ops);
    } catch (error) {
      console.log(error)
      res.status(500).json({ err: "SERVER_ERROR" });
    }
  }

  static async findAll(req, res) {
    try {
      const movies = await TvSeriesModel.findAll();
      return res.status(200).json(movies);
    } catch (error) {
      return res.status(500).json({ err: "SERVER_ERROR" });
    }
  }

  static async findById(req, res) {
    try {
      const movie = await TvSeriesModel.findById(req.params.id);
      return res.status(200).json(movie);
    } catch (error) {
      return res.status(500).json({ err: "SERVER_ERROR" });
    }
  }

  static async updateById(req, res) {
    try {
      const movie = await TvSeriesModel.updateById(req.body, req.params.id);
      console.log(movie);
      return res.status(200).status(movie);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ err: "SERVER_ERROR" });
    }
  }

  static async deleteOne(req, res) {
    try {
      const result = TvSeriesModel.deleteOne(req.params.id);
      return res.status(200).json({ status: "Tv Series deleted successfully." });
    } catch (error) {
      return res.status(500).json({ err: "SERVER_ERROR " });
    }
  }
}

module.exports = TvSeriesController;
