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
  title2: {
    width: "100%",
    fontWeight: "bold",
    fontSize: "11px",
    paddingLeft: "15px",
    textDecoration: "underline",
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
  headercol1: {
    width: "22%",
    fontWeight: "bold",
    fontSize: "12px",
    paddingLeft: "20px",
    marginTop: "5px",
  },

  col1: {
    width: "35%",
    fontWeight: "bold",
    fontSize: "10px",
    paddingLeft: "25px",
    marginTop: "5px",
  },
  col2: {
    width: "12%",
    fontWeight: "bold",
    fontSize: "10px",
    marginTop: "5px",
  },
});

//return <div>PrintMaterialDCTable</div>;
//}
const PrintLocationStockSummaryTableReport = ({ formHeader, tableData }) => (
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
        <Text style={styles.titleFull}>Location Material Stock Summary</Text>
        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>
        <Text style={styles.headercol1}>
          Location : {formHeader.LocationNo}
        </Text>
        <Text style={styles.headercol1}>Type : {formHeader.StorageType}</Text>
        <Text style={styles.headercol1}>Capacity : {formHeader.Capacity}</Text>
        <Text style={styles.headercol1}>
          Current Usage : {formHeader.CapacityUtilised}
        </Text>
        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>
        <Text style={styles.col1}>Material</Text>
        <Text style={styles.col2}>Para1</Text>
        <Text style={styles.col2}>Para2</Text>
        <Text style={styles.col2}>Quantity</Text>
        <Text style={styles.col2}>Weight</Text>
        <Text style={styles.col2}>Scrap Weight</Text>
        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>
        {tableData.map((item, index) => {
          return (
            <>
              <Text style={styles.title1}>{item.customer}</Text>
              <Text style={styles.line1}>
                _________________________________________________________________________________________
              </Text>
              {item.rawlength !== 0 ? (
                <>
                  <Text style={styles.title2}>Raw Material</Text>

                  {item.rawMaterial.map((item, index) => {
                    return (
                      <>
                        <Text style={styles.col1}>{item.Mtrl_Code}</Text>
                        <Text style={styles.col2}>{item.DynamicPara1}</Text>
                        <Text style={styles.col2}>{item.DynamicPara2}</Text>
                        <Text style={styles.col2}>{item.Quantity}</Text>
                        <Text style={styles.col2}>{item.Weight}</Text>
                        <Text style={styles.col2}>{item.SWeight}</Text>
                      </>
                    );
                  })}
                  <Text style={styles.line1}>
                    _________________________________________________________________________________________
                  </Text>
                  <Text style={styles.col1}></Text>
                  <Text style={styles.col2}></Text>
                  <Text style={styles.col2}></Text>
                  <Text style={styles.col2}>{item.tot1wt}</Text>
                  <Text style={styles.col2}>{item.tot1swt}</Text>
                  <Text style={styles.col2}>{item.tot1qty}</Text>
                  <Text style={styles.line1}>
                    _________________________________________________________________________________________
                  </Text>
                </>
              ) : (
                <></>
              )}

              {/* for scrap */}
              {item.scraplength !== 0 ? (
                <>
                  <Text style={styles.title2}>Scrap Material</Text>

                  {item.scrapMaterial.map((item, index) => {
                    return (
                      <>
                        <Text style={styles.col1}>{item.Mtrl_Code}</Text>
                        <Text style={styles.col2}>{item.DynamicPara1}</Text>
                        <Text style={styles.col2}>{item.DynamicPara2}</Text>
                        <Text style={styles.col2}>{item.Quantity}</Text>
                        <Text style={styles.col2}>{item.Weight}</Text>
                        <Text style={styles.col2}>{item.SWeight}</Text>
                      </>
                    );
                  })}
                  <Text style={styles.line1}>
                    _________________________________________________________________________________________
                  </Text>
                  <Text style={styles.col1}></Text>
                  <Text style={styles.col2}></Text>
                  <Text style={styles.col2}></Text>
                  <Text style={styles.col2}>{item.tot2wt}</Text>
                  <Text style={styles.col2}>{item.tot2swt}</Text>
                  <Text style={styles.col2}>{item.tot2qty}</Text>
                  <Text style={styles.line1}>
                    _________________________________________________________________________________________
                  </Text>
                </>
              ) : (
                <></>
              )}
            </>
          );
        })}
      </View>
    </Page>
  </Document>
);

export default PrintLocationStockSummaryTableReport;
