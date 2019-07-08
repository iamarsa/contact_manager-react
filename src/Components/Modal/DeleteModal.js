import React from "react";
import { Modal, Button } from "react-bootstrap";

const deleteModal = props => {
  return (
    <React.Fragment>
      <Modal.Header closeButton>
        <Modal.Title>Delete Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this contact?</Modal.Body>
      <Modal.Footer>
      <Button variant="primary" onClick={() => props.action(props.id)}>
          Delete
        </Button>
        <Button variant="secondary" onClick={props.hide}>
          Cancel
        </Button>     
      </Modal.Footer>
    </React.Fragment>
  );
};
export default deleteModal;
