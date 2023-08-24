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

  topspace: {
    width: "100%",
    marginTop: "70px",
  },
  betweenspace: {
    width: "100%",
    marginTop: "20px",
  },
  titleFull: {
    padding: "5px",
    paddingLeft: "15px",
    width: "100%",
    fontWeight: "bold",
    fontSize: "14px",
  },
  line1: {
    width: "100%",
    paddingLeft: "15px",
  },
  invno: {
    width: "10%",
    marginLeft: "18px",
    marginTop: "10px",
    fontSize: 10,
    fontWeight: "bold",
  },
  customer: {
    width: "40%",
    marginLeft: "25px",
    marginTop: "10px",
    fontSize: 10,
    fontWeight: "bold",
  },
  material: {
    width: "20%",
    marginLeft: "5px",
    marginTop: "10px",
    fontSize: 10,
    fontWeight: "bold",
  },
  weight: {
    width: "20%",
    marginLeft: "5px",
    marginTop: "10px",
    fontSize: 10,
    fontWeight: "bold",
  },
  invnoval: {
    width: "10%",
    marginLeft: "18px",
    marginTop: "2px",
    fontSize: 8,
    fontWeight: "bold",
  },
  customerval: {
    width: "40%",
    marginLeft: "25px",
    marginTop: "2px",
    fontSize: 8,
    fontWeight: "bold",
  },
  materialval: {
    width: "20%",
    marginLeft: "5px",
    marginTop: "2px",
    fontSize: 8,
    fontWeight: "bold",
  },
  weightval: {
    width: "20%",
    marginLeft: "5px",
    marginTop: "2px",
    fontSize: 8,
    fontWeight: "bold",
  },
  titleFull3: {
    padding: "5px",
    paddingLeft: "35px",
    width: "100%",
    fontWeight: "bold",
    fontSize: "12px",
    textDecoration: "underline",
  },
});

//return <div>PrintMaterialDCTable</div>;
//}
const PrintDailyReportInvoiceTable = ({ tableData, date }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.tableContainer}>
        <Text style={styles.topspace}></Text>

        <Text style={styles.titleFull}>
          Magod Laser Machining Pvt Ltd : Jigani
        </Text>
        <Text style={styles.titleFull}>
          Daily Invoice Material Dispatch List : {formatDate(new Date(date), 3)}
        </Text>
        <Text style={styles.betweenspace}></Text>

        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>
        <Text style={styles.invno}>Invoice No</Text>
        <Text style={styles.customer}>Customer</Text>
        <Text style={styles.material}>Material</Text>
        <Text style={styles.weight}>Weight</Text>
        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>

        {tableData.map((item, index) => {
          return (
            <>
              <Text style={styles.titleFull3}>{item.material}</Text>
              <Text style={styles.line1}>
                _________________________________________________________________________________________
              </Text>

              {item.data.map((item, index) => {
                return (
                  <>
                    <Text style={styles.invnoval}>{item.Inv_No}</Text>
                    <Text style={styles.customerval}>{item.Cust_Name}</Text>
                    <Text style={styles.materialval}>{item.Material}</Text>
                    <Text style={styles.weightval}>{item.SrlWt}</Text>
                  </>
                );
              })}

              <Text style={styles.line1}>
                _________________________________________________________________________________________
              </Text>
              <Text style={styles.invnoval}></Text>
              <Text style={styles.customerval}></Text>
              <Text style={styles.materialval}></Text>
              <Text style={styles.weightval}>{item.totwt.toFixed(2)}</Text>

              <Text style={styles.line1}>
                _________________________________________________________________________________________
              </Text>
            </>
          );
        })}
      </View>
    </Page>
  </Document>
);

export default PrintDailyReportInvoiceTable;
