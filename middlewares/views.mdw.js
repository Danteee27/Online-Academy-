import {
    engine
} from 'express-handlebars';
import numeral from 'numeral';
import hbs_sections from 'express-handlebars-sections';

export default function (app) {
    app.engine('hbs', engine({
        extname: 'hbs',
        defaultLayout: 'layout1.hbs',
        helpers: {
            format_number(val) {
                return numeral(val).format('0,0');
            },
            section: hbs_sections()
        }
    }));
    app.set('view engine', 'hbs');
    app.set('views', './views');
};