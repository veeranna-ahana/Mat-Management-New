import React, { Fragment, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import PrintLocationStockDetailTableReport from "./PrintLocationStockDetailTableReport";
import PrintLocationStockSummaryTableReport from "./PrintLocationStockSummaryTableReport";

function PrintLocationStockSummaryReport() {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const location = useLocation();
  console.log(
    "formHeader = ",
    location?.state?.formHeader,
    " tabledata = ",
    location?.state?.tableData
    //" weight = ",
    //location.state.totalweight1
  );

  return (
    <Fragment>
      <PDFViewer width="1200" height="600" filename="somename.pdf">
        <PrintLocationStockSummaryTableReport
          formHeader={location.state.formHeader}
          tableData={location.state.tableData}
        />
      </PDFViewer>
    </Fragment>
  );
}

export default PrintLocationStockSummaryReport;
