import React, { Fragment, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import PrintMaterialDCTable from "./PrintMaterialDCTable";
import { useLocation } from "react-router-dom";

function PrintMaterialDC() {
  const location = useLocation();
  console.log(
    "Second formheader = ",
    location.state.formHeader,
    " outdata = ",
    location.state.outData,
    " custdata = ",
    location.state.custdata
  );

  return (
    <Fragment>
      <PDFViewer width="1200" height="600" filename="somename.pdf">
        <PrintMaterialDCTable
          //data={data}
          //selectedWeek={selectedWeek}
          //newData={newData}
          formHeader={location.state.formHeader}
          outData={location.state.outData}
          custdata={location.state.custdata}
          dcRegister={location.state.dcRegister}
        />
      </PDFViewer>
    </Fragment>
  );
}

export default PrintMaterialDC;
