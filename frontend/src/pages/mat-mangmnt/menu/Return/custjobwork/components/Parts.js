import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BootstrapTable from "react-bootstrap-table-next";
import { formatDate } from "../../../../../../utils";
import CreateReturnNewModal from "../../../../components/CreateReturnNewModal";
import ReturnPartQtyCheckOk from "../../../../components/ReturnPartQtyCheckOk";
import FirstTable from "./PartsTables/FirstTable";
import SecondTable from "./PartsTables/SecondTable";
import ThirdTable from "./PartsTables/ThirdTable";

const { getRequest, postRequest } = require("../../../../../api/apiinstance");
const { endpoints } = require("../../../../../api/constants");

function Parts(props) {
  let [firstTableData, setFirstTableData] = useState([]);
  let [secondTableData, setSecondTableData] = useState([]);
  let [thirdTableData, setThirdTableData] = useState([]);

  let [firstTableSelectedRow, setFirstTableSelectedRow] = useState([]);
  let [secondSelectedRow, setSecondSelectedRow] = useState({ selected: [] });
  const [srlIVID, setSrlIVID] = useState("");
  const [IVNOVal, setIVNOVal] = useState("");

  const [show, setShow] = useState(false);
  const [srlMaterialType, setSrlMaterialType] = useState("");

  let [allData, setAllData] = useState([]);

  let [rvNoval, setrvNoVal] = useState("");
  let [custRefval, setCustRefVal] = useState("");

  const fetchData = () => {
    //console.log("props = ", props);
    if (props && props.custCode.length !== 0) {
      let url1 = endpoints.partFirst + "?Cust_Code=" + props.custCode;
      getRequest(url1, (data) => {
        setFirstTableData(data);
        setSecondTableData([]);

        //fetch second table data
        let url2 = endpoints.partSecond + "?Cust_Code=" + props.custCode;
        getRequest(url2, (data1) => {
          let newData = data1.filter((obj, index) => {
            return obj.RVId === Object.values(data)[0].RvID;
          });
          setAllData(data1);
          // setSecondTableData(newData);
        });
      });
    }
  };

  useEffect(() => {
    //setPropsValue(props.custCode);
    fetchData();
    //console.log("S props value = ", propsValue);
  }, [props.custCode]);

  // const columnsFirst = [
  //   {
  //     text: "RvID",
  //     dataField: "RvID",
  //     hidden: true,
  //   },
  //   {
  //     text: "RV No",
  //     dataField: "RV_No",
  //     //hidden: true,
  //   },
  // ];
  // const columnsSecond = [
  //   {
  //     text: "Id",
  //     dataField: "Id",
  //     hidden: true,
  //   },
  //   {
  //     text: "PartId",
  //     dataField: "PartId",
  //   },
  //   {
  //     text: "Received",
  //     dataField: "QtyReceived",
  //   },
  //   {
  //     text: "Rejected",
  //     dataField: "QtyRejected",
  //   },
  //   {
  //     text: "Issued",
  //     dataField: "QtyIssued",
  //   },
  //   {
  //     text: "Used",
  //     dataField: "QtyUsed",
  //   },
  //   {
  //     text: "Returned",
  //     dataField: "QtyReturned",
  //   },
  // ];
  // const columnsThird = [
  //   {
  //     text: "Id",
  //     dataField: "Id",
  //     hidden: true,
  //   },
  //   {
  //     text: "PartId",
  //     dataField: "PartIdNew",
  //   },
  //   {
  //     text: "Return",
  //     dataField: "QtyReturnedNew",
  //   },
  //   {
  //     text: "Remarks",
  //     dataField: "Remarks",
  //   },
  // ];

  // console.log("firstTableSelectedRow", firstTableSelectedRow);
  const selectRowFirstFunc = (rowData) => {
    // mode: "checkbox",
    // clickToSelect: true,
    // selectColumnPosition: "right",
    // selectionHeaderRenderer: () => "Select",
    // bgColor: "#8A92F0",
    // onSelect: (row, isSelect, rowIndex) => {
    // console.log("first..", rowData);

    //update second table data
    let newData = allData.filter((obj, index) => {
      return obj.RVId === rowData.RvID;
    });

    setSecondTableData(newData);

    // console.log(
    //   "RV_No",
    //   rowData.RV_No,
    //   "Customer Ref",
    //   rowData.CustDocuNo + rowData.RV_Date
    // );
    // firstTableSelectedRow.each((obj, i) => {
    //   console.log("inside...", obj);
    // });
    // setFirstTableSelectedRow([]);
    setFirstTableSelectedRow(rowData);

    setrvNoVal(rowData.RV_No);
    setCustRefVal(rowData.CustDocuNo);

    // setrvNoVal(row.RV_No);
    // setCustRefVal(row.CustDocuNo);
    // if (isSelect) {
    //   setFirstTableSelectedRow(
    //     //firstTableSelectedRow.push.apply(firstTableSelectedRow, row)
    //     [...firstTableSelectedRow, firstTableData[rowIndex]]
    //   );

    //   //update second table data
    //   let newData = allData.filter((obj, index) => {
    //     return obj.RVId === row.RvID;
    //   });
    //   setSecondTableData(newData);

    //   console.log("new data  =", newData);
    //   //prepare third table
    //   newData.forEach((item, i) => {
    //     //set second table default checkbox selection
    //     setSecondSelectedRow({
    //       selected: [...secondSelectedRow.selected, item.Id],
    //     });
    //     //console.log(" secondSelectedRow = ", secondSelectedRow);
    //     if (
    //       item.QtyReceived -
    //         item.QtyRejected -
    //         item.QtyReturned -
    //         item.QtyUsed >
    //       0
    //     ) {
    //       item.PartIdNew = item.PartId + "/**Ref: " + row.CustDocuNo;
    //       if (item.QtyRejected > 0) {
    //         if (
    //           item.QtyReceived - item.QtyReturned - item.QtyUsed >
    //           item.QtyRejected
    //         ) {
    //           item.QtyReturnedNew = item.QtyRejected;
    //         } else {
    //           item.QtyReturnedNew =
    //             item.QtyReceived -
    //             item.QtyRejected -
    //             item.QtyReturned -
    //             item.QtyUsed;
    //         }
    //         item.Remarks = "Rejected";
    //       } else {
    //         item.QtyReturnedNew =
    //           item.QtyReceived -
    //           item.QtyRejected -
    //           item.QtyReturned -
    //           item.QtyUsed;
    //         item.Remarks = "Returned Unused";
    //       }
    //     }
    //   });
    //   //concat to prev to new
    //   thirdTableData.push.apply(thirdTableData, newData);
    //   setThirdTableData(thirdTableData);
    // } else {
    //   //remove row in selectedTRow array
    //   setFirstTableSelectedRow(
    //     firstTableSelectedRow.filter((obj) => {
    //       return obj.RV_No !== row.RV_No;
    //     })
    //   );

    //   let newData = thirdTableData.filter((obj, index) => {
    //     return obj.RVId !== row.RvID;
    //   });
    //   //console.log("second table = ", secondTableData);
    //   //console.log("before = ", secondSelectedRow);
    //   //remove check selection in second table
    //   secondTableData.forEach((item, i) => {
    //     setSecondSelectedRow({
    //       selected: secondSelectedRow.selected.filter((ele) => {
    //         return ele !== item.Id;
    //       }),
    //     });
    //   });

    //   setThirdTableData(newData);
    // }
    // }
  };

  // const selectRowSecond = {
  //   mode: "checkbox",
  //   clickToSelect: true,
  //   bgColor: "#8A92F0",
  //   selected: secondSelectedRow.selected,
  //   selectionHeaderRenderer: () => "Select",
  //   onSelect: (row, isSelect) => {
  //     if (isSelect) {
  //       let newData = allData.filter((obj, index) => {
  //         return obj.RVId === row.RVId;
  //       });

  //       //prepare third table
  //       newData.forEach((item, i) => {
  //         //set check in second table
  //         setSecondSelectedRow({
  //           selected: [...secondSelectedRow.selected, item.Id],
  //         });
  //         if (
  //           item.QtyReceived -
  //             item.QtyRejected -
  //             item.QtyReturned -
  //             item.QtyUsed >
  //           0
  //         ) {
  //           item.PartIdNew = item.partId + "/**Ref: " + row.CustDocuNo;
  //           if (item.QtyRejected > 0) {
  //             if (
  //               item.QtyReceived - item.QtyReturned - item.QtyUsed >
  //               item.QtyRejected
  //             ) {
  //               item.QtyReturnedNew = item.QtyRejected;
  //             } else {
  //               item.QtyReturnedNew =
  //                 item.QtyReceived -
  //                 item.QtyRejected -
  //                 item.QtyReturned -
  //                 item.QtyUsed;
  //             }
  //             item.Remarks = "Rejected";
  //           } else {
  //             item.QtyReturnedNew =
  //               item.QtyReceived -
  //               item.QtyRejected -
  //               item.QtyReturned -
  //               item.QtyUsed;
  //             item.Remarks = "Returned Unused";
  //           }
  //         }
  //       });
  //       console.log("new data = ", newData);
  //       //concat to prev to new
  //       thirdTableData.push.apply(thirdTableData, newData);
  //       setThirdTableData(thirdTableData);
  //     } else {
  //       console.log("third table = ", thirdTableData);
  //       console.log("row = ", row);
  //       let newData = thirdTableData.filter((obj, index) => {
  //         return obj.RVId !== row.RVId;
  //       });
  //       secondTableData.forEach((item, i) => {
  //         setSecondSelectedRow({
  //           selected: secondSelectedRow.selected.filter((ele) => {
  //             return ele !== item.Id;
  //           }),
  //         });
  //       });

  //       setThirdTableData(newData);
  //     }
  //   },
  // };

  const selectRowSecondFunc = (rowData) => {
    // console.log("rowData in second", rowData);

    // let newData = allData.filter((obj, index) => {
    //   return obj.RVId === rowData.RVId;
    // });

    // console.log("newData", newData);

    const found = thirdTableData.some(
      (el) =>
        el.CustBOM_Id === rowData.CustBOM_Id &&
        el.RV_No === rowData.RV_No &&
        el.CustDocuNo === rowData.CustDocuNo &&
        el.Id === rowData.Id &&
        el.PartId === rowData.PartId &&
        el.RVId === rowData.RVId
    );

    // console.log("found...", found);

    if (found) {
      // deleting the element if found
      const newThirdTableData = thirdTableData.filter(
        (el) =>
          el.CustBOM_Id != rowData.CustBOM_Id &&
          el.RV_No != rowData.RV_No &&
          el.CustDocuNo != rowData.CustDocuNo &&
          el.Id != rowData.Id &&
          el.PartId != rowData.PartId &&
          el.RVId != rowData.RVId
      );
      // console.log("newthirdtabedata", newThirdTableData);
      setThirdTableData(newThirdTableData);
    } else {
      let returnNew =
        rowData.QtyReceived - rowData.QtyUsed - rowData.QtyReturned;

      if (
        rowData.QtyReturned + returnNew + rowData.QtyUsed >
        rowData.QtyReceived
      ) {
        toast.error(
          "Greater then the quantity received, plus already returned/used."
        );
      } else if (returnNew === 0) {
        toast.error("Stock is already returned");
      } else {
        // toast.success("good to go!!!");

        rowData.PartIdNew = rowData.PartId + "/**Ref: " + rowData.CustDocuNo;
        if (rowData.QtyRejected > 0) {
          if (
            rowData.QtyReceived - rowData.QtyReturned - rowData.QtyUsed >
            rowData.QtyRejected
          ) {
            rowData.QtyReturnedNew = rowData.QtyRejected;
          } else {
            rowData.QtyReturnedNew =
              rowData.QtyReceived -
              rowData.QtyRejected -
              rowData.QtyReturned -
              rowData.QtyUsed;
          }
          rowData.Remarks = "Rejected";
        } else {
          rowData.QtyReturnedNew =
            rowData.QtyReceived -
            rowData.QtyRejected -
            rowData.QtyReturned -
            rowData.QtyUsed;
          rowData.Remarks = "Return Unused";
        }

        // console.log("after some operation...", rowData);

        setThirdTableData([...thirdTableData, rowData]);
      }
    }

    // //prepare third table
    // newData.forEach((item, i) => {
    //   //set check in second table
    //   setSecondSelectedRow({
    //     selected: [...secondSelectedRow.selected, item.Id],
    //   });
    //   if (
    //     item.QtyReceived -
    //       item.QtyRejected -
    //       item.QtyReturned -
    //       item.QtyUsed >
    //     0
    //   ) {
    //     item.PartIdNew = item.partId + "/**Ref: " + row.CustDocuNo;
    //     if (item.QtyRejected > 0) {
    //       if (
    //         item.QtyReceived - item.QtyReturned - item.QtyUsed >
    //         item.QtyRejected
    //       ) {
    //         item.QtyReturnedNew = item.QtyRejected;
    //       } else {
    //         item.QtyReturnedNew =
    //           item.QtyReceived -
    //           item.QtyRejected -
    //           item.QtyReturned -
    //           item.QtyUsed;
    //       }
    //       item.Remarks = "Rejected";
    //     } else {
    //       item.QtyReturnedNew =
    //         item.QtyReceived -
    //         item.QtyRejected -
    //         item.QtyReturned -
    //         item.QtyUsed;
    //       item.Remarks = "Returned Unused";
    //     }
    //   }
    // });
    // console.log("new data = ", newData);
    // //concat to prev to new
    // thirdTableData.push.apply(thirdTableData, newData);
    // setThirdTableData(thirdTableData);
  };

  let createReturnVoucher = async () => {
    //console.log("selected rows = ", firstTableSelectedRow);
    //console.log("second = ", secondTableData);
    //console.log("third = ", thirdTableData);

    if (props.custCode) {
      if (firstTableSelectedRow.length > 0 || secondTableData.length > 0) {
        // if(secondTableData.length > 0)

        if (thirdTableData.length > 0) {
          // toast.success("good to go...");

          //get running no and assign to RvNo
          let yyyy = formatDate(new Date(), 6).toString();
          const url =
            endpoints.getRunningNo + "?SrlType=MaterialReturnIV&Period=" + yyyy;

          getRequest(url, async (data) => {
            data.map((obj) => {
              let newNo = parseInt(obj.Running_No) + 1;
              //let no = "23/000" + newNo;
              let series = "";

              if (newNo < 1000) {
                //add prefix zeros
                for (
                  let i = 0;
                  i < parseInt(obj.Length) - newNo.toString().length;
                  i++
                ) {
                  series = series + "0";
                }
                series = series + "" + newNo;
              } else {
                series = newNo;
              }

              //console.log("series = ", series);
              //get last 2 digit of year
              let yy = formatDate(new Date(), 6).toString().substring(2);
              let no = yy + "/" + series;

              // console.log("noonono", no);

              setIVNOVal(no);

              let newRowMaterialIssueRegister = {
                IV_No: no,
                IV_Date: formatDate(new Date(), 5),
                Cust_code: props.custCode,
                Customer: props.custName,
                CustCSTNo: props.custCST,
                CustTINNo: props.custTIN,
                CustECCNo: props.custECC,
                CustGSTNo: props.custGST,
                EMail: "",
                PkngDcNo: null,
                PkngDCDate: null,
                TotalWeight: 0.0, // firstTableSelectedRow[0].TotalWeight,
                TotalCalculatedWeight: 0.0, // thirdTableData[0].TotalCalculatedWeight,
                UpDated: 0,
                IVStatus: "Draft",
                Dc_ID: 0,
                Type: "Parts",
              };

              // console.log("newwwwwwwwwww.....", newRowMaterialIssueRegister);
              //insert first table
              postRequest(
                endpoints.insertMaterialIssueRegister,
                newRowMaterialIssueRegister,
                async (data) => {
                  setSrlIVID(data.insertId);
                  //console.log("data = ", data);
                  if (data.affectedRows !== 0) {
                    // console.log("Record inserted 1 : materialIssueRegister");

                    for (let i = 0; i < thirdTableData.length; i++) {
                      let newRowPartIssueDetails = {
                        Iv_Id: data.insertId,
                        Srl: i + 1,
                        Cust_Code: props.custCode,
                        RVId: thirdTableData[i].RVId,
                        Mtrl_Rv_id: thirdTableData[i].Id,
                        PartId:
                          thirdTableData[i].PartId +
                          "/**Ref: " +
                          thirdTableData[i].CustDocuNo,
                        CustBOM_Id: thirdTableData[i].CustBOM_Id,
                        UnitWt: thirdTableData[i].UnitWt,
                        QtyReturned: thirdTableData[i].QtyReturnedNew,
                        Remarks: thirdTableData[i].Remarks,
                      };

                      postRequest(
                        endpoints.insertPartIssueDetails,
                        newRowPartIssueDetails,
                        async (data) => {
                          // console.log("Part issue details inserted");
                        }
                      );

                      //update qtyReturned add
                      let updateQty = {
                        Id: thirdTableData[i].Id,
                        QtyReturned: thirdTableData[i].QtyReturnedNew,
                      };
                      postRequest(
                        endpoints.updateQtyReturnedPartReceiptDetails1,
                        updateQty,
                        async (data) => {
                          // console.log("Return Qty updated");
                        }
                      );
                    }
                  }
                }
              );
              setSrlMaterialType("part");
              setShow(true);
              // console.log("srlivid = ", srlIVID);
            });
          });
        } else {
          toast.error(
            "Please select atleast one part to create the return voucher"
          );
        }
      } else {
        toast.error("Please select the Return Voucher");
      }
    } else {
      toast.error("Please select the customer");
    }
    // if (thirdTableData.length === 0) {
    //   toast.error("Please select the customer");
    // } else {
    //   //get running no and assign to RvNo
    //   let yyyy = formatDate(new Date(), 6).toString();
    //   const url =
    //     endpoints.getRunningNo + "?SrlType=MaterialReturnIV&Period=" + yyyy;

    //   getRequest(url, async (data) => {
    //     data.map((obj) => {
    //       let newNo = parseInt(obj.Running_No) + 1;
    //       //let no = "23/000" + newNo;
    //       let series = "";
    //       //add prefix zeros
    //       for (
    //         let i = 0;
    //         i < parseInt(obj.Length) - newNo.toString().length;
    //         i++
    //       ) {
    //         series = series + "0";
    //       }
    //       series = series + "" + newNo;
    //       //console.log("series = ", series);
    //       //get last 2 digit of year
    //       let yy = formatDate(new Date(), 6).toString().substring(2);
    //       let no = yy + "/" + series;

    //       setIVNOVal(no);

    //       let newRowMaterialIssueRegister = {
    //         IV_No: no,
    //         IV_Date: formatDate(new Date(), 5),
    //         Cust_code: props.custCode,
    //         Customer: props.custName,
    //         CustCSTNo: props.custCST,
    //         CustTINNo: props.custTIN,
    //         CustECCNo: props.custECC,
    //         CustGSTNo: props.custGST,
    //         EMail: "",
    //         PkngDcNo: "",
    //         PkngDCDate: null,
    //         TotalWeight: 0.0, // firstTableSelectedRow[0].TotalWeight,
    //         TotalCalculatedWeight: 0.0, // thirdTableData[0].TotalCalculatedWeight,
    //         UpDated: 0,
    //         IVStatus: "draft",
    //         Dc_ID: 0,
    //         Type: "Parts",
    //       };
    //       //insert first table
    //       postRequest(
    //         endpoints.insertMaterialIssueRegister,
    //         newRowMaterialIssueRegister,
    //         async (data) => {
    //           setSrlIVID(data.insertId);
    //           //console.log("data = ", data);
    //           if (data.affectedRows !== 0) {
    //             console.log("Record inserted 1 : materialIssueRegister");

    //             for (let i = 0; i < thirdTableData.length; i++) {
    //               let newRowPartIssueDetails = {
    //                 Iv_Id: data.insertId,
    //                 Srl: i + 1,
    //                 Cust_Code: props.custCode,
    //                 RVId: thirdTableData[i].RVId,
    //                 Mtrl_Rv_id: thirdTableData[i].Id,
    //                 PartId:
    //                   thirdTableData[i].PartId +
    //                   "**Ref: " +
    //                   thirdTableData[i].CustDocuNo,
    //                 CustBOM_Id: thirdTableData[i].CustBOM_Id,
    //                 UnitWt: thirdTableData[i].UnitWt,
    //                 QtyReturned: thirdTableData[i].QtyReturnedNew,
    //                 Remarks: thirdTableData[i].Remarks,
    //               };

    //               postRequest(
    //                 endpoints.insertPartIssueDetails,
    //                 newRowPartIssueDetails,
    //                 async (data) => {
    //                   console.log("Part issue details inserted");
    //                 }
    //               );

    //               //update qtyReturned add
    //               let updateQty = {
    //                 Id: thirdTableData[i].Id,
    //                 QtyReturned: thirdTableData[i].QtyReturnedNew,
    //               };
    //               postRequest(
    //                 endpoints.updateQtyReturnedPartReceiptDetails1,
    //                 updateQty,
    //                 async (data) => {
    //                   console.log("Return Qty updated");
    //                 }
    //               );
    //             }
    //           }
    //         }
    //       );
    //       setSrlMaterialType("part");
    //       setShow(true);
    //       console.log("srlivid = ", srlIVID);
    //     });
    //   });
    // }
  };

  return (
    <>
      <ReturnPartQtyCheckOk
        showOK={show}
        setShowOK={setShow}
        srlMaterialType={srlMaterialType}
        srlIVID={srlIVID}
        IVNOVal={IVNOVal}
      />

      {/* <CreateReturnNewModal
        show={show}
        setShow={setShow}
        srlMaterialType={srlMaterialType}
        srlIVID={srlIVID}
        IVNOVal={IVNOVal}
      /> */}

      <div className="row">
        <div className="col-md-9 p-0">
          <div className="row">
            <div className="col-md-4">
              <div className="rvNO">
                <label className="form-label">RV No</label>
                <input
                  type="text"
                  name="rvNo"
                  disabled
                  value={rvNoval}
                  // className="in-field"
                />
              </div>
            </div>
            <div className="col-md-8">
              <div className="customerRef">
                <label className="form-label">Customer Ref</label>
                <input
                  // className="in-field"
                  type="text"
                  name="customerRef"
                  disabled
                  value={custRefval}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="d-flex align-items-center justify-content-end">
            <button
              className="button-style mx-0"
              style={{ width: "200px" }}
              onClick={createReturnVoucher}
            >
              Create Return Voucher
            </button>
          </div>
        </div>
      </div>
      <div className="p-2"></div>

      <div className="row">
        <div className="col-md-2 col-sm-12">
          <div className="row-md-12 table-data">
            <div style={{ maxHeight: "400px", overflow: "auto" }}>
              <FirstTable
                firstTableData={firstTableData}
                firstTableSelectedRow={firstTableSelectedRow}
                selectRowFirstFunc={selectRowFirstFunc}
              />

              {/* <BootstrapTable
                keyField="RvID"
                columns={columnsFirst}
                data={firstTableData}
                striped
                hover
                condensed
                selectRow={selectRowFirst}
                headerClasses="header-class tableHeaderBGColor"
              ></BootstrapTable> */}
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="row-md-12 table-data">
            <div style={{ maxHeight: "400px", overflow: "auto" }}>
              <SecondTable
                secondTableData={secondTableData}
                secondSelectedRow={secondSelectedRow}
                selectRowSecondFunc={selectRowSecondFunc}
                thirdTableData={thirdTableData}
              />

              {/* <BootstrapTable
                keyField="Id"
                columns={columnsSecond}
                data={secondTableData}
                striped
                hover
                condensed
                selectRow={selectRowSecond}
                headerClasses="header-class tableHeaderBGColor"
                //</div>selectRow={selectRowFirst}
              ></BootstrapTable> */}
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          {/* <div className="ip-box form-bg">
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">RV_No</label>
                <input
                  type="text"
                  name="rvNo"
                  disabled
                  value={rvNoval}
                  className="in-field"
                />
              </div>
              <div className="col-md-7">
                <label className="form-label">Customer Ref</label>
                <input
                  className="in-field"
                  type="text"
                  name="customerRef"
                  disabled
                  value={custRefval}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              className="button-style"
              style={{ width: "200px" }}
              onClick={createReturnVoucher}
            >
              Create Return Voucher
            </button>
          </div> */}
          <div>
            <div style={{ maxHeight: "400px", overflow: "auto" }}>
              <ThirdTable thirdTableData={thirdTableData} />

              {/* <BootstrapTable
                keyField="Id"
                columns={columnsThird}
                data={thirdTableData}
                striped
                hover
                condensed
                //selectRow={selectRowSecond}
                headerClasses="header-class tableHeaderBGColor"
              ></BootstrapTable> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Parts;
