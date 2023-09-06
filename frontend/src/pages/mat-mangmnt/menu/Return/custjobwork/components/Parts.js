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
  let [secondSelectedRow, setSecondSelectedRow] = useState([]);
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

  // const selectRowFirst = {
  //   mode: "checkbox",
  //   clickToSelect: true,
  //   selectColumnPosition: "right",
  //   selectionHeaderRenderer: () => "Select",
  //   bgColor: "#8A92F0",
  //   onSelect: (row, isSelect, rowIndex) => {
  //     console.log("row...", row);

  //     setrvNoVal(row.RV_No);
  //     setCustRefVal(row.CustDocuNo);
  //     if (isSelect) {
  //       setFirstTableSelectedRow(
  //         //firstTableSelectedRow.push.apply(firstTableSelectedRow, row)
  //         [...firstTableSelectedRow, firstTableData[rowIndex]]
  //       );

  //       //update second table data
  //       let newData = allData.filter((obj, index) => {
  //         return obj.RVId === row.RvID;
  //       });
  //       setSecondTableData(newData);

  //       // console.log("new data  =", newData);
  //       //prepare third table
  //       newData.forEach((item, i) => {
  //         //set second table default checkbox selection
  //         setSecondSelectedRow({
  //           selected: [...secondSelectedRow.selected, item.Id],
  //         });
  //         //console.log(" secondSelectedRow = ", secondSelectedRow);
  //         if (
  //           item.QtyReceived -
  //             item.QtyRejected -
  //             item.QtyReturned -
  //             item.QtyUsed >
  //           0
  //         ) {
  //           item.PartIdNew = item.PartId + "/**Ref: " + row.CustDocuNo;
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
  //       //concat to prev to new
  //       thirdTableData.push.apply(thirdTableData, newData);
  //       setThirdTableData(thirdTableData);
  //     } else {
  //       //remove row in selectedTRow array
  //       setFirstTableSelectedRow(
  //         firstTableSelectedRow.filter((obj) => {
  //           return obj.RV_No !== row.RV_No;
  //         })
  //       );

  //       let newData = thirdTableData.filter((obj, index) => {
  //         return obj.RVId !== row.RvID;
  //       });
  //       //console.log("second table = ", secondTableData);
  //       //console.log("before = ", secondSelectedRow);
  //       //remove check selection in second table
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

  // console.log("first table selectedd", firstTableSelectedRow);
  const selectRowFirstFunc = (rowData) => {
    // console.log(rowData);

    setFirstTableSelectedRow([]);

    setFirstTableSelectedRow(rowData);
    // setFirstTableSelectedRow(
    //   //firstTableSelectedRow.push.apply(firstTableSelectedRow, row)
    //   [...firstTableSelectedRow, firstTableData[rowIndex]]
    // );

    //update second table data
    let newData = allData.filter((obj, index) => {
      return obj.RVId === rowData.RvID;
    });

    setSecondTableData(newData);

    // console.log("new data  =", newData);
    //prepare third table
    // newData.forEach((item, i) => {
    //   //set second table default checkbox selection
    //   setSecondSelectedRow({
    //     selected: [...secondSelectedRow.selected, item.Id],
    //   });
    //   //console.log(" secondSelectedRow = ", secondSelectedRow);
    //   if (
    //     item.QtyReceived -
    //       item.QtyRejected -
    //       item.QtyReturned -
    //       item.QtyUsed >
    //     0
    //   ) {
    //     item.PartIdNew = item.PartId + "/**Ref: " + row.CustDocuNo;
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
    // //concat to prev to new
    // thirdTableData.push.apply(thirdTableData, newData);
    // setThirdTableData(thirdTableData);
  };
  // };

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

  console.log("second selected row", secondSelectedRow);

  const selectRowSecondFunc = (rowData) => {
    // console.log("rorw data in second select func", rowData);

    console.log("rowdata", rowData);
    // setSecondSelectedRow([]);
    setSecondSelectedRow([...secondSelectedRow, rowData]);

    const found = secondSelectedRow.some(
      (el) =>
        el.CustBOM_Id === rowData.CustBOM_Id &&
        el.CustDocuNo === rowData.CustDocuNo &&
        el.Id === rowData.Id &&
        el.PartId === rowData.PartId &&
        el.RVId === rowData.RVId
    );
    console.log("fond.......", found);
    // console.log("found........", found);
    // if (found) {
    //   // deleting the element if found
    //   const newThirdTableData = thirdTableData.filter(
    //     (data) => data !== rowData
    //   );
    //   // setThirdTableData(newThirdTableData);
    //   // console.log("deleted");

    //   // setThirdTableData([thirdTableData.remove(rowData)]);
    //   // console.log("deselected", thirdTableData);
    // } else {
    //   // inserting the element if not found
    //   // setThirdTableData([...thirdTableData, rowData]);
    //   setSecondSelectedRow([...secondSelectedRow, rowData]);
    //   // console.log("inserted");
    // }

    //prepare third table
    // let newData = allData.filter((obj, index) => {
    //   return obj.RVId === rowData.RVId;
    // });

    // newData.forEach((item, i) => {
    //   // console.log("item..", item);
    //   //set check in second table
    //   // setSecondSelectedRow({
    //   //   selected: [...secondSelectedRow.selected, item.Id],
    //   // });
    //   if (
    //     item.QtyReceived - item.QtyRejected - item.QtyReturned - item.QtyUsed >
    //     0
    //   ) {
    //     item.PartIdNew = item.partId + "/**Ref: " + rowData.CustDocuNo;
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

    //concat to prev to new
    // thirdTableData.push.apply(thirdTableData, newData);
    // setThirdTableData(thirdTableData);
  };

  let createReturnVoucher = async () => {
    //console.log("selected rows = ", firstTableSelectedRow);
    //console.log("second = ", secondTableData);
    //console.log("third = ", thirdTableData);
    if (thirdTableData.length === 0) {
      toast.error("Please select the customer");
    } else {
      //get running no and assign to RvNo
      let yyyy = formatDate(new Date(), 6).toString();
      const url =
        endpoints.getRunningNo + "?SrlType=MaterialReturnIV&Period=" + yyyy;

      getRequest(url, async (data) => {
        data.map((obj) => {
          let newNo = parseInt(obj.Running_No) + 1;
          //let no = "23/000" + newNo;
          let series = "";
          //add prefix zeros
          for (
            let i = 0;
            i < parseInt(obj.Length) - newNo.toString().length;
            i++
          ) {
            series = series + "0";
          }
          series = series + "" + newNo;
          //console.log("series = ", series);
          //get last 2 digit of year
          let yy = formatDate(new Date(), 6).toString().substring(2);
          let no = yy + "/" + series;

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
            PkngDcNo: "",
            PkngDCDate: null,
            TotalWeight: 0.0, // firstTableSelectedRow[0].TotalWeight,
            TotalCalculatedWeight: 0.0, // thirdTableData[0].TotalCalculatedWeight,
            UpDated: 0,
            IVStatus: "draft",
            Dc_ID: 0,
            Type: "Parts",
          };
          //insert first table
          postRequest(
            endpoints.insertMaterialIssueRegister,
            newRowMaterialIssueRegister,
            async (data) => {
              setSrlIVID(data.insertId);
              //console.log("data = ", data);
              if (data.affectedRows !== 0) {
                console.log("Record inserted 1 : materialIssueRegister");

                for (let i = 0; i < thirdTableData.length; i++) {
                  let newRowPartIssueDetails = {
                    Iv_Id: data.insertId,
                    Srl: i + 1,
                    Cust_Code: props.custCode,
                    RVId: thirdTableData[i].RVId,
                    Mtrl_Rv_id: thirdTableData[i].Id,
                    PartId:
                      thirdTableData[i].PartId +
                      "**Ref: " +
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
                      console.log("Part issue details inserted");
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
                      console.log("Return Qty updated");
                    }
                  );
                }
              }
            }
          );
          setSrlMaterialType("part");
          setShow(true);
          console.log("srlivid = ", srlIVID);
        });
      });
    }
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
        <div className="col-md-2 col-sm-12">
          {" "}
          <div className="row-md-12 table-data">
            <div style={{ height: "400px", overflowY: "scroll" }}>
              <FirstTable
                firstTableData={firstTableData}
                selectRowFirstFunc={selectRowFirstFunc}
                firstTableSelectedRow={firstTableSelectedRow}
              />

              {/* <BootstrapTable
                keyField="RvID"
                columns={columnsFirst}
                data={firstTableData}
                striped
                hover
                condensed
                selectRow={selectRowFirst}
                headerClasses="header-class "
              ></BootstrapTable> */}
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="row-md-12 table-data">
            <div style={{ height: "400px", overflowY: "scroll" }}>
              <SecondTable
                secondTableData={secondTableData}
                selectRowSecondFunc={selectRowSecondFunc}
                secondSelectedRow={secondSelectedRow}
              />

              {/* <BootstrapTable
                keyField="Id"
                columns={columnsSecond}
                data={secondTableData}
                striped
                hover
                condensed
                selectRow={selectRowSecond}
                headerClasses="header-class "
                //</div>selectRow={selectRowFirst}
              ></BootstrapTable> */}
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="ip-box form-bg">
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
          </div>
          <div>
            <div
              style={{ height: "400px", overflowY: "scroll" }}
              className="mt-3"
            >
              <ThirdTable thirdTableData={thirdTableData} />

              {/* <BootstrapTable
                keyField="Id"
                columns={columnsThird}
                data={thirdTableData}
                striped
                hover
                condensed
                //selectRow={selectRowSecond}
                headerClasses="header-class "
              ></BootstrapTable> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Parts;
