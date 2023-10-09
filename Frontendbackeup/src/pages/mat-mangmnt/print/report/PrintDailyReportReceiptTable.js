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
  rvno: {
    width: "10%",
    marginLeft: "18px",
    marginTop: "10px",
    fontSize: 10,
    fontWeight: "bold",
  },
  customer: {
    width: "30%",
    marginLeft: "5px",
    marginTop: "10px",
    fontSize: 10,
    fontWeight: "bold",
  },
  material: {
    width: "13%",
    marginLeft: "5px",
    marginTop: "10px",
    fontSize: 10,
    fontWeight: "bold",
  },
  totalweight: {
    width: "13%",
    marginLeft: "5px",
    marginTop: "10px",
    fontSize: 10,
    fontWeight: "bold",
  },
  shape: {
    width: "13%",
    marginLeft: "5px",
    marginTop: "10px",
    fontSize: 10,
    fontWeight: "bold",
  },
  quantity: {
    width: "13%",
    marginLeft: "5px",
    marginTop: "10px",
    fontSize: 10,
    fontWeight: "bold",
  },
  rvnoVal: {
    width: "10%",
    marginLeft: "18px",
    marginTop: "3px",
    fontSize: 8,
  },
  customerVal: {
    width: "30%",
    marginLeft: "5px",
    marginTop: "3px",
    fontSize: 8,
  },
  materialVal: {
    width: "13%",
    marginLeft: "5px",
    marginTop: "3px",
    fontSize: 8,
  },
  totalweightVal: {
    width: "13%",
    marginLeft: "5px",
    marginTop: "3px",
    fontSize: 8,
  },
  shapeVal: {
    width: "13%",
    marginLeft: "5px",
    marginTop: "3px",
    fontSize: 8,
  },
  quantityVal: {
    width: "13%",
    marginLeft: "5px",
    marginTop: "3px",
    fontSize: 8,
  },

  emptyblock1: {
    width: "55%",
  },
  summaryFinal: {
    width: "13%",
    marginLeft: "5px",
    marginTop: "13px",
    marginBottom: "10px",
    fontSize: 10,
  },

  totalWeightFinal: {
    width: "13%",
    marginLeft: "5px",
    marginTop: "13px",
    marginBottom: "10px",
    fontSize: 10,
  },

  quantityFinal: {
    width: "13%",
    marginLeft: "20px",
    marginTop: "13px",
    marginBottom: "10px",
    fontSize: 10,
  },

  MaterialReceiptIncharge: {
    width: "45%",
    marginLeft: "30px",
    marginTop: "10px",
    fontSize: 11,
  },

  MaterialDeptIncharge: {
    width: "45%",
    alignContent: "right",
    marginLeft: "25px",
    marginTop: "10px",
    fontSize: 11,
  },
});

//return <div>PrintMaterialDCTable</div>;
//}
const PrintDailyReportReceiptTable = ({
  tableData,
  date,
  totqty,
  totalweight,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.tableContainer}>
        <Text style={styles.topspace}></Text>

        <Text style={styles.titleFull}>
          Magod Laser Machining Pvt Ltd : Jigani
        </Text>
        <Text style={styles.titleFull}>
          Daily Material Arrival Report : {formatDate(new Date(date), 3)}
        </Text>
        <Text style={styles.betweenspace}></Text>

        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>
        <Text style={styles.rvno}>Rv No</Text>
        <Text style={styles.customer}>Customer</Text>
        <Text style={styles.material}>Material</Text>
        <Text style={styles.shape}>Shape</Text>
        <Text style={styles.totalweight}>Total Weight</Text>
        <Text style={styles.quantity}>Quantity</Text>

        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>
        {tableData.map((item, index) => {
          return (
            <>
              <Text style={styles.rvnoVal}>{item.RV_No}</Text>
              <Text style={styles.customerVal}>{item.Customer}</Text>
              <Text style={styles.materialVal}>{item.material}</Text>
              <Text style={styles.shapeVal}>{item.Shape}</Text>
              <Text style={styles.totalweightVal}>{item.totalWeight}</Text>
              <Text style={styles.quantityVal}>{item.qty}</Text>
            </>
          );
        })}
        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>

        <Text style={styles.emptyblock1}></Text>
        <Text style={styles.summaryFinal}>Summary</Text>
        <Text style={styles.totalWeightFinal}>{totalweight.toFixed(2)}</Text>
        <Text style={styles.quantityFinal}>{totqty}</Text>
        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>
        <Text style={styles.MaterialReceiptIncharge}>
          Material Receipt Incharge
        </Text>
        <Text style={styles.MaterialDeptIncharge}>Material Dept Incharge</Text>

        {/*  <Text style={styles.titleLeft1}>Branch {custdata.Branch}</Text>


        <Text style={styles.topspace}></Text>
        <Text style={styles.topspace}></Text>
        <Text style={styles.topspace}></Text>
        <Text style={styles.topspace}></Text>
        <Text style={styles.titleLeft1}></Text>
        <Text style={styles.titleMiddle2}>Total Items : {outData.length}</Text> */}
      </View>
    </Page>
  </Document>
);

export default PrintDailyReportReceiptTable;
