import { Component } from "react";
import { nanoid } from 'nanoid'

import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";
import { Container } from "./Container/Container.styled";

export class App extends Component {

  state = {
    contacts: [],
    filter: ''
  }

  //При завантаженні сторінки беру дані з локального сховища для відмальовки
componentDidMount(){
const saveContacts = localStorage.getItem('contacts-list');
if (saveContacts !==null) {
  this.setState({ contacts: JSON.parse(saveContacts) });
}
  }

  //Записую у локальне сховище дані зі стейту
componentDidUpdate(prevProps, prevState){
if (prevState.contacts !== this.state.contacts) {
  localStorage.setItem('contacts-list', JSON.stringify(this.state.contacts))
}

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

    return <Container>
   <h1>Phonebook</h1>
   <ContactForm onUpdateContactList={this.addNewContact} />
   <h2>Contacts</h2>
   <Filter onSearchContact={this.uppdateFilter} filterName ={filter} />
  <ContactList users= {visibleContacts} onDeleteContact={this.deleteContact} />
    </Container>
  }
};
