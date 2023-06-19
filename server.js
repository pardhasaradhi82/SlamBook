require("dotenv").config()

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

mongoose.set('strictQuery', false);

const slamSchema = mongoose.Schema({
    firstThingNoticeInMe : String,
    qualityInYourself : String,
    bestFriend : String,
    mostImportantPerson : String,
    myContactName : String,
    wordsAboutMe : String,
    worstHabit : String,
    Crush : String,
    favouriteFood : String,
    nickName : String
  });
  
  
  const Slam = mongoose.model("Slam", slamSchema);
  
  const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };

app.get('/', function(req, res){
    res.render('home');
})

app.post('/', function(req, res){

    const slamData = new Slam({
        firstThingNoticeInMe : req.body.q1,
        qualityInYourself : req.body.q2,
        bestFriend : req.body.q3,
        mostImportantPerson : req.body.q4,
        myContactName : req.body.q5,
        wordsAboutMe : req.body.q6,
        worstHabit : req.body.q7,
        Crush : req.body.q8,
        favouriteFood : req.body.q9,
        nickName : req.body.q10
    })

    slamData.save();

    res.redirect("/");

})

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("listening for requests");
  });
});