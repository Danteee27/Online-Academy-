import {
    engine
} from 'express-handlebars';
import numeral from 'numeral';
import hbs_sections from 'express-handlebars-sections';
import showOrHideItem from "../public/function/showOrHide.js";
import _ from 'lodash';

export default function (app) {
    app.engine('hbs', engine({
        extname: 'hbs',
        defaultLayout: 'layout1.hbs',
        helpers: {
            format_number(val) {
                return numeral(val).format('0,0');
            },
            section: hbs_sections(),
            showOrHide(id) {
                showOrHideItem(id);
            },
            dateMonthYear(date) {
                const event = new Date(date);
                const options = {
                    month: 'numeric',
                    year: 'numeric'
                };
                return event.toLocaleDateString("en-US", options);
            },
            dateDayMonthYear(date) {
                const event = new Date(date);
                const options = {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric'
                };
                return event.toLocaleDateString("en-US", options);
            },
            kebabCase(str) {
                return _.kebabCase(str);
            },
            capitalize(str) {
                return _.capitalize(str);
            }
        }
    }));
    app.set('view engine', 'hbs');
    app.set('views', './views');
};