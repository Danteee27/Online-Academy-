import { engine } from 'express-handlebars';
import hbs_sections from 'express-handlebars-sections';
import numeral from 'numeral';

export default function (app) {
    app.engine('hbs', engine({
        // defaultLayout: 'main.hbs'
        extname: 'hbs',
        defaultLayout: 'main.hbs',
        helpers: {
            section: hbs_sections()
        }
    }));
    app.set('view engine', 'hbs');
    app.set('views', './views');
}