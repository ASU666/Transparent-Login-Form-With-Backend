const express = require('express');
const app = express();
const path = require('path');

const mongoose = require('mongoose');
const { double } = require('webidl-conversions')
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/LoginInfo');
    console.log("");
}
app.use('/public', express.static('public'))
app.use(express.urlencoded())
const port= 500;

const LogSchema = new mongoose.Schema({
    MyName: String,
    MyEmail: String,
    MyPass: String
});

var Login = mongoose.model('data', LogSchema);

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('home.pug')
})


app.post('/', (req, res) => {
    let Mydata = new Login(req.body)
    Mydata.save().then((msg) => {
         res.send("Your Data Has Been Saved In The DataBase"),
            (msg) => {
                res.send("Opps There Is Some Error!");
            }
    })

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}) 