import { useSelector } from 'react-redux';
import AddContactForm from './AddContactForm';
import ContactsList from './ContactsList';
import FilterField from './FilterField';
import { selectContacts } from 'redux/contactsSlice';

export const App = () => {
  const contacts = useSelector(selectContacts);

  return (
    <>
      <h1>Phonebook</h1>
      <AddContactForm />
      <FilterField />
      {contacts.length > 0 && <ContactsList />}
    </>
  );
};
