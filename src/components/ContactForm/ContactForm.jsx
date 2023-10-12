import { Component } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StyledForm, Error, StyledInput, StyledLabel, AddContactButton  } from "./ContactForm.styled"
import { CiUser, CiPhone } from 'react-icons/ci';

const ContactShema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .matches(
        /^[a-zA-Zа-яА-Я]+([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*$/,
        "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      )
      .required('This is a required field'),
    number: Yup.string()
      .matches(
        /^\+?\d{1,4}?[ .\-s]?(\(\d{1,3}?\))?([ .\-s]?\d{1,4}){1,4}$/,
        "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
      )
      .required('This is a required field')
      .min(9, "Please enter at least 9 characters"),
  });
export class ContactForm extends Component {


    render() {
        return   <Formik
        initialValues={{ name: "", number: "" }}
        onSubmit={(values, actions) => {
            this.props.onUpdateContactList(values)
            actions.resetForm();
        }}

        validationSchema={ContactShema}
      >
        <StyledForm>
          <StyledLabel>Name
            <CiUser size="20px" />
          <StyledInput name="name" type="text" />
          <Error name="name" component="span" />
          </StyledLabel>
          <StyledLabel>Number
          <CiPhone size="20px" />
            <StyledInput name="number" type="tel" />
            <Error name="number" component="span" />
          </StyledLabel>
          <AddContactButton type="submit">Add contact</AddContactButton>
        </StyledForm>
      </Formik>
    }
}