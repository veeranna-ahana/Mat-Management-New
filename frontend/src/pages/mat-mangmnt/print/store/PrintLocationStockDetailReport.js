import React, { Fragment, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import PrintLocationStockDetailTableReport from "./PrintLocationStockDetailTableReport";
import { Modal } from "react-bootstrap";

// Modal
function PrintLocationStockDetailReport(props) {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const location = useLocation();
  // console.log(
  //   "formHeader = ",
  //   location.state.formHeader,
  //   " tabledata = ",
  //   location.state.tableData,
  //   " tabletotal = ",
  //   location.state.tabletotal
  //   //" weight = ",
  //   //location.state.totalweight1
  // );

  const handleClose = () => props.setDetailsReportPrintOpen(false);

  return (
    <>
      <Modal
        show={props.detailsReportPrintOpen}
        onHide={handleClose}
        fullscreen
      >
        <Modal.Header closeButton>
          <Modal.Title>Location Stock Details Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Fragment>
            <PDFViewer width="1200" height="600" filename="somename.pdf">
              <PrintLocationStockDetailTableReport
                formHeader={props.formHeader}
                tableData={props.tableData}
                tabletotal={props.tabletotal}
              />
            </PDFViewer>
          </Fragment>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PrintLocationStockDetailReport;
