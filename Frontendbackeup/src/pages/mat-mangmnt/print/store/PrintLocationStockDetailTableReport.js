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
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "14px",
  },
  title1: {
    width: "100%",
    fontWeight: "bold",
    fontSize: "12px",
    paddingLeft: "15px",
  },
  line1: {
    width: "100%",
    paddingLeft: "15px",
  },
  leftBlock: {
    width: "30%",
    fontWeight: "bold",
    fontSize: "12px",
    paddingLeft: "25px",
    marginTop: "5px",
  },
  rightBlock: {
    width: "60%",
    fontWeight: "bold",
    fontSize: "12px",
    marginTop: "5px",
  },
  col1: {
    width: "30%",
    fontWeight: "bold",
    fontSize: "11px",
    paddingLeft: "25px",
    marginTop: "5px",
  },
  col2: {
    width: "30%",
    fontWeight: "bold",
    fontSize: "11px",
    marginTop: "5px",
  },
  col3: {
    width: "30%",
    fontWeight: "bold",
    fontSize: "11px",
    marginTop: "5px",
  },
});

//return <div>PrintMaterialDCTable</div>;
//}
const PrintLocationStockDetailTableReport = ({
  formHeader,
  tableData,
  tabletotal,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.tableContainer}>
        <Text style={styles.topspace}></Text>

        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>
        <Text style={styles.titleFull}>
          Magod Laser Machining Pvt Ltd : Jigani
        </Text>
        <Text style={styles.titleFull}>Location Material Details List</Text>
        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>
        <Text style={styles.leftBlock}>Location</Text>
        <Text style={styles.rightBlock}>{formHeader.LocationNo}</Text>
        <Text style={styles.leftBlock}>Customer</Text>
        <Text style={styles.rightBlock}>{formHeader.Customer}</Text>
        <Text style={styles.leftBlock}>Material</Text>
        <Text style={styles.rightBlock}>{formHeader.Mtrl_Code}</Text>
        <Text style={styles.leftBlock}>Dimension</Text>
        <Text style={styles.rightBlock}>
          {Math.round(formHeader.DynamicPara1)} X{" "}
          {Math.round(formHeader.DynamicPara2)}
        </Text>
        <Text style={styles.leftBlock}>Scrap</Text>
        <Text style={styles.rightBlock}>
          {formHeader.Scrap === 0 ? "False" : "True"}
        </Text>
        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>
        <Text style={styles.col1}>MtrlStockID</Text>
        <Text style={styles.col2}>Weight</Text>
        <Text style={styles.col3}>Scrap Weight</Text>
        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>
        {tableData.map((item, index) => {
          return (
            <>
              <Text style={styles.col1}>{item.MtrlStockID}</Text>
              <Text style={styles.col2}>{item.Weight}</Text>
              <Text style={styles.col3}>{item.ScrapWeight}</Text>
            </>
          );
        })}
        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>
        <Text style={styles.col1}>Total Sheets : {tabletotal.qty}</Text>
        <Text style={styles.col2}>{tabletotal.tot1}</Text>
        <Text style={styles.col3}>{tabletotal.tot2}</Text>
        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>
      </View>
    </Page>
  </Document>
);

export default PrintLocationStockDetailTableReport;
