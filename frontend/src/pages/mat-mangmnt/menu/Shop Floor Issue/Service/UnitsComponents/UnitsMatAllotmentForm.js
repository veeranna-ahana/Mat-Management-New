import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import { toast } from "react-toastify";
import YesNoModal from "../../../../components/YesNoModal";
import { formatDate } from "../../../../../../utils";
import OkModal from "../../../../components/OkModal";

const { getRequest, postRequest } = require("../../../../../api/apiinstance");
const { endpoints } = require("../../../../../api/constants");

function UnitsMatAllotmentForm() {
  const nav = useNavigate();
  const location = useLocation();
  console.log("ncid = ", location?.state?.ncid);
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const [formHeader, setFormHeader] = useState({});
  const [firstTable, setFirstTable] = useState([]);
  const [secondTable, setSecondTable] = useState([]);
  const [firstTableRow, setFirstTableRow] = useState([]);
  const [secondTableRow, setSecondTableRow] = useState([]);
  const [issueidval, setissueidval] = useState("");
  const [firstTableSelectIndex, setFirstTableSelectIndex] = useState([]);
  const [secondTableSelectIndex, setSecondTableSelectIndex] = useState([]);

  const [selectedRowsInSecondTable, setSelectedRowsInSecondTable] = useState(
    []
  );

  const [show, setShow] = useState(false);
  const [showok, setShowok] = useState(false);
  let [messageok, setmessageok] = useState("");

  const fetchData = async () => {
    //get formHeader data
    let url1 = endpoints.getRowByNCID + "?id=" + location.state.ncid;

    getRequest(url1, async (data) => {
      data["QtyAllottedTemp"] = data.QtyAllotted;

      setFormHeader(data);
      //setAllData(data);
      console.log("data", data.Mtrl_Code);
      console.log("Shape", data.Shape);
      console.log("Para1", data.Para1);
      console.log("Para2", data.Para2);

      let url2 = endpoints.getCustomerByCustCode + "?code=" + data.Cust_Code;
      //console.log(url2);
      getRequest(url2, async (data1) => {
        setFormHeader({
          ...data,
          customer: data1.Cust_name,
        });
      });

      //get first table data
      let url3 =
        endpoints.getMaterialAllotmentTable1 +
        "?MtrlCode=" +
        data.Mtrl_Code +
        "&CustCode=" +
        data.Cust_Code +
        "&shape=" +
        data.Shape +
        "&para1=" +
        data.Para1 +
        "&para2=" +
        data.Para2;
      getRequest(url3, async (data2) => {
        //console.log("form header data = ", data);
        console.log("first table data = ", data2);
        setFirstTable(data2);
        if (data2.length == 0) {
          toast.warning(
            "There is no material to allot for this program. Check if you have added the material to customer stock?."
          );
        }
      });
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columns1 = [
    {
      text: "Id",
      dataField: "MtrlStockID",
      hidden: true,
    },
    {
      text: "Locked",
      dataField: "Locked",
      editable: false,
      formatter: (celContent, row) => (
        <div className="checkbox">
          <lable>
            <input type="checkbox" checked={celContent === 0 ? false : true} />
          </lable>
        </div>
      ),
    },
    {
      text: "Stock Id",
      dataField: "MtrlStockID",
    },
    {
      text: "Width",
      dataField: "DynamicPara1",
    },
    {
      text: "Length",
      dataField: "DynamicPara2",
    },
    {
      text: "Location",
      dataField: "",
    },
  ];

  const columns2 = [
    {
      text: "Id",
      dataField: "MtrlStockID",
      hidden: true,
    },
    {
      text: "Stock Id",
      dataField: "MtrlStockID",
    },
    {
      text: "Width",
      dataField: "DynamicPara1",
    },
    {
      text: "Length",
      dataField: "DynamicPara2",
    },
    {
      text: "Selected",
      dataField: "",
    },
  ];

  const selectRow1 = {
    mode: "checkbox",
    clickToSelect: true,
    bgColor: "#98A8F8",
    selected: firstTableSelectIndex,
    onSelect: (row, isSelect, rowIndex, e) => {
      if (isSelect) {
        setFirstTableSelectIndex([...firstTableSelectIndex, row.MtrlStockID]);
        if (
          formHeader.QtyAllottedTemp + firstTableRow.length <
          formHeader.Qty
        ) {
          //const updatedFirstTableRow = [...firstTableRow, row];
          const updatedFirstTableRow = [...firstTableRow, row];
          setFirstTableRow(updatedFirstTableRow);
          setSecondTableRow(updatedFirstTableRow);
        } else {
        }
      } else {
        firstTableRow.forEach((obj) => {
          //console.log(obj);
          if (obj == row) {
            obj.Locked = 0;
          }
        });

        const updatedFirstTableRow = firstTableRow.filter(
          (obj) => obj.MtrlStockID !== row.MtrlStockID
        );
        setFirstTableRow(updatedFirstTableRow);
        setSecondTableRow(updatedFirstTableRow);
        setFirstTableSelectIndex(
          firstTableSelectIndex.filter((item) => item != row.MtrlStockID)
        );
      }
    },
    onSelectAll: async (isSelect, rows) => {
      if (isSelect) {
        console.log("rows =  selectall");
        //setFirstTableSelectIndex([...firstTableSelectIndex, row.MtrlStockID]);
        let tempIndex = [];
        for (let i = 0; i < rows.length; i++) {
          tempIndex.push(rows[i].MtrlStockID);
        }

        let firstno = formHeader.QtyAllottedTemp + firstTableRow.length;
        let secondno = formHeader.Qty;
        let updatedFirstTableRow = [];
        console.log("initial first = ", firstno, " second = ", secondno);
        // for (
        //   let i = rows.length - 1;
        //   i >= 0 && firstno < secondno;
        //   i--, firstno++
        // ) {
        //   //console.log("i = ", i, " secondno = ", secondno);
        //   updatedFirstTableRow.push(rows[i]);
        // }

        for (let i = 0; i < rows.length && firstno < secondno; i++, firstno++) {
          console.log("i = ", i, " secondno = ", secondno);
          updatedFirstTableRow.push(rows[i]);
        }
        await delay(100);
        setFirstTableSelectIndex(tempIndex);
        console.log("index = ", firstTableSelectIndex);
        console.log("updated = ", updatedFirstTableRow);
        setFirstTableRow(updatedFirstTableRow);
        setSecondTableRow(updatedFirstTableRow);
      } else {
        console.log("rows =  deselectall");

        firstTableRow.forEach((obj) => {
          console.log(obj);
          obj.Locked = 0;
        });

        setFirstTableRow([]);
        setSecondTableRow([]);
        setFirstTableSelectIndex([]);
      }
    },
  };

  console.log("firstTableRow", firstTableRow);

  const selectRow2 = {
    mode: "checkbox",
    clickToSelect: true,
    bgColor: "#98A8F8",
    selected: secondTableSelectIndex,
    onSelect: (row, isSelect, rowIndex, e) => {
      if (isSelect) {
        // When a row is selected
        setSecondTableSelectIndex([...secondTableSelectIndex, row.MtrlStockID]);
        // Add the selected row to selectedRowsInSecondTable
        setSelectedRowsInSecondTable((prevSelectedRows) => [
          ...prevSelectedRows,
          row,
        ]);
      } else {
        // When a row is deselected
        const updatedSecondTableSelectIndex = secondTableSelectIndex.filter(
          (item) => item !== row.MtrlStockID
        );
        setSecondTableSelectIndex(updatedSecondTableSelectIndex);

        // Remove the deselected row from selectedRowsInSecondTable
        setSelectedRowsInSecondTable((prevSelectedRows) =>
          prevSelectedRows.filter(
            (selectedRow) => selectedRow.MtrlStockID !== row.MtrlStockID
          )
        );
      }
    },
    onSelectAll: (isSelect, rows) => {
      if (isSelect) {
        // When "Select All" is checked
        const selectedRowIds = rows.map((row) => row.MtrlStockID);
        setSecondTableSelectIndex(selectedRowIds);
        setSelectedRowsInSecondTable([...rows]);
      } else {
        // When "Select All" is unchecked
        setSecondTableSelectIndex([]);
        setSelectedRowsInSecondTable([]);
      }
    },
  };

  console.log("QtyAllotted", formHeader.QtyAllotted);

  const allotMaterial = async () => {
    setFormHeader({
      ...formHeader,
      QtyAllotted: parseInt(formHeader.QtyAllottedTemp) + firstTableRow.length,
    });
    console.log("QtyAllottedTemp", formHeader.QtyAllottedTemp);
    console.log("firstTableRow.length", firstTableRow.length);

    //set second table
    setSecondTable(secondTableRow);

    firstTableRow.forEach((obj) => {
      console.log(obj);
      obj.Locked = 1;
    });
    await delay(100);
    setFirstTableRow(firstTableRow);

    setSecondTableSelectIndex([]);
    console.log("first table row = ", firstTableRow);
  };

  console.log("secondTableRow", secondTable);

  const uncheckSelectedRows = () => {
    const updatedFirstTable = firstTable.map((row) => {
      if (
        selectedRowsInSecondTable.some(
          (selectedRow) => selectedRow.MtrlStockID === row.MtrlStockID
        )
      ) {
        return {
          ...row,

          Locked: 0,
        };
      }
      return row;
    });
    setFirstTable(updatedFirstTable);
  };

  // const CancelAllotMaterial = async () => {
  //   console.log("second table row = ", secondTableRow);
  //   console.log("selectedRowsInSecondTable = ", selectedRowsInSecondTable);
  //   uncheckSelectedRows();
  //   //setSecondTableRow(secondTable)
  //   // setFormHeader({
  //   //   ...formHeader,
  //   //   QtyAllotted: secondTableRow.length,
  //   // });

  //   //second table
  //   //setSecondTable(secondTableRow);
  //   let secondTableRowObj = [];
  //   secondTableRow.forEach((obj1) => {
  //     let flag = 0;
  //     selectedRowsInSecondTable.forEach((obj2) => {
  //       if (obj1.MtrlStockID === obj2.MtrlStockID) {
  //         flag = 1;
  //       }
  //     });
  //     if (flag == 0) {
  //       secondTableRowObj.push(obj1);
  //     }
  //   });
  //   console.log("secondTableRowObj = ", secondTableRowObj);

  //   setSecondTable(secondTableRowObj);
  //   setSecondTableRow(secondTableRowObj);
  //   setSelectedRowsInSecondTable([]);
  //   setSecondTableSelectIndex([]);
  //   await delay(200);

  //   //deselect first table checkbox
  //   const secondTableMtrlId = [];
  //   secondTableRowObj.map((obj) => {
  //     secondTableMtrlId.push(obj.MtrlStockID);
  //   });
  //   setFirstTableSelectIndex(secondTableMtrlId);

  //   //update firsttable row
  //   let firstTableRowObj = [];
  //   firstTable.forEach((obj1) => {
  //     secondTableRowObj.forEach((obj2) => {
  //       if (obj1.MtrlStockID === obj2.MtrlStockID) {
  //         firstTableRowObj.push(obj1);
  //       }
  //     });
  //   });
  //   setFirstTableRow(firstTableRowObj);

  //   setFormHeader({
  //     ...formHeader,
  //     QtyAllotted: secondTableRowObj.length,
  //   });

  //   //await delay(500);
  //   console.log("After second table row = ", secondTableRow);
  //   console.log(
  //     "After selectedRowsInSecondTable = ",
  //     selectedRowsInSecondTable
  //   );
  // };

  const CancelAllotMaterial = async () => {
    console.log("second table row = ", secondTableRow);
    console.log("selectedRowsInSecondTable = ", selectedRowsInSecondTable);
    uncheckSelectedRows();

    // Calculate the new "Allotted" value by subtracting the count of selected rows in the second table
    const newAllottedValue =
      formHeader.QtyAllotted - selectedRowsInSecondTable.length;

    // Update the "Allotted" field in the formHeader
    setFormHeader({
      ...formHeader,
      QtyAllotted: newAllottedValue,
    });

    // Update the second table by filtering out the selected rows
    let secondTableRowObj = secondTableRow.filter((obj1) => {
      return !selectedRowsInSecondTable.some(
        (obj2) => obj1.MtrlStockID === obj2.MtrlStockID
      );
    });

    console.log("secondTableRowObj = ", secondTableRowObj);

    setSecondTable(secondTableRowObj);
    setSecondTableRow(secondTableRowObj);
    setSelectedRowsInSecondTable([]);
    setSecondTableSelectIndex([]);
    await delay(200);

    // Deselect the checkboxes in the first table
    const secondTableMtrlId = [];
    secondTableRowObj.forEach((obj) => {
      secondTableMtrlId.push(obj.MtrlStockID);
    });
    setFirstTableSelectIndex(secondTableMtrlId);

    // Update the first table row
    let firstTableRowObj = [];
    firstTable.forEach((obj1) => {
      secondTableRowObj.forEach((obj2) => {
        if (obj1.MtrlStockID === obj2.MtrlStockID) {
          firstTableRowObj.push(obj1);
        }
      });
    });
    setFirstTableRow(firstTableRowObj);

    // console.log("After second table row = ", secondTableRow);
    // console.log(
    //   "After selectedRowsInSecondTable = ",
    //   selectedRowsInSecondTable
    // );
  };

  let modalResponse = async (data) => {
    //await delay(500);
    //console.log("data = ", data);
    if (data === "yes") {
      //get running no and assign to RvNo
      let yyyy = formatDate(new Date(), 6).toString();
      const url =
        endpoints.getRunningNo +
        "?SrlType=ShopFloor_SheetIssueVoucher&Period=" +
        yyyy;
      //console.log(url);
      getRequest(url, async (data) => {
        data.map(async (obj) => {
          let newNo = parseInt(obj.Running_No) + 1;
          console.log("newno = ", newNo);

          //insert into shopfloormaterialissueregister
          let header1 = {
            IV_No: newNo,
            Issue_date: formatDate(new Date(), 2),
            NC_ProgramNo: formHeader.NCProgramNo,
            QtyIssued: secondTable.length,
            QtyReturned: 0,
            Ncid: formHeader.Ncid,
          };
          postRequest(
            endpoints.insertShopfloorMaterialIssueRegister,
            header1,
            async (data) => {
              if (data.affectedRows !== 0) {
                console.log("insertid = ", data.insertId);
                //await delay(500);
                setissueidval(data.insertId);
                await delay(500);
                setissueidval(data.insertId);

                //update ncprogram
                //update nc programs
                let header2 = {
                  Id: formHeader.Ncid,
                  Qty: secondTable.length,
                };
                postRequest(
                  endpoints.updateQtyAllotedncprograms2,
                  header2,
                  async (data) => {
                    if (data.affectedRows !== 0) {
                      //toast.success("Record updated Successfully");
                    } else {
                      //toast.error("Record Not Updated");
                    }
                  }
                );

                //find nor return
                var noreturn = 0;
                switch (formHeader.Shape) {
                  case "Sheet":
                    noreturn = 0;
                    break;
                  case "Units":
                    noreturn = 1;
                    break;
                  case "Tube Round":
                    noreturn = 1;
                    break;
                  case "Tube Square":
                    noreturn = 1;
                    break;
                  case "Tube Rectangle":
                    noreturn = 1;
                    break;
                  case "Tiles":
                    noreturn = 1;
                    break;
                  case "Plate":
                    noreturn = 0;
                    break;
                  case "Strip":
                    noreturn = 0;
                    break;
                  default:
                    noreturn = 0;
                    break;
                }
                await delay(1000);
                setissueidval(data.insertId);
                console.log("issueidval = ", issueidval);

                //console.log("shape = ", formHeader.Shape, " noreturn = ", noreturn);
                for (let i = 0; i < secondTable.length; i++) {
                  //update mtrlstock lock
                  let header3 = {
                    id: secondTable[i].MtrlStockID,
                  };
                  postRequest(
                    endpoints.updateMtrlStockLock,
                    header3,
                    async (data) => {
                      if (data.affectedRows !== 0) {
                        //toast.success("Record updated Successfully");
                      } else {
                        //toast.error("Record Not Updated");
                      }
                    }
                  );
                  //insert ncprogrammtrlallotmentlist
                  let header4 = {
                    TaskNo: formHeader.TaskNo,
                    NCProgramNo: formHeader.NCProgramNo,
                    ShapeMtrlID: secondTable[i].MtrlStockID,
                    Mtrl_Code: secondTable[i].Mtrl_Code,
                    NCPara1: formHeader.Para1,
                    NCPara2: formHeader.Para2,
                    NCPara3: formHeader.Para3,
                    Para1: secondTable[i].DynamicPara1,
                    Para2: secondTable[i].DynamicPara2,
                    Para3: secondTable[i].DynamicPara3,
                    IssueId: data.insertId,
                    NoReturn: noreturn,
                    Ncid: formHeader.Ncid,
                  };
                  postRequest(
                    endpoints.insertncprogrammtrlallotmentlist,
                    header4,
                    async (data) => {
                      if (data.affectedRows !== 0) {
                        //toast.success("Record updated Successfully");
                      } else {
                        //toast.error("Record Not Updated");
                      }
                    }
                  );
                }

                //update running no
                const inputData = {
                  SrlType: "ShopFloor_SheetIssueVoucher",
                  Period: formatDate(new Date(), 6),
                  RunningNo: newNo,
                };
                postRequest(endpoints.updateRunningNo, inputData, (data) => {});
                //console.log("Return id = ", issueidval);
                //return data.insertId;

                console.log("insertid again = ", data.insertId);
                if (data.insertId > 0) {
                  //open popup modal
                  let series = "";
                  for (
                    let i = 0;
                    i < parseInt(obj.Length) - newNo.toString().length;
                    i++
                  ) {
                    series = series + "0";
                  }
                  series = series + "" + newNo;
                  console.log("Issue Voucner number is created : " + series);
                  localStorage.setItem(
                    "issuevoucer",
                    "Issue Voucner number is created : " + series
                  );
                  localStorage.issuevoucer =
                    "Issue Voucner number is created : " + series;
                  //await delay(500);
                  //setmessageok("Issue Voucner number is created : " + series);
                  //setmessageok(localStorage.getItem("issuevoucer"));
                  //messageok = "Issue Voucner number is created : " + series;
                  //setmessageok("Issue Voucner number is created : " + series);
                  //await delay(500);
                  //setmessageok("Issue Voucner number is created : " + series);

                  setShowok(true);
                }

                //toast.success("Record Inserted");
              } else {
                //toast.error("Record Not Inserted");
              }
            }
          );
        });
      });
    }
  };

  let modalResponseok = async (data) => {
    if (data === "ok") {
      nav(
        "/MaterialManagement/ShopFloorIssue/IVListProfileCutting/Closed/ShopMatIssueVoucher",
        {
          state: { issueIDVal: issueidval },
        }
      );
    }
  };
  const issueToProduction = () => {
    if (secondTable.length === 0) {
      toast.error("Please Select material before alloting");
    } else {
      setShow(true);
    }
    // nav(
    //   "/materialmanagement/shopfloorissue/service/units/shopfloormaterialissuevocher"
    // )
  };
  return (
    <>
      <OkModal
        show={showok}
        setShow={setShowok}
        modalMessage={localStorage.issuevoucer}
        modalResponseok={modalResponseok}
      />
      <YesNoModal
        show={show}
        setShow={setShow}
        message="Do you issue the selected material for production?"
        modalResponse={modalResponse}
      />

      <div>
        <h4 className="title">Material Allotment Form</h4>

        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Task No</label>
            <input type="text" value={formHeader.TaskNo} disabled />
          </div>
          <div className="col-md-6">
            <label className="form-label">Customer</label>
            <input type="text" value={formHeader.customer} disabled />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div style={{ marginBottom: "9px" }}>
              <label className="form-label">NC Program No</label>
              <input
                // className="form-label"
                value={formHeader.NCProgramNo}
                disabled
              />
            </div>
          </div>
          <div className="col-md-6">
            <div style={{ marginBottom: "9px" }}>
              <label className="form-label">Material Code</label>
              <input
                // className="form-label"
                value={formHeader.Mtrl_Code}
                disabled
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <label className="form-label">Priority</label>
            <input
              // className="form-label"
              value={formHeader.Priority}
              disabled
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Width</label>
            <input value={formHeader.Para1} disabled />
          </div>

          <div className="col-md-3">
            <label className="form-label">Machine</label>
            <input value={formHeader.Machine} disabled />
          </div>
          <div className="col-md-3">
            <label className="form-label">Quantity</label>
            <input value={formHeader.Qty} disabled />
          </div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <label className="form-label">Status</label>
            <input value={formHeader.PStatus} disabled />
          </div>
          <div className="col-md-3">
            <label className="form-label">Length</label>
            <input value={formHeader.Para2} disabled />
          </div>

          <div className="col-md-3">
            <label className="form-label">Process</label>
            <input
              // className="form-label"
              value={formHeader.MProcess}
              disabled
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Allotted</label>
            <input
              // className="form-label"
              value={formHeader.QtyAllotted}
              disabled
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <label className="form-label">Source</label>
            <input
              // className="form-label"
              value={formHeader.CustMtrl}
              disabled
            />
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-3 col-sm-12">
                <button
                  className="button-style "
                  //   disabled={true}
                  onClick={allotMaterial}
                  style={{ width: "180px" }}
                >
                  Allot Material
                </button>
              </div>
              <div className="col-md-3 col-sm-12">
                <button
                  className="button-style "
                  onClick={CancelAllotMaterial}
                  style={{ width: "180px" }}
                  //   disabled={true}
                  //   onClick={addToStock}
                >
                  Cancel Allot
                </button>
              </div>
              <div className="col-md-3 col-sm-12">
                <button
                  className="button-style "
                  //   disabled={true}
                  onClick={issueToProduction}
                  // style={{width:"180px"}}
                  style={{ width: "185px" }}
                >
                  Issue to Production
                </button>
              </div>
              <div className="col-md-3 col-sm-12">
                <button
                  className="button-style "
                  id="btnclose"
                  type="submit"
                  onClick={() => nav("/MaterialManagement")}
                  style={{ width: "180px" }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-7">
            <div
              style={{
                height: "400px",
                overflowY: "scroll",
                marginTop: "10px",
              }}
            >
              <BootstrapTable
                keyField="MtrlStockID"
                columns={columns1}
                data={firstTable}
                striped
                hover
                condensed
                //pagination={paginationFactory()
                selectRow={selectRow1}
                headerClasses="header-class"
              ></BootstrapTable>
            </div>
          </div>
          <div className="col-md-5">
            <div
              style={{
                height: "400px",
                overflowY: "scroll",
                marginTop: "10px",
              }}
            >
              <BootstrapTable
                keyField="MtrlStockID"
                columns={columns2}
                data={secondTable}
                striped
                hover
                condensed
                //pagination={paginationFactory()
                selectRow={selectRow2}
                headerClasses="header-class tableHeaderBGColor"
              ></BootstrapTable>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UnitsMatAllotmentForm;
