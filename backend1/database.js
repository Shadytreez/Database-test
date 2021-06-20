let express = require('express');
let bodyParser = require('body-parser');
let {Sequelize} = require('sequelize');
let app = express();
var sequelize = new Sequelize('postgres://postgres:qwe329@localhost/postgres');
const cors = require("cors");

app.use(bodyParser.json());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(cors());

//kinda works
//insert a table but all the value are null
app.post('/formSubmit',function(request, response){
  console.log("BODY REQUEST");
      console.log(request.body);
  
     const Student = sequelize.define('student',{
        firstname:{type: Sequelize.STRING} ,
        lastname: {type: Sequelize.STRING} ,
        email: {type: Sequelize.STRING} ,
        gpa: {type: Sequelize.INTEGER} ,
        studentCollege: {type: Sequelize.STRING} ,
        imageURL: {type: Sequelize.STRING} 
    
    });
//    /*
//    Now let us define a model
//    */
//    //make sure the table exists
    Student.sync().then(() => {
    Student.create(request.body).then(response => response.send(response))
  })
//    Student.sync().then(function(){
//        console.log("Student is ready to be use");
//    });


//     Student.create({
//         firstname: request.body.firstName,
//         lastname: request.body.lastName,
//         email: request.body.email,
//         gpa: request.body.gpa,
//         studentCollege: request.body.studentCollege,
//         imageURL: request.body.imageUrl
//     }).then(data => res.send(data));
    //Student.create(request.body).then(data => res.send(data));


    response.send("The form has been received");

});

app.get('/getAll', function(request, res) {
    Student.findAll().then((data) => {
        res.send(data);
    });
  });

  app.get('/getid/:id', function(request, res) {
    const id = request.params.id;
    Student.findByPk(id).then((data) => {
        res.send(data);
    });
  }); 

 //this works
 app.get('/delete/:id', function(request, res){ 
    const id = request.params.id;
    Student.destroy({
        where: { id: id }
      }).then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
 });

 app.post('/patch/:id', function(request, res){ 
    const id = request.params.id;

    Student.update({firstname: request.body.firstName,
        lastname: request.body.lastName,
        email: request.body.email,
        gpa: request.body.gpa,
        studentCollege: request.body.studentCollege,
        imageURL: request.body.imageUrl}, {
        where: { id: id }
      }).then(function(rowsUpdated) {
        res.json(rowsUpdated)
      });
     
 });

 console.log("Test");
app.listen(3001);