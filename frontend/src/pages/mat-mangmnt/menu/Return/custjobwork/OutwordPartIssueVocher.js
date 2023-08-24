import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import ReturnCancelIVModal from "../../../components/ReturnCancelIVModal";
import CreateDCYesNoModal from "../../../components/CreateDCYesNoModal";
import { dateToShort } from "../../../../../utils";
import BootstrapTable from "react-bootstrap-table-next";
import { useNavigate } from "react-router-dom";

const { getRequest, postRequest } = require("../../../../api/apiinstance");
const { endpoints } = require("../../../../api/constants");

function OutwordPartIssueVocher(props) {
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const [showCreateDC, setShowCreateDC] = useState(false);
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
  console.log("formtype :", location?.state?.propsType);

  let [formHeader, setFormHeader] = useState({
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
  });

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
        TotalWeight: data.TotalWeight,
        TotalCalculatedWeight: data.TotalCalculatedWeight,
        Dc_ID: data.Dc_ID,
        IVStatus: data.IVStatus,
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
      console.log("out data = ", data);
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
    },
    {
      text: "PartId / Part Name",
      dataField: "PartId",
    },
    {
      text: "Qty Returned",
      dataField: "QtyReturned",
    },
    {
      text: "Unit Weight",
      dataField: "UnitWt",
    },
    {
      text: "Total Weight",
      dataField: "TotalWeight",
    },
    {
      text: "Remarks",
      dataField: "Remarks",
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

  const InputHeaderEvent = (e) => {
    const { name, value } = e.target;
    setFormHeader({ ...formHeader, [name]: value });
  };

  const saveButtonState = (e) => {
    e.preventDefault();
    /*if (formHeader.PkngDcNo.length == 0) {
      toast.error("Please Select PkngDcNo");
    } else if (formHeader.TotalWeight.length == 0)
      toast.error("Please Enter TotalWeight");
    else {*/
    postRequest(endpoints.updateDCWeight, formHeader, (data) => {
      //console.log("data = ", data);
      if (data.affectedRows !== 0) {
        toast.success("Record Updated Successfully");
      } else {
        toast.error("Record Not Updated");
      }
    });
    //}
  };
  function statusFormatter(cell, row, rowIndex, formatExtraData) {
    if (!cell) return;
    return dateToShort(cell);
  }
  let cancelIV = () => {
    //console.log(IVNOValue, " and ", IVIDValue);
    setShow(true);
    setBoolVal2(true);
  };

  let createDC = () => {
    let flag = 0;
    if (
      formHeader.TotalWeight === 0 ||
      formHeader.TotalWeight === "0" ||
      formHeader.TotalWeight === "0.000" ||
      formHeader.TotalWeight === 0.0
    ) {
      toast.error("Serial Weight cannot be zero. Set Weight and try again");
      flag = 1;
    }
    if (flag === 0) {
      console.log("Valid");
      setShowCreateDC(true);
      //setBoolVal1(false);
      //setBoolVal2(true);
    }

    //setShowCreateDC(true);
    //setBoolVal1(false);
    //setBoolVal2(true);

    //setShowCreateDC(true);
  };
  let getDCID = async (data) => {
    console.log("get dc = ", data);
    setdcID(data);

    if (data !== "" && data !== 0 && data !== undefined) {
      //get data from dcregister
      let url3 = endpoints.getDCRegisterByID + "?id=" + data;
      getRequest(url3, (data) => {
        console.log("dc register data = ", data);
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
      nav("/MaterialManagement/Return/CustomerJobWork/PrintPartsDC", {
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
      //window.location.reload();
    } else {
      toast.error("DC Not Created");
    }
  };

  return (
    <div>
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
                  onChange={InputHeaderEvent}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Date</label>
                <input
                  type="text"
                  name="IVDate"
                  value={statusFormatter(formHeader.IV_Date)}
                  disabled
                />
              </div>
              <div className="col-md-3">
                <label className=" form-label mt-4 ms-3">
                  {formHeader.IVStatus}
                </label>
                {/* <input
                  type="text"
                  name="status"
                  value=
                  disabled
                /> */}
              </div>

              <div className="col-md-3">
                <button
                  className="button-style ms-1"
                  onClick={saveButtonState}
                  disabled={
                    boolVal2 |
                    boolVal3 |
                    (location?.state?.propsType === "customerIVList")
                      ? true
                      : false |
                        (location.state?.propsType === "returnCancelled")
                      ? true
                      : false
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
                  name="CSTNo"
                  value={formHeader.CustGSTNo}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">DC No / Ph No</label>
                <input
                  type="text"
                  name="PkngDcNo"
                  value={formHeader.PkngDcNo}
                  onChange={InputHeaderEvent}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Weight</label>
                <input
                  type="text"
                  name="TotalWeight"
                  value={formHeader.TotalWeight}
                  onChange={InputHeaderEvent}
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
          <div className="col-md-3 mt-3">
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
                  boolVal2 | (location?.state?.propsType === "customerIVList")
                    ? true
                    : false | (location?.state?.propsType === "returnCancelled")
                    ? true
                    : false
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
                  boolVal2 | (location?.state?.propsType === "customerIVList")
                    ? true
                    : false | (location?.state?.propsType === "returnCancelled")
                    ? true
                    : false
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
                  boolVal1 |
                  boolVal3 |
                  (location?.state?.propsType === "customerIVList")
                    ? true
                    : false | (location?.state?.propsType === "returnCancelled")
                    ? true
                    : false
                }
              >
                Print DC
              </button>
            </div>
            <div>
              <button
                className="button-style mb-2"
                id="btnclose"
                type="submit"
                onClick={() => nav("/MaterialManagement")}
              >
                Close
              </button>
            </div>
          </div>
          {/* 
          <div className="col-md-2">
            <label className="form-label"></label>
            <textarea
              style={{ height: "110px" }}
              className="form-control"
              rowSpane="3"
              //value={formHeader.address}
              readOnly
            ></textarea>
          </div>
          <div className="col-md-2">
            <button className="button-style" onClick={cancelIV}>
              Cancel IV
            </button>
          </div> */}
        </div>
        {/* <div className="row">
          <div className="col-md-4">
            <label className="form-label">GST No</label>
            <input
              type="text"
              name="CSTNo"
              value={formHeader.CustGSTNo}
              disabled
            />
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
          <div className="col-md-2">
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
            <label className="form-label">Calculated Weight</label>
            <input
              type="text"
              name="Type"
              value={formHeader.TotalCalculatedWeight}
              disabled
            />
          </div>
          <div className="col-md-2">
            <button className="button-style" onClick={printDC}>
              Print DC
            </button>
          </div>
        </div> */}
      </div>

      <div className="row">
        <div className="col-md-12 col-sm-12">
          <div style={{ height: "420px", overflowY: "scroll" }}>
            <BootstrapTable
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
            ></BootstrapTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OutwordPartIssueVocher;
