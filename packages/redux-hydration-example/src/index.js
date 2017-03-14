import express from 'express'
import { ManualComponent, HelperComponent, HelperApp } from './routes'

const app = express()
const PORT = 3000

app.use('/build', express.static('build'))
app.get('/manual', ManualComponent)
app.get('/helper', HelperComponent)
app.get('*', HelperApp)

app.listen(PORT, (err) => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Server running at http://localhost:${PORT}`)
  }
})
