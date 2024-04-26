import express from "express";

const app = express();

app.get("/api/v1/ping", (req, res) => {
  res.send("ping");
});

app.listen(4001, () => {
  console.log("Server starting on port 4001");
});
