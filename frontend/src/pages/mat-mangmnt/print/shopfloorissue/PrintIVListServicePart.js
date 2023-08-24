import React, { Fragment, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import PrintIVListServicePartTable from "./PrintIVListServicePartTable";

function PrintIVListServicePart() {
  const location = useLocation();
  console.log(
    "Second formheader = ",
    location.state.formHeader,
    " outdata = ",
    location.state.tableData
  );

  return (
    <Fragment>
      <PDFViewer width="1200" height="600" filename="IVListPart.pdf">
        <PrintIVListServicePartTable
          formHeader={location.state.formHeader}
          tableData={location.state.tableData}
        />
      </PDFViewer>
    </Fragment>
  );
}

export default PrintIVListServicePart;
