import { useState } from "react";
import Numbers from "./components/Numbers";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const addContanct = (event) => {
    event.preventDefault();
    const newContact = {};
    newContact.name = newName;
    newContact.phoneNumber = newNumber;
    const checkIfExists = persons.filter(
      (person) => JSON.stringify(person.name) === JSON.stringify(newName)
    );
    if (checkIfExists.length === 0) {
      setPersons(persons.concat(newContact));
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName} is already added to phonebook.`);
    }
  };

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
      <Numbers persons={persons} search={search}/>
    </div>
  );
};

export default App;
