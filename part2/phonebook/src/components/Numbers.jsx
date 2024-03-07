const Numbers = ({ persons, search }) => {
  return(
  <>
    <h2>Numbers</h2>
    {persons.map((person, index) => {
      if (person.name.toLowerCase().includes(search)) {
        return (
          <li key={index}>
            {person.name} {person.phoneNumber}
          </li>
        );
      }
    })}
  </>)
};

export default Numbers;
