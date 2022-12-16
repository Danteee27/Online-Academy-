import express from 'express';
import db from './utils/db.js';

// import activate_locals_middleware from './middlewares/locals.mdw.js';
import activate_views_middleware from './middlewares/views.mdw.js';
import activate_routes_middleware from './middlewares/routes.mdw.js';

const app = express();
app.use(express.urlencoded({
    extended: true
  }));
app.use('/public', express.static('public'));

activate_views_middleware(app);
activate_routes_middleware(app);

const port = 3000;
app.listen(port, function () {
  console.log(`Server is running on http://localhost:${port}`)
})