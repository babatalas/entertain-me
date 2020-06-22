const { MongoClient } = require("mongodb");

const localMongoURL = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DBNAME;

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
