const app = require('./server')
const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
===================================================
Cat Stack Adventures Await at http://localhost:${PORT}
===================================================
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
`))
