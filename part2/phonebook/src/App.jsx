import { useState } from "react";
import Numbers from "./components/Numbers";
import { useEffect } from "react";
import axios from "axios";
import notes from "./services/notesServices";

const App = () => {
  const baseUrl = 'http://localhost:3001/persons'
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    notes.getAll().then(result => {
      setPersons(result.data)
    })
  }, [])
  const addContanct = (event) => {
    event.preventDefault();
    const newContact = {};
    newContact.name = newName;
    newContact.number = newNumber;
    newContact.id = persons.length + 1
    const checkIfExists = persons.filter(
      (person) => JSON.stringify(person.name) === JSON.stringify(newName)
    );
    if (checkIfExists.length === 0) {
      notes.create(newContact).then(result => {
        if (result.status === 201) {
          setPersons(persons.concat(newContact));
          setNewName("");
          setNewNumber("");
        }
      })

    } else {
      alert(`${newName} is already added to phonebook.`);
    }
  };
  const deleteHandler = (id)=>{
    notes.deleteContact(id)
  }

  return (
    <div>
      <h1>Phone Book</h1>
      filter shown with: <input onChange={(event) => setSearch(event.target.value)} />
      <h2>Add New</h2>
      <form onSubmit={addContanct}>
        <div>
          name:{" "}
          <input
            onChange={(event) => setNewName(event.target.value)}
            value={newName}
          />
          <br />
          number:{" "}
          <input
            onChange={(event) => setNewNumber(event.target.value)}
            value={newNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Numbers persons={persons} search={search} deleteContactHandler={deleteHandler}/>
    </div>
  );
};

export default App;
