import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from 'components/ContactForm/ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

const initContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '443-89-12' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
]
;

// const useLocaleStorage = (key, defaultValue) => {
//   const [state, setState] = useState(() => {
//     return JSON.parse(localStorage.getItem(key)) ?? initContacts;
//   });
// };

export function App() {
  // const [contacts, setContacts] = useLocaleStorage(contacts, []);
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

    // монтування === componentDidMount
  useEffect(() => { 
    console.log('Step 1. Перший рендер');
    
    // setContacts(JSON.parse(window.localStorage.getItem('contacts')) ?? initContacts);
    setContacts(initContacts);

  }, []);

  // useEffect(() => {
  //   // монтування === componentDidMount
  //   console.log('Step 1. Перший рендер');
  //   setContacts([JSON.parse(...localStorage.getItem('contacts'))] ?? [...initContacts]);
  // }, []);

  useEffect(() => {
    const contactsFromLS = JSON.parse(localStorage.getItem('contacts'));
    // const contactsFromLS = JSON.parse(window.localStorage.getItem('contacts'));


    console.log(contactsFromLS)
    // console.log('Before оновлення Локал: ', contactsFromLS);
    // console.log('Step 2. Оновлення');

    // // localStorage.setItem('contacts', JSON.stringify([contacts]));
    // window.localStorage.setItem('contacts', JSON.stringify(contacts));

    // console.log('After оновлення Локал: ', contactsFromLS);

    if (contacts === contactsFromLS) {
      return;
    }
    // ОНОВЛЕННЯ === componentDidUpdate
    console.log('Step 2. Оновлення');
    // window.localStorage.setItem('contacts', JSON.stringify(contacts));

  }, [contacts]);

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
    console.log('Update Contacts + localStorige', contacts);

    window.localStorage.setItem('contacts', JSON.stringify(contacts));
    console.log('Update Contacts + localStorige', JSON.parse(window.localStorage.getItem('contacts')));

    return;
  };

  const handleClick = id => {
    setContacts(prevState => (prevState.contacts.filter(contact => contact.id !== id)));
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
