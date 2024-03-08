import { useState } from "react";
import Numbers from "./components/Numbers";
import { useEffect } from "react";
import axios from "axios";
import notes from "./services/notesServices";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [successVisibility, setSuccessVisibility] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  useEffect(() => {
    notes.getAll().then((result) => {
      setPersons(result.data);
    });
  }, []);
  const addContanct = (event) => {
    event.preventDefault();
    const newContact = {};
    newContact.name = newName;
    newContact.number = newNumber;
    newContact.id = persons.length + 1;
    const checkIfExists = persons.filter((person) => {
      return JSON.stringify(person.name) === JSON.stringify(newName);
    });
    if (checkIfExists.length === 0) {
      notes.create(newContact).then((result) => {
        if (result.status === 201) {
          setPersons(persons.concat(newContact));
          setSuccessMessage(`Added ${newContact.name}`);
          setNewName("");
          setNewNumber("");
          setSuccessVisibility(true);
          setTimeout(() => {
            setSuccessVisibility(false);
          }, 5000);
        }
      });
    } else {
      if (
        confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        notes.update(checkIfExists[0].id, newContact);
        window.location.reload();
      }
    }
  };
  const deleteHandler = (id) => {
    notes
      .deleteContact(id)
      .then((result) => {
        if (result.status === 404) {
          setErrorMessage(
            `Information of ${newName} has already been removed from server`
          );
          setErrorVisibility(true);
          setTimeout(() => {
            setErrorVisibility(false);
          }, 5000);
        }
      })
      .catch((error) => {
        setErrorMessage(
          `Information of ${newName} has already been removed from server`
        );
        setErrorVisibility(true);
        setTimeout(() => {
          setErrorVisibility(false);
        }, 5000); 
      });
  };

  return (
    <div>
      <h1>Phone Book</h1>
      {successVisibility && (
        <h2
          style={{ border: "green solid 2px", padding: "10px", color: "green" }}
        >
          {successMessage}
        </h2>
      )}
      {errorVisibility && (
        <h2 style={{ border: "red solid 2px", padding: "10px", color: "red" }}>
          {errorMessage}
        </h2>
      )}
      filter shown with:{" "}
      <input onChange={(event) => setSearch(event.target.value)} />
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
      <Numbers
        persons={persons}
        search={search}
        deleteContactHandler={deleteHandler}
      />
    </div>
  );
};

export default App;
