import React, { Fragment, useState } from "react";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import PrintMaterialDCTable from "./PrintMaterialDCTable";
import { useLocation } from "react-router-dom";
import PrintPartsDCTable from "./PrintPartsDCTable";

const { getRequest, postRequest } = require("../../../api/apiinstance");
const { endpoints } = require("../../../api/constants");

function PrintPartsDC() {
  const location = useLocation();
  console.log(
    "Second formheader = ",
    location.state.formHeader,
    " outdata = ",
    location.state.outData,
    " custdata = ",
    location.state.custdata
  );

  let totalqty = () => {
    let sum = 0;
    for (let i = 0; i < location.state.outData; i++) {
      sum = sum + location.state.outData[i].QtyReturned;
    }
    return sum;
  };

  return (
    <Fragment>
      <PDFViewer width="1200" height="600" filename="somename.pdf">
        <PrintPartsDCTable
          //data={data}
          //selectedWeek={selectedWeek}
          //newData={newData}
          formHeader={location.state.formHeader}
          outData={location.state.outData}
          custdata={location.state.custdata}
          dcRegister={location.state.dcRegister}
          totalqty={totalqty}
        />
      </PDFViewer>
    </Fragment>
  );
}

export default PrintPartsDC;
