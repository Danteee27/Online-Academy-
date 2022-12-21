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
            printStar(n,isIndexFromZero)
            {
                if(n<0)
                {
                    n=0;
                }
                const star = '<span class="fa fa-star checked">' + '</span>';
                const starEmpty = '<span class="fa fa-star-o checked"> </span>';
                // const listStar = {
                //     "s0":starEmpty.repeat(5),
                //     "s1":star + starEmpty.repeat(4),
                //     "s2":star.repeat(2)+starEmpty.repeat(3),
                //     "s3":star.repeat(3)+starEmpty.repeat(2),
                //     "s4":star.repeat(4)+starEmpty,
                //     "s5":star.repeat(5)};
                const listStar = [
                    starEmpty.repeat(5),
                    star + starEmpty.repeat(4),
                    star.repeat(2)+starEmpty.repeat(3),
                    star.repeat(3)+starEmpty.repeat(2),
                    star.repeat(4)+starEmpty,
                    star.repeat(5)];
                if(isIndexFromZero)
                    return n<=5?listStar[n+1]:listStar[0];
                return n<=5 ? listStar[n]:listStar[0]
            }

        }
    }));
    app.set('view engine', 'hbs');
    app.set('views', './views');
};