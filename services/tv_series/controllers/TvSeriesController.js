const TvSeriesModel = require("../models/TvSeriesModel");

class TvSeriesController {
  static async insertOne(req, res) {
    try {
      const tvSeries = await TvSeriesModel.insertOne(req.body);
      return res.status(201).json(tvSeries.ops[0]);
    } catch (error) {
      res.status(500).json({ err: "SERVER_ERROR" });
    }
  }

  static async findAll(req, res) {
    try {
      const tvSeries = await TvSeriesModel.findAll();
      return res.status(200).json(tvSeries);
    } catch (error) {
      return res.status(500).json({ err: "SERVER_ERROR" });
    }
  }

  static async findOneById(req, res) {
    try {
      const tvSeries = await TvSeriesModel.findOneById(req.params.id);
      return res.status(200).json(tvSeries);
    } catch (error) {
      return res.status(500).json({ err: "SERVER_ERROR" });
    }
  }

  static async updateOneById(req, res) {
    try {
      const result = await TvSeriesModel.updateOneById(req.body, req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ err: "SERVER_ERROR" });
    }
  }

  static async deleteOneById(req, res) {
    try {
      const { result } = TvSeriesModel.deleteOneById(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ err: "SERVER_ERROR" });
    }
  }
}

module.exports = TvSeriesController;
