import React, { Fragment, useState } from "react";
import { PDFViewer, StyleSheet } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import PrintIVListServicePartTable from "./PrintIVListServicePartTable";
import Modal from "react-bootstrap/Modal";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

function PrintIVListServicePart({
  isOpen,
  formHeader,
  tableData,
  setIsPrintModalOpen,
}) {
  const location = useLocation();
  // console.log(
  //   "Second formheader = ",
  //   location?.state?.formHeader,
  //   " outdata = ",
  //   location?.state?.tableData
  // );

  const handleClose = () => {
    setIsPrintModalOpen(false);
  };

  return (
    <Modal show={isOpen} onHide={handleClose} fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>Assemby Parts Issue Voucher</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Fragment>
          <PDFViewer width="1200" height="600" filename="IVListPart.pdf">
            <PrintIVListServicePartTable
              formHeader={formHeader}
              tableData={tableData}
            />
          </PDFViewer>
        </Fragment>
      </Modal.Body>
    </Modal>
  );
}

export default PrintIVListServicePart;
