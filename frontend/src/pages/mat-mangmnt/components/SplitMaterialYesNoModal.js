import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function SplitMaterialYesNoModal(props) {
  let { show, setShow, message, modalResponse } = props;
  const handleNo = () => {
    modalResponse("no");
    setShow(false);
  };
  const handleYes = () => {
    modalResponse("yes");
    setShow(false);
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleNo}
        style={{ backgroundColor: "#0000005e" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Please Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleYes}
            style={{ backgroundColor: " #2b3a55" }}
          >
            Yes
          </Button>
          <Button variant="secondary" onClick={handleNo}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
