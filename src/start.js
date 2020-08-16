// const app = require('./server.js')
import app from "./server.js";

try {
  app.listen(process.env.PORT);
} catch (error) {
  console.log(error);
}
console.log(process.env.PORT);

