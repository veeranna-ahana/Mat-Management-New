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
    fontWeight: "bold",
    fontSize: "14px",
  },
  line1: {
    width: "100%",
    paddingLeft: "15px",
  },
  rvno: {
    width: "9%",
    // marginLeft: "18px",
    marginTop: "6px",
    fontSize: 10,
    fontWeight: "bold",
  },
  customer: {
    width: "34%",
    // marginLeft: "5px",
    marginTop: "6px",
    fontSize: 10,
    fontWeight: "bold",
  },
  material: {
    width: "12%",
    // marginLeft: "5px",
    marginTop: "6px",
    fontSize: 10,
    fontWeight: "bold",
  },
  totalweight: {
    width: "12%",
    // marginLeft: "5px",
    marginTop: "6px",
    fontSize: 10,
    fontWeight: "bold",
  },
  shape: {
    width: "13%",
    // marginLeft: "5px",
    marginTop: "6px",
    fontSize: 10,
    fontWeight: "bold",
  },
  quantity: {
    width: "12%",
    // marginLeft: "5px",
    marginTop: "6px",
    fontSize: 10,
    fontWeight: "bold",
  },
  rvnoVal: {
    width: "10%",
    // marginLeft: "18px",
    marginTop: "3px",
    fontSize: 8,
  },
  customerVal: {
    width: "34%",
    // marginLeft: "5px",
    marginTop: "3px",
    fontSize: 8,
  },
  materialVal: {
    width: "12%",
    // marginLeft: "5px",
    marginTop: "3px",
    fontSize: 8,
  },
  totalweightVal: {
    width: "12%",
    // marginLeft: "5px",
    marginTop: "3px",
    fontSize: 8,
  },
  shapeVal: {
    width: "13%",
    // marginLeft: "5px",
    marginTop: "3px",
    fontSize: 8,
  },
  quantityVal: {
    width: "12%",
    // marginLeft: "5px",
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
            <Text>
              {" "}
              Daily Material Arrival Report : {formatDate(new Date(date), 3)}
            </Text>
          </View>
          <Text style={{ padding: "3%" }}></Text>
        </View>
        <Text style={{ padding: "1%" }}></Text>
        <View style={{ border: "1px" }}>
          {/* Cust */}
          {/* <View style={styles.insideBox}>
            <Text style={{ fontWeight: "bold" }}>Customer Name:</Text>
            <View style={{ paddingLeft: "1%" }}>
              <Text style={styles.title1}>{customerDetails.customerName}</Text>
              <Text style={styles.title1}>{customerDetails.address}</Text>
              <Text style={styles.title1}>{customerDetails.city}</Text>
            </View>
          </View> */}

          {/* material stock */}
          <View style={styles.insideBox}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.rvno}>Rv No</Text>
              <Text style={styles.customer}>Customer</Text>
              <Text style={styles.material}>Material</Text>
              <Text style={styles.shape}>Shape</Text>
              <Text style={styles.totalweight}>Total Weight</Text>
              <Text style={styles.quantity}>Quantity</Text>
            </View>
          </View>
          <View style={styles.insideBox}>
            <View style={{ display: "flex", flexDirection: "column" }}>
              {tableData.map((item, index) => {
                return (
                  <>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={styles.rvnoVal}>{item.RV_No}</Text>
                      <Text style={styles.customerVal}>{item.Customer}</Text>
                      <Text style={styles.materialVal}>{item.material}</Text>
                      <Text style={styles.shapeVal}>{item.Shape}</Text>
                      <Text style={styles.totalweightVal}>
                        {item.totalWeight}
                      </Text>
                      <Text style={styles.quantityVal}>{item.qty}</Text>
                    </View>
                  </>
                );
              })}
            </View>
          </View>

          <View style={{ ...styles.insideBox, border: "none" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Text style={styles.summaryFinal}>Summary</Text>
              <Text style={styles.totalWeightFinal}>
                {totalweight.toFixed(2)}
              </Text>
              <Text style={styles.quantityFinal}>{totqty}</Text>
              <Text style={{ padding: "3.5%" }}></Text>
            </View>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "3%",
            // marginTop: "1.5%",
          }}
        >
          <Text
          //  style={styles.MaterialReceiptIncharge}
          >
            Material Receipt Incharge
          </Text>
          <Text
          // style={styles.MaterialDeptIncharge}
          >
            Material Dept Incharge
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default PrintDailyReportReceiptTable;
