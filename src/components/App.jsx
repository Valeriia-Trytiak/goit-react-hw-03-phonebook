import { Component } from "react";
import { nanoid } from 'nanoid'

import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";

export class App extends Component {

  state = {
    contacts: [{id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},],
    filter: ''
  }

//Додаю контакт до стану
addNewContact = (newContact) => {
  const { contacts } = this.state;
  const nameExists = contacts.some(
    (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
  );
  if (nameExists) {
    alert(`${newContact.name}' is arleady in contacts.`);
  } else {
    this.setState((prevState) => ({
    contacts: [...prevState.contacts, { ...newContact, id: nanoid() }],
  }));
}
};

// Записую до стану значення пошуку
uppdateFilter = (searchName)=> {
  this.setState(() => ({
    filter: searchName,
  }));
}


//Видаляю контакт
deleteContact = (contactId)=> {
this.setState(prevState => ({
  contacts: prevState.contacts.filter(contact => contact.id !== contactId)
}))
}

  render() {
    const {contacts, filter } = this.state;
    const visibleContacts = filter ? contacts.filter((contact) => 
      contact.name.toLowerCase().includes(filter.toLowerCase())
    ) : contacts;

    return <div>
   <h1>Phonebook</h1>
   <ContactForm onUpdateContactList={this.addNewContact} />
   <h2>Contacts</h2>
   <Filter onSearchContact={this.uppdateFilter} filterName ={filter} />
  <ContactList users= {visibleContacts} onDeleteContact={this.deleteContact} />
    </div>
  }
};
