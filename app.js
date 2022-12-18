import express from 'express';
import morgan from 'morgan';
import axios from 'axios';
import asyncErr from 'express-async-errors';

import activate_locals_middleware from './middlewares/locals.mdw.js';
import activate_views_middleware from './middlewares/views.mdw.js';
import activate_routes_middleware from './middlewares/routes.mdw.js';
import activate_error_middleware from './middlewares/error.mdw.js';

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static('public'));
app.use(express.urlencoded());

activate_locals_middleware(app);
activate_views_middleware(app);
activate_routes_middleware(app);
activate_error_middleware(app);

const port = 3000;
app.listen(port, function () {
  console.log(`Server is running on http://localhost:${port}`)
})