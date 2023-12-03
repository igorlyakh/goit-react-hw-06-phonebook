import { useSelector, useDispatch } from 'react-redux';
import AddContactForm from './AddContactForm';
import ContactsList from './ContactsList';
import FilterField from './FilterField';
import { addContact, deleteContact } from 'redux/contactsSlice';
import { changeFilter } from 'redux/filterSlice';

export const App = () => {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const onNameSubmit = person => {
    const checkContact = contacts.some(
      contact => contact.name.toLowerCase() === person.name.toLowerCase()
    );
    if (checkContact) {
      alert(`${person.name} is already in contacts.`);
      return;
    }
    dispatch(addContact(person));
  };

  const onDelete = id => {
    dispatch(deleteContact(id));
  };

  const onFilter = value => {
    dispatch(changeFilter(value));
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  const visibleContacts = getFilteredContacts();

  return (
    <>
      <h1>Phonebook</h1>
      <AddContactForm onNameSubmit={onNameSubmit} />
      <FilterField contactFilter={filter} onFilter={onFilter} />
      {contacts.length > 0 && (
        <ContactsList contacts={visibleContacts} onDelete={onDelete} />
      )}
    </>
  );
};
