const { ObjectId } = require("mongodb");
const { getDatabase } = require("../configs/mongo");

const db = getDatabase();
const TvSeries = db.collection("tv_series");

class TvSeriesModel {
  static insertOne(data) {
    const { title, overview, poster_path, popularity, tags } = data;
    return TvSeries.insertOne({
      title,
      overview,
      poster_path,
      popularity,
      tags,
    });
  }

  static findAll() {
    return TvSeries.find({}).toArray();
  }

  static findById(id) {
    return TvSeries.findOne({
      _id: ObjectId(id),
    });
  }

  static updateById(data, id) {
    console.log({ data, id });
    const { title, overview, poster_path, popularity, tags } = data;
    return TvSeries.findOneAndUpdate(
      {
        _id: ObjectId(id),
      },
      {
        $set: {
          title: title,
          overview: overview,
          poster_path: poster_path,
          popularity: popularity,
          tags: tags,
        },
      }
    );
  }

  static deleteOne(id) {
    return TvSeries.deleteOne({
      _id: ObjectId(id),
    });
  }
}

module.exports = TvSeriesModel;
