const express = require("express");
const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => console.log("server running on PORT 5000"));
