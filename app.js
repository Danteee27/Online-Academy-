import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser'


import activate_routes from './middlewares/routes.mdw.js';
import activate_view from './middlewares/view.mdw.js';
import activate_locals from './middlewares/locals.mdw.js';
import activate_session from './middlewares/session.mdw.js';
import activate_auth from './middlewares/auth.mdw.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.use(morgan('dev'));

//app.use(expressFormidable());

activate_locals(app);
activate_view(app);
activate_routes(app);
activate_session(app);
activate_auth(app);

const PORT = 3000;
app.listen(PORT, function () {
    console.log(`Listening at http://localhost:${PORT}`);
})
