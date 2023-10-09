import React, { Fragment, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import PrintReportFullStockListTable from "./PrintReportFullStockListTable";

function PrintReportFullStockList() {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const location = useLocation();
  console.log(
    "customerDetails = ",
    location.state.customerDetails,
    " tabledata = ",
    location.state.fullStockTable,
    " scrap = ",
    location.state.fullStockScrapTable
    //" weight = ",
    //location.state.totalweight1
  );

  return (
    <Fragment>
      <PDFViewer width="1200" height="600" filename="somename.pdf">
        <PrintReportFullStockListTable
          customerDetails={location.state.customerDetails}
          fullStockTable={location.state.fullStockTable}
          fullStockScrapTable={location.state.fullStockScrapTable}
        />
      </PDFViewer>
    </Fragment>
  );
}

export default PrintReportFullStockList;
