import Express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const Server = Express();

//Body parser
Server.use(bodyParser.json());
Server.use(bodyParser.urlencoded({
  extended: true
}));

Server.use('/css', Express.static(path.join(__dirname, 'public/css')))
Server.use('/images', Express.static(path.join(__dirname, 'public/images')))
Server.use('/js', Express.static(path.join(__dirname, 'public/js')))
Server.use('/', Express.static(path.join(__dirname, 'public/files')))
Server.set('view engine', 'ejs');
Server.set('views', path.join(__dirname, 'pages'));

//Use HTTPS
Server.use((req, res, next) => {
  if ((req.headers["x-forwarded-proto"] || "").endsWith("http"))
    res.redirect(`https://${req.headers.host}${req.url}`);
  else
    next();
});

//Routers
//import { userRouter } from '../routers/userRouter.js';
import { mainRouter } from './routers/index.js'
Server.use('/', mainRouter);

export {
  Server
};

export default {
  Server
};