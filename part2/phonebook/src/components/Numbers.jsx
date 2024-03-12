const Numbers = ({ persons, search, deleteContactHandler }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons.map((person, index) => {
        if (person.name.toLowerCase().includes(search)) {
          return (
            <div key={person.id}>
              <li>
                {person.name} {person.number}
                <button onClick={() => deleteContactHandler(person.id)}>
                  delete
                </button>
              </li>
            </div>
          );
        } else {
          return null;
        }
      })}
    </>
  );
};

export default Numbers;
