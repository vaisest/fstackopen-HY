import { useState, useEffect } from "react";
import personService from "./services/persons";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(
    () =>
      personService.getPersons().then((resPersons) => setPersons(resPersons)),
    []
  );

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterValue, setNewFilter] = useState("");
  const [notificationMessage, setMessage] = useState("");
  const [notificationIsError, setNotificationIsError] = useState(false);

  const nameChangeHandler = (event) => setNewName(event.target.value);
  const phoneChangeHandler = (event) => setNewPhone(event.target.value);
  const filterChangeHandler = (event) => setNewFilter(event.target.value);

  const removePersonHandler = (id, name) => {
    return () => {
      if (window.confirm(`Delete ${name}?`)) {
        personService.deletePersonById(id).then(() => {
          const newPersons = persons.filter((person) => person.id !== id);
          setPersons(newPersons);

          setMessage(`Deleted ${name}`);
          setNotificationIsError(false);
        });
      }
    };
  };

  const inputSubmitHandler = (event) => {
    event.preventDefault();

    if (newName === "" || newPhone === "") {
      setMessage(`Some input fields are still empty`);
      setNotificationIsError(true);
      return;
    }

    const match = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (match) {
      if (
        !window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        return;
      }

      const personsWithoutOriginal = persons.filter(
        (person) => person.name !== match.name
      );

      personService
        .putPerson({ ...match, number: newPhone })
        .then((savedPerson) => {
          setPersons([...personsWithoutOriginal, savedPerson]);
          setMessage(`Updated number for ${savedPerson.name}`);
          setNotificationIsError(false);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setPersons(personsWithoutOriginal);
            setMessage("Person has already been deleted from the server.");
            setNotificationIsError(true);
          } else {
            setMessage(error.response.data.error);
            setNotificationIsError(true);
          }
        });
    } else {
      const newPerson = {
        name: newName,
        number: newPhone,
      };

      personService
        .addPerson(newPerson)
        .then((savedPerson) => {
          setPersons([...persons, savedPerson]);
          setMessage(`Added ${newPerson.name}`);
          setNotificationIsError(false);
        })
        .catch((error) => {
          setMessage(error.response.data.error);
          setNotificationIsError(true);
        });
    }
    setNewName("");
    setNewPhone("");
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification
        message={notificationMessage}
        notificationIsError={notificationIsError}
      />

      <Filter
        filterValue={filterValue}
        filterChangeHandler={filterChangeHandler}
      />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newPhone={newPhone}
        persons={persons}
        setPersons={setPersons}
        nameChangeHandler={nameChangeHandler}
        phoneChangeHandler={phoneChangeHandler}
        inputSubmitHandler={inputSubmitHandler}
      />

      <h3>Numbers</h3>

      <Persons
        persons={persons}
        filterValue={filterValue}
        removePersonHandler={removePersonHandler}
      />
    </div>
  );
};

const Notification = ({ message, notificationIsError }) => {
  if (message === null || message === "") return null;
  return (
    <div className={notificationIsError ? "error" : "notification"}>
      {message}
    </div>
  );
};

const Filter = ({ filterValue, filterChangeHandler }) => {
  return (
    <div>
      <div>
        <span>filter shown with</span>
      </div>
      <input value={filterValue} onChange={filterChangeHandler} />
    </div>
  );
};

const PersonForm = ({
  inputSubmitHandler,
  newName,
  nameChangeHandler,
  newPhone,
  phoneChangeHandler,
}) => {
  return (
    <form onSubmit={inputSubmitHandler}>
      <div>
        <span>name: </span>
        <input value={newName} onChange={nameChangeHandler} />
      </div>
      <div>
        <span>number: </span>
        <input value={newPhone} onChange={phoneChangeHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, filterValue, removePersonHandler }) => {
  return (
    <div>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filterValue.toLowerCase())
        )
        .map((person) => (
          <div key={`${person.id} div`}>
            <span key={`${person.id} span`}>
              {person.name} {person.number}{" "}
            </span>
            <button
              key={`${person.id} deleteButton`}
              onClick={removePersonHandler(person.id, person.name)}
            >
              delete
            </button>
          </div>
        ))}
    </div>
  );
};

export default App;
