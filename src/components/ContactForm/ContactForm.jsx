import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import s from './ContactForm.module.css';

export function ContactForm({ addContact, contacts }) {

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = evt => {
    const { name, value } = evt.target;

    switch (name) {
      case 'name':
        return setName(value);
      case 'number':
        return setNumber(value);
      default:
      throw new Error(`Unsupported type of ${name}`);
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (name === '' || '' || undefined) {
      return notifyWarning(`Fill in the field`);
    }

    const checkContact = contacts.some(
      contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );

    if (!checkContact) {
      addContact(name, number);
      return resetAll();
    }

    notifyWarning(`${name} is already in contact`);
    resetName();
  };

  const resetAll = () => {
    setName('');
    setNumber('');
  };

  const resetName = () => {
    setName('');
  };

  const notifyWarning = text => {
    Notify.warning(`${text}`);
  };

  return (
    <div className={classNames(s.box, s.contactForm)}>
      <form onSubmit={handleSubmit}>
        <label className={s.title_comp}>
          Name
          <input
            className={s.input}
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Pavlo Tychina"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <label className={s.title_comp}>
          Number
          <input
            className={s.input}
            type="tel"
            name="number"
            value={number}
            onChange={handleChange}
            placeholder="+ 380 66 055 80 41"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
      </form>

      <button
        type="submit"
        name="addContact"
        onClick={handleSubmit}
        className={s.btn}
      >
        Add contact
      </button>
    </div>
  );
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
};

export default ContactForm;
