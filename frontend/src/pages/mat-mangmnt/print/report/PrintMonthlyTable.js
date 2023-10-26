import React from "react";
import {
  Page,
  Document,
  StyleSheet,
  View,
  Text,
  Image,
} from "@react-pdf/renderer";
import MLLogo from "../../../../../../frontend/src/ML-LOGO.png";

import { formatDate } from "../../../../utils";

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
    padding: "5px",
    paddingLeft: "15px",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "14px",
  },
  titleFull1: {
    padding: "5px",
    paddingLeft: "15px",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "12px",
  },
  titleFull2: {
    padding: "5px",
    paddingLeft: "25px",
    width: "100%",
    fontWeight: "bold",
    fontSize: "12px",
  },
  titleFull3: {
    padding: "5px",
    paddingLeft: "35px",
    width: "100%",
    fontWeight: "bold",
    fontSize: "12px",
    textDecoration: "underline",
  },

  line1: {
    width: "100%",
    paddingLeft: "15px",
  },
  material: {
    width: "30%",
    marginLeft: "50px",
    marginTop: "5px",
    fontSize: 11,
    fontWeight: "bold",
  },
  weightinkgs: {
    width: "30%",
    marginLeft: "5px",
    marginTop: "5px",
    fontSize: 11,
    fontWeight: "bold",
  },
  totqty: {
    width: "20%",
    marginLeft: "5px",
    marginTop: "5px",
    fontSize: 11,
    fontWeight: "bold",
  },
  para: {
    width: "10%",
    marginLeft: "5px",
    marginTop: "2px",
    fontSize: 8,
    fontWeight: "bold",
  },
  docu: {
    width: "50%",
    marginLeft: "5px",
    marginTop: "2px",
    fontSize: 8,
    fontWeight: "bold",
  },
});

