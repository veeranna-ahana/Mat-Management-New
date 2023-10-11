import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteRVModal(props) {
  let { deleteRvModalOpen, setDeleteRvModalOpen, message, handleRVYes } = props;
  const handleNo = () => {
    // modalResponse("no");
    setDeleteRvModalOpen(false);
  };

  return (
    <>
      <Modal show={deleteRvModalOpen} onHide={handleNo}>
        <Modal.Header closeButton>
          <Modal.Title>Please Confirm Before Proceed</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleRVYes}
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

export default DeleteRVModal;
