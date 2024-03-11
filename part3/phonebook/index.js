// const http = require("http");
const express = require("express");
const app = express();
app.use(express.json())
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
// http
//   .createServer((request, response) => {
//     if (request.url === "/api/persons") {
//       response.writeHead(200, { "Content-Type": "application/json" });
//       response.end(JSON.stringify(data));
//     } else if (request.url === "/info") {
//       response.writeHead(200, { "Content-Type": "text/HTML" });
//       response.end(
//         `<p>Phone book has info for ${
//           data.length
//         } people</p> <br /> <p>${new Date()}</p>`
//       );
//     } else if (request.url.startsWith("/api/person")) {
//       const id = request.url.split("/");
//       const extractedId = Number(id[id.length - 1]);
//       if (extractedId <= 0 || data.length < extractedId || isNaN(extractedId)) {
//         response.writeHead(404, { "Content-Type": "text/HTML" });
//         response.end("<p>Not Found</p>");
//       } else {
//         response.writeHead(200, { "Content-Type": "application/JSON" });
//         response.end(JSON.stringify(data[extractedId - 1]));
//       }
//     }
//   })
//   .listen(3000);
