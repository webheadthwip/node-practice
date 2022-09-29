/* eslint-disable no-undef */
const express = require('express')
const expressHandlebars = require('express-handlebars')
// const fortune = require('./lib/fortune')
const handlers = require('./lib/handlers')
const bodyParser =  require('body-parser')
const { credentials } = require('./config')

app.use(bodyParser.urlencoded({extended: true}))

const app = express()
const port = process.env.PORT || 3000

// configure Handlebars view engine
const hbs = expressHandlebars.create({ defaultLayout: 'main', })


app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

// WITHOUT USING lib/handlers.js
// app.get('/', (req, res) => {
//     res.render('home')
// })

// app.get('/about', (req, res) => {
//     res.render('about', { fortune: fortune.getFortune() } )
// })

// // custom 404 page
// app.use((req, res) => {
//     res.status(404)
//     res.render('404')
// })

// // custom 500 page
// app.use((err, req, res, next) => {
//     console.error(err.message)
//     res.status(500)
//     res.render('500')
// })

app.get('/', handlers.home)
app.get('/about', handlers.about)

app.get('/headers', (req, res) => {
    res.type('text/plain')
    const headers = Object.entries(req.headers)
        .map(([key, value]) => `${key}: ${value}`)
    res.send(headers.join('\n'))
})

// custom 404 page
app.use(handlers.notFound)

// custom 500 page
app.use(handlers.serverError)

if(require.main === module) {
    app.listen(port, () => {
        console.log( `Express started on http://localhost:${port}` +
            '; press Ctrl-C to terminate.' )
    })
} else {
    module.exports = app
}