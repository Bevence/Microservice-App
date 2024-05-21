import { config } from "dotenv";

import app from "./app";

config();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`🚀 Server is up and running on http://localhost:${port}`);
});
