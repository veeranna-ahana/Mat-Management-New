import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import ReturnCancelIVModal from "../../../components/ReturnCancelIVModal";
import CreateDCYesNoModal from "../../../components/CreateDCYesNoModal";
// import { dateToShort, formatDate } from "../../../../../utils";
// import BootstrapTable from "react-bootstrap-table-next";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import PrintPartsDC from "../../../print/return/PrintPartsDC";
import { formatDate } from "../../../../../utils";

// formatDate

const { getRequest, postRequest } = require("../../../../api/apiinstance");
const { endpoints } = require("../../../../api/constants");

function OutwordPartIssueVocher(props) {
  const [printOpen, setPrintOpen] = useState(false);

  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const [showCreateDC, setShowCreateDC] = useState(false);
  let [custdata, setCustdata] = useState({
    Address: "",
  });
  // //initial disable - print button
  // const [boolVal1, setBoolVal1] = useState(true);

  // //after clicking create dc
  // const [boolVal2, setBoolVal2] = useState(false);

  // //after clicking cancel dc
  // const [boolVal3, setBoolVal3] = useState(false);

  let [dcID, setdcID] = useState("");
  let [dcRegister, setdcRegister] = useState({});

  const [outData, setOutData] = useState([]);
  // const [upData, setUpData] = useState();

  const location = useLocation();

  const [IVNOValue, setIVNOValue] = useState("");
  const [IVIDValue, setIVIDValue] = useState("");
  // console.log("formtype :", location?.state?.propsType);

  const [formHeader, setFormHeader] = useState({
    Iv_Id: "",
    IV_No: "",
    IV_Date: "",
    Cust_code: "",
    Customer: "",
    CustCSTNo: "",
    CustGSTNo: "",
    PkngDcNo: "",
    TotalWeight: "",
    TotalCalculatedWeight: "",
    Dc_ID: "",
    IVStatus: "",
    RV_Remarks: "",
  });

  const [runningNo, setRunningNo] = useState([]);

  async function fetchData() {
    //header data
    let url =
      endpoints.getMaterialIssueRegisterRouterByIVID +
      "?id=" +
      location.state.selectData.Iv_Id;
    //console.log("url = ", url);
    getRequest(url, (data) => {
      setIVNOValue(data.IV_No);
      setIVIDValue(data.Iv_Id);
      setdcID(data.Dc_ID);
      setFormHeader({
        Iv_Id: data.Iv_Id,
        IV_No: data.IV_No,
        IV_Date: data.IV_Date,
        Cust_code: data.Cust_code,
        CustCSTNo: data.CustCSTNo,
        Customer: data.Customer,
        CustGSTNo: data.CustGSTNo,
        PkngDcNo: data.PkngDcNo,
        TotalWeight: parseFloat(data.TotalWeight).toFixed(3),
        TotalCalculatedWeight: parseFloat(data.TotalCalculatedWeight).toFixed(
          3
        ),
        Dc_ID: data.Dc_ID,
        IVStatus: data.IVStatus,
        RV_Remarks: data.RV_Remarks || "",
      });

      //get cust data
      let url2 = endpoints.getCustomerByCustCode + "?code=" + data.Cust_code;
      getRequest(url2, async (data) => {
        setCustdata(data);
      });
    });

    //grid data
    let url1 =
      endpoints.getmtrlPartIssueDetailsByIVID +
      "?id=" +
      location.state.selectData.Iv_Id;
    getRequest(url1, (data) => {
      // console.log("out data = ", data);
      setOutData(data);
    });
  }

  useEffect(() => {
    fetchData();
  }, []); //[inputPart]);

  // const columns = [
  //   {
  //     text: "Srl",
  //     dataField: "Srl",
  //   },
  //   {
  //     text: "PartId / Part Name",
  //     dataField: "PartId",
  //   },
  //   {
  //     text: "Qty Returned",
  //     dataField: "QtyReturned",
  //   },
  //   {
  //     text: "Unit Weight",
  //     dataField: "UnitWt",
  //   },
  //   {
  //     text: "Total Weight",
  //     dataField: "TotalWeight",
  //   },
  //   {
  //     text: "Remarks",
  //     dataField: "Remarks",
  //   },
  //   {
  //     text: "Updated",
  //     dataField: "",
  //     formatter: (celContent, row) => (
  //       <div className="checkbox">
  //         <lable>
  //           <input
  //             type="checkbox"
  //             disabled={
  //               formHeader.IVStatus === "Cancelled"
  //                 ? true
  //                 : false || (formHeader.IVStatus === "Returned")
  //                 ? true
  //                 : false
  //             }
  //           />
  //         </lable>
  //       </div>
  //     ),
  //   },
  // ];

  // console.log("formheader...", formHeader);

  const InputHeaderEvent = (name, value) => {
    // console.log("function.........", "name", name, "value", value);
    // const { name, value } = e.target;
    setFormHeader({ ...formHeader, [name]: value });
  };

  const saveButtonState = (e) => {
    e.preventDefault();
    /*if (formHeader.PkngDcNo.length == 0) {
      toast.error("Please Select PkngDcNo");
    } else if (formHeader.TotalWeight.length == 0)
      toast.error("Please Enter TotalWeight");
    else {*/
    postRequest(
      endpoints.updateDCWeight,
      { outData: outData, formHeader: formHeader, type: "part" },
      (data) => {
        // console.log("data = ", data);
        if (data.affectedRows !== 0) {
          toast.success("Record Updated Successfully");
        } else {
          toast.error("Record Not Updated");
        }
      }
    );
    //}
  };
  // function statusFormatter(cell, row, rowIndex, formatExtraData) {
  //   if (!cell) return;
  //   return dateToShort(cell);
  // }
  let cancelIV = () => {
    //console.log(IVNOValue, " and ", IVIDValue);
    // InputHeaderEvent(IVStatus)
    setShow(true);
    // setBoolVal2(true);
    setFormHeader({ ...formHeader, IVStatus: "Cancelled" });
  };

  const getRunningNo = async () => {
    let SrlType = "Outward_DCNo";
    let yyyy = formatDate(new Date(), 6).toString();
    let UnitName = "Jigani";
    const insertRunningNoVal = {
      UnitName: UnitName,
      SrlType: SrlType,
      ResetPeriod: "Year",
      ResetValue: "0",
      EffectiveFrom_date: `${yyyy}-01-01`,
      Reset_date: `${yyyy}-12-31`,
      Running_No: "0",
      UnitIntial: "0",
      Prefix: "",
      Suffix: "",
      Length: "4",
      Period: yyyy,
    };

    // var runningNo = [];
    postRequest(
      endpoints.getAndInsertRunningNo,
      insertRunningNoVal,
      (runningNo) => {
        // console.log("post done", runningNo);
        setRunningNo(runningNo);
        // runningNo = runningNo;
      }
    );
    // await delay(30);
    // console.log("runningNo", runningNo);
  };

  let createDC = (e) => {
    let flag = true;

    for (let i = 0; i < outData.length; i++) {
      const element = outData[i];
      if (
        element.TotalWeight === null ||
        element.TotalWeight === "null" ||
        element.TotalWeight === "" ||
        element.TotalWeight === 0 ||
        element.TotalWeight === "0" ||
        element.TotalWeight === "0.000" ||
        element.TotalWeight === "0.00" ||
        element.TotalWeight === 0.0
      ) {
        flag = false;
        break;
      }
    }

    if (flag) {
      getRunningNo();
      setShowCreateDC(true);
      // saveButtonState(e);
    } else {
      toast.warning("Serial Weight cannot be zero. Set Weight and try again");
    }

    // let flag = 0;
    // if (
    //   formHeader.TotalWeight === 0 ||
    //   formHeader.TotalWeight === "0" ||
    //   formHeader.TotalWeight === "0.000" ||
    //   formHeader.TotalWeight === "0.00" ||
    //   formHeader.TotalWeight === 0.0
    // ) {
    //   toast.error("Serial Weight cannot be zero. Set Weight and try again");
    //   flag = 1;
    // }
    // if (flag === 0) {
    //   // console.log("Valid");
    //   setShowCreateDC(true);
    //   saveButtonState(e);
    //   //setBoolVal1(false);
    //   //setBoolVal2(true);
    // }

    //setShowCreateDC(true);
    //setBoolVal1(false);
    //setBoolVal2(true);

    //setShowCreateDC(true);
  };
  let getDCID = async (data) => {
    // console.log("get dc = ", data);
    setdcID(data);

    if (data !== "" && data !== 0 && data !== undefined) {
      //get data from dcregister
      let url3 = endpoints.getDCRegisterByID + "?id=" + data;
      getRequest(url3, (data) => {
        // console.log("dc register data = ", data);
        setdcRegister(data);
      });

      //button enable disable
      // setBoolVal1(false);
      // setBoolVal2(true);

      //fetch again dcno
      let url4 =
        endpoints.getMaterialIssueRegisterRouterByIVID +
        "?id=" +
        location.state.selectData.Iv_Id;
      getRequest(url4, async (data) => {
        setFormHeader({
          ...formHeader,
          PkngDcNo: data.PkngDcNo,
        });
      });
    }
  };
  let printDC = () => {
    //console.log("First formheader = ", formHeader, " outdata = ", outData);
    if (dcID !== "" && dcID !== 0) {
      // nav("/MaterialManagement/Return/CustomerJobWork/PrintPartsDC", {
      //   //formHeader: formHeader,
      //   //outData: outData,
      //   state: {
      //     //id: data.RvID,
      //     formHeader: formHeader,
      //     outData: outData,
      //     custdata: custdata,
      //     dcRegister: dcRegister,
      //   },
      // });
      setPrintOpen(true);

      //window.location.reload();
    } else {
      toast.error("DC Not Created");
    }
  };

  // const handleSave = () => {
  //   const type = "parts";
  //   //get running no
  //   // debugger;
  //   let yyyy = formatDate(new Date(), 6).toString();
  //   const url = endpoints.getRunningNo + "?SrlType=Outward_DCNo&Period=" + yyyy;
  //   // console.log(url);
  //   getRequest(url, (data) => {
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

  //       //get last 2 digit of year
  //       let yy = formatDate(new Date(), 6).toString().substring(2);
  //       let no = yy + "/" + series;
  //       // console.log("no = ", no);
  //       //toast.success("No = ", no);

  //       //get cust data
  //       let url1 =
  //         endpoints.getCustomerByCustCode + "?code=" + formHeader.Cust_code;
  //       // console.log("url = ", url1);
  //       getRequest(url1, (data) => {
  //         let DCRegister = {
  //           DC_Type: "Material Return",
  //           DC_No: no,
  //           DC_Date: formatDate(new Date(), 2),
  //           Cust_Code: formHeader.Cust_code,
  //           Cust_Name: formHeader.Customer,
  //           Cust_Address: data.Address,
  //           Cust_Place: data.City,
  //           Cust_State: data.State,
  //           PIN_Code: data.Pin_Code,
  //           GSTNo: type === "parts" ? "" : data.GSTNo,
  //           ECC_No: type === "parts" ? data.ECC_No : "",
  //           TIN_No: type === "parts" ? data.TIN_No : "",
  //           CST_No: type === "parts" ? data.CST_No : "",
  //           AuhtorisingDocu:
  //             formHeader.IV_No +
  //             " Dt " +
  //             formatDate(
  //               new Date(formHeader.IV_Date.toString().substring(0, 10)),
  //               7
  //             ),
  //           Total_Wt: formHeader.TotalWeight,
  //           ScarpWt: 0,
  //           DCStatus: "Draft",
  //           Remarks:
  //             formHeader.IV_No +
  //             " Dt " +
  //             formatDate(
  //               new Date(
  //                 new Date(
  //                   formHeader.IV_Date.toString().substring(0, 10)
  //                 ).toDateString()
  //               ),
  //               7
  //             ),
  //         };

  //         // console.log("form header = ", props.formHeader);
  //         // console.log("table data = ", props.outData);
  //         //console.log("dcregister = ", DCRegister);

  //         //insert dc_register table
  //         postRequest(endpoints.insertDCRegister, DCRegister, async (data) => {
  //           // console.log("DC Register Inserted");
  //         });

  //         //get the last insert id of dc details
  //         getRequest(endpoints.getLastInsertIDDCDetails, (data) => {
  //           let dc_id = data.DC_ID + 1;
  //           // console.log("Last id = ", dc_id);
  //           for (let i = 0; i < outData.length; i++) {
  //             //dc_id = dc_id + 1;
  //             let dcdetails = {
  //               DC_ID: dc_id,
  //               DC_Srl: i + 1,
  //               Cust_Code: outData[i].Cust_Code,
  //               cust_docu_No: formHeader.IV_No,
  //               Item_Descrption:
  //                 type === "parts"
  //                   ? outData[i].PartId
  //                   : outData[i].MtrlDescription,
  //               Material:
  //                 type === "parts" ? outData[i].Remarks : outData[i].Material,
  //               Qty: type === "parts" ? outData[i].QtyReturned : outData[i].Qty,
  //               Unit_Wt: type === "parts" ? outData[i].UnitWt : 0,
  //               DC_Srl_Wt: outData[i].TotalWeight,
  //               Excise_CL_no: null,
  //               DespStatus: "Closed",
  //             };
  //             //insert dcdetails
  //             postRequest(
  //               endpoints.insertDCDetails,
  //               dcdetails,
  //               async (data) => {
  //                 // console.log("DC Details Inserted");
  //               }
  //             );

  //             let dcupdatedetails = {
  //               Iv_Id: formHeader.Iv_Id,
  //               PkngDcNo: no,
  //               Dc_ID: dc_id,
  //             };
  //             //update material issue register
  //             postRequest(
  //               endpoints.updateStatusDCNoDCID,
  //               dcupdatedetails,
  //               async (data) => {
  //                 // console.log("material issue register Updated");
  //               }
  //             );

  //             //send dc id to main page
  //             getDCID(dc_id);
  //             // InputHeaderEvent("IVStatus", "Returned");

  //             //update the running no
  //             const inputData = {
  //               SrlType: "Outward_DCNo",
  //               Period: formatDate(new Date(), 6),
  //               RunningNo: newNo,
  //             };
  //             postRequest(endpoints.updateRunningNo, inputData, (data) => {});
  //           }

  //           //console.log("dc details = ", dcdetails);
  //         });
  //         //insert dc details
  //       });
  //       /*props.type === "parts"
  //           ? nav(
  //               "/materialmanagement/return/customerjobwork/OutwordPartIssueVocher"
  //             )
  //           : nav(
  //               "/materialmanagement/return/customerjobwork/OutwordMaterialIssueVocher"
  //             );*/

  //       // props.setFormHeader({
  //       //   ...props.formHeader,
  //       //   IVStatus: "test",
  //       //   text: "123",
  //       // });
  //       // props.setTest(true);

  //       // props.setFormHeader

  //       // props.setReturnValueFunc();
  //       setFormHeader({
  //         ...formHeader,
  //         IVStatus: "Returned",
  //       });
  //       toast.success("DC Created Successfully");
  //       // props.setFormHeader({
  //       //   ...props.formHeader,
  //       //   IVStatus: "test",
  //       //   text: "123",
  //       // });

  //       // window.location.reload();
  //       // window.location.reload();
  //       //setpnno("");
  //       //setShow(false);
  //     });
  //   });
  //   // console.log("form header...", props.formHeader);

  //   // props.setFormHeader([])
  // };

  const setReturnValueFunc = () => {
    setFormHeader({
      ...formHeader,
      IVStatus: "Returned",
    });
  };

  const createDcResponse = async (data) => {
    //await delay(500);
    setFormHeader(data);
    //setBoolVal4(true);
    //setBoolVal6(false);
  };

  // console.log("status", formHeader.IVStatus);

  const updateChange = (key, value, field) => {
    const newArray = [];

    for (let i = 0; i < outData.length; i++) {
      const element = outData[i];

      if (i === key) {
        element[field] = value;
      }
      // console.log("element", element);

      newArray.push(element);

      // if(i===key){

      // }else{

      //   setOutData([element])
      // }
    }

    // console.log("new", newArray);

    setOutData(newArray);
  };

  // console.log("outdata", outData);
  const handleChangeWeightTotalCal = () => {
    let newTotalWeight = 0;
    for (let i = 0; i < outData.length; i++) {
      const element = outData[i];
      // console.log("elemet@@@@@@@@@@@@@@", element.TotalWeightCalculated);
      newTotalWeight =
        parseFloat(newTotalWeight) + parseFloat(element.TotalWeight);
    }

    setFormHeader({
      ...formHeader,
      TotalWeight: newTotalWeight,
    });
  };

  return (
    <>
      {/* new */}
      <div>
        {/* header */}
        <h4 className="title">Outward Part Issue Voucher</h4>
        {/* content */}

        <div>
          <div className="row">
            <div className="col-md-3">
              <label className="form-label">IV No</label>
              <input
                type="text"
                name="IvId"
                value={formHeader.IV_No}
                disabled
                className="input-disabled"
                // onChange={InputHeaderEvent}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">IV Date</label>

              <input
                type="text"
                name="IVDate"
                value={formHeader.IV_Date}
                disabled
                className="input-disabled"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Status</label>
              <input
                type="text"
                name="reference"
                value={formHeader.IVStatus}
                disabled
                className="input-disabled"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">DC No / PN No</label>
              <input
                type="text"
                name="PkngDcNo"
                value={
                  formHeader.PkngDcNo
                  // ? formHeader.PkngDcNo +
                  //   "   Date : " +
                  //   formHeader.PkngDCDate
                  // : ""
                }
                // onChange={InputHeaderEvent}
                disabled
                className="input-disabled"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Customer</label>
              <input
                type="text"
                name="Customer"
                value={formHeader.Customer}
                disabled
                className="input-disabled"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">GST</label>
              <input
                type="text"
                name="reference"
                value={formHeader.CustGSTNo}
                disabled
                className="input-disabled"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Calculated Weight</label>
              <input
                name="Type"
                value={formHeader.TotalCalculatedWeight}
                disabled
                className="input-disabled"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Actual Weight</label>
              <input
                type="number"
                min="0"
                name="TotalWeight"
                defaultValue={formHeader.TotalWeight}
                onChange={(e) => {
                  InputHeaderEvent(e.target.name, parseFloat(e.target.value));
                }}
                disabled={
                  formHeader.IVStatus === "Cancelled" ||
                  formHeader.IVStatus === "Returned"
                    ? true
                    : false
                }
                className={
                  formHeader.IVStatus === "Cancelled" ||
                  formHeader.IVStatus === "Returned"
                    ? "input-disabled"
                    : ""
                }
              />
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column">
                <label className="form-label">Consignee Address</label>
                <textarea
                  cols="30"
                  rows="3"
                  value={custdata.Address}
                  disabled
                  className="input-disabled"
                  style={{ height: "90px" }}
                ></textarea>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column">
                <label className="form-label">Remarks</label>
                <textarea
                  cols="30"
                  rows="3"
                  name="RV_Remarks"
                  value={formHeader.RV_Remarks}
                  onChange={(e) => {
                    InputHeaderEvent(e.target.name, e.target.value);
                  }}
                  disabled={
                    formHeader.IVStatus === "Cancelled" ||
                    formHeader.IVStatus === "Returned"
                      ? true
                      : false
                  }
                  className={
                    formHeader.IVStatus === "Cancelled" ||
                    formHeader.IVStatus === "Returned"
                      ? "input-disabled"
                      : ""
                  }
                  style={{ height: "90px" }}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* button */}

        <div className="d-flex justify-content-between">
          <button
            onClick={saveButtonState}
            disabled={
              formHeader.IVStatus === "Cancelled" ||
              formHeader.IVStatus === "Returned"
                ? true
                : false
            }
            className={
              formHeader.IVStatus === "Cancelled" ||
              formHeader.IVStatus === "Returned"
                ? "button-style ms-3 button-disabled"
                : "button-style ms-3"
            }
          >
            Save
          </button>
          <button
            onClick={cancelIV}
            disabled={
              formHeader.IVStatus === "Cancelled" ||
              formHeader.IVStatus === "Returned"
                ? true
                : false
            }
            className={
              formHeader.IVStatus === "Cancelled" ||
              formHeader.IVStatus === "Returned"
                ? "button-style button-disabled"
                : "button-style"
            }
          >
            Cancel IV
          </button>
          <button
            onClick={createDC}
            disabled={
              formHeader.IVStatus === "Cancelled" ||
              formHeader.IVStatus === "Returned"
                ? true
                : false
            }
            className={
              formHeader.IVStatus === "Cancelled" ||
              formHeader.IVStatus === "Returned"
                ? "button-style button-disabled"
                : "button-style"
            }
          >
            Create DC
          </button>
          <button
            onClick={printDC}
            disabled={
              formHeader.IVStatus === "Cancelled" ||
              formHeader.IVStatus === "Returned"
                ? false
                : true
            }
            className={
              formHeader.IVStatus === "Cancelled" ||
              formHeader.IVStatus === "Returned"
                ? "button-style"
                : "button-disabled button-style"
            }
          >
            Print DC
          </button>
          <button
            className="button-style me-3"
            id="btnclose"
            type="submit"
            onClick={() => nav("/MaterialManagement")}
          >
            Close
          </button>
        </div>

        <div className="p-2"></div>

        {/* table */}
        {/* <div className="row">
          <div className="col-md-12">
            <div style={{ maxHeight: "420px", overflow: "auto" }}>
              <BootstrapTable
                headerClasses="header-class tableHeaderBGColor"
                keyField="IV_No"
                //keyField="id"
                columns={columns}
                data={outData}
                striped
                hover
                condensed
                //pagination={paginationFactory()}
                //selectRow={selectRow}
              ></BootstrapTable>
            </div>
          </div>
        </div> */}

        {/* table */}
        <div className="row">
          <div className="col-md-12">
            <div style={{ maxHeight: "420px", overflow: "auto" }}>
              <Table
                striped
                className="table-data border"
                style={{ border: "1px" }}
              >
                <thead className="tableHeaderBGColor">
                  <tr>
                    <th>SL No</th>
                    <th>PartId / Part Name</th>
                    <th>Qty Returned</th>
                    <th>Unit Weight</th>
                    <th>Total Weight</th>
                    <th>Remarks</th>
                    <th>Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {outData.map((val, key) => (
                    <tr>
                      <td>{key + 1}</td>
                      <td>{val.PartId}</td>
                      <td>{parseInt(val.QtyReturned)} </td>
                      <td>{parseFloat(val.UnitWt).toFixed(3)}</td>
                      <td>
                        {/* {val.TotalWeight} */}

                        <input
                          type="number"
                          min={0}
                          // disabled={
                          //   (formHeader.IVStatus === "Cancelled") ||
                          //   (formHeader.IVStatus === "Returned")
                          //     ? true
                          //     : false
                          // }
                          defaultValue={parseFloat(val.TotalWeight).toFixed(3)}
                          onChange={(e) => {
                            updateChange(
                              key,
                              e.target.value.length === 0 ? 0 : e.target.value,
                              "TotalWeight"
                            );
                            handleChangeWeightTotalCal();
                          }}
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                          disabled={
                            formHeader.IVStatus === "Cancelled" ||
                            formHeader.IVStatus === "Returned"
                              ? true
                              : false
                          }
                          className={
                            formHeader.IVStatus === "Cancelled" ||
                            formHeader.IVStatus === "Returned"
                              ? "input-disabled"
                              : ""
                          }
                        />
                      </td>
                      <td>{val.Remarks}</td>
                      <td>
                        {val.UpDated === 0 ? (
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            disabled={
                              formHeader.IVStatus === "Cancelled" ||
                              formHeader.IVStatus === "Returned"
                                ? true
                                : false
                            }
                            className={
                              formHeader.IVStatus === "Cancelled" ||
                              formHeader.IVStatus === "Returned"
                                ? "input-disabled"
                                : ""
                            }
                            onClick={() => updateChange(key, 1, "UpDated")}
                            // onChange={(e) => {
                            //   // console.log("checkbox clicked", e.target.value);

                            //   const newArray = [];

                            //   for (let i = 0; i < outData.length; i++) {
                            //     const element = outData[i];

                            //     if (i === key) {
                            //       element.UpDated = 1;
                            //     }
                            //     console.log("element", element);

                            //     newArray.push(element);

                            //     // if(i===key){

                            //     // }else{

                            //     //   setOutData([element])
                            //     // }
                            //   }

                            //   console.log("new", newArray);

                            //   setOutData(newArray);

                            //   // console.log("setOutData", outData[key].UpDated);
                            // }}
                          />
                        ) : (
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            checked
                            disabled={
                              formHeader.IVStatus === "Cancelled" ||
                              formHeader.IVStatus === "Returned"
                                ? true
                                : false
                            }
                            className={
                              formHeader.IVStatus === "Cancelled" ||
                              formHeader.IVStatus === "Returned"
                                ? "input-disabled"
                                : ""
                            }
                            onClick={() => updateChange(key, 0, "UpDated")}

                            // onChange={(e) => {
                            //   // console.log("checkbox clicked", e.target.value);
                            //   // console.log("setOutData", outData);
                            // }}
                          />
                        )}
                      </td>
                      {/* <td
                   
                    >
                      <input
                        type="number"
                        min={0}
                        disabled={
                          (formHeader.IVStatus === "Cancelled") ||
                          (formHeader.IVStatus === "Returned")
                            ? true
                            : false
                        }
                        defaultValue={parseFloat(val.TotalWeightCalculated)}
                        onChange={(e) => {

                          updateChange(
                            key,

                            e.target.value.length === 0 ? 0 : e.target.value,
                            "TotalWeightCalculated"
                          );
                          handleChangeWeightTotalCal();
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                      />
                    </td>
                    <td>
                      {val.UpDated === 0 ? (
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          disabled={
                            (formHeader.IVStatus === "Cancelled") ||
                            (formHeader.IVStatus === "Returned")
                              ? true
                              : false
                          }
                          onClick={() => updateChange(key, 1, "UpDated")}
                        />
                      ) : (
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          checked
                          disabled={
                            (formHeader.IVStatus === "Cancelled") ||
                            (formHeader.IVStatus === "Returned")
                              ? true
                              : false
                          }
                          onClick={() => updateChange(key, 0, "UpDated")}

                        
                        />
                      )}
                    </td> */}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {/* print */}
      <PrintPartsDC
        printOpen={printOpen}
        setPrintOpen={setPrintOpen}
        formHeader={formHeader}
        outData={outData}
        custdata={custdata}
        dcRegister={dcRegister}
      />

      {/* modals */}
      <ReturnCancelIVModal
        show={show}
        setShow={setShow}
        IV_NO={IVNOValue}
        IV_ID={IVIDValue}
        type="parts"
        outData={outData}
      />

      <CreateDCYesNoModal
        showCreateDC={showCreateDC}
        setShowCreateDC={setShowCreateDC}
        formHeader={formHeader}
        outData={outData}
        type="parts"
        getDCID={getDCID}
        setFormHeader={setFormHeader}
        setReturnValueFunc={setReturnValueFunc}
        // fetchData={fetchData}
        // handleSave={handleSave}
        createDcResponse={createDcResponse}
        saveButtonState={saveButtonState}
        runningNo={runningNo}
      />
    </>
  );
}

export default OutwordPartIssueVocher;

// <div>
//   <ReturnCancelIVModal
//     show={show}
//     setShow={setShow}
//     IV_NO={IVNOValue}
//     IV_ID={IVIDValue}
//     type="parts"
//     outData={outData}
//   />

//   <CreateDCYesNoModal
//     showCreateDC={showCreateDC}
//     setShowCreateDC={setShowCreateDC}
//     formHeader={formHeader}
//     outData={outData}
//     type="parts"
//     getDCID={getDCID}
//     setFormHeader={setFormHeader}
//     setReturnValueFunc={setReturnValueFunc}
//     // fetchData={fetchData}
//     handleSave={handleSave}
//   />

//   <div>
//     <h4 className="title">Outward Part Issue Voucher</h4>

//     <div className="row">
//       <div className="col-md-12">
//         <div className="row">
//           <div className="col-md-3">
//             <label className="form-label">IV No</label>
//             <input
//               type="text"
//               name="IvId"
//               value={formHeader.IV_No}
//               disabled
//               onChange={InputHeaderEvent}
//             />
//           </div>
//           <div className="col-md-3">
//             <label className="form-label">Date</label>
//             <input
//               type="text"
//               name="IVDate"
//               value={formHeader.IV_Date}
//               disabled
//             />
//           </div>
//           <div className="col-md-3">
//             <label className=" form-label mt-4 ms-3">
//               {formHeader.IVStatus}
//             </label>
//             {/* <input
//           type="text"
//           name="status"
//           value=
//           disabled
//         /> */}
//           </div>

//           <div className="col-md-3">
//             <button
//               className="button-style ms-1"
//               onClick={saveButtonState}
//               disabled={
//                 boolVal2 ||
//                 boolVal3 ||
//                 // (location?.state?.propsType === "customerIVList")
//                 //   ? true
//                 //   : false ||
//                 //     (location.state?.propsType === "returnCancelled")
//                 //   ? true
//                 //   : false ||
//                 (formHeader.IVStatus === "Cancelled")
//                   ? true
//                   : false || (formHeader.IVStatus === "Returned")
//                   ? true
//                   : false
//               }
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>

//     <div className="row">
//       <div className="col-md-6">
//         <div className="row">
//           <div className="col-md-12">
//             <label className="form-label">Customer</label>
//             <input
//               type="text"
//               name="Customer"
//               value={formHeader.Customer}
//               disabled
//             />
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-md-6">
//             <label className="form-label">GST No</label>
//             <input
//               type="text"
//               name="CSTNo"
//               value={formHeader.CustGSTNo}
//               disabled
//             />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">DC No / Ph No</label>
//             <input
//               type="text"
//               name="PkngDcNo"
//               value={formHeader.PkngDcNo}
//               onChange={InputHeaderEvent}
//               disabled
//             />
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-md-6">
//             <label className="form-label">Actual Weight</label>
//             <input
//               type="number"
//               name="TotalWeight"
//               value={formHeader.TotalWeight}
//               onChange={InputHeaderEvent}
//               disabled={
//                 formHeader.IVStatus === "Cancelled"
//                   ? true
//                   : false || (formHeader.IVStatus === "Returned")
//                   ? true
//                   : false
//               }
//             />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Calculated Weight</label>
//             <input
//               type="text"
//               name="Type"
//               value={formHeader.TotalCalculatedWeight}
//               disabled
//             />
//           </div>
//         </div>
//       </div>
//       <div className="col-md-3 mt-3">
//         <label className="form-label"></label>
//         <textarea
//           id="exampleFormControlTextarea1"
//           rows="4  "
//           style={{ width: "240px" }}
//           value={custdata.Address}
//           disabled
//           readOnly
//         ></textarea>
//       </div>
//       <div className="col-md-3">
//         <div>
//           <button
//             className="button-style"
//             onClick={cancelIV}
//             disabled={
//               // boolVal2 || (location?.state?.propsType === "customerIVList")
//               //   ? true
//               //   : false || (location?.state?.propsType === "returnCancelled")
//               //   ? true
//               //   : false ||
//               formHeader.IVStatus === "Cancelled"
//                 ? true
//                 : false || (formHeader.IVStatus === "Returned")
//                 ? true
//                 : false
//             }
//           >
//             Cancel IV
//           </button>
//         </div>
//         <div>
//           <button
//             className="button-style"
//             onClick={createDC}
//             disabled={
//               // boolVal2 || (location?.state?.propsType === "customerIVList")
//               //   ? true
//               //   : false || (location?.state?.propsType === "returnCancelled")
//               //   ? true
//               //   : false ||
//               formHeader.IVStatus === "Cancelled"
//                 ? true
//                 : false || (formHeader.IVStatus === "Returned")
//                 ? true
//                 : false
//             }
//           >
//             Create DC
//           </button>
//         </div>
//         <div>
//           <button
//             className="button-style"
//             onClick={printDC}
//             disabled={
//               formHeader.IVStatus === "Cancelled"
//                 ? true
//                 : false || (formHeader.IVStatus === "Returned")
//                 ? false
//                 : true
//             }
//           >
//             Print DC
//           </button>
//         </div>
//         <div>
//           <button
//             className="button-style mb-2"
//             id="btnclose"
//             type="submit"
//             onClick={() => nav("/MaterialManagement")}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//       {/*
//   <div className="col-md-2">
//     <label className="form-label"></label>
//     <textarea
//       style={{ height: "110px" }}
//       className="form-control"
//       rowSpane="3"
//       //value={formHeader.address}
//       readOnly
//     ></textarea>
//   </div>
//   <div className="col-md-2">
//     <button className="button-style" onClick={cancelIV}>
//       Cancel IV
//     </button>
//   </div> */}
//     </div>
//     {/* <div className="row">
//   <div className="col-md-4">
//     <label className="form-label">GST No</label>
//     <input
//       type="text"
//       name="CSTNo"
//       value={formHeader.CustGSTNo}
//       disabled
//     />
//   </div>
//   <div className="col-md-4">
//     <label className="form-label">DC No / Ph No</label>
//     <input
//       type="text"
//       name="PkngDcNo"
//       value={formHeader.PkngDcNo}
//       onChange={InputHeaderEvent}
//     />
//   </div>
//   <div className="col-md-2">
//     <button className="button-style" onClick={createDC}>
//       Create DC
//     </button>
//   </div>
// </div>
// <div className="row">
//   <div className="col-md-4">
//     <label className="form-label">Weight</label>
//     <input
//       type="text"
//       name="TotalWeight"
//       value={formHeader.TotalWeight}
//       onChange={InputHeaderEvent}
//     />
//   </div>

//   <div className="col-md-4">
//     <label className="form-label">Calculated Weight</label>
//     <input
//       type="text"
//       name="Type"
//       value={formHeader.TotalCalculatedWeight}
//       disabled
//     />
//   </div>
//   <div className="col-md-2">
//     <button className="button-style" onClick={printDC}>
//       Print DC
//     </button>
//   </div>
// </div> */}
//   </div>

//   <div className="row">
//     <div className="col-md-12 col-sm-12">
//       <div style={{ height: "420px", overflowY: "scroll" }}>
//         <BootstrapTable
//           headerClasses="header-class tableHeaderBGColor"
//           keyField="IV_No"
//           //keyField="id"
//           columns={columns}
//           data={outData}
//           striped
//           hover
//           condensed
//           //pagination={paginationFactory()}
//           //selectRow={selectRow}
//         ></BootstrapTable>
//       </div>
//     </div>
//   </div>
// </div>
