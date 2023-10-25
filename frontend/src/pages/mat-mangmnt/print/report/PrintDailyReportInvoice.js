import React, { Fragment, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import PrintMaterialDCTable from "./PrintDailyReportReceiptTable";
import { useLocation } from "react-router-dom";
import PrintDailyReportReceiptTable from "./PrintDailyReportReceiptTable";
import PrintDailyReportInvoiceTable from "./PrintDailyReportInvoiceTable";
import { Modal } from "react-bootstrap";

function PrintDailyReportInvoice(props) {
  const location = useLocation();
  // console.log(
  //   "date = ",
  //   location.state.date,
  //   " tabledata = ",
  //   location.state.tableData
  // );

  const handleClose = () => props.setInvoiceDispatchPrint(false);

  return (
    <>
      <Modal show={props.invoiceDispatchPrint} onHide={handleClose} fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>Print Invoice Dispatch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Fragment>
            <PDFViewer width="1200" height="600" filename="somename.pdf">
              <PrintDailyReportInvoiceTable
                tableData={props.tableData}
                date={props.date}
              />
            </PDFViewer>
          </Fragment>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PrintDailyReportInvoice;
