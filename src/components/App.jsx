import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from 'components/ContactForm/ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

const initContacts = [
  { id: 'id-1', name: 'Bradley cooper', number: '443-89-12' },
    { id: 'id-2', name: 'Elijah Jordan', number: '443-89-12' },
    { id: 'id-3', name: 'Aaron Paul', number: '645-17-79' },
    { id: 'id-4', name: ' Viggo Peter', number: '227-91-26' },
];

export function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) || initContacts});
  const [filter, setFilter] = useState(''); 

  useEffect(() => {
    return window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = evt => {
    const { value } = evt.target;
    setFilter(value);
  };

  const addContact = (name, number) => {
    const newContact = {
      id: 'id-' + nanoid(2),
      name,
      number,
    };

     setContacts(prevState => ([newContact, ...contacts]))

    window.localStorage.setItem('contacts', JSON.stringify(contacts));
    return;
  };

  const handleClick = id => {
    setContacts(prevState => (prevState.filter(contact => contact.id !== id)));
  };

  const findContact = () => {
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div
      style={{
        display: 'block',
        textAlign: 'center',
        marginBottom: '20px',
        color: '#010101',
      }}
      className="section"
    >
      <h1 className="hero_title">Phonebook</h1>

      <ContactForm addContact={addContact} contacts={contacts}></ContactForm>

      {/* <h2 className='title'>Contacts</h2> */}

      {contacts.length !== 0 ? (
        <>
          <Filter stateName={filter} onChange={handleChange}></Filter>
          <ContactList
            contacts={findContact()}
            onClick={handleClick}
          ></ContactList>
        </>
      ) : (
        <p>Looks like you don`t have any contacts. Please add new contact.</p>
      )}
    </div>
  );
}
