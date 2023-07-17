import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacs'));
    console.log(parsedContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  onChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  formSubmit = ({ id, name, number }) => {
    const { contacts } = this.state;
    const contact = { id, name, number };
    const contactExist = contacts.find(
      item => item.name.toLowerCase() === name.toLowerCase()
    );
    if (contactExist) {
      alert(`${name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmit} />
        <h2 className={css.subTitle}>Contacts</h2>
        <Filter filter={this.state.filter} onChange={this.onChange} />
        <ContactList
          contacts={this.getFilteredContacts()}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
export default App;
