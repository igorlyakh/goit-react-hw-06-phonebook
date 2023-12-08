import ListElement from 'components/ListElement';
import React from 'react';
import { List, Wrapper } from './ContactsList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, selectContacts } from 'redux/contactsSlice';
import { selectFilter } from 'redux/filterSlice';

const ContactsList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const dispatch = useDispatch();

  const onDelete = id => {
    dispatch(deleteContact(id));
  };

  const getFilteredContacts = () => {
    return contacts?.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  const visibleContacts = getFilteredContacts();

  return (
    <Wrapper>
      <h2>Contacts</h2>

      <List>
        {visibleContacts?.map(contact => {
          return (
            <ListElement
              name={contact.name}
              phone={contact.phone}
              id={contact.id}
              onDelete={onDelete}
              key={contact.id}
            />
          );
        })}
      </List>
    </Wrapper>
  );
};

export default ContactsList;
