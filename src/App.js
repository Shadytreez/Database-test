import './App.css';
import React from 'react';
class App extends React.Component{


  state ={
      firstname: "truman",
      lastname: "ngeuyn",
      email: "yahoo1",
      gpa: 2,
      studentCollege: "lehman",
      imageUrl: "url",
      file: [],
      idStuff: [],
  }
  
  onSubmitForm = async e =>  {
    e.preventDefault();
    const url = "http://localhost:3001/formSubmit"
    const myData = {
      firstName: "truman",
    lastName: "ngeuyn",
    email: "yahoo1",
    gpa: 2,
    studentCollege: "lehman",
    imageUrl: "url"
    }
  
    try {
      const response = await fetch(url, {
        method: "POST",
        mode: 'no-cors',
        body: myData,
        headers: { 'Content-Type': 'application/json'}
      });
      console.log(response);
    } catch (err) {
      console.error(err.message);
    } 
  }; 

getAll = async e =>  {
  e.preventDefault();
   const url = "http://localhost:3001/getAll";
  try {
    const response = await fetch(url, {
      method: "GET",
      mode: 'no-cors',
     
    }).
    then(response => response.json())
    .then(responseJson => {
      console.log("line 52", responseJson);
      console.log(responseJson.data);
      this.setState({file: responseJson.data});
      console.log(this.state.file);
    });
  } catch (err) {
    console.error(err.message);
  } 
};

////this works 
deleteID = async e =>  {
  e.preventDefault();
   const url = "http://localhost:3001/delete/3";
  try {
    const response = await fetch(url, {
      method: "GET",
      mode: 'no-cors',
     
    })
  } catch (err) {
    console.error(err.message);
  } 
};

getID = async e =>  {
  e.preventDefault();
   const url = "http://localhost:3001/getid/4";
  try {
    const response = await fetch(url, {
      method: "GET",
      mode: 'no-cors',
     
    }).then(response => response.json())
    .then(responseJson => {
      console.log("ID WAS SUCCESFUL");
      console.log("line 52", responseJson);
      console.log(responseJson.data);
      this.setState({idStuff: responseJson.data});
      console.log(this.state.idStuff);
    });
  } catch (err) {
    console.error(err.message);
  } 
};


patchID = async e =>  {
  e.preventDefault();
   const url = "http://localhost:3001/patch/6";
   const myData = {
    firstName: "truman",
    lastName: "ngeuyn",
    email: "yahoo1",
    gpa: 2,
    studentCollege: "lehman",
    imageUrl: "url"
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      mode: 'no-cors',
      body: myData,
      headers: { 'Content-Type': 'application/json'}
    });
    console.log(response);
  } catch (err) {
    console.error(err.message);
  } 
};



  render(){
      return(
          <div>
              <div class="center">
                      
                      <button type="submit" onClick={this.onSubmitForm} className="studentsubmit" >Sent data</button>
                      <button type="submit" onClick={this.getAll} className="studentsubmit" >Get Data</button>
                      <button type="submit" onClick={this.deleteID} className="studentsubmit" >Delete</button>
                      <button type="submit" onClick={this.getID} className="studentsubmit" >Get ID</button>
                      <button type="submit" onClick={this.patchID} className="studentsubmit" >Patch ID</button>
                
              </div>
          </div>
      )
  }
}


export default App;
