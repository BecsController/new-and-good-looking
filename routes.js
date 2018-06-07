let express = require('express')
let router = express.Router()
let fs = require('fs')

router.get('/', (req, res) => {
  res.render('home')
})

router.post('/', (req, res) => {

  res.redirect('/fight')
})

router.get('/fight', (req, res) => {
  res.render('fight')
})

router.post('/fight', (req, res) => {
  writeBackTOJson()
  res.redirect('/')
})

router.get('/winner', (req, res) => {
  res.render('winner')
})

function writeBackTOJson (array){
fs.writeFile('data.json', JSON.stringify(array, null, 2), 'utf8', (err) => {
    if (err) {
      console.log(err)
    } console.log("done")
 })
}

module.exports = router
