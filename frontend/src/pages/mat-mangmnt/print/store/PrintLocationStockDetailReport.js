import React, { Fragment, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import PrintLocationStockDetailTableReport from "./PrintLocationStockDetailTableReport";

function PrintLocationStockDetailReport() {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const location = useLocation();
  console.log(
    "formHeader = ",
    location.state.formHeader,
    " tabledata = ",
    location.state.tableData,
    " tabletotal = ",
    location.state.tabletotal
    //" weight = ",
    //location.state.totalweight1
  );

  return (
    <Fragment>
      <PDFViewer width="1200" height="600" filename="somename.pdf">
        <PrintLocationStockDetailTableReport
          formHeader={location.state.formHeader}
          tableData={location.state.tableData}
          tabletotal={location.state.tabletotal}
        />
      </PDFViewer>
    </Fragment>
  );
}

export default PrintLocationStockDetailReport;
