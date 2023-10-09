import React, { Fragment, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import PrintIVListProfileCuttingTable1 from "./PrintIVListProfileCuttingTable1";
import PrintIVListProfileCuttingTable2 from "./PrintIVListProfileCuttingTable2";

function PrintIVListProfileCutting() {
  const location = useLocation();
  console.log(
    "Second formheader = ",
    location.state.formHeader,
    " outdata = ",
    location.state.tableData,
    " nodetails = ",
    location.state.noDetails
  );

  return (
    <Fragment>
      <PDFViewer width="1200" height="600" filename="IVListProfileCutting.pdf">
        {location.state.noDetails === 0 ? (
          <PrintIVListProfileCuttingTable1
            formHeader={location.state.formHeader}
            tableData={location.state.tableData}
          />
        ) : (
          <PrintIVListProfileCuttingTable2
            formHeader={location.state.formHeader}
            tableData={location.state.tableData}
            combineSheets={location.state.combineSheets}
          />
        )}
      </PDFViewer>
    </Fragment>
  );
}

export default PrintIVListProfileCutting;
