import {
    engine
} from 'express-handlebars';
import numeral from 'numeral';
import hbs_sections from 'express-handlebars-sections';
import showOrHideItem from "../public/function/showOrHide.js";

export default function (app) {
    app.engine('hbs', engine({
        extname: 'hbs',
        defaultLayout: 'layout1.hbs',
        helpers: {
            format_number(val) {
                return numeral(val).format('0,0');
            },
            section: hbs_sections(),
            showOrHide(id)
            {
                showOrHideItem(id);
            },
        }
    }));
    app.set('view engine', 'hbs');
    app.set('views', './views');
};