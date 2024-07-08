import { config } from "dotenv";

import app from "./app";

config();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(
    `🚀 Conversation Server is up and running on http://localhost:${port}`
  );
});
