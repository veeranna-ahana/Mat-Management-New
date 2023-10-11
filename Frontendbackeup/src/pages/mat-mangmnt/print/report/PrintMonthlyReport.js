import React, { Fragment, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import PrintMaterialDCTable from "./PrintDailyReportReceiptTable";
import { useLocation } from "react-router-dom";
import PrintDailyReportReceiptTable from "./PrintDailyReportReceiptTable";
import PrintMonthlyTable from "./PrintMonthlyTable";

function PrintMonthlyReport() {
  const location = useLocation();
  console.log(
    "date = ",
    location.state.date,
    " thirdTab = ",
    location.state.thirdTab,
    " fourthTab = ",
    location.state.fourthTab,
    " totalobj = ",
    location.state.totalobj,
    " purchaseDetails = ",
    location.state.purchaseDetails,
    " saleDetails = ",
    location.state.saleDetails
  );

  return (
    <Fragment>
      <PDFViewer width="1200" height="600" filename="somename.pdf">
        <PrintMonthlyTable
          date={location.state.date}
          thirdTab={location.state.thirdTab}
          fourthTab={location.state.fourthTab}
          totalobj={location.state.totalobj}
          purchaseDetails={location.state.purchaseDetails}
          saleDetails={location.state.saleDetails}
        />
      </PDFViewer>
    </Fragment>
  );
}

export default PrintMonthlyReport;
