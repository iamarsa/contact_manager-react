import React from "react";
import { Modal, Button } from "react-bootstrap";

const errorModal = props => {
  return (
    <React.Fragment>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>Oops, something went wrong...</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.hide}>
          Ok
        </Button>
      </Modal.Footer>
    </React.Fragment>
  );
};

export default errorModal;
