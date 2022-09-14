import express from "express";
import cors from "cors";
import http from "http";
import router from './routes/todo'; 
import nosql from './db/nosql';

const app = express();

const server = http.createServer(app);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));

app.use(cors())

/* nosql connection */
nosql.db_connection()
/* nosql connection */

app.use(router);

/* Express Custom Function */
require("./common/express_custom_function")(express);

server.listen(process.env.PORT || 8080, () => {
  console.log('Server Up And Working');
});