import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function OkModal(props) {
  const { show, setShow, handleShow, modalMessage, modalResponseok } = props;

  const handleClose = () => {
    setShow(false);
  };

  const handleOk = () => {
    modalResponseok("ok");
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}> */}
          <button
            className="button-style "
            style={{ width: "50px" }}
            onClick={handleOk}
          >
            Yes
          </button>
          <button
            className="button-style"
            style={{ width: "50px", backgroundColor: "gray" }}
            onClick={handleClose}
          >
            No
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OkModal;
