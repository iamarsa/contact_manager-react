import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditModal = props => {

  //local state  
  const [name, setName] = useState(props.contact.name);
  const [lastName, setLastName] = useState(props.contact.lastName);
  const [number, setNumber] = useState(props.contact.number);

  //handling data inputs
  const onChangeHandler = e => {
    switch (e.target.id) {
      case "name":
        setName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
      case "number":
        setNumber(e.target.value);
        break;
      default:
        return;
    }
  };

  return (
    <React.Fragment>
      <Modal.Header closeButton>
        <Modal.Title>Edit Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>name</Form.Label>
          <Form.Control
            id="name"
            type="text"
            value={name}
            onChange={e => onChangeHandler(e)}
          />

          <Form.Label>lastname</Form.Label>
          <Form.Control
            id="lastName"
            type="text"
            value={lastName}
            onChange={e => onChangeHandler(e)}
          />

          <Form.Label>number</Form.Label>
          <Form.Control
            id="number"
            type="text"
            value={number}
            onChange={e => onChangeHandler(e)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          disabled ={name.length === 0 || lastName.length === 0 || number.length === 0}
          onClick={() =>
            props.sumbitEdit(name, lastName, number, props.contact.id)
          }
        >
          Confirm Edit
        </Button>
        <Button variant="secondary" onClick={props.hide}>
          Cancel
        </Button>
      </Modal.Footer>
    </React.Fragment>
  );
};

export default EditModal;
