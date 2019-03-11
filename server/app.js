const morgan = require('morgan');
const path = require('path');
const express = require('express');
const app = express();
const routes = require('./routes')

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/api', routes)


app.use((req, res, next) => {
    res.status(404).send('NOT FOUND')
})
app.use((err, req, res, next) => {
    next(err)
})


const PORT = 3000

const init = async function () {
    app.listen(PORT, function () {
        console.log(`Server is listening on port ${PORT}!`);
    });
}

init()
module.exports = { app, init }