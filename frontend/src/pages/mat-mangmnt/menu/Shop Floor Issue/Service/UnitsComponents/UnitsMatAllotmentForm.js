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
  console.log("ncid = ", location.state.ncid);
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const [formHeader, setFormHeader] = useState({});
  const [firstTable, setFirstTable] = useState([]);
  const [secondTable, setSecondTable] = useState([]);
  const [firstTableRow, setFirstTableRow] = useState([]);
  const [secondTableRow, setSecondTableRow] = useState([]);
  const [issueidval, setissueidval] = useState("");
  //const [firstTable, setFirstTable] = useState([]);

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
        console.log("form header data = ", data);
        console.log("table data = ", data2);
        setFirstTable(data2);
        if (data2.length == 0) {
          toast.warning(
            "There is no material to allot for this program. Check if you have added the material to customer stock?"
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
    onSelect: (row, isSelect, rowIndex, e) => {
      if (isSelect) {
        console.log("formheader = ", formHeader);
        console.log("firsttable = ", firstTableRow);
        if (
          formHeader.QtyAllottedTemp + firstTableRow.length <
          formHeader.Qty
        ) {
          setFirstTableRow([...firstTableRow, row]);
          setSecondTableRow([...firstTableRow, row]);
        } else {
          //isSelect = false;
          //row.isSelect = false;
        }
      } else {
        setFirstTableRow(
          firstTableRow.filter((obj) => {
            return obj.MtrlStockID !== row.MtrlStockID;
          })
        );
        setSecondTableRow(
          firstTableRow.filter((obj) => {
            return obj.MtrlStockID !== row.MtrlStockID;
          })
        );
      }
      //delay(3000);
      //console.log("isselect = ", isSelect);
      //console.log("selected table row = ", firstTableRow);
    },
    onSelectAll: (isSelect, rows) => {
      //console.log("rows = ", rows);
      //setFirstTableRow(rows);
      //console.log("selected table row = ", firstTableRow);
    },
  };
  const selectRow2 = {
    mode: "checkbox",
    clickToSelect: true,
    bgColor: "#98A8F8",
    onSelect: (row, isSelect, rowIndex, e) => {
      if (isSelect) {
        //setSecondTableRow([...secondTableRow, row]);
        setSecondTableRow(
          secondTableRow.filter((obj) => {
            return obj.MtrlStockID !== row.MtrlStockID;
          })
        );
      } else {
        setSecondTableRow(secondTableRow);
      }
    },
  };

  const allotMaterial = () => {
    setFormHeader({
      ...formHeader,
      QtyAllotted: parseInt(formHeader.QtyAllottedTemp) + firstTableRow.length,
    });
    setSecondTable(firstTableRow);
  };
  const CancelAllotMaterial = () => {
    setSecondTable(secondTableRow);

    setFormHeader({
      ...formHeader,
      QtyAllotted:
        parseInt(formHeader.QtyAllotted) +
        secondTableRow.length -
        firstTableRow.length,
    });
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
                className="form-label"
                value={formHeader.NCProgramNo}
                disabled
              />
            </div>
          </div>
          <div className="col-md-6">
            <div style={{ marginBottom: "9px" }}>
              <label className="form-label">Material Code</label>
              <input
                className="form-label"
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
              className="form-label"
              value={formHeader.Priority}
              disabled
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Para 1</label>
            <input className="form-label" value={formHeader.Para1} disabled />
          </div>

          <div className="col-md-3">
            <label className="form-label">Machine</label>
            <input className="form-label" value={formHeader.Machine} disabled />
          </div>
          <div className="col-md-3">
            <label className="form-label">Quantity</label>
            <input className="form-label" value={formHeader.Qty} disabled />
          </div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <label className="form-label">Status</label>
            <input className="form-label" value={formHeader.PStatus} disabled />
          </div>
          <div className="col-md-3">
            <label className="form-label">Para 2</label>
            <input className="form-label" value={formHeader.Para2} disabled />
          </div>

          <div className="col-md-3">
            <label className="form-label">Process</label>
            <input
              className="form-label"
              value={formHeader.MProcess}
              disabled
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Allotted</label>
            <input
              className="form-label"
              value={formHeader.QtyAllotted}
              disabled
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <label className="form-label">Source</label>
            <input
              className="form-label"
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
                headerClasses="header-class"
              ></BootstrapTable>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UnitsMatAllotmentForm;
