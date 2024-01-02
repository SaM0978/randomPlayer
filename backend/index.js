const express = require("express");
const conntectToDataBase = require("./database");
const app = express();
const port = 4000;

conntectToDataBase();
app.use(express.json());
app.use("/auth", require("./routes/authentication"));
app.use("/video", require("./routes/video"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
