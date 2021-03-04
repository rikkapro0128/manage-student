require('dotenv').config()
const express = require('express');
const path = require('path');
const mongoose  = require('mongoose');
const handlebars = require('express-handlebars');
const hbsHelper = require('handlebars');
const bodyPaser = require('body-parser');
const morgan = require('morgan');
const app = express();
const routerController = require('./Router/routerController');
const connectDb = require('./Database/connectDb');
const handleError = require('./middleware/handleEnrror');
const cookieParser = require('cookie-parser');
const registerHelper = require('./middleware/registerHelper')(hbsHelper);
var methodOverride = require('method-override');
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(process.env.UPLOADS));
app.use(express.urlencoded({extended: true}));
app.use(bodyPaser.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

// setup template engine
app.set('views', path.join(__dirname, 'public/views/isRenders'));
app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'public/views/layouts'),
    partialsDir: path.join(__dirname, 'public/views/partials'),
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
        
}));
app.set('view engine', 'hbs');
// options router request
routerController(app);

// conect to database
connectDb(mongoose);

// show status request
app.use(morgan('combined'));

// setup handle enrror
// app.use(handleError.requestAll);

app.listen(port, () => {
    console.log(`Website is runing at http://localhost:${port}`);
});
