import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { formatDate } from "../../../utils";
import { useNavigate } from "react-router-dom";
const { getRequest, postRequest } = require("../../api/apiinstance");
const { endpoints } = require("../../api/constants");

function CreateYesNoModal(props) {
  const { show, setShow, formHeader, allotRVYesButton } = props;

  const nav = useNavigate();
  const handleNo = () => setShow(false);
  const handleYes = () => {
    formHeader.status = "Received";

    //get running no and assign to RvNo
    let yyyy = formatDate(new Date(), 6).toString();
    const url =
      endpoints.getRunningNo + "?SrlType=MaterialReceiptVoucher&Period=" + yyyy;
    //console.log(url);
    getRequest(url, (data) => {
      data.map((obj) => {
        let newNo = parseInt(obj.Running_No) + 1;
        //let no = "23/000" + newNo;
        let series = "";
        // console.log(
        //   "length = ",
        //   parseInt(obj.Length),
        //   " newno length = ",
        //   newNo.toString().length
        // );
        //add prefix zeros
        for (
          let i = 0;
          i < parseInt(obj.Length) - newNo.toString().length;
          i++
        ) {
          series = series + "0";
        }
        series = series + "" + newNo;
        //console.log("series = ", series);
        //get last 2 digit of year
        let yy = formatDate(new Date(), 6).toString().substring(2);
        let no = yy + "/" + series;
        //console.log("no = ", no);
        formHeader.rvNo = no;

        //update the running no
        const inputData = {
          SrlType: "MaterialReceiptVoucher",
          Period: formatDate(new Date(), 6),
          RunningNo: newNo,
        };
        postRequest(endpoints.updateRunningNo, inputData, (data) => {});

        //update header
        postRequest(
          endpoints.updateHeaderMaterialReceiptRegister,
          formHeader,
          (data) => {
            if (data.affectedRows !== 0) {
              toast.success("Record Updated Successfully");
              ///MaterialManagement/Receipt/Purchase/Parts/New
            } else {
              toast.error("Record Not Updated");
            }
          }
        );
      });
    });

    allotRVYesButton(formHeader);
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleNo}>
        <Modal.Header closeButton>
          <Modal.Title>Please Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Have you entered all details and inspected the parts received? No
          changes are permitted after this
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            style={{ backgroundColor: "#2b3a55" }}
            onClick={handleYes}
            // className="button_style"
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

export default CreateYesNoModal;
