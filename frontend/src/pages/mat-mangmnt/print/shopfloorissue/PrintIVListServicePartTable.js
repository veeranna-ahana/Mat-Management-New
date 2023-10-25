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

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    flexDirection: "column",
    // margin: "30px",
  },

  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 10,
    border: "1px solid black",
    paddingTop: "10px",
    paddingBottom: "10px",
  },

  title1: {
    width: "100%",
    marginLeft: "127px",
    fontSize: 15,
    fontWeight: "bold",
    textDecoration: "underline",
    fontFamily: "Helvetica-Bold",
    alignSelf: "center",
  },
  title2: {
    width: "100%",
    marginTop: "6px",
    marginLeft: "130px",
    fontSize: 13,
    fontWeight: "bolder",
    textDecoration: "underline",
    fontFamily: "Helvetica-Bold",
    alignSelf: "center",
  },
  line1: {
    marginTop: "8px",
    fontWeight: "bold",
    width: "100%",
  },
  line2: {
    width: "100%",
  },
  line3: {
    width: "100%",
    marginTop: "-7px",
  },
  blockRightAlign: {
    width: "10%",
    textAlign: "left",
    marginLeft: "10px",
    marginTop: "10px",
    fontSize: "9",
    fontFamily: "Helvetica-Bold",
  },
  blockLeftAlign: {
    width: "20%",
    marginLeft: "10px",
    marginTop: "10px",
    fontSize: "9",
  },
  blockLeftAlignBigger: {
    width: "30%",
    marginLeft: "10px",
    marginTop: "10px",
    fontSize: "9",
  },
  linegap: {
    marginTop: "5px",
  },

  assemblyPartList: {
    width: "100%",
    marginTop: "15px",
    marginLeft: "10px",
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
  },
  partQuantity: {
    width: "100%",
    marginTop: "5px",
    marginLeft: "370px",
    fontSize: 10,
    fontWeight: "bold",
    textDecoration: "underline",
    fontFamily: "Helvetica-Bold",
  },
  // tableHeader: {
  //   width: "100%",
  //   marginTop: "5px",
  //   fontSize: 10,
  // },
  partID: {
    width: "30%",
    marginLeft: "10px",
    marginTop: "5px",
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
  rvNO: {
    width: "20%",
    marginTop: "5px",
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
  issued: {
    width: "10%",
    marginLeft: "20px",
    marginTop: "5px",
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
  used: {
    width: "8%",
    marginLeft: "10px",
    marginTop: "5px",
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
  returned: {
    width: "8%",
    marginLeft: "0px",
    marginTop: "5px",
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },

  partIDVal: {
    width: "15%",
    marginLeft: "10px",
    fontSize: 10,
    fontWeight: "bold",
    marginTop: "10px",
  },
  linegap2: {
    width: "15%",
  },

  rvNOVal: {
    width: "40%",
    marginLeft: "5px",
    fontSize: 10,
    marginTop: "10px",
  },
  issuedVal: {
    width: "8%",
    marginLeft: "5px",
    fontSize: 10,
    marginTop: "10px",
  },
  usedVal: {
    width: "8%",
    marginLeft: "5px",
    fontSize: 10,
    marginTop: "10px",
  },
  returnedVal: {
    width: "8%",
    marginLeft: "5px",
    fontSize: 10,
    marginTop: "10px",
  },
  issuedByReceivedBy: {
    width: "45%",
    marginLeft: "10px",
    marginTop: "10px",
    fontSize: 11,
    textDecoration: "underline",
    fontFamily: "Helvetica-Bold",
  },
  lastText: {
    width: "45%",
    marginLeft: "10px",
    marginTop: "10px",
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
  },
  logoImage: {
    width: "50px",
    marginLeft: "10px",
  },
  companyInfo: {
    marginTop: "5px",
    marginLeft: "20%",
    width: "60%",
    fontSize: "9",
    alignSelf: "center",
  },
});

const PrintIVListServicePartTable = ({ formHeader, tableData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.tableContainer}>
        {/* <Image src={MLLogo} style={styles.logoImage} />
        <Text style={styles.title1}>Magod Laser Machining Pvt Ltd : Jigni</Text>

        <Text style={styles.title2}>
          Production : Assemby Parts Issue Voucher
        </Text> */}
        {/* marginLeft: "127px" */}

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image src={MLLogo} style={styles.logoImage} />
          <View>
            <Text style={styles.title1}>
              Magod Laser Machining Pvt Ltd : Jigni
            </Text>
            <Text style={styles.title2}>
              Production : Assembly Parts Issue Voucher
            </Text>
            <Text style={{ ...styles.companyInfo, marginLeft: "90px" }}>
              GSTIN: 29AABCM1970H1ZE, CIN: U28900KA1995PTC018437
            </Text>
            <Text style={{ ...styles.companyInfo, marginLeft: "50px" }}>
              #71 & 72, Phase II, KIADB Indl Area, Jigani, Anekal Taluk,
              Bengaluru - 560105
            </Text>
            <Text style={{ ...styles.companyInfo, marginLeft: "10px" }}>
              +91-80-42291005, +91-8110-414313, info@magodlaser.in,
              https://www.magodlaser.in/
            </Text>
          </View>
        </View>
        <Text style={styles.line1}>
          ______________________________________________________________________________________________
        </Text>

        <View style={styles.blockRightAlign}>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>IV No</Text>
          <Text style={styles.linegap}>Date</Text>
          <Text style={styles.linegap}>Task No</Text>
          <Text style={styles.linegap}>Program No</Text>
          <Text style={styles.linegap}>Set Issued</Text>
          <Text style={styles.linegap}>Set Returned</Text>
        </View>
        <View style={styles.blockLeftAlign}>
          <Text>{formHeader?.IV_No}</Text>
          <Text style={styles.linegap}>{formHeader.Issue_date}</Text>
          <Text style={styles.linegap}>{formHeader.TaskNo}</Text>
          <Text style={styles.linegap}>{formHeader.NCProgramNo}</Text>
          <Text style={styles.linegap}>{formHeader.QtyIssued}</Text>
        </View>

        <View style={styles.blockRightAlign}>
          <Text>Customer</Text>
          <Text style={styles.linegap}>Assy Name</Text>
          <Text style={styles.linegap}>Operation</Text>
          <Text style={styles.linegap}>Mtrl Code</Text>
          <Text style={styles.linegap}>Machine</Text>
          <Text style={styles.linegap}>Remarks</Text>
        </View>

        <View style={styles.blockLeftAlignBigger}>
          <Text>{formHeader.Cust_name}</Text>
          <Text style={styles.linegap}>{formHeader.AssyName}</Text>
          <Text style={styles.linegap}>{formHeader.Operation}</Text>
          <Text style={styles.linegap}>{formHeader.Mtrl_Code}</Text>
          <Text style={styles.linegap}>{formHeader.Machine}</Text>
          <Text style={styles.linegap}>{formHeader.Remarks}</Text>
        </View>
        <Text style={styles.line1}>
          ______________________________________________________________________________________________
        </Text>
        <Text style={styles.assemblyPartList}>Assemby Parts List</Text>
        <Text style={styles.partQuantity}>Part Quantity</Text>
        {/* Table Header */}
        <View></View>
        <Text style={styles.partID}>Part ID</Text>
        <Text style={styles.rvNO}>RV No</Text>
        <Text style={styles.issued}>Issued</Text>
        <Text style={styles.used}>Used</Text>
        <Text style={styles.returned}>Returned</Text>
        <Text style={styles.line2}>
          ______________________________________________________________________________________________
        </Text>
        {/* Table Row */}
        {tableData.map((item, index) => {
          return (
            <>
              <Text style={styles.partIDVal}>{item.PartId}</Text>
              <Text style={styles.rvNOVal}>
                {item.RV_No}({item.CustDocuNo})
              </Text>
              <Text style={styles.issuedVal}>{item.QtyIssued}</Text>
              {/* <Text style={styles.usedVal}>{item.QtyUsed}</Text> */}
              <Text style={styles.usedVal}></Text>

              {/* <Text style={styles.returnedVal}>{item.QtyReturned}</Text> */}
              <Text style={styles.returnedVal}></Text>

              {/* <Text style={styles.line3}>
                {" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;________________________________________________________________________
              </Text> */}
              <Text style={styles.line2}>
                ______________________________________________________________________________________________
              </Text>
            </>
          );
        })}

        {/* Issue By & Received By */}
        <Text style={styles.issuedByReceivedBy}>Issued By</Text>
        <Text style={styles.issuedByReceivedBy}>Received By</Text>
        <Text style={styles.lastText}>Name</Text>
        <Text style={styles.lastText}>Name</Text>
        <Text style={styles.lastText}>Signature</Text>
        <Text style={styles.lastText}>Signature</Text>
        <Text style={styles.lastText}>Date</Text>
        <Text style={styles.lastText}>Date</Text>
      </View>
    </Page>
  </Document>
);

export default PrintIVListServicePartTable;
