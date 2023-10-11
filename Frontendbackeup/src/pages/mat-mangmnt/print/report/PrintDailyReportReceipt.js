import React, { Fragment, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import PrintMaterialDCTable from "./PrintDailyReportReceiptTable";
import { useLocation } from "react-router-dom";
import PrintDailyReportReceiptTable from "./PrintDailyReportReceiptTable";

function PrintDailyReportReceipt() {
  const location = useLocation();
  console.log(
    "date = ",
    location.state.date,
    " tabledata = ",
    location.state.tableData,
    " qty = ",
    location.state.totqty,
    " weight = ",
    location.state.totalweight
  );

  return (
    <Fragment>
      <PDFViewer width="1200" height="600" filename="somename.pdf">
        <PrintDailyReportReceiptTable
          //formHeader={location.state.formHeader}
          tableData={location.state.tableData}
          date={location.state.date}
          totqty={location.state.totqty}
          totalweight={location.state.totalweight}
          //dcRegister={location.state.dcRegister}
        />
      </PDFViewer>
    </Fragment>
  );
}

export default PrintDailyReportReceipt;
