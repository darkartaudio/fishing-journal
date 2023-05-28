require('dotenv').config();
const express = require('express');
const axios = require('axios');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');

const SECRET_SESSION = process.env.SECRET_SESSION;

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

app.use(flash());            // flash middleware

app.use(session({
  secret: SECRET_SESSION,    // What we actually will be giving the user on our site as a session cookie
  resave: false,             // Save the session even if it's modified, make this false
  saveUninitialized: true    // If we have a new session, we save it, therefore making that true
}));

// add passport

app.use(passport.initialize());      // Initialize passport
app.use(passport.session());         // Add a session

app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});


app.get('/', (req, res) => {
  res.render('index');
});

app.use('/auth', require('./controllers/auth'));

app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get(); 
  res.render('profile', { id, name, email });
});

// axios.get('https://archive-api.open-meteo.com/v1/archive?latitude=36.16&longitude=-85.50&start_date=2023-05-06&end_date=2023-05-06&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant&timezone=America%2FChicago&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch')
// .then(response => {
//     console.log(response.data);
//     // response.data.features.forEach(station => {
//     //     console.log(`${station.properties.stationIdentifier} => ${station.properties.name}, ${station.properties.timeZone}`);
//     // });
//     // return res.json({ data: response.data });
// })
// .catch(err => console.log(err));

axios.get('https://waterservices.usgs.gov/nwis/iv/?format=json,1.1&site=03421000&parameterCd=00060') // flow at Collins River
.then(function (response) {
    // handle success
    // console.log(response.data.value.timeSeries[0].values[0].value[0].dateTime); // .value <- is flow in CFS --- .dateTime is timerange -05:00 at end is offest from UTC
    console.log(response.data.value.timeSeries[0].sourceInfo.geoLocation.geogLocation.latitude.toFixed(2)); // <- GPS coordinates for poling station
    // return res.json({ data: response.data });
})
.catch(err => console.log(err));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
