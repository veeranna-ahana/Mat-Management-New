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
    // width: "30%",
    fontSize: "12px",
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

const PrintMaterialDCTable = ({
  formHeader,
  outData,
  custdata,
  dcRegister,
  totalQTYVar,
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
            {/* <Text>Material Stock List as On : {formatDate(new Date(), 7)}</Text> */}
          </View>
          <Text style={{ padding: "3%" }}></Text>
        </View>
        <Text style={{ padding: "1%" }}></Text>
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
              <Text style={{ fontWeight: "bold" }}>
                {formHeader?.Customer} ({formHeader?.Cust_code})
              </Text>
              <View style={{ padding: "0.6%" }}>
                <Text>GST No: {custdata?.GSTNo}</Text>
                <Text>Branch: {custdata?.Branch}</Text>
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
              <Text>DC No : {dcRegister?.DC_No}</Text>
              <Text>IV No : {formHeader?.IV_No}</Text>
              <Text>
                IV Date : {formHeader?.IV_Date}
                {/* {formatDate(
                  new Date(
                    new Date(
                      formHeader?.IV_Date.toString().substring(0, 10)
                    ).toDateString()
                  ),
                  1
                )} */}
              </Text>
            </View>
          </View>

          {/* <View style={{ ...styles.titleRight1 }}></View> */}

          {/* <Text style={styles.titleFull1}> */}
          <View style={{ ...styles.insideBox }}>
            <Text>Authority : {dcRegister?.AuhtorisingDocu}</Text>
          </View>

          {/* <Text style={styles.topspace}></Text> */}

          <View
            style={{
              ...styles.insideBox,
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <Text style={styles.tableCol1}>SL No</Text>
            <Text style={styles.tableCol2}>Description</Text>
            <Text style={styles.tableCol3}>Material</Text>
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
                    <Text style={styles.tableCol2}>{item.MtrlDescription}</Text>
                    <Text style={styles.tableCol3}>{item.Material}</Text>
                    <Text style={styles.tableCol4}>{item.Qty}</Text>
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
            <Text>Remarks :</Text>
            <View style={{ padding: "5%", border: "1px" }}></View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Text style={styles.titleMiddle2}>
              Total Items : {outData?.length}
            </Text>
            {/* <Text style={styles.titleLeft1}></Text> */}
            <Text style={styles.titleMiddle2}>
              Total Quantity : {totalQTYVar}
            </Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default PrintMaterialDCTable;
