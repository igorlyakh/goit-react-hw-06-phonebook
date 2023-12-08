import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Wrapper,
  Form,
  Field,
  ErrorMessage,
  Label,
} from './AddContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, selectContacts } from 'redux/contactsSlice';

const validationSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').required('Required!'),
  phone: Yup.string()
    .matches(
      new RegExp(/^\d{3}-\d{2}-\d{2}$/),
      'Phone number must be in the format "000-00-00"'
    )
    .required('Required!'),
});

const AddContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

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
  return (
    <Wrapper>
      <Formik
        initialValues={{
          name: '',
          phone: '',
        }}
        onSubmit={(values, actions) => {
          onNameSubmit(values);
          actions.resetForm();
        }}
        validationSchema={validationSchema}
      >
        <Form>
          <Label>
            Name
            <Field name="name" placeholder="Alex" />
            <ErrorMessage name="name" component="span" />
          </Label>

          <Label>
            Phone
            <Field name="phone" type="tel" placeholder="000-00-00" />
            <ErrorMessage name="phone" component="span" />
          </Label>

          <button type="submit">Add contact</button>
        </Form>
      </Formik>
    </Wrapper>
  );
};

export default AddContactForm;
