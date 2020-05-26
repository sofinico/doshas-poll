const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// setting templating engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// routes and controller imports
const inicioRoutes = require('./routes/inicio');
const testRoutes = require('./routes/test');
const secondaryController = require('./controllers/secondary');

// necessary middlewares
app.use(bodyParser.urlencoded({extended: "false"}));
app.use(express.static(path.join(__dirname, 'public')));

// primary pages
app.use(inicioRoutes);
app.use('/poll', testRoutes);

// secondary pages 
app.get('/no-poll', secondaryController.getNoPoll);
app.use(secondaryController.get404);

app.listen(3001);
