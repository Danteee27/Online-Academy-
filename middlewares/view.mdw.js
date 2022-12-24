import {
    engine
} from 'express-handlebars';
import hbs_sections from 'express-handlebars-sections';
import numeral from 'numeral';

export default function (app) {


    app.engine('hbs', engine({
        //defaultLayout: 'main1.hbs',
        extname: 'hbs',
        defaultLayout: 'main1.hbs',
        helpers: {
            section: hbs_sections(),
            'ifCond': function (v1, operator, v2, options) {
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
            isAdmin(authUser) {
                if (authUser !== null) {
                    return authUser.role === 'ROLE.ADMIN' || 0;
                } else {
                    return false;
                }
            },
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
            },
            printStarByDouble(n) {
                if (n < 0) {
                    n = 0;
                }
                const star = '<span class="fa fa-star checked">' + '</span>';
                const starHalf = '<span class="fa fa-star-half-full checked">' + '</span>';
                const starEmpty = '<span class="fa fa-star-o checked">'+ '</span>';
                // const listStar = {
                //     "s0":starEmpty.repeat(5),
                //     "s1":star + starEmpty.repeat(4),
                //     "s2":star.repeat(2)+starEmpty.repeat(3),
                //     "s3":star.repeat(3)+starEmpty.repeat(2),
                //     "s4":star.repeat(4)+starEmpty,
                //     "s5":star.repeat(5)};
                const listStar = [
                    starEmpty.repeat(5),
                    starHalf + starEmpty.repeat(4),
                    star + starEmpty.repeat(4),
                    star + starHalf + starEmpty.repeat(3),
                    star.repeat(2) + starEmpty.repeat(3),
                    star.repeat(2) + starHalf + starEmpty.repeat(2),
                    star.repeat(3) + starEmpty.repeat(2),
                    star.repeat(3) + starHalf + starEmpty.repeat(1),
                    star.repeat(4) + starEmpty,
                    star.repeat(4) + starHalf ,
                    star.repeat(5)
                ];
                n = n - n%0.5;
                if(n >= 0 && n%0.5 === 0 && n<=5 )
                {
                    return listStar[n*2];
                }
                return listStar[10];

            },
            /**
             * @param array
             * @param n
             * @return a list sub array with size = n
             */
            splitArrayToListSubArray(array,n)
            {
                const chunkSize = n;
                let list = [];
                for (let i = 0; i < array.length; i += chunkSize) {
                    list.push( array.slice(i, i + chunkSize));
                    // do whatever
                }
            }
        }
    }));
    app.set('view engine', 'hbs');
    app.set('views', './views');


}