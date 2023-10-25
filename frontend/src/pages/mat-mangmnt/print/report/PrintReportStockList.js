import React, { Fragment, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import PrintMaterialDCTable from "./PrintDailyReportReceiptTable";
import { useLocation } from "react-router-dom";
import PrintReportStockListTable from "./PrintReportStockListTable";

import Modal from "react-bootstrap/Modal";

function PrintReportStockList(props) {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const location = useLocation();
  // console.log(
  //   "customerDetails = ",
  //   location.state.customerDetails,
  //   " tabledata = ",
  //   location.state.tableData,
  //   " scrapdata = ",
  //   location.state.scrapData,
  //   " scrap flag = ",
  //   location.state.scrapFlag,
  //   " qty = ",
  //   location.state.totqty1,
  //   " weight = ",
  //   location.state.totalweight1,
  //   " qty2 = ",
  //   location.state.totqty2,
  //   " weight2 = ",
  //   location.state.totalweight2
  // );

  // const [scrapData, setscrapData] = useState(
  //   location.state.tableData.filter((item, index) => {
  //     return item.Scrap !== 0;
  //   })
  // );
  // const [tblData, settblData] = useState(
  //   location.state.tableData.filter((item, index) => {
  //     return item.Scrap === 0;
  //   })
  // );

  const handleClose = () => props.setprintSelectedStockOpen(false);

  return (
    <>
      <Modal
        show={props.printSelectedStockOpen}
        onHide={handleClose}
        fullscreen
      >
        <Modal.Header closeButton>
          <Modal.Title>Print Selected Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Fragment>
            <PDFViewer width="1200" height="600" filename="somename.pdf">
              {/* <PrintReportStockListTable
          totQty1={location.state.totqty1}
          totWeight1={location.state.totalweight1}
          totQty2={location.state.totqty2}
          totWeight2={location.state.totalweight2}
          tableData={tblData}
          scrapData={scrapData}
          scrapFlag={scrapData.length}
          customerDetails={location.state.customerDetails}
        /> */}
              <PrintReportStockListTable
                totQty1={props.totqty1}
                totWeight1={props.totalweight1}
                totQty2={props.totqty2}
                totWeight2={props.totalweight2}
                tableData={props.tableData}
                scrapData={props.scrapData}
                scrapFlag={props.scrapFlag}
                customerDetails={props.customerDetails}
              />
            </PDFViewer>
          </Fragment>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PrintReportStockList;
