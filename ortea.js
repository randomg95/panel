const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const { body, validationResult } = require('express-validator');
const app = express()
const PORT = 3000

//get this data and put it in /config.json

//it'll get this from the panel
let dummyData = {

}
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//now it'll distrubute it
app.get('/config.json', (req, res) => {
    res.json(dummyData)
})
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/panel/bgWText.png', function(req, res) {                                                                     res.sendFile(path.join(__dirname, './panel/bgWText.png'));                                     });  



app.post('/submit', async(req, res) => {
    dummyData = await req.body;
    console.log(req.body);
    res.sendStatus(200)
})

console.log("ss", dummyData);
app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})
