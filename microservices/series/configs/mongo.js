const { MongoClient } = require("mongodb");

const localMongoURL = "mongodb://localhost:27017";
const databaseName = "entertainme";

var db;

const client = new MongoClient(localMongoURL, { useUnifiedTopology: true });

const connect = (callback) => {
  client.connect((error) => {
    if (error) {
      console.log("Connection failed");
    } else {
      console.log("Connection success");
      db = client.db(databaseName);
      // console.log(db)
    }
    callback(error);
  });
};

const getDatabase = () => {
  return db;
};

module.exports = {
  connect,
  getDatabase,
};
