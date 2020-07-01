// const app = require('./server.js')

import app from "./server.js";

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);