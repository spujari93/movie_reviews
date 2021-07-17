const express = require ("express");
const bodyParser = require ('body-parser')
const app = express();
const mysql = require('mysql2');
const cors = require('cors');


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Amicable71=910',
    database: 'cruddb',
})

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
// app.get("/", (req,res)=>{
//     const sqlInsert = "INSERT INTO `movie_reviews` (`movieName`, `movieReview`) VALUES ('inception', 'good movie');"  
//     db.query(sqlInsert, (err, result)=>{
//         res.send("HELLO WORLD");
//    })
    
//  });

//get from frontend
app.post('/api/insert',(req,res)=>{
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
    db.query(sqlInsert, [movieName, movieReview], (err,result)=>{
      console.log(result);
    });
});

//send to the frontend a json which contains all moviereviews in our database
app.get("/api/get", (req,res)=>{
    const sqlSELECT = "SELECT * FROM movie_reviews";  
    db.query(sqlSELECT, (err, result)=>{
        res.send(result);
   })
    
 });

 app.delete("/api/delete:movieName",(req,res)=>{
     const name = req.params.movieName;
     const sqlDelete = "DELETE FROM movie_reviews WHERE movieName=?";
     db.query(sqlDelete, name, (err,result)=>{
         if (err) console.log(err);
     })
 })

 app.put("/api/update",(req,res)=>{
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUPDATE = "UPDATE movie_reviews SET  movieReview = ? WHERE movieName = ?";
    db.query(sqlUPDATE,[review,name] , (err,result)=>{
        if (err) console.log(err);
    })
})


app.listen(3001, ()=>{
    console.log("running on port 3001");
})