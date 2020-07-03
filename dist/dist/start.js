// const app = require('./server.js')
import app from "./server.js";

const start = () => {
  app.listen(process.env.PORT);
};

export default start;