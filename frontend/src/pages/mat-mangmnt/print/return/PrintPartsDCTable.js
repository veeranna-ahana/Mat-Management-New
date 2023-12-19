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
  fontBold: {
    //   fontWeight: "bold",
    fontSize: "10px",
    fontFamily: "Helvetica-Bold",
  },
  pageStyling: { padding: "2%", fontSize: "10px", fontFamily: "Helvetica" },
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
    //fontSize: "11px",
  },
  titleFull1: {
    //border: "1px",
    padding: "5px",
    width: "100%",
    //fontSize: "10px",
  },
  titleLeft1: {
    //border: "1px",
    padding: "5px",
    width: "40%",
    //fontSize: "10px",
  },

  titleMiddle1: {
    //border: "1px",
    padding: "5px",
    width: "30%",
    //fontSize: "10px",
  },
  titleMiddle2: {
    padding: "5px",
    // width: "30%",
    //fontSize: "12px",
  },
  titleRight1: {
    //border: "1px",
    padding: "5px",
    width: "30%",
  },

  tableCol1: {
    padding: "5px",
    width: "9%",
  },
  tableCol2: {
    padding: "5px",
    width: "60%",
    fontWeight: "bold",
  },
  tableCol3: {
    padding: "5px",
    width: "19%",
  },
  tableCol4: {
    padding: "5px",
    width: "10%",
  },
});

//return <div>PrintMaterialDCTable</div>;
//}

const copiesNames = [
  { copyName: "Original for Recipient" },
  { copyName: "Transporter Copy" },
  { copyName: "Accounts Copy" },
  { copyName: "Extra Copy" },
];
const PrintPartsDCTable = ({
  formHeader,
  outData,
  custdata,
  dcRegister,
  totalQTYVar,
}) => (
  <Document>
    {copiesNames.map((copyVal, copyKey) => (
      <>
        <Page size="A4" style={{ ...styles.pageStyling }}>
          <View>
            {/* Top */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Image src={MLLogo} style={{ width: "8.3%" }} />
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  //   justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <Text>{"   "}</Text> */}
                <Text style={{ ...styles.fontBold }}>
                  Magod Laser Machining Private Limited
                </Text>
                <Text>GST: 29AABCM1970H1ZE CIN: U28900KA1995PTC018437</Text>
                <Text>
                  Plot No 72, 2nd Phase, KIADB Indl Area Jigani, Anekal Taluk
                  Bengaluru - 560105
                </Text>
                <Text>
                  Ph : 08110 414313, 9513393352, sales@magodlaser.in,
                  www.magodlaser.in
                </Text>
                <View>
                  <Text style={{ ...styles.fontBold }}>
                    Material / Scarp Sheets Return Challan
                  </Text>
                </View>
              </View>
              <Text style={{ width: "10%" }}>{copyVal.copyName}</Text>
            </View>
            {/* <View
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
      </View>
      <Text style={{ padding: "3%" }}></Text>
    </View> */}
            <Text style={{ padding: "0.5%" }}></Text>
            <View style={{ border: "1px" }}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View
                  style={{
                    ...styles.insideBox,
                    width: "70%",
                    // borderBottom: "1px",
                    borderRight: "1px",
                  }}
                >
                  <Text style={{ ...styles.fontBold }}>
                    {formHeader?.Customer} ({formHeader?.Cust_code})
                  </Text>
                  <View style={{ padding: "0.6%" }}>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text style={{ ...styles.fontBold }}>GSTIN : </Text>
                      <Text>{custdata?.GSTNo}</Text>
                    </View>

                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text style={{ ...styles.fontBold }}>Branch:</Text>

                      <Text>{custdata?.Branch}</Text>
                    </View>

                    {/* <View style={{ display: "flex", flexDirection: "row" }}> */}
                    <Text>{custdata?.Address}</Text>
                    <Text>
                      {custdata?.City}, {custdata?.State} - {custdata?.Pin_Code}
                    </Text>
                    {/* <Text>
              {custdata?.City} 
            </Text> */}
                    {/* <Text></Text> */}
                    {/* </View> */}
                  </View>
                </View>

                <View
                  style={{
                    ...styles.insideBox,
                    width: "30%",
                    display: "flex",
                    flexDirection: "column",
                    // justifyContent: "center",
                    // borderBottom: "1px",
                    // borderRight: "1px",
                  }}
                >
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={{ ...styles.fontBold }}>DC No : </Text>
                    <Text>{formHeader?.PkngDcNo}</Text>
                  </View>{" "}
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={{ ...styles.fontBold }}>IV No : </Text>
                    <Text>{formHeader?.IV_No}</Text>
                  </View>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={{ ...styles.fontBold }}>IV Date : </Text>
                    <Text>{formHeader?.IV_Date}</Text>
                  </View>
                </View>
              </View>

              {/* <View style={{ ...styles.titleRight1 }}></View> */}

              {/* <Text style={styles.titleFull1}> */}
              <View style={{ ...styles.insideBox }}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text style={{ ...styles.fontBold }}>Authority : </Text>
                  <Text>{dcRegister?.AuhtorisingDocu}</Text>
                </View>
              </View>

              {/* <Text style={styles.topspace}></Text> */}

              <View
                style={{
                  ...styles.insideBox,
                  ...styles.fontBold,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <Text style={styles.tableCol1}>SL No</Text>
                <Text style={styles.tableCol2}>PartId / Part Name</Text>
                <Text style={styles.tableCol3}>Remarks</Text>
                <Text style={styles.tableCol4}>Quantity</Text>
              </View>
              <View
                style={{
                  ...styles.insideBox,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {outData?.map((item, index) => {
                  return (
                    <>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Text style={styles.tableCol1}>{index + 1}</Text>
                        <Text style={styles.tableCol2}>
                          {item.PartId?.split("/**Ref:")[0]}
                        </Text>
                        <Text style={styles.tableCol3}>{item.Remarks}</Text>
                        <Text style={styles.tableCol4}>{item.QtyReturned}</Text>
                      </View>
                    </>
                  );
                })}
              </View>

              {/* <Text style={styles.topspace}></Text>
      <Text style={styles.topspace}></Text>
      <Text style={styles.topspace}></Text>
      <Text style={styles.topspace}></Text> */}
              {/* <Text style={styles.titleLeft1}></Text> */}
              <View style={{ padding: "1%" }}></View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0.6%",
                }}
              >
                <Text style={{ ...styles.fontBold }}>Remarks :</Text>
                <View style={{ padding: "5%", border: "1px" }}></View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    ...styles.titleMiddle2,
                  }}
                >
                  <Text style={{ ...styles.fontBold }}>Total Items : </Text>
                  <Text>{outData?.length}</Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    ...styles.titleMiddle2,
                  }}
                >
                  <Text style={{ ...styles.fontBold }}>Total Quantity : </Text>
                  <Text>{totalQTYVar}</Text>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </>
    ))}
  </Document>
);

export default PrintPartsDCTable;
