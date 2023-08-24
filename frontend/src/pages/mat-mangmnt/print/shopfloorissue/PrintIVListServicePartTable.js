import React from "react";
import { Page, Document, StyleSheet, View, Text } from "@react-pdf/renderer";
import { formatDate } from "../../../../utils";

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    flexDirection: "column",
    margin: "50px",
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  title1: {
    width: "100%",
    marginLeft: "127px",
    fontSize: 15,
    fontWeight: "bold",
    textDecoration: "underline",
  },
  title2: {
    width: "100%",
    marginTop: "8px",
    marginLeft: "130px",
    fontSize: 13,
    fontWeight: "bolder",
    textDecoration: "underline",
  },
  line1: {
    marginTop: "10px",
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
    textAlign: "right",
    marginLeft: "10px",
    marginTop: "10px",
    fontSize: "9",
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
  },
  partQuantity: {
    width: "100%",
    marginTop: "5px",
    marginLeft: "370px",
    fontSize: 10,
    fontWeight: "bold",
    textDecoration: "underline",
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
  },
  rvNO: {
    width: "20%",
    marginTop: "5px",
    fontSize: 10,
  },
  issued: {
    width: "10%",
    marginLeft: "20px",
    marginTop: "5px",
    fontSize: 10,
  },
  used: {
    width: "8%",
    marginLeft: "10px",
    marginTop: "5px",
    fontSize: 10,
  },
  returned: {
    width: "8%",
    marginLeft: "0px",
    marginTop: "5px",
    fontSize: 10,
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
  },
  lastText: {
    width: "45%",
    marginLeft: "10px",
    marginTop: "10px",
    fontSize: 11,
  },
});

const PrintIVListServicePartTable = ({ formHeader, tableData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.tableContainer}>
        <Text style={styles.title1}>Magod Laser Machining Pvt Ltd : Jigni</Text>
        <Text style={styles.title2}>
          Production : Assemby Parts Issue Voucher
        </Text>
        <Text style={styles.line1}>
          _________________________________________________________________________________
        </Text>
        <View style={styles.blockRightAlign}>
          <Text>IV No</Text>
          <Text style={styles.linegap}>Date</Text>
          <Text style={styles.linegap}>Task No</Text>
          <Text style={styles.linegap}>Program No</Text>
          <Text style={styles.linegap}>Set Issued</Text>
          <Text style={styles.linegap}>Set Returned</Text>
        </View>
        <View style={styles.blockLeftAlign}>
          <Text>{formHeader.IV_No}</Text>
          <Text style={styles.linegap}>{formHeader.Issue_date}</Text>
          <Text style={styles.linegap}>{formHeader.TaskNo}</Text>
          <Text style={styles.linegap}>{formHeader.NCProgramNo}</Text>
          <Text style={styles.linegap}>{formHeader.QtyIssued}</Text>
        </View>
        <View style={styles.blockRightAlign}>
          <Text>Customer</Text>
          <Text style={styles.linegap}>Assey Name</Text>
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
          _________________________________________________________________________________
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
          _________________________________________________________________________________
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
              <Text style={styles.usedVal}>{item.QtyUsed}</Text>
              <Text style={styles.returnedVal}>{item.QtyReturned}</Text>
              {/* <Text style={styles.line3}>
                {" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;________________________________________________________________________
              </Text> */}
              <Text style={styles.line2}>
                _________________________________________________________________________________
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
