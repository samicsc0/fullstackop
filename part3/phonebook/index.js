const http = require('http')
const data = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
http.createServer((request,response)=>{
    if(request.url === '/api/persons'){
        response.writeHead(200,{'Content-Type':'application/json'})
        response.end(JSON.stringify(data))
    }else if(request.url === '/info'){
        response.writeHead(200, {'Content-Type':'text/HTML'})
        response.end(`<p>Phone book has info for ${data.length} people</p> <br /> <p>${new Date()}</p>`)
    }else if(request.url === '/api/person/:id'){
        const id = request.url
        response.writeHead(200,{'Content-Type':'application/JSON'})
        response.end(JSON.stringify())
    }
}).listen(3000)