//return <div>PrintMaterialDCTable</div>;
//}
const PrintMonthlyTable = ({
  date,
  thirdTab,
  fourthTab,
  totalobj,
  purchaseDetails,
  saleDetails,
}) => (
  <Document>
    <Page size="A4" style={{ padding: "3%", fontSize: "11" }}>
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
            <Text>Material Summary For the Month of : {date}</Text>
          </View>
          <Text style={{ padding: "3%" }}></Text>
        </View>
        <Text style={{ padding: "1%" }}></Text>
        <View style={{ border: "1px" }}>
          <View
            style={{
              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "center",
              padding: "1%",
            }}
          >
            {/* summary section */}
            {/* Material Purchase Summary */}
            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Text style={{ borderBottom: "1px" }}>
                  Material Purchase Summary
                </Text>
              </View>
              <View
                style={{
                  ...styles.insideBox,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <Text style={styles.material}>Material</Text>
                <Text style={styles.weightinkgs}>Weight in Kgs</Text>
              </View>
              <View
                style={{
                  ...styles.insideBox,
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent: "flex-start",
                }}
              >
                {fourthTab.map((item, index) => {
                  return (
                    <>
                      <View
                        style={{
                          // ...styles.insideBox,
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Text style={styles.material}>{item.Material}</Text>
                        <Text style={styles.weightinkgs}>
                          {Math.round(parseFloat(item.TotalWeight))}
                        </Text>
                      </View>
                    </>
                  );
                })}
              </View>
            </View>
            {/* Material Sales Summary */}
            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Text style={{ borderBottom: "1px" }}>
                  Material Sales Summary
                </Text>
              </View>
              <View
                style={{
                  ...styles.insideBox,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <Text style={styles.material}>Material</Text>
                <Text style={styles.weightinkgs}>Weight in Kgs</Text>
              </View>
              <View
                style={{
                  ...styles.insideBox,
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent: "flex-start",
                }}
              >
                {thirdTab.map((item, index) => {
                  return (
                    <>
                      <View
                        style={{
                          // ...styles.insideBox,
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Text style={styles.material}>{item.Material}</Text>
                        <Text style={styles.weightinkgs}>
                          {Math.round(parseFloat(item.SrlWt))}
                        </Text>
                      </View>
                    </>
                  );
                })}
              </View>
            </View>
            {/* Monthly Material Handling Summary */}

            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Text style={{ borderBottom: "1px" }}>
                  Monthly Material Handling Summary
                </Text>
              </View>

              <View
                style={{
                  ...styles.insideBox,
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent: "flex-start",
                }}
              >
                {totalobj.map((item, index) => {
                  return (
                    <>
                      <View
                        style={{
                          // ...styles.insideBox,
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Text style={styles.material}>{item.type}</Text>
                        <Text style={styles.weightinkgs}>Material</Text>
                        <Text style={styles.totqty}>
                          Quantity : {item.total}
                        </Text>
                      </View>
                    </>
                  );
                })}
              </View>
            </View>

            {/* details sections */}
            {/*Material Purchase Details */}

            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Text style={{ borderBottom: "1px" }}>
                  Material Purchase Details
                </Text>
              </View>

              <View
                style={{
                  ...styles.insideBox,
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent: "flex-start",
                  border: "none",
                }}
              >
                {purchaseDetails.map((item, index) => {
                  return (
                    <>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ borderBottom: "1px" }}>
                          {item.material}
                        </Text>
                      </View>

                      <View
                        style={{
                          // ...styles.insideBox,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {item.data.map((item, index) => {
                          return (
                            <>
                              <View
                                style={{
                                  // ...styles.insideBox,
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Text style={styles.para}>
                                  {formatDate(new Date(item.RV_Date), 3)}
                                </Text>
                                <Text style={styles.para}>{item.RV_No}</Text>
                                <Text style={styles.para}>
                                  {Math.round(parseInt(item.TotalWeight))}
                                </Text>
                                <Text style={styles.docu}>
                                  {item.CustDocuNo}
                                </Text>
                              </View>
                            </>
                          );
                        })}
                        <View
                          style={{
                            // ...styles.insideBox,
                            // border: "none",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            borderTop: "1px",
                            borderBottom: "1px",
                            marginTop: "0.6%",
                            padding: "0.6%",
                          }}
                        >
                          <Text style={styles.para}></Text>
                          <Text style={styles.para}>Total</Text>
                          <Text style={styles.para}>{item.totwt}</Text>
                          <Text style={styles.docu}></Text>
                        </View>
                      </View>
                    </>
                  );
                })}
              </View>
            </View>

            {/* Material Sales Details */}

            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Text style={{ borderBottom: "1px" }}>
                  Material Sales Details
                </Text>
              </View>

              <View
                style={{
                  ...styles.insideBox,
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent: "flex-start",
                  border: "none",
                }}
              >
                {saleDetails.map((item, index) => {
                  return (
                    <>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ borderBottom: "1px" }}>
                          {item.material}
                        </Text>
                      </View>

                      <View
                        style={{
                          // ...styles.insideBox,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {item.data.map((item, index) => {
                          return (
                            <>
                              <View
                                style={{
                                  // ...styles.insideBox,
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Text style={styles.para}>
                                  {formatDate(new Date(item.Inv_Date), 3)}
                                </Text>
                                <Text style={styles.para}>{item.Inv_No}</Text>
                                <Text style={styles.para}>
                                  {Math.round(parseInt(item.SrlWt))}
                                </Text>
                                <Text style={styles.docu}>
                                  {item.Cust_Name}
                                </Text>
                              </View>
                            </>
                          );
                        })}
                        <View
                          style={{
                            // ...styles.insideBox,
                            // border: "none",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            borderTop: "1px",
                            borderBottom: "1px",
                            marginTop: "0.6%",
                            padding: "0.6%",
                          }}
                        >
                          <Text style={styles.para}></Text>
                          <Text style={styles.para}>Total</Text>
                          <Text style={styles.para}>{item.totwt}</Text>
                          <Text style={styles.docu}></Text>
                        </View>
                      </View>
                    </>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default PrintMonthlyTable;
