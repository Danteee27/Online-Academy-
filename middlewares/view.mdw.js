import {
    engine
} from 'express-handlebars';
import hbs_sections from 'express-handlebars-sections';
import numeral from 'numeral';

export default function (app) {


    app.engine('hbs', engine({
        defaultLayout: 'main1.hbs',
        extname: 'hbs',
        //defaultLayout: 'main.hbs',
        helpers: {
            section: hbs_sections(),
            'ifCond' : function(v1, operator, v2, options){
                switch (operator) {
                    case '==':
                        return (v1 == v2) ? options.fn(this) : options.inverse(this);
                    case '===':
                        return (v1 === v2) ? options.fn(this) : options.inverse(this);
                    case '<':
                        return (v1 < v2) ? options.fn(this) : options.inverse(this);
                    case '<=':
                        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                    case '>':
                        return (v1 > v2) ? options.fn(this) : options.inverse(this);
                    case '>=':
                        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                    case '&&':
                        return (v1 && v2) ? options.fn(this) : options.inverse(this);
                    case '||':
                        return (v1 || v2) ? options.fn(this) : options.inverse(this);
                    default:
                        return options.inverse(this);
                }
            }

            ,
            isAdmin(authUser)
            {
                if(authUser !== null) {
                    return authUser.role === 'ROLE.ADMIN' || 0;
                }
                else
                {
                    return false;
                }
            }
            ,
            format_number(val) {
                return numeral(val).format('0,0');
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
            printStar(n, isIndexFromZero) {
                if (n < 0) {
                    n = 0;
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
                    star.repeat(2) + starEmpty.repeat(3),
                    star.repeat(3) + starEmpty.repeat(2),
                    star.repeat(4) + starEmpty,
                    star.repeat(5)
                ];
                if (isIndexFromZero)
                    return n <= 5 ? listStar[n + 1] : listStar[0];
                return n <= 5 ? listStar[n] : listStar[0]
            }
        }
    }));
    app.set('view engine', 'hbs');
    app.set('views', './views');


}