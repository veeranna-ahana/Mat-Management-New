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
  },
  title2: {
    width: "100%",
    marginTop: "8px",
    marginLeft: "190px",
    fontSize: 13,
    fontWeight: "bolder",
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
    width: "30%",
    textAlign: "right",
    marginLeft: "10px",
    marginTop: "10px",
    fontSize: "9",
  },
  blockLeftAlign: {
    width: "30%",
    marginLeft: "10px",
    marginTop: "10px",
    fontSize: "9",
  },
  emptyBlock: {
    width: "35%",
  },
  blockWhole: {
    width: "100%",
    marginLeft: "10px",
    marginTop: "10px",
    fontSize: "9",
  },
  linegap: {
    marginTop: "5px",
  },

  mtrlID: {
    width: "30%",
    marginLeft: "10px",
    marginTop: "5px",
    fontSize: 10,
  },
  para1: {
    width: "10%",
    marginLeft: "10px",
    marginTop: "5px",
    fontSize: 10,
  },
  para2: {
    width: "10%",
    marginLeft: "5px",
    marginTop: "5px",
    fontSize: 10,
  },
  used: {
    width: "10%",
    marginLeft: "5px",
    marginTop: "5px",
    fontSize: 10,
  },
  reject: {
    width: "10%",
    marginLeft: "5px",
    marginTop: "5px",
    fontSize: 10,
  },

  mtrlVal: {
    width: "30%",
    marginLeft: "10px",
    fontSize: 10,
    fontWeight: "bold",
    marginTop: "5px",
  },
  linegap2: {
    width: "15%",
  },

  para1Val: {
    width: "10%",
    marginLeft: "5px",
    fontSize: 10,
    marginTop: "5px",
  },
  para2Val: {
    width: "10%",
    marginLeft: "5px",
    fontSize: 10,
    marginTop: "5px",
  },
  usedVal: {
    width: "10%",
    marginLeft: "15px",
    fontSize: 10,
    marginTop: "5px",
  },
  rejectVal: {
    width: "10%",
    marginLeft: "15px",
    fontSize: 10,
    marginTop: "5px",
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
  emptyWholeBlock: {
    width: "100%",
  },
  combine: {
    width: "100%",
    marginLeft: "127px",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: "20px",
  },
});

const PrintIVListProfileCuttingTable2 = ({
  formHeader,
  tableData,
  combineSheets,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.tableContainer}>
        <Text style={styles.title1}>
          Magod Laser Machining Pvt Ltd : Jigani
        </Text>
        <Text style={styles.title2}>Material : Floor Issue</Text>
        <Text style={styles.line1}>
          _________________________________________________________________________________
        </Text>
        {/* Issue By & Received By */}
        <Text style={styles.blockWhole}>IV No : {formHeader.IV_No}</Text>
        <Text style={styles.blockLeftAlign}></Text>
        <Text style={styles.blockRightAlign}>
          Date {formHeader.Issue_date}{" "}
        </Text>
        <Text style={styles.emptyBlock}></Text>
        <Text style={styles.blockLeftAlign}>Task No {formHeader.TaskNo}</Text>
        <Text style={styles.blockRightAlign}>
          Program No {formHeader.NC_ProgramNo}
        </Text>
        <Text style={styles.emptyBlock}></Text>
        <Text style={styles.blockWhole}>Customer {formHeader.Cust_name} </Text>
        <Text style={styles.line1}>
          _________________________________________________________________________________
        </Text>
        <Text style={styles.blockWhole}>Material : {formHeader.Mtrl_Code}</Text>
        <Text style={styles.blockLeftAlign}>Para 1: {formHeader.Para1}</Text>
        <Text style={styles.blockLeftAlign}>Para 2: {formHeader.Para2}</Text>
        <Text style={styles.blockLeftAlign}>Para 3: {formHeader.Para3}</Text>
        <Text style={styles.blockLeftAlign}>Qty: {formHeader.Qty}</Text>
        <Text style={styles.blockLeftAlign}>Machine: {formHeader.Machine}</Text>
        <Text style={styles.blockLeftAlign}>
          Process: {formHeader.MProcess}
        </Text>
        <Text style={styles.blockWhole}>Source : Custom</Text>

        <Text style={styles.line1}>
          _________________________________________________________________________________
        </Text>
        <Text style={styles.combine}>{combineSheets}</Text>
        <Text style={styles.line1}>
          _________________________________________________________________________________
        </Text>

        {/* Issue By & Received By */}
        <Text style={styles.issuedByReceivedBy}>Issued By and Time</Text>
        <Text style={styles.issuedByReceivedBy}>Received By and Time</Text>
        <Text style={styles.emptyWholeBlock}> </Text>
        <Text style={styles.emptyWholeBlock}> </Text>
        <Text style={styles.emptyWholeBlock}> </Text>
        <Text style={styles.emptyWholeBlock}> </Text>
        <Text style={styles.issuedByReceivedBy}>Returned By and Time</Text>
        <Text style={styles.issuedByReceivedBy}>Received By and Time</Text>
      </View>
    </Page>
  </Document>
);

export default PrintIVListProfileCuttingTable2;
