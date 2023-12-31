//REST API demo in Node.js
var express = require('express'); // requre the express framework
var app = express();
var fs = require('fs'); //require file system object

// Endpoint to Get a list of users
app.get('/getCompany', function(req, res){
    fs.readFile(__dirname + "/" + "server.json", 'utf8', function(err, data){
        console.log(data);
        res.end(data); // you can also use res.send()
    });
})

// Create a server to listen at port 8080
var server = app.listen(8080, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})



//Step 1: Create a new user variable
var user = {
    "company3": {
        "id": 3,
        "companyName": "Philippine National Bank",
        "employee": {
            "employee1": {
            "name": "Madison Lim",
            "position": "Bank Teller"
            },
            "employee2": {
            "name": "Lucy Cruz",
            "position": "Relationship Officer"
            },
            "employee3": {
            "name": "Loretta Smith",
            "position": "Sales and Service Head"
            },
            "employee4": {
            "name": "David Kenny",
            "position": "Branch Head"
            },
            "employee5": {
            "name": "John Paul Legazpi",
            "position": "Project Management Staff"
            }
        },
      "location": "Dumaguete City"
      }
} 
app.put('/updateCompany', function (req, res) {
    fs.readFile( __dirname + "/" + "server.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["company1"] = user["company1"];
       console.log( data );
       res.end( JSON.stringify(data));
    });
})

//The addUser endpoint
app.post('/addCompany', function(req, res){
    //Step 2: read existing users
    fs.readFile(__dirname + "/" + "server.json", 'utf8', function(err, data){
        data = JSON.parse(data);
        //Step 3: append user variable to list
        data["company3"] = user["company3"];
        console.log(data);
        res.end(JSON.stringify(data));
    });
    
})

//Code to delete a user by id
var id = 2;
app.delete('/deleteCompany', function (req, res) {
   // First retrieve existing users
   fs.readFile( __dirname + "/" + "server.json", 'utf8', function (err, data) {
    var jsonData = JSON.parse(data);
    var companyIdToDelete = id;
       
    for (var companyName in jsonData) {
        if (jsonData[companyName].id == companyIdToDelete) {
            delete jsonData[companyName];
            res.end(JSON.stringify(jsonData));
            return; 
        }
    }
   });
})

app.get('/:id', function (req, res) {
    // First retrieve existing user list
    fs.readFile( __dirname + "/" + "server.json", 'utf8', function (err, data) {
       var users = JSON.parse( data );
       var user = users["company" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
    });
 })


 app.get('/company/:companyName', function (req, res) {
    // First retrieve existing user list
    fs.readFile( __dirname + "/" + "server.json", 'utf8', function (err, data) {
        var users = JSON.parse( data );
        for (var company in users) {
            if (users[company].companyName == req.params.companyName) {
                var companyData = {
                    companyName: users[company].companyName,
                    employee: users[company].employee
                }
                res.end(JSON.stringify(companyData));
                return; 
            }
        }
     });
});