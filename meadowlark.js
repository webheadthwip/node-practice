const express = require('express')
const expressHandlebars = require('express-handlebars')
const fortune = require('./lib/fortune')
const handlers = require('./lib/handlers')

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

// custom 404 page
app.use(handlers.notFound)

// custom 500 page
app.use(handlers.serverError)

app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` +
    `press Crtl-C to terminate.`
))