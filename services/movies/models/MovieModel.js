const { ObjectId } = require("mongodb");
const { getDatabase } = require("../configs/mongo");

const db = getDatabase();
const Movie = db.collection("Movies");

class MovieModel {
  static insertOne(data) {
    const { title, overview, poster_path, popularity, tags } = data;
    return Movie.insertOne({
      title,
      overview,
      poster_path,
      popularity,
      tags,
    });
  }

  static findAll() {
    return Movie.find({}).toArray();
  }

  static findOneById(id) {
    return Movie.findOne({
      _id: ObjectId(id),
    });
  }

  static updateOneById(data, id) {
    const { title, overview, poster_path, popularity, tags } = data;
    return Movie.findOneAndUpdate(
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
      },
      {
        returnOriginal: false,
      }
    );
  }

  static deleteOneById(id) {
    return Movie.deleteOne({
      _id: ObjectId(id),
    });
  }
}

module.exports = MovieModel;
