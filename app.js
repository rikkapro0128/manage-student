require('dotenv').config()
const express = require('express');
const path = require('path');
const mongoose  = require('mongoose');
const handlebars = require('express-handlebars');
const bodyPaser = require('body-parser');
const morgan = require('morgan');
const app = express();
const routerController = require('./Router/routerContoller');
const connectDb = require('./Database/connectDb');
const handleError = require('./middleware/handleEnrror');
const cookieParser = require('cookie-parser');
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(bodyPaser.json());
app.use(cookieParser());

// setup template engine
app.set('views', path.join(__dirname, 'public/views/isRenders'));
app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'public/views/layouts'),
    partialsDir: path.join(__dirname, 'public/views/partials'),
}));
app.set('view engine', 'hbs');
// options router request
routerController(app);

// conect to database
connectDb(mongoose);

// show status request
app.use(morgan('combined'));

// setup handle enrror
app.use(handleError.requestAll);

app.listen(port, () => {
    console.log(`Website is runing on localhost with port ${port}`);
});