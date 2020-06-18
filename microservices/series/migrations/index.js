const { MongoClient } = require("mongodb");

const localMongoURL = "mongodb://localhost:27017";
const databaseName = "entertainMe";

var db;

const client = new MongoClient(localMongoURL, { useUnifiedTopology: true });

const migrate = (collection, option, callback) => {
  client.connect((error) => {
    if (error) {
      console.log("Connection failed");
    } else {
      console.log("Connection success");
      db = client.db(databaseName);

      db.createCollection(collection, option, function (err, results) {
        client.close();
        return err ? callback(err) : callback(error);
      });
    }
    callback(error);
  });
};

module.exports = {
  migrate,
};
