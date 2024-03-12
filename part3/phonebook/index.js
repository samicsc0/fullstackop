const express = require("express");
const cors = require('cors')
const app = express();
app.use(cors({
  origin:['http://localhost:5173'],
  methods:['GET','PUT','POST','DELETE','OPTIONS']
}))
const morgan = require('morgan')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.json())
morgan.token('body',req=>{
  return JSON.stringify(req.body)
})
app.use(morgan(':body'))
app.use(express.static('dist'))


const data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const checkName = (name) => {
  return data.some(element => JSON.stringify(element.name) === JSON.stringify(name));
}


// responds every resource
app.get("/api/persons", (request, response) => {
  response.status(200).json(data);
});
app.get("/info", (request, response) => {
  response
    .status(200)
    .send(
      `<p>Phone book has info for ${
        data.length
      } people</p> <br /> <p>${new Date()}</p>`
    );
});

// responds a specific data
app.get("/api/persons/:id", (request, response) => {
  const { id } = request.params;
  if (isNaN(Number(id))) {
    response.status(404).send("<p>Contact Not Found</p>")
  } else {
    const responseData = data.filter(element => Number(element.id) === Number(id))
    if(responseData.length === 0){
      response.status(404).send('<p>Contact not found</p>')
    }else{
      response.status(200).json(responseData[0])
    }
  } 
});

// delete a contact
app.delete("/api/persons/:id", (request, response)=>{
  const {id} = request.params
  const dataToRemove = data.filter(element => Number(element.id) === Number(id))
  if(dataToRemove.length !== 0){
    data.splice(data.indexOf(dataToRemove[0]),1)
    response.status(200).send('<p>Data removed successfully</p>')
  }else{
    response.status(404).send('<p>Data not found</p>')
  }
})


// add a number
app.post("/api/persons/addperson",(request, response)=>{
  const {name, number} = request.body
  if(name.length === 0 || number.length === 0){
    response.status(500).json({'error': 'one data field is empty'})
  }else if(checkName(name)){
    response.status(500).json({'error': 'name must be unique'})
  }else{
    data.push({"id":data.length+1, "name": name, "number":number})
    response.status(201).json({'success': 'contact added successfully'})
  }
})

app.listen(3000, () => {
  console.log("App is listenting on port 3000");
});