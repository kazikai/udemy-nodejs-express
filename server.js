const fs = require('fs');

const express = require('express');
const hbs = require('hbs');

const app = express();

const port = 8080;

hbs.registerPartials(__dirname+ '/views/partials')

hbs.registerHelper('getCurrentYear', () => {
  return (new Date()).getFullYear()
});

hbs.registerHelper('toUpper', (value) => {
  if (!value) {
    return '';
  }
  return value.toUpperCase();
});

app.set('view engine', 'hbs');

app.use((req, res, next) => {
  const now = new Date().toString();
  const log =`${now}: ${req.method} ${req.url}`;
  console.log(now);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log(err);
    }
  });
  next();
});
/* 공사중..
app.use((req, res, next) => {
  //공사중...
  res.render('maintenance.hbs');
});
*/

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    title: 'home page',
    welcomeMessage: 'welcome!!'
  });
});

app.get('/home', (req, res) => {
  res.render('home.hbs', {
    title: 'home page',
    welcomeMessage: 'welcome!!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About page'
  });
});
app.listen(port);
console.log(`localhost:${port} port is running`);