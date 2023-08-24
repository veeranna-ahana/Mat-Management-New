import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function LocationLisModal({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Magod Material Accounting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>Location Information Saved </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default LocationLisModal;
