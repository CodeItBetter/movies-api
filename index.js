const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const pg1 = require('./api/CONTENTLISTINGPAGE-PAGE1.json');
const pg2 = require('./api/CONTENTLISTINGPAGE-PAGE2.json');
const pg3 = require('./api/CONTENTLISTINGPAGE-PAGE3.json');

dotenv.config();

const app = express();
app.use(cors()); 

const movieList = [pg1, pg2, pg3];

app.get('/', (req, res) => {
    res.send('hello');
});

app.get('/api/movies/:pageNum', (req, res) => {
    const result = movieList.find(item => {
        return Object.entries(item).find(([key, value]) => {
            return value['page-num-requested'] === req.params.pageNum;
        })
    })
    
    console.log(result);

    if(!result) res.status(404).send('Movie not available');
    res.send(result);
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`listening to port ${PORT}`));