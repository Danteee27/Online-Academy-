import express from 'express';
import activate_routes from './middlewares/routes.mdw.js';
import activate_view from './middlewares/view.mdw.js';


const app = express();
app.use(express.urlencoded({
    extended: true
}));
app.use('/public', express.static('public'));

activate_view(app);
activate_routes(app);



const PORT = 3000;
app.listen(PORT, function () {
    console.log(`Listening at http://localhost:${PORT}`);
})