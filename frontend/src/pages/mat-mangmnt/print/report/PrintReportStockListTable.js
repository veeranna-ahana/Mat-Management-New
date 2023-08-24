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
  material: {
    width: "35%",
    marginLeft: "28px",
    marginTop: "10px",
    fontSize: 10,
    fontWeight: "bold",
  },
  para: {
    width: "10%",
    marginLeft: "5px",
    marginTop: "10px",
    fontSize: 10,
    fontWeight: "bold",
  },
  emptyblock1: {
    width: "40%",
  },
  totalFinal: {
    width: "25%",
    marginLeft: "5px",
    marginTop: "13px",
    marginBottom: "10px",
    fontSize: 10,
  },

  qtyFinal: {
    width: "8%",
    marginLeft: "5px",
    marginTop: "13px",
    marginBottom: "10px",
    fontSize: 10,
  },

  weightFinal: {
    width: "8%",
    marginLeft: "20px",
    marginTop: "13px",
    marginBottom: "10px",
    fontSize: 10,
  },
});

//return <div>PrintMaterialDCTable</div>;
//}
const PrintReportStockListTable = ({
  customerDetails,
  tableData,
  scrapFlag,
  totQty1,
  totWeight1,
  totQty2,
  totWeight2,
  scrapData,
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
        <Text style={styles.titleFull}>
          Material Stock List as On : {formatDate(new Date(), 7)}
        </Text>
        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>

        <Text style={styles.betweenspace}></Text>
        <Text style={styles.title1}>{customerDetails.customerName}</Text>
        <Text style={styles.title1}>{customerDetails.address}</Text>
        <Text style={styles.title1}>{customerDetails.city}</Text>

        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>
        <Text style={styles.title1}>Material Stock Details</Text>
        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>
        <Text style={styles.title1}>{tableData[0].Material}</Text>

        <Text style={styles.material}>Material</Text>
        <Text style={styles.para}>Width</Text>
        <Text style={styles.para}>Length</Text>
        <Text style={styles.para}>Qty</Text>
        <Text style={styles.para}>Weight</Text>
        <Text style={styles.para}>Status</Text>
        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>

        {tableData.map((item, index) => {
          return (
            <>
              <Text style={styles.material}>{item.Mtrl_Code}</Text>
              <Text style={styles.para}>{item.DynamicPara1}</Text>
              <Text style={styles.para}>{item.DynamicPara2}</Text>
              <Text style={styles.para}>{item.Qty}</Text>
              <Text style={styles.para}>{item.Weight}</Text>
              <Text style={styles.para}>
                {item.Locked !== 0 ? " Locked" : ""}
              </Text>
            </>
          );
        })}
        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>
        <Text style={styles.emptyblock1}></Text>
        <Text style={styles.totalFinal}>Total Quantity and Weight :</Text>
        <Text style={styles.qtyFinal}>{totQty1}</Text>
        <Text style={styles.weightFinal}>{totWeight1.toFixed(2)}</Text>
        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>
        {scrapFlag !== 0 ? (
          <>
            <Text style={styles.title1}>Scrap Material Details</Text>
            <Text style={styles.line1}>
              _________________________________________________________________________________________
            </Text>
            <Text style={styles.title1}>{scrapData[0].Material}</Text>

            <Text style={styles.material}>Material</Text>
            <Text style={styles.para}>Width</Text>
            <Text style={styles.para}>Length</Text>
            <Text style={styles.para}>Qty</Text>
            <Text style={styles.para}>Weight</Text>
            <Text style={styles.para}>Status</Text>
            <Text style={styles.line1}>
              _________________________________________________________________________________________
            </Text>

            {scrapData.map((item, index) => {
              return (
                <>
                  <Text style={styles.material}>{item.Mtrl_Code}</Text>
                  <Text style={styles.para}>{item.DynamicPara1}</Text>
                  <Text style={styles.para}>{item.DynamicPara2}</Text>
                  <Text style={styles.para}>{item.Qty}</Text>
                  <Text style={styles.para}>{item.Weight}</Text>
                  <Text style={styles.para}>
                    {item.Locked !== 0 ? " Locked" : ""}
                  </Text>
                </>
              );
            })}
            <Text style={styles.line1}>
              _________________________________________________________________________________________
            </Text>
            <Text style={styles.emptyblock1}></Text>
            <Text style={styles.totalFinal}>Total Quantity and Weight :</Text>
            <Text style={styles.qtyFinal}>{totQty2}</Text>
            <Text style={styles.weightFinal}>{totWeight2.toFixed(2)}</Text>
            <Text style={styles.line1}>
              _________________________________________________________________________________________
            </Text>
          </>
        ) : (
          <></>
        )}
      </View>
    </Page>
  </Document>
);

export default PrintReportStockListTable;
