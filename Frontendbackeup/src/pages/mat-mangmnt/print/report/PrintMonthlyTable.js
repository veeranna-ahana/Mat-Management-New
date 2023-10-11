import React from "react";
import { Page, Document, StyleSheet, View, Text } from "@react-pdf/renderer";
import { formatDate } from "../../../../utils";

//function PrintMaterialDCTable() {
const styles = StyleSheet.create({
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
    <Page size="A4" style={styles.page}>
      <View style={styles.tableContainer}>
        <Text style={styles.topspace}></Text>

        <Text style={styles.titleFull}>
          Magod Laser Machining Pvt Ltd : Jigani
        </Text>
        <Text style={styles.titleFull1}>Material Summary For the Month of</Text>
        <Text style={styles.titleFull1}>{date}</Text>
        {/* material purchase summary */}
        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>
        <Text style={styles.titleFull2}>Material Purchase Summary</Text>
        <Text style={styles.material}>Material </Text>
        <Text style={styles.weightinkgs}>Weight in Kgs</Text>
        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>
        {fourthTab.map((item, index) => {
          return (
            <>
              <Text style={styles.material}>{item.Material}</Text>
              <Text style={styles.weightinkgs}>
                {Math.round(parseFloat(item.TotalWeight))}
              </Text>
            </>
          );
        })}

        {/* material Sales summary */}
        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>
        <Text style={styles.titleFull2}>Material Sales Summary</Text>
        <Text style={styles.material}>Material </Text>
        <Text style={styles.weightinkgs}>Weight in Kgs</Text>
        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>
        {thirdTab.map((item, index) => {
          return (
            <>
              <Text style={styles.material}>{item.Material}</Text>
              <Text style={styles.weightinkgs}>
                {Math.round(parseFloat(item.SrlWt))}
              </Text>
            </>
          );
        })}

        {/* print total */}
        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>
        <Text style={styles.titleFull2}>Monthly Material Handling Summary</Text>
        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>
        {totalobj.map((item, index) => {
          return (
            <>
              <Text style={styles.material}>{item.type}</Text>
              <Text style={styles.weightinkgs}>Material</Text>
              <Text style={styles.totqty}>Quantity : {item.total}</Text>
              <Text style={styles.line1}>
                _________________________________________________________________________________________
              </Text>
              {/* <Text style={styles.material}></Text>
              <Text style={styles.weightinkgs}></Text>
              <Text style={styles.totqty}>{item.total}</Text> */}
            </>
          );
        })}

        {/* purchase Details */}
        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>
        <Text style={styles.title1}>Material Purchase Details</Text>
        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>
        {purchaseDetails.map((item, index) => {
          return (
            <>
              <Text style={styles.titleFull3}>{item.material}</Text>
              <Text style={styles.line1}>
                _________________________________________________________________________________________
              </Text>

              {item.data.map((item, index) => {
                return (
                  <>
                    <Text style={styles.para}></Text>
                    <Text style={styles.para}>
                      {formatDate(new Date(item.RV_Date), 3)}
                    </Text>
                    <Text style={styles.para}>{item.RV_No}</Text>
                    <Text style={styles.para}>
                      {Math.round(parseInt(item.TotalWeight))}
                    </Text>
                    <Text style={styles.docu}>{item.CustDocuNo}</Text>
                  </>
                );
              })}

              <Text style={styles.line1}>
                _________________________________________________________________________________________
              </Text>
              <Text style={styles.para}></Text>
              <Text style={styles.para}></Text>
              <Text style={styles.para}>Total</Text>
              <Text style={styles.para}>{item.totwt}</Text>
              <Text style={styles.line1}>
                _________________________________________________________________________________________
              </Text>
            </>
          );
        })}

        {/* sale Details */}
        <Text style={styles.title1}>Material Sale Details</Text>
        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>
        {saleDetails.map((item, index) => {
          return (
            <>
              <Text style={styles.titleFull3}>{item.material}</Text>
              <Text style={styles.line1}>
                _________________________________________________________________________________________
              </Text>

              {item.data.map((item, index) => {
                return (
                  <>
                    <Text style={styles.para}></Text>
                    <Text style={styles.para}>
                      {formatDate(new Date(item.Inv_Date), 3)}
                    </Text>
                    <Text style={styles.para}>{item.Inv_No}</Text>
                    <Text style={styles.para}>
                      {Math.round(parseInt(item.SrlWt))}
                    </Text>
                    <Text style={styles.docu}>{item.Cust_Name}</Text>
                  </>
                );
              })}

              <Text style={styles.line1}>
                _________________________________________________________________________________________
              </Text>
              <Text style={styles.para}></Text>
              <Text style={styles.para}></Text>
              <Text style={styles.para}>Total</Text>
              <Text style={styles.para}>{item.totwt}</Text>
              <Text style={styles.line1}>
                _________________________________________________________________________________________
              </Text>
            </>
          );
        })}

        {/* <Text style={styles.rvno}>Rv No</Text>
        <Text style={styles.customer}>Customer</Text>
        <Text style={styles.material}>Material</Text>
        <Text style={styles.shape}>Shape</Text>
        <Text style={styles.totalweight}>Total Weight</Text>
        <Text style={styles.quantity}>Quantity</Text>

        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>
        {tableData.map((item, index) => {
          return (
            <>
              <Text style={styles.rvnoVal}>{item.RV_No}</Text>
              <Text style={styles.customerVal}>{item.Customer}</Text>
              <Text style={styles.materialVal}>{item.material}</Text>
              <Text style={styles.shapeVal}>{item.Shape}</Text>
              <Text style={styles.totalweightVal}>{item.totalWeight}</Text>
              <Text style={styles.quantityVal}>{item.qty}</Text>
            </>
          );
        })}
        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>

        <Text style={styles.emptyblock1}></Text>
        <Text style={styles.summaryFinal}>Summary</Text>
        <Text style={styles.totalWeightFinal}>{totalweight.toFixed(2)}</Text>
        <Text style={styles.quantityFinal}>{totqty}</Text>
        <Text style={styles.line1}>
          _________________________________________________________________________________________
        </Text>
        <Text style={styles.MaterialReceiptIncharge}>
          Material Receipt Incharge
        </Text>
        <Text style={styles.MaterialDeptIncharge}>Material Dept Incharge</Text> */}
      </View>
    </Page>
  </Document>
);

export default PrintMonthlyTable;
