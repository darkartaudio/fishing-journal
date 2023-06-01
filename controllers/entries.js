const moment = require('moment');
const axios = require('axios');
const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const { entrie, lure, specie, technique, user, watershed } = require('../models');

// given compass degrees, returns the direction in words
function degreesToDirection(degrees) {
    const directionArray = [
        'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
    ];

    let index = Math.floor((degrees / 22.5) + 0.5) % 16;

    return directionArray[index];
}

router.get('/', isLoggedIn, (req, res) => {
    entrie.findAll({
        where: { id: req.user.get().id }
    }
    ).then(entries => {
        let resultArray = [];
        entries.forEach(e => {
            let watershedName = watershed.findOne({
                where: {
                    id: e.watershedId
                }
            })
            .then(w => {
                return  w.siteName;
            })
            .catch(err => {console.log(err)});

            let specieInfo = specie.findOne({
                where: {
                    id: e.specieId
                }
            })
            .then(s => {
                return { name: s.name, img: s.img };
            })
            .catch(err => {console.log(err)});

            let techniqueName = technique.findOne({
                where: {
                    id: e.techniqueId
                }
            })
            .then(t => {
                return t.name;
            })
            .catch(err => {console.log(err)});

            let lureName = lure.findOne({
                where: {
                    id: e.lureId
                }
            })
            .then(l => {
                return l.name;
            })
            .catch(err => {console.log(err)});
            
            Promise.all([watershedName, specieInfo, techniqueName, lureName])
            .then(result => {
                resultArray.push({
                    ...e.toJSON(),
                    watershedName: result[0],
                    specieName: result[1].name,
                    specieImg: result[1].img,
                    techniqueName: result[2],
                    lureName: result[3]
                });
            })
            .catch(err => console.log(err));
        });

        // pick up here - need to somehow resolve Promise before res.render

        return res.render('entries/index', {
            entries: resultArray
        });
    })
    .catch(err => console.log(err));
});

router.get('/new', isLoggedIn, (req, res) => {
    watershed.findAll().then(watersheds => {
        specie.findAll().then(species => {
            technique.findAll().then(techniques => {
                lure.findAll().then(lures => {
                    return res.render('entries/new', {
                        watersheds: watersheds.map(w => w.toJSON()),
                        species: species.map(s => s.toJSON()),
                        techniques: techniques.map(t => t.toJSON()),
                        lures: lures.map(l => l.toJSON()),
                        moment: moment
                    });
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.post('/new', isLoggedIn, (req, res) => {
    watershed.findOne({
        where: {
            id: req.body.watershedId
        }
    })
    .then(ws => {
        
        axios.get(`https://waterservices.usgs.gov/nwis/iv/?format=json,1.1&site=${ws.siteCode}&parameterCd=00060`)
        .then(flowRes => {
            let weatherQueryString;

            let weatherDate = moment(req.body.timestamp).format('YYYY-MM-DD');
    
            const recentQueryHead = `https://`;
            const historicalQueryHead = `https://archive-`

            const queryTail = `api.open-meteo.com/v1/forecast?latitude=${ws.latitude}&longitude=${ws.longitude}&start_date=${weatherDate}&end_date=${weatherDate}&hourly=temperature_2m,precipitation,pressure_msl,cloudcover,windspeed_10m,winddirection_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch`;
            
            let daysInPast = moment().diff(moment(req.body.timestamp)) / 86400000;

            if (daysInPast < 0) { // ie in the future
                req.flash('error', 'Date must be in the past');
                return res.redirect('/entries/new'); // redirect the user back to new entry page
            } else if (daysInPast > 30) { // if date is 30 or more days in past, use historical
                weatherQueryString = historicalQueryHead + queryTail;
            } else { // otherwise, use current api
                weatherQueryString = recentQueryHead + queryTail;
            }

            axios.get(weatherQueryString)
            .then(weatherRes => {
                const insertEntrie = {...req.body};
                insertEntrie.watershedId = parseInt(insertEntrie.watershedId);
                insertEntrie.specieId = parseInt(insertEntrie.speciesId);
                insertEntrie.length = parseFloat(insertEntrie.length);
                insertEntrie.weight= parseFloat(insertEntrie.weight);
                insertEntrie.techniqueId = parseInt(insertEntrie.techniqueId);
                insertEntrie.lureId = parseInt(insertEntrie.lureId);
                insertEntrie.waterTemp = parseFloat(insertEntrie.waterTemp);
                insertEntrie.timestamp = moment(req.body.timestamp).utc().toISOString();
                insertEntrie.userId = req.user.get().id;
                insertEntrie.waterFlow = parseFloat(flowRes.data.value.timeSeries[0].values[0].value[0].value);
                
                let hr = moment(req.body.timestamp).hours();
                insertEntrie.airTemp = weatherRes.data.hourly.temperature_2m[hr];
                insertEntrie.windSpeed = weatherRes.data.hourly.windspeed_10m[hr];
                insertEntrie.windDirection = degreesToDirection(weatherRes.data.hourly.winddirection_10m[hr]);
                insertEntrie.barometer = parseFloat((weatherRes.data.hourly.pressure_msl[hr] * 0.02953).toFixed(2));
                insertEntrie.cloudCover = weatherRes.data.hourly.cloudcover[hr];
                
                insertEntrie.dailyHigh = weatherRes.data.daily.temperature_2m_max[0];
                insertEntrie.dailyLow = weatherRes.data.daily.temperature_2m_min[0];
                insertEntrie.dailyPrecip = weatherRes.data.daily.precipitation_sum[0];

                // console.log(insertEntrie);
                // console.log(weatherRes.data);

                entrie.create(insertEntrie)
                .then(createdEntrie => {
                    console.log(createdEntrie.toJSON());
                    return res.redirect('/entries');
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;