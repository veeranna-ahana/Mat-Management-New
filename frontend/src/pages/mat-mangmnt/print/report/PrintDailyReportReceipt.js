import React, { Fragment, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import PrintMaterialDCTable from "./PrintDailyReportReceiptTable";
import { useLocation } from "react-router-dom";
import PrintDailyReportReceiptTable from "./PrintDailyReportReceiptTable";
import { Modal } from "react-bootstrap";

function PrintDailyReportReceipt(props) {
  const location = useLocation();
  // console.log(
  //   "date = ",
  //   location.state.date,
  //   " tabledata = ",
  //   location.state.tableData,
  //   " qty = ",
  //   location.state.totqty,
  //   " weight = ",
  //   location.state.totalweight
  // );
  const handleClose = () => props.setReceiptReportPrint(false);

  return (
    <>
      <Modal show={props.receiptReportPrint} onHide={handleClose} fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>Print Receipt Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Fragment>
            <PDFViewer width="1200" height="600" filename="somename.pdf">
              <PrintDailyReportReceiptTable
                //formHeader={location.state.formHeader}
                tableData={props.tableData}
                date={props.date}
                totqty={props.totqty}
                totalweight={props.totalweight}
                //dcRegister={location.state.dcRegister}
              />
            </PDFViewer>
          </Fragment>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PrintDailyReportReceipt;
