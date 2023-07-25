import "./App.css";
import contactsJSON from './contacts.json'
import { useState } from "react";

function App() {
  const [contacts, setContacts] = useState(contactsJSON.slice(0,5))
  let remainingContacts = contactsJSON.slice(5);

  console.log(contacts)

  const newContactHandler = () => {
    if(contacts.length === contactsJSON.length) {
      return;
    } else {

      const newRemainingContact = remainingContacts.filter((contact) => !contacts.includes(contact))
      const randomContactIndex = Math.floor(Math.random() * newRemainingContact.length);
      const randomContact = newRemainingContact[randomContactIndex];
      setContacts((previousContacts) =>  [...previousContacts, randomContact])
      console.log(newRemainingContact)

    }

  }

  const byName = () =>{
    const sortedContacts = [...contacts].sort((a,b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if(nameA < nameB) {
        return -1
      } if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    setContacts(sortedContacts)
  }
  
  const byPopularity = () => {
    const sortedContacts = [...contacts].sort((a,b) => {return b.popularity - a.popularity }
  )
setContacts(sortedContacts)
};

const deleteById = (id) => {
  setContacts(prevContacts => {
    return prevContacts.filter(contact => contact.id !== id)
  })

}

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={newContactHandler}><i className="fas fa-user-plus"></i></button>
            <button onClick={byName}><i className="fas fa-sort-alpha-down"></i></button>
            <button onClick={byPopularity}><i className="fas fa-sort-amount-up"></i></button>
      <table>
        <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won an Oscar</th>
          <th>Won an Emmy</th>
        </tr>
        </thead>
  <tbody>
{contacts.map((oneContact)=> {
        return (
<tr key={oneContact.id}>
  <td><img src={oneContact.pictureUrl} alt={oneContact.name} style={{height:'200px'}}/></td>
  <td><h3>{oneContact.name}</h3></td>
  <td><h3>{oneContact.popularity}</h3></td>
  <td>{oneContact.wonOscar ? <i className="far fa-trophy" style={{color: "#e8e121"}}></i> : '' }</td>
  <td>{oneContact.wonEmmy ? <i className ="far fa-trophy" style={{color: "#e8e121"}}></i> : '' }</td>
  <td><button onClick={() => deleteById(oneContact.id)}><i className="fas fa-trash-alt"></i></button></td>
</tr>
        ) 
        })}
</tbody>

      </table>
    </div>
  );
}

export default App;

// Math.random((5) * arr.length)
