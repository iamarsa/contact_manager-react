import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
const AddModal = props => {

  //local state  
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");

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
        <Modal.Title>Add a new contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>name</Form.Label>
          <Form.Control
            id="name"
            type="text"
            onChange={e => onChangeHandler(e)}
          />

          <Form.Label>lastname</Form.Label>
          <Form.Control
            id="lastName"
            type="text"
            onChange={e => onChangeHandler(e)}
          />

          <Form.Label>number</Form.Label>
          <Form.Control
            id="number"
            type="text"
            onChange={e => onChangeHandler(e)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          disabled ={name.length === 0 || lastName.length === 0 || number.length === 0}
          onClick={() => props.submitAdd(name, lastName, number)}
        >
          Add contact
        </Button>
        <Button variant="secondary" onClick={props.hide}>
          Cancel
        </Button>
      </Modal.Footer>
    </React.Fragment>
  );
};

export default AddModal;
