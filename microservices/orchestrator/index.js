const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { connect } = require("./configs/mongo");

connect((err) => {
  if (!err) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use("/", require("./routes"));

    app.listen(PORT, () => {
      console.log("Server is running on *: ", PORT);
    });
  }
});
