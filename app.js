import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser'


import activate_routes from './middlewares/routes.mdw.js';
import activate_view from './middlewares/view.mdw.js';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({
    extended: true
}));
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(__dirname + '/public'));
console.log(__dirname);
app.use(morgan("dev"));

activate_view(app);
activate_routes(app);



const PORT = 3000;
app.listen(PORT, function () {
    console.log(`Listening at http://localhost:${PORT}`);})