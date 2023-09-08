import React, { useState, useEffect } from "react";
import Axios from "axios";
import { dateToShort } from "../../../../../utils";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import ReturnCancelIVModal from "../../../components/ReturnCancelIVModal";
import CreateDCYesNoModal from "../../../components/CreateDCYesNoModal";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";

const { getRequest, postRequest } = require("../../../../api/apiinstance");
const { endpoints } = require("../../../../api/constants");

function OutwordMaterialIssueVocher(props) {
  const [show, setShow] = useState(false);
  const [showCreateDC, setShowCreateDC] = useState(false);
  const nav = useNavigate();
  let [custdata, setCustdata] = useState({
    Address: "",
  });

  //initial disable - print button
  const [boolVal1, setBoolVal1] = useState(true);

  //after clicking create dc
  const [boolVal2, setBoolVal2] = useState(false);

  //after clicking cancel dc
  const [boolVal3, setBoolVal3] = useState(false);

  let [dcID, setdcID] = useState("");
  let [dcRegister, setdcRegister] = useState({});

  const [outData, setOutData] = useState([]);
  const [upData, setUpData] = useState();

  const location = useLocation();

  const [IVNOValue, setIVNOValue] = useState("");
  const [IVIDValue, setIVIDValue] = useState("");

  const handleShow = () => setShow(true);

  let [formHeader, setFormHeader] = useState({
    Iv_Id: "",
    IV_No: "",
    IV_Date: "",
    Cust_code: "",
    Customer: "",
    CustGSTNo: "",
    PkngDcNo: "",
    PkngDCDate: "",
    TotalWeight: "",
    TotalCalculatedWeight: "",
    Dc_ID: "",
    IVStatus: "",
  });

  function statusFormatter(cell, row, rowIndex, formatExtraData) {
    if (!cell) return;
    return dateToShort(cell);
  }

  async function fetchData() {
    // console.log("propstype = ", location.state.propsType);
    // console.log("location data", location.state);
    //header data
    let url =
      endpoints.getMaterialIssueRegisterRouterByIVID +
      "?id=" +
      location.state.selectData.Iv_Id;
    //console.log("url = ", url);
    getRequest(url, async (data) => {
      // console.log("inside...", data);

      setIVNOValue(data.IV_No);
      setIVIDValue(data.Iv_Id);
      setdcID(data.Dc_ID);
      setFormHeader({
        Iv_Id: data.Iv_Id,
        IV_No: data.IV_No,
        IV_Date: data.IV_Date,
        Cust_code: data.Cust_code,
        Customer: data.Customer,
        CustGSTNo: data.CustGSTNo,
        PkngDcNo: data.PkngDcNo,
        PkngDCDate: data.PkngDCDate,
        TotalWeight: data.TotalWeight,
        TotalCalculatedWeight: data.TotalCalculatedWeight,
        Dc_ID: data.Dc_ID,
        IVStatus: data.IVStatus,
      });

      //get cust data
      let url2 = endpoints.getCustomerByCustCode + "?code=" + data.Cust_code;
      getRequest(url2, async (data) => {
        // console.log("cust data = ", data);
        setCustdata(data);
      });
    });

    //grid data
    let url1 =
      endpoints.getmtrlIssueDetailsByIVID +
      "?id=" +
      location.state.selectData.Iv_Id;
    getRequest(url1, async (data) => {
      // console.log("mtrl issue details...", data);
      setOutData(data);
    });
  }

  useEffect(() => {
    fetchData();
  }, []); //[inputPart]);

  const columns = [
    {
      text: "Srl",
      dataField: "Srl",
      editable: false,
    },
    {
      text: "Description",
      dataField: "MtrlDescription",
      editable: false,
    },
    {
      text: "Material",
      dataField: "Material",
      editable: false,
    },
    {
      text: "Qty",
      dataField: "Qty",
      editable: false,
    },
    {
      text: "Weight",
      dataField: "TotalWeightCalculated",
      editable: false,
    },
    {
      text: "Total Weight",
      dataField: "TotalWeight",
      // editable: (content, row, rowIndex, columnIndex) => {
      // // console.log("content = ", content);
      // },
    },
    {
      text: "Updated",
      dataField: "",
      formatter: (celContent, row) => (
        <div className="checkbox">
          <lable>
            <input type="checkbox" />
          </lable>
        </div>
      ),
    },
  ];
  function afterSaveCell(oldValue, newValue, row, column) {
    //console.log("oldvalue = ", oldValue);
    //console.log("newvalue = ", newValue);
    //console.log("row = ", row);
    setFormHeader({
      ...formHeader,
      TotalWeight: newValue,
    });
  }
  const InputHeaderEvent = (name, value) => {
    // console.log("function.........", "name", name, "value", value);
    // const { name, value } = e.target;
    setFormHeader({ ...formHeader, [name]: value });
  };

  // console.log("formHeader", formHeader);

  const saveButtonState = (e) => {
    e.preventDefault();
    /*if (formHeader.PkngDcNo.length == 0) {
      toast.error("Please Select PkngDcNo");
    } else if (formHeader.TotalWeight.length == 0)
      toast.error("Please Enter TotalWeight");
    else {*/
    postRequest(
      endpoints.updateDCWeight,

      { outData: outData, formHeader: formHeader, type: "material" },
      (data) => {
        //console.log("data = ", data);
        if (data.affectedRows !== 0) {
          toast.success("Record Updated Successfully");
        } else {
          toast.error("Record Not Updated");
        }
      }
    );
    //}
  };

  const getPop = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Current IV is cancelled and stock added to Material Stock",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "okay",
    });
  };
  let cancelIV = () => {
    // console.log("location.state", location.state);

    Axios.post(endpoints.postCancleIV, {
      Iv_Id: location.state.selectData.Iv_Id,
    }).then((res) => {
      // console.log("res", res);

      if (res.affectedRows !== 0) {
        InputHeaderEvent("IVStatus", "Cancelled");
        toast.success(
          "Return Voucher Cancelled Successfully and Stock added to Material Stock"
        );
      } else {
        toast.error("Backend error, Record Not Updated");
      }
    });

    // setShow(true);
    // setBoolVal2(true);
  };

  let createDC = () => {
    // console.log("outedata = ", outData);
    let flag = 0;
    outData.map((item) => {
      if (
        item.TotalWeight === 0 ||
        item.TotalWeight === "0" ||
        item.TotalWeight === "0.00" ||
        item.TotalWeight === 0.0
      ) {
        toast.error("Serial Weight cannot be zero. Set Weight and try again");
        flag = 1;
      }
    });
    if (flag === 0) {
      // console.log("Valid");
      setShowCreateDC(true);
      //setBoolVal1(false);
      //setBoolVal2(true);
    }
  };
  let getDCID = async (data) => {
    // console.log("get dc = ", data);
    setdcID(data);

    if (data !== "" && data !== 0 && data !== undefined) {
      //get data from dcregister
      let url3 = endpoints.getDCRegisterByID + "?id=" + data;
      getRequest(url3, async (data) => {
        //console.log("dc register data = ", data);
        setdcRegister(data);
      });

      //button enable disable
      setBoolVal1(false);
      setBoolVal2(true);

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
      nav("/MaterialManagement/Return/CustomerJobWork/PrintMaterialDC", {
        //formHeader: formHeader,
        //outData: outData,
        state: {
          //id: data.RvID,
          formHeader: formHeader,
          outData: outData,
          custdata: custdata,
          dcRegister: dcRegister,
        },
      });
    } else {
      toast.error("DC Not Created");
    }
  };

  const updateChange = (key, value, field) => {
    const newArray = [];

    for (let i = 0; i < outData.length; i++) {
      const element = outData[i];

      if (i === key) {
        element[field] = value;
      }
      console.log("element", element);

      newArray.push(element);

      // if(i===key){

      // }else{

      //   setOutData([element])
      // }
    }

    console.log("new", newArray);

    setOutData(newArray);
  };

  // const updateTotalWeight = (key, value)=>{

  // }

  const handleChangeWeightTotalCal = () => {
    let newTotalCalWeight = 0;
    for (let i = 0; i < outData.length; i++) {
      const element = outData[i];
      // console.log("elemet@@@@@@@@@@@@@@", element.TotalWeightCalculated);
      newTotalCalWeight =
        parseFloat(newTotalCalWeight) +
        parseFloat(element.TotalWeightCalculated);
    }

    setFormHeader({
      ...formHeader,
      TotalWeight: newTotalCalWeight,
    });
  };

  return (
    <div>
      <ReturnCancelIVModal
        show={show}
        setShow={setShow}
        IV_NO={IVNOValue}
        IV_ID={IVIDValue}
        type="sheets"
      />

      <CreateDCYesNoModal
        showCreateDC={showCreateDC}
        setShowCreateDC={setShowCreateDC}
        formHeader={formHeader}
        outData={outData}
        type="sheets"
        getDCID={getDCID}
        InputHeaderEvent={InputHeaderEvent}
      />
      <div>
        <h4 className="title">Outward Material Issue Voucher</h4>

        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-3">
                <label className="form-label">IV No</label>
                <input
                  type="text"
                  name="IvId"
                  value={formHeader.IV_No}
                  disabled
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
                />
              </div>
              <div className="col-md-3">
                <div className="form-label mt-4 ms-3">
                  {formHeader.IVStatus}
                </div>
                {/* <input
                  type="text"
                  name="status"
                  value={formHeader.IVStatus}
                  disabled
                /> */}
              </div>
              <div className="col-md-3">
                <button
                  className="button-style ms-1"
                  onClick={saveButtonState}
                  disabled={
                    formHeader.IVStatus === "Cancelled" ||
                    (formHeader.PkngDcNo && formHeader.IVStatus === "Returned")
                      ? true
                      : false

                    // boolVal2 |
                    // boolVal3 |
                    // (location.state.propsType === "customerIVList")
                    //   ? true
                    //   : false | (location.state.propsType === "returnCancelled")
                    //   ? true
                    //   : false
                  }
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                <label className="form-label">Customer</label>
                <input
                  type="text"
                  name="Customer"
                  value={formHeader.Customer}
                  disabled
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">GST No</label>
                <input
                  type="text"
                  name="reference"
                  value={formHeader.CustGSTNo}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">DC No / PN No</label>
                <input
                  type="text"
                  name="PkngDcNo"
                  disabled
                  value={
                    formHeader.PkngDcNo
                    // ? formHeader.PkngDcNo +
                    //   "   Date : " +
                    //   formHeader.PkngDCDate
                    // : ""
                  }
                  // onChange={InputHeaderEvent}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Weight</label>
                <input
                  type="text"
                  name="TotalWeight"
                  disabled
                  value={formHeader.TotalWeight}
                  // onChange={InputHeaderEvent}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Calculated Weight</label>
                <input
                  type="text"
                  name="Type"
                  value={formHeader.TotalCalculatedWeight}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <label className="form-label"></label>
            <textarea
              id="exampleFormControlTextarea1"
              rows="4  "
              style={{ width: "240px" }}
              value={custdata.Address}
              readOnly
            ></textarea>
          </div>
          <div className="col-md-3">
            <div>
              <button
                className="button-style"
                onClick={cancelIV}
                disabled={
                  formHeader.IVStatus === "Cancelled" ||
                  (formHeader.PkngDcNo && formHeader.IVStatus === "Returned")
                    ? true
                    : false

                  // boolVal2 | (location.state.propsType === "customerIVList")
                  //   ? true
                  //   : false | (location.state.propsType === "returnCancelled")
                  //   ? true
                  //   : false
                }
              >
                Cancel IV
              </button>
            </div>
            <div>
              <button
                className="button-style"
                onClick={createDC}
                disabled={
                  formHeader.IVStatus === "Cancelled" ||
                  (formHeader.PkngDcNo && formHeader.IVStatus === "Returned")
                    ? true
                    : false
                  // boolVal2 | (location.state.propsType === "customerIVList")
                  //   ? true
                  //   : false | (location.state.propsType === "returnCancelled")
                  //   ? true
                  //   : false
                }
              >
                Create DC
              </button>
            </div>
            <div>
              <button
                className="button-style"
                onClick={printDC}
                disabled={
                  formHeader.IVStatus === "Cancelled" ? true : false
                  // boolVal1 |
                  // boolVal3 |
                  // (location.state.propsType === "customerIVList")
                  //   ? true
                  //   : false | (location.state.propsType === "returnCancelled")
                  //   ? true
                  //   : false
                }
              >
                Print DC
              </button>
            </div>
            <div>
              <button
                className="button-style "
                id="btnclose"
                type="submit"
                onClick={() => nav("/MaterialManagement")}
              >
                Close
              </button>
            </div>
          </div>
        </div>

        {/* <div className="col-md-4">
            <button className="button-style" onClick={cancelIV}>
              Cancel IV
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <label className="form-label">GST No</label>
            <input type="text" name="reference" disabled />
          </div>
          <div className="col-md-4">
            <label className="form-label">DC No / Ph No</label>
            <input
              type="text"
              name="PkngDcNo"
              value={formHeader.PkngDcNo}
              onChange={InputHeaderEvent}
            />
          </div>
          <div className="col-md-4">
            <button className="button-style" onClick={createDC}>
              Create DC
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <label className="form-label">Weight</label>
            <input
              type="text"
              name="TotalWeight"
              value={formHeader.TotalWeight}
              onChange={InputHeaderEvent}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Calculate Weight</label>
            <input
              type="text"
              name="Type"
              value={formHeader.TotalCalculatedWeight}
              disabled
            />
          </div>
          <div className="col-md-4">
            <button className="button-style" onClick={printDC}>
              Print DC
            </button>
          </div>
        </div> */}
      </div>
      <br></br>
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <div
            style={{ height: "420px", overflowY: "scroll" }}
            //className="col-md-12 col-sm-12"
          >
            <Table
              hover
              condensed
              className="table-data border header-class table-striped"
            >
              <thead className="text-white">
                <tr>
                  <th>SL No</th>
                  <th>Description</th>
                  <th>Material </th>
                  <th>Qty</th>
                  <th>Weight</th>
                  <th>Total Weight</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {outData.map((val, key) => (
                  <tr>
                    <td>{key + 1}</td>
                    <td>{val.MtrlDescription}</td>
                    <td>{val.Material} </td>
                    <td>{val.Qty}</td>
                    <td>{val.TotalWeight}</td>
                    <td
                    // contenteditable="true"
                    // onChange={(e) => {
                    //   console.log("eeeeeeeeee", e);
                    // }}
                    >
                      {/* {val.TotalWeightCalculated} */}
                      <input
                        type="number"
                        min={0}
                        defaultValue={val.TotalWeightCalculated}
                        onChange={(e) => {
                          // console.log("eeeeeeeeee", e.target.value);

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
                          onClick={() => updateChange(key, 0, "UpDated")}

                          // onChange={(e) => {
                          //   // console.log("checkbox clicked", e.target.value);
                          //   // console.log("setOutData", outData);
                          // }}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* <BootstrapTable
              headerClasses="header-class "
              keyField="IV_No"
              //keyField="id"
              columns={columns}
              data={outData}
              striped
              hover
              condensed
              //pagination={paginationFactory()}
              //selectRow={selectRow}
              cellEdit={cellEditFactory({
                mode: "click",
                blurToSave: true,
                afterSaveCell,
              })}
            ></BootstrapTable> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OutwordMaterialIssueVocher;
