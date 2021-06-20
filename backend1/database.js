let express = require('express');
let bodyParser = require('body-parser');
let {Sequelize} = require('sequelize');
let app = express();
var sequelize = new Sequelize('postgres://postgres:qwe329@localhost/postgres');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const Student = sequelize.define('student',{
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    email: Sequelize.STRING,
    gpa: Sequelize.INTEGER,
    studentCollege: Sequelize.STRING,
    imageURL: Sequelize.STRING

});

//kinda works
//insert a table but all the value are null
app.post('/formSubmit',function(request, response){
     console.log(request.body);
 
//    /*
//    Now let us define a model
//    */
//    //make sure the table exists
   Student.sync().then(function(){
       console.log("Student is ready to be use");
   });


    Student.create({
        firstname: request.body.firstName,
        lastname: request.body.lastName,
        email: request.body.email,
        gpa: request.body.gpa,
        studentCollege: request.body.studentCollege,
        imageURL: request.body.imageUrl
    }).then(data => res.send(data));
;

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

    Student.update(request.body, {
        where: { id: id }
      }).then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
 });

 console.log("Test");
app.listen(3001);