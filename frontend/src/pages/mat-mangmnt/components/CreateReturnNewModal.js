import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

function CreateReturnNewModal(props) {
  const { show, setShow, handleShow } = props;
  const nav = useNavigate();

  const handleClose = () => {
    if (props.srlMaterialType === "material") {
      let selectData = {
        Iv_Id: props.srlIVID,
      };
      nav(
        "/MaterialManagement/Return/CustomerJobWork/OutwordMaterialIssueVoucher",
        {
          state: { selectData },
        }
      );
    }
    if (props.srlMaterialType === "part") {
      let selectData = {
        Iv_Id: props.srlIVID,
      };
      nav("/MaterialManagement/Return/CustomerJobWork/OutwordPartIssueVoucher", {
        state: { selectData },
      });
    }
    setShow(false);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>IV No</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.IVNOVal}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateReturnNewModal;
