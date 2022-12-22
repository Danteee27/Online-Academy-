import express from 'express';
import bodyParser from 'body-parser'


import activate_routes from './middlewares/routes.mdw.js';
import activate_view from './middlewares/view.mdw.js';
import activate_locals from './middlewares/locals.mdw.js';
import activate_session from './middlewares/session.mdw.js';
import activate_error from './middlewares/error.mdw.js';
import morgan from 'morgan';
import expressFormidable from 'express-formidable';
import activate_auth from './middlewares/auth.mdw.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.use(morgan('dev'));




activate_session(app);
activate_locals(app);
activate_view(app);
activate_auth(app);
activate_routes(app);
activate_error(app);


const PORT = 3000;
app.listen(PORT, function () {
    console.log(`Listening at http://localhost:${PORT}`);
})