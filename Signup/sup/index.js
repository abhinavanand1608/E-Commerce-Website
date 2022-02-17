var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()
var cors = require('cors')
app.use(cors({origin: 'http://127.0.0.1:5502'}))

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;
    console.log(req.body)
    var data = {
        "name": name,
        "email" : email,
        "phno": phno,
        "password" : password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    // return res.redirect('signup_success.html')

})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);

//login
app.post("/login", async(req, res) =>{
    try{
        const email= req.body.email;
        const password= req.body.password; 
        const useremail= await db.collection('users').findOne({email:email});
        if(useremail.password === password){
            res.status(200).json({success: true});
        }
        else{
            res.status(401).json({success: false});
        }
    } catch(error){
        console.log(error)
        res.status(400).send("Invalid login Details")
    }
})


console.log("Listening on PORT 3000");