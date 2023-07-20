import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contactsStoraged = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsStoraged);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
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
