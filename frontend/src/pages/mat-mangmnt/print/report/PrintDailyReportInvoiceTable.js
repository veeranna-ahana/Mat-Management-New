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
  invno: {
    width: "10%",
    marginLeft: "18px",
    marginTop: "10px",
    fontSize: 10,
    fontWeight: "bold",
  },
  customer: {
    width: "40%",
    marginLeft: "25px",
    marginTop: "10px",
    fontSize: 10,
    fontWeight: "bold",
  },
  material: {
    width: "20%",
    marginLeft: "5px",
    marginTop: "10px",
    fontSize: 10,
    fontWeight: "bold",
  },
  weight: {
    width: "20%",
    marginLeft: "5px",
    marginTop: "10px",
    fontSize: 10,
    fontWeight: "bold",
  },
  invnoval: {
    width: "10%",
    marginLeft: "18px",
    marginTop: "2px",
    fontSize: 8,
    fontWeight: "bold",
  },
  customerval: {
    width: "40%",
    marginLeft: "25px",
    marginTop: "2px",
    fontSize: 8,
    fontWeight: "bold",
  },
  materialval: {
    width: "20%",
    marginLeft: "5px",
    marginTop: "2px",
    fontSize: 8,
    fontWeight: "bold",
  },
  weightval: {
    width: "20%",
    marginLeft: "5px",
    marginTop: "2px",
    fontSize: 8,
    fontWeight: "bold",
  },
  titleFull3: {
    padding: "5px",
    paddingLeft: "35px",
    width: "100%",
    fontWeight: "bold",
    fontSize: "12px",
    textDecoration: "underline",
  },
});

//return <div>PrintMaterialDCTable</div>;
//}
const PrintDailyReportInvoiceTable = ({ tableData, date }) => (
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
            <Text>
              {" "}
              Daily Invoice Material Dispatch List :{" "}
              {formatDate(new Date(date), 3)}
            </Text>
          </View>
          <Text style={{ padding: "3%" }}></Text>
        </View>
        <Text style={{ padding: "1%" }}></Text>
        <View style={{ border: "1px", borderBottom: "none" }}>
          {/* material stock */}
          <View style={styles.insideBox}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.invno}>Invoice No</Text>
              <Text style={styles.customer}>Customer</Text>
              <Text style={styles.material}>Material</Text>
              <Text style={styles.weight}>Weight</Text>
            </View>
          </View>

          {tableData.map((item, index) => {
            return (
              <>
                {/* <Text style={styles.line1}>
                  _________________________________________________________________________________________
                </Text> */}

                <View
                  style={{
                    ...styles.insideBox,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    fontWeight: "bold",
                    padding: "1%",
                  }}
                >
                  <Text>{item.material}</Text>
                </View>
                {/* <Text style={styles.insideBox}></Text> */}
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
                          style={{
                            // ...styles.insideBox,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={styles.invnoval}>{item.Inv_No}</Text>
                          <Text style={styles.customerval}>
                            {item.Cust_Name}
                          </Text>
                          <Text style={styles.materialval}>
                            {item.Material}
                          </Text>
                          <Text style={styles.weightval}>{item.SrlWt}</Text>
                        </View>
                      </>
                    );
                  })}

                  {/* <Text style={styles.line1}>
                  _________________________________________________________________________________________
                </Text> */}
                  <View
                    style={{
                      ...styles.insideBox,
                      border: "none",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      borderTop: "1px solid black",
                      marginTop: "0.6%",
                    }}
                  >
                    <Text style={styles.invnoval}></Text>
                    <Text style={styles.customerval}></Text>
                    <Text style={styles.materialval}>Total</Text>
                    <Text style={styles.weightval}>
                      {item.totwt.toFixed(2)}
                    </Text>
                  </View>

                  {/* <Text style={styles.line1}>
                  _________________________________________________________________________________________
                </Text> */}
                </View>
              </>
            );
          })}
        </View>
      </View>
    </Page>
  </Document>
);

export default PrintDailyReportInvoiceTable;
