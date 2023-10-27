import React from "react";
import {
  Page,
  Document,
  StyleSheet,
  View,
  Text,
  Image,
} from "@react-pdf/renderer";
import { formatDate } from "../../../../utils";
import MLLogo from "../../../../../../frontend/src/ML-LOGO.png";

//function PrintMaterialDCTable() {
const styles = StyleSheet.create({
  insideBox: { borderBottom: "1px", padding: "0.6%" },
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
    // fontWeight: "bold",
    // fontSize: "12px",
    // paddingLeft: "15px",
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
const PrintReportFullStockListTable = ({
  customerDetails,
  fullStockTable,
  fullStockScrapTable,
}) => (
  <Document>
    <Page size="A4" style={{ padding: "3%", fontSize: "11" }}>
      {/* <View>
        <Text style={{ padding: "1%" }}></Text>
      </View> */}
      <View>
        {/* Top */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Image src={MLLogo} style={{ width: "8.3%" }} />
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "700" }}>
              Magod Laser Machining Pvt. Ltd.
            </Text>
            <Text style={{ fontWeight: "700" }}>
              GSTIN: 29AABCM1970H1ZE, CIN: U28900KA1995PTC018437
            </Text>
            <Text>
              #71 & 72, Phase II, KIADB Indl Area, Jigani, Anekal Taluk,
              Bengaluru - 560105
            </Text>
            <Text>
              +91-80-42291005, +91-8110-414313, info@magodlaser.in,
              https://www.magodlaser.in/
            </Text>
            <Text>Material Stock List as On : {formatDate(new Date(), 7)}</Text>
          </View>
          <Text style={{ padding: "3%" }}></Text>
        </View>
        <Text style={{ padding: "1%" }}></Text>
        <View style={{ border: "1px" }}>
          {/* Cust */}
          <View style={styles.insideBox}>
            <Text style={{ fontWeight: "bold" }}>Customer Name:</Text>
            <View style={{ paddingLeft: "1%" }}>
              <Text style={styles.title1}>{customerDetails.customerName}</Text>
              <Text style={styles.title1}>{customerDetails.address}</Text>
              <Text style={styles.title1}>{customerDetails.city}</Text>
            </View>
          </View>

          {/* material stock */}
          <View style={styles.insideBox}>
            <Text style={styles.title1}>Material Stock Details</Text>

            {/*  */}

            {fullStockTable.map((item, index) => {
              return (
                <>
                  <View style={{ ...styles.insideBox }}>
                    <Text style={styles.title1}>{item.material}</Text>
                    <View
                      style={{
                        ...styles.insideBox,
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: "0%",
                      }}
                    >
                      <Text style={styles.material}>Material</Text>
                      <Text style={styles.para}>Width</Text>
                      <Text style={styles.para}>Length</Text>
                      <Text style={styles.para}>Qty</Text>
                      <Text style={styles.para}>Weight</Text>
                      <Text style={styles.para}>Status</Text>
                      {/* <Text style={styles.line1}>
                    _________________________________________________________________________________________
                  </Text> */}
                    </View>

                    <View
                      style={{
                        ...styles.insideBox,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {item.data.map((item, index) => {
                        return (
                          <>
                            <View
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <Text style={styles.material}>
                                {item.Mtrl_Code}
                              </Text>
                              <Text style={styles.para}>
                                {item.DynamicPara1}
                              </Text>
                              <Text style={styles.para}>
                                {item.DynamicPara2}
                              </Text>
                              <Text style={styles.para}>{item.Qty}</Text>
                              <Text style={styles.para}>{item.Weight}</Text>
                              <Text style={styles.para}>
                                {item.Locked !== 0 ? " Locked" : ""}
                              </Text>
                            </View>
                          </>
                        );
                      })}
                    </View>

                    {/* <Text style={styles.line1}>
                      _________________________________________________________________________________________
                    </Text> */}
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Text style={styles.emptyblock1}></Text>
                      <Text style={styles.totalFinal}>
                        Total Quantity and Weight :
                      </Text>
                      <Text style={styles.qtyFinal}>{item.totqty}</Text>
                      <Text style={styles.weightFinal}>
                        {item.totwt.toFixed(2)}
                      </Text>
                      {/* <Text style={styles.line1}>
                      _________________________________________________________________________________________
                    </Text> */}
                      <Text style={{ padding: "3.5%" }}></Text>
                    </View>
                  </View>
                </>
              );
            })}
            {/*  */}
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default PrintReportFullStockListTable;
