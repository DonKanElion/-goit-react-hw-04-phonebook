import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from 'components/ContactForm/ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

const initContacts = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '443-89-12' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
};

const useLocaleStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(localStorage.getItem(key)) ?? initContacts;
  });
};
export function App() {
  const [contacts, setContacts] = useLocaleStorage(contacts, []);
  const [filter, setFilter] = useState('');

  // state = {
  //   contacts: [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '443-89-12' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  //   filter: '',
  // };

  // const componentDidMount  ()   {
  //   const myContacts = JSON.parse(localStorage.getItem('contacts'));
  //   if (myContacts) {
  //     this.setState({ contacts: myContacts });
  //   };
  // };

  // const componentDidUpdate (_, prevState)  {
  //   const { contacts } = this.state;
  //   if (contacts !== prevState.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(contacts));
  //   }
  // }

  const handleChange = evt => {  // ???????????? 
    const { value } = evt.target;
    setFilter(value);
  };

  const addContact = (name, number) => {
    const newContact = {
      id: 'id-' + nanoid(2),
      name,
      number,
    };

    return setContacts(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  const handleClick = id => {
    setContacts(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  const findContact = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
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
