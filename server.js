const express = require('express')

const { resolve } = require('path')

const app = express()

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(resolve(__dirname, './build')))

    // Express serve up index.html file if it doesn't recognize route
    app.get('*', (req, res) => {
        res.sendFile(resolve(__dirname, 'build', 'index.html'));
    });
}

app.listen(process.env.PORT || 3000, (err) => {
    if (err) { return console.log(err) }
    console.log('ProducerPoint Started...')
})