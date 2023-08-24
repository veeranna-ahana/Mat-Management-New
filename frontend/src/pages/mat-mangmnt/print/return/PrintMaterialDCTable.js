import React from "react";
import { Page, Document, StyleSheet, View, Text } from "@react-pdf/renderer";
import { formatDate } from "../../../../utils";

//function PrintMaterialDCTable() {
const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    flexDirection: "column",
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  // row: {
  //   flexDirection: "row",
  //   alignItems: "center",
  // },
  // description: {
  //   width: "60%",
  // },
  // xyz: {
  //   width: "40%",
  // },
  // tableTitle: {
  //   textDecoration: "underline",
  //   marginLeft: "200px",
  //   marginTop: "20px",
  // },
  // title2: {
  //   textDecoration: "underline",
  //   marginLeft: "220px",
  // },
  // shiftperiod: {
  //   marginLeft: "140px",
  //   marginTop: "20px",
  // },
  // boxdata: {
  //   border: "1px",
  //   padding: "10px",
  //   marginTop: "40px",
  //   width: "550px",
  //   marginLeft: "50px",
  //   marginRight: "100px",
  // },
  // tableview: {
  //   marginLeft: "60px",
  //   width: "430px",
  // },
  // Headingrow: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   borderBottom: "1px",
  //   marginTop: "20px",
  //   marginLeft: "60px",
  //   width: "430px",
  // },
  // machineHeading: {
  //   width: "30%",
  // },
  // operatorHeading: {
  //   width: "30%",
  // },
  // remarksHeading: {
  //   width: "40%",
  // },

  topspace: {
    width: "100%",
    marginTop: "100px",
  },
  titleFull: {
    //border: "1px",
    padding: "5px",
    width: "100%",
    fontWeight: "bold",
    fontSize: "11px",
  },
  titleFull1: {
    //border: "1px",
    padding: "5px",
    width: "100%",
    fontSize: "10px",
  },
  titleLeft1: {
    //border: "1px",
    padding: "5px",
    width: "40%",
    fontSize: "10px",
  },

  titleMiddle1: {
    //border: "1px",
    padding: "5px",
    width: "30%",
    fontSize: "10px",
  },
  titleMiddle2: {
    padding: "5px",
    width: "30%",
    fontSize: "12px",
  },
  titleRight1: {
    //border: "1px",
    padding: "5px",
    width: "30%",
  },

  tableCol1: {
    padding: "5px",
    width: "5%",
  },
  tableCol2: {
    padding: "5px",
    width: "60%",
    fontWeight: "bold",
  },
  tableCol3: {
    padding: "5px",
    width: "20%",
  },
  tableCol4: {
    padding: "5px",
    width: "10%",
  },
});

//return <div>PrintMaterialDCTable</div>;
//}
const PrintMaterialDCTable = ({
  formHeader,
  outData,
  custdata,
  dcRegister,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.tableContainer}>
        {/* <Text style={styles.tableTitle}>Magod Laser Machining Pvt Ltd</Text>
        <Text style={styles.title2}>Production Department</Text>
        <Text style={styles.shiftperiod}>
          Shift Plan for Period From : {formHeader.Customer} and {outData}
        </Text> */}
        <Text style={styles.topspace}></Text>
        <Text style={styles.titleFull}>
          {formHeader.Customer} ({formHeader.Cust_code})
        </Text>
        <Text style={styles.titleLeft1}>Branch {custdata.Branch}</Text>
        <Text style={styles.titleMiddle1}></Text>
        <Text style={styles.titleRight1}>{dcRegister.DC_No}</Text>
        <Text style={styles.titleLeft1}>
          {custdata.Address} {custdata.City}
        </Text>
        <Text style={styles.titleMiddle1}>GST No : {custdata.GSTNo}</Text>
        <Text style={styles.titleRight1}>
          {" "}
          {formatDate(
            new Date(
              new Date(
                dcRegister.DC_Date.toString().substring(0, 10)
              ).toDateString()
            ),
            1
          )}
        </Text>
        <Text style={styles.titleFull1}>
          {custdata.City} PIN - {custdata.Pin_Code}
        </Text>
        <Text style={styles.titleFull1}>{custdata.State}</Text>
        <Text style={styles.titleFull1}>
          Authority : {dcRegister.AuhtorisingDocu}
        </Text>

        <Text style={styles.topspace}></Text>

        {outData.map((item, index) => {
          return (
            <>
              <Text style={styles.tableCol1}>{index + 1}</Text>
              <Text style={styles.tableCol2}>{item.MtrlDescription}</Text>
              <Text style={styles.tableCol3}>{item.Material}</Text>
              <Text style={styles.tableCol4}>{item.Qty}</Text>
            </>
          );
        })}

        <Text style={styles.topspace}></Text>
        <Text style={styles.topspace}></Text>
        <Text style={styles.topspace}></Text>
        <Text style={styles.topspace}></Text>
        <Text style={styles.titleLeft1}></Text>
        <Text style={styles.titleMiddle2}>Total Items : {outData.length}</Text>
      </View>
    </Page>
  </Document>
);

export default PrintMaterialDCTable;
