import React, { Fragment, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import PrintLocationStockDetailTableReport from "./PrintLocationStockDetailTableReport";
import PrintLocationStockSummaryTableReport from "./PrintLocationStockSummaryTableReport";
import { Modal } from "react-bootstrap";

// Modal

function PrintLocationStockSummaryReport(props) {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const location = useLocation();
  // console.log(
  //   "formHeader = ",
  //   location?.state?.formHeader,
  //   " tabledata = ",
  //   location?.state?.tableData
  //   //" weight = ",
  //   //location.state.totalweight1
  // );

  const handleClose = () => props.setSummaryReportPrintOpen(false);

  return (
    <>
      <Modal
        show={props.summaryReportPrintOpen}
        onHide={handleClose}
        fullscreen
      >
        <Modal.Header closeButton>
          <Modal.Title>Location Stock Summary Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Fragment>
            <PDFViewer width="1200" height="600" filename="somename.pdf">
              <PrintLocationStockSummaryTableReport
                formHeader={props.formHeader}
                tableData={props.tableData}
              />
            </PDFViewer>
          </Fragment>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PrintLocationStockSummaryReport;
