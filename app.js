import express from 'express';
import activate_routes from './middlewares/routes.mdw.js';
import activate_view from './middlewares/view.mdw.js';

<<<<<<< Updated upstream

// import bodyParser from 'body-parser';
// app.use(bodyParser.urlencoded({ extended: false }));

const app = express();
app.use(express.json());
=======
const app = express();
>>>>>>> Stashed changes
app.use(express.urlencoded({
    extended: true
}));
app.use('/public', express.static('public'));

activate_view(app);
activate_routes(app);


<<<<<<< Updated upstream

const PORT = 3000;
app.listen(PORT, function () {
    console.log(`Listening at http://localhost:${PORT}`);
=======
const PORT = 3000;
app.listen(PORT, function () {
    console.log(`E-commerce application listening at http://localhost:${PORT}`);
>>>>>>> Stashed changes
})