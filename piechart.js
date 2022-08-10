
var express = require('express');

var mysql = require ('mysql');

var app = express();

app.use(express.json());
app.use(express.urlencoded());

var connect = mysql.createConnection({

    //properties...

    host:'localhost',

    user:'root',

    password:'root',

    database:'dashboard'

});



connect.connect(function(error){

    if(!!error){

        console.log('Error');

    } else{

        console.log('Connected');

    }

});


//get
app.get('/user/:id', function(req,resp){

    const id = req.params.id;

    connect.query("SELECT * FROM piechart WHERE USER=" +id, function(errors, rows, fields){


            //call back function

         if(!!errors){

            console.log('Error in the query');

         } else{

            console.log('Rows',rows);
            resp.send(rows)

         }  
});
});

//post
app.post('/postuser', function(req, res, next) {
    // var id = req.body.id;
    var user = req.body.user;
    var schemes = req.body.schemes;
    var hoursperday = req.body.hoursperday;

    console.log(user, schemes, hoursperday);
       
    var sql = `INSERT INTO piechart (USER, schemes, hoursperday, createdate, updatedate ) VALUES ("${user}", "${schemes}", "${hoursperday}", NOW(), NOW())`;
    connect.query(sql, function(err, result) {
          if (err) throw err;
          console.log('record inserted');
        //   req.flash('success', 'Data added successfully!');
          res.send("Inserted")
        });
      });   


//put
app.put('/putuser/:userid', function(req,res,next)
{
    var schemes = req.body.schemes;
    var ID = req.body.Id;
    var USER = req.params.userid
    console.log (schemes);

    //connect.connect(function(err) {
    //if (err) throw err;
    var sql = `UPDATE piechart SET schemes = "${schemes}" WHERE ID = "${ID}" AND USER ="${USER}"`;
    console.log(sql);
    connect.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
      res.send("Updated")
    });
});


app.listen(9000);

