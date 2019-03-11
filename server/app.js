const morgan = require('morgan');
const path = require('path');
const express = require('express');
const app = express();

app.use(morgan('dev'));
app.use( express.json );
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use( (req, res) => {
    console.error(404);
})

app.use( (err, req, res, next) => {
    console.error(500);
} )

const PORT = 3000

const init = async function() {
    app.listen(PORT, function() {
        console.log(`Server is listening on port ${PORT}!`);
    });
}

init();