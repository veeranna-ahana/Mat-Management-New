import React from "react";

import Modal from "react-bootstrap/Modal";

import Button from "react-bootstrap/Button";

export default function SecondModelAcceptReturn(props) {
  const { showSecondModal, handleCloseSecondModal } = props;

  return (
    <div>
      <Modal show={showSecondModal} onHide={handleCloseSecondModal}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>

        <Modal.Body>Issue voucher closed.</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSecondModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
