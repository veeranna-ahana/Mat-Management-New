import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function UpdateStockModal({ open, setOpen }) {
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
          <Form>Stock Ledger Updated</Form>
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
export default UpdateStockModal;
