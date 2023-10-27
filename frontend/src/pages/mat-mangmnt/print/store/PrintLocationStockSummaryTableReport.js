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
    <Page size="A4" style={{ padding: "3%", fontSize: "11" }}>
      <View>
        {/* top */}
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
            <Text>Location Material Stock Summary</Text>
          </View>
          <Text style={{ padding: "3%" }}></Text>
        </View>
        <Text style={{ padding: "1%" }}></Text>
        <View style={{ border: "1px" }}>
          <View
            style={{
              ...styles.insideBox,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.headercol1}>
              Location : {formHeader.LocationNo}
            </Text>
            <Text style={styles.headercol1}>
              Type : {formHeader.StorageType}
            </Text>
            <Text style={styles.headercol1}>
              Capacity : {formHeader.Capacity}
            </Text>
            <Text style={styles.headercol1}>
              Current Usage : {formHeader.CapacityUtilised}
            </Text>
          </View>
          {/* <Text style={styles.line1}>
            _________________________________________________________________________________________
          </Text> */}
          <View
            style={{
              ...styles.insideBox,
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <Text style={styles.col1}>Material</Text>
            <Text style={styles.col2}>Length</Text>
            <Text style={styles.col2}>Width</Text>
            <Text style={styles.col2}>Quantity</Text>
            <Text style={styles.col2}>Weight</Text>
            <Text style={styles.col2}>Scrap Weight</Text>
          </View>
          {/* <Text style={styles.line1}>
            _________________________________________________________________________________________
          </Text> */}
          {tableData.map((item, index) => {
            return (
              <>
                <View
                  style={{
                    ...styles.insideBox,
                    display: "flex",
                    flexDirection: "column",
                    // justifyContent: "space-between",
                  }}
                >
                  {/* <Text style={styles.title1}>{item.customer}</Text> */}
                  <View
                    style={{
                      ...styles.insideBox,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Text>{item.customer}</Text>
                  </View>
                  {/* </View> */}
                  {/* <Text style={styles.line1}>
                  _________________________________________________________________________________________
                </Text> */}
                  {item.rawlength !== 0 ? (
                    <>
                      <View
                        style={{
                          // ...styles.insideBox,
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={styles.insideBox}>Raw Material</Text>
                        {/* <Text style={styles.title2}>Raw Material</Text> */}
                      </View>
                      <View
                        style={{
                          ...styles.insideBox,
                          display: "flex",
                          flexDirection: "column",
                          // justifyContent: "space-between",
                        }}
                      >
                        {item.rawMaterial.map((item, index) => {
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
                                <Text style={styles.col1}>
                                  {item.Mtrl_Code}
                                </Text>
                                <Text style={styles.col2}>
                                  {item.DynamicPara1}
                                </Text>
                                <Text style={styles.col2}>
                                  {item.DynamicPara2}
                                </Text>
                                <Text style={styles.col2}>{item.Quantity}</Text>
                                <Text style={styles.col2}>
                                  {parseFloat(item.Weight).toFixed(2)}
                                </Text>
                                <Text style={styles.col2}>
                                  {parseFloat(item.SWeight).toFixed(2)}
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
                          ...styles.insideBox,
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Text style={styles.col1}></Text>
                        <Text style={styles.col2}></Text>
                        <Text style={styles.col2}></Text>
                        <Text style={styles.col2}>{item.tot1qty}</Text>
                        <Text style={styles.col2}>
                          {parseFloat(item?.tot1wt).toFixed(2)}
                        </Text>
                        <Text style={styles.col2}>
                          {parseFloat(item.tot1swt).toFixed(2)}
                        </Text>
                      </View>
                      {/* <Text style={styles.line1}>
                     
                        _________________________________________________________________________________________
                      </Text> */}
                    </>
                  ) : (
                    <></>
                  )}

                  {item.scraplength !== 0 ? (
                    <>
                      <View
                        style={{
                          // ...styles.insideBox,
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={styles.insideBox}>Scrap Material</Text>
                        {/* <Text style={styles.title2}>Raw Material</Text> */}
                      </View>
                      <View
                        style={{
                          ...styles.insideBox,
                          display: "flex",
                          flexDirection: "column",
                          // justifyContent: "space-between",
                        }}
                      >
                        {item.scrapMaterial.map((item, index) => {
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
                                <Text style={styles.col1}>
                                  {item.Mtrl_Code}
                                </Text>
                                <Text style={styles.col2}>
                                  {item.DynamicPara1}
                                </Text>
                                <Text style={styles.col2}>
                                  {item.DynamicPara2}
                                </Text>
                                <Text style={styles.col2}>{item.Quantity}</Text>
                                <Text style={styles.col2}>
                                  {parseFloat(item.Weight).toFixed(2)}
                                </Text>
                                <Text style={styles.col2}>
                                  {parseFloat(item.SWeight).toFixed(2)}
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
                          ...styles.insideBox,
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Text style={styles.col1}></Text>
                        <Text style={styles.col2}></Text>
                        <Text style={styles.col2}></Text>
                        <Text style={styles.col2}>{item.tot2qty}</Text>
                        <Text style={styles.col2}>
                          {parseFloat(item.tot2wt).toFixed(2)}
                        </Text>
                        <Text style={styles.col2}>
                          {parseFloat(item.tot2swt).toFixed(2)}
                        </Text>
                      </View>
                      {/* <Text style={styles.line1}>
                     
                        _________________________________________________________________________________________
                      </Text> */}
                    </>
                  ) : (
                    <></>
                  )}

                  {/* for scrap */}
                  {/* {item.scraplength !== 0 ? (
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
                  )} */}
                </View>
              </>
            );
          })}
        </View>
      </View>
    </Page>
  </Document>
);

export default PrintLocationStockSummaryTableReport;
