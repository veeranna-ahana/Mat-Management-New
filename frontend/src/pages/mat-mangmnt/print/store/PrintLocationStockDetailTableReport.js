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
            <Text>Location Material Details List</Text>
          </View>
          <Text style={{ padding: "3%" }}></Text>
        </View>
        <Text style={{ padding: "1%" }}></Text>
        <View style={{ border: "1px" }}>
          <View style={{ ...styles.insideBox }}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={styles.leftBlock}>Location</Text>
              <Text style={styles.rightBlock}>{formHeader.LocationNo}</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={styles.leftBlock}>Customer</Text>
              <Text style={styles.rightBlock}>{formHeader.Customer}</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={styles.leftBlock}>Material</Text>
              <Text style={styles.rightBlock}>{formHeader.Mtrl_Code}</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={styles.leftBlock}>Dimension</Text>
              <Text style={styles.rightBlock}>
                {Math.round(formHeader.DynamicPara1)} X{" "}
                {Math.round(formHeader.DynamicPara2)}
              </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={styles.leftBlock}>Scrap</Text>
              <Text style={styles.rightBlock}>
                {formHeader.Scrap === 0 ? "False" : "True"}
              </Text>
            </View>
          </View>
          {/* <Text style={styles.line1}>
            _________________________________________________________________________________________
          </Text> */}
          <View
            style={{
              ...styles.insideBox,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text style={styles.col1}>MtrlStockID</Text>
            <Text style={styles.col2}>Weight</Text>
            <Text style={styles.col3}>Scrap Weight</Text>
          </View>
          {/* <Text style={styles.line1}>
            _________________________________________________________________________________________
          </Text> */}
          <View
            style={{
              ...styles.insideBox,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {tableData.map((item, index) => {
              return (
                <>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={styles.col1}>{item.MtrlStockID}</Text>
                    <Text style={styles.col2}>
                      {parseFloat(item.Weight).toFixed(2)}
                    </Text>
                    <Text style={styles.col3}>
                      {parseFloat(item.ScrapWeight).toFixed(2)}
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
            }}
          >
            <Text style={styles.col1}>Total Sheets : {tabletotal.qty}</Text>
            <Text style={styles.col2}>
              {parseFloat(tabletotal.tot1).toFixed(2)}
            </Text>
            <Text style={styles.col3}>
              {parseFloat(tabletotal.tot2).toFixed(2)}
            </Text>
          </View>
          {/* <Text style={styles.line1}>
            _________________________________________________________________________________________
          </Text> */}
        </View>
      </View>
    </Page>
  </Document>
);

export default PrintLocationStockDetailTableReport;
