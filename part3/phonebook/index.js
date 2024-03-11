// const http = require("http");
const express = require("express");
const app = express();
const morgan = require('morgan')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.json())
morgan.token('body',req=>{
  return JSON.stringify(req.body)
})
app.use(morgan(':body'))


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

app.listen(3000, () => {
  console.log("App is listenting on port 3000");
});

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
app.get("/api/persons/:id", (request, response) => {
  const { id } = request.params;
  if (id <= 0 || data.length < id || isNaN(Number(id))) {
    response.status(404).send("<p>Not Found</p>")
  } else {
    data.forEach(element => {
      if(Number(id) === Number(element.id)){
        response.status(200).json(element)
      }
    });
  } 
});
app.delete("/api/persons/:id", (request, response)=>{
  const {id} = request.params
  if(!isNaN(Number(id))){
    data.forEach((element, index) => {
      data.splice(index,1)
    });
    response.status(410).send('<p>Content removed</p>')
  }
})

app.post("/addperson",(request, response)=>{
  const {name, number} = request.body
  if(name.length === 0 || number.length === 0){
    response.status(500).json({'error': 'one data field is empty'})
  }else if(checkName(name)){
    response.status(500).json({'error': 'name must be unique'})
  }else{
    data.push({"id":data.length, "name": name, "number":number})
    response.status(201).json({'success': 'contact added successfully'})
  }
})
