import React, { Fragment, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import PrintMaterialDCTable from "./PrintDailyReportReceiptTable";
import { useLocation } from "react-router-dom";
import PrintDailyReportReceiptTable from "./PrintDailyReportReceiptTable";
import PrintDailyReportInvoiceTable from "./PrintDailyReportInvoiceTable";

function PrintDailyReportInvoice() {
  const location = useLocation();
  console.log(
    "date = ",
    location.state.date,
    " tabledata = ",
    location.state.tableData
  );

  return (
    <Fragment>
      <PDFViewer width="1200" height="600" filename="somename.pdf">
        <PrintDailyReportInvoiceTable
          tableData={location.state.tableData}
          date={location.state.date}
        />
      </PDFViewer>
    </Fragment>
  );
}

export default PrintDailyReportInvoice;
