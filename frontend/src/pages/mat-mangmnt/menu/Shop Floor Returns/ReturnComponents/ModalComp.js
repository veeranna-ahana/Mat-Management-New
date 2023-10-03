import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function ModalComp({ open, setOpen, setShow, row, scrapModal }) {
  const handleClose = () => {
    scrapModal({});
    setOpen(false);
  };
  const handleYes = () => {
    scrapModal(row);
    setOpen(false);
  };

  return (
    <>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Magod Material Accounting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>The Material will be altered as SCRAP, Continue?</Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleYes}>
            yes
          </Button>
          <Button variant="primary" onClick={handleClose}>
            No
          </Button> */}

          <button
            className="button-style"
            style={{ width: "80px" }}
            onClick={handleYes}
          >
            Yes
          </button>
          <button
            className="button-style"
            style={{ width: "80px", backgroundColor: "gray" }}
            onClick={handleClose}
          >
            No
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalComp;
