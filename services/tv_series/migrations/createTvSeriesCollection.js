const { migrate } = require("./index");
const collection = "TvSeries";
migrate(
  collection,
  {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title", "overview", "poster_path", "popularity", "tags"],
        properties: {
          title: {
            bsonType: "string",
            description: "must be a string and is required",
          },
          overview: {
            bsonType: "string",
            description: "must be a string and is required",
          },
          poster_path: {
            bsonType: "string",
            description: "must be a string and is required",
          },
          popularity: {
            bsonType: "double",
            description: "must be a double if the field exists",
          },
          tags: {
            bsonType: "array",
            description: "must be a double if the field exists",
          },
        },
      },
    },
  },
  function (error) {
    if (!error) {
      console.log(`"Collection ${collection} created."`);
    } else {
      console.log(error);
    }
  }
);
