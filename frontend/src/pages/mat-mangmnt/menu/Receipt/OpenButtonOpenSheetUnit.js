import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import { formatDate } from "../../../../utils";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const { getRequest, postRequest } = require("../../../api/apiinstance");
const { endpoints } = require("../../../api/constants");

function OpenButtonOpenSheetUnit() {
  const nav = useNavigate();
  const location = useLocation();
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  //initial disable all
  const [boolVal, setBoolVal] = useState(true);

  //alter enable add and remove stock
  const [boolVal2, setBoolVal2] = useState(false);
  const [boolVal3, setBoolVal3] = useState(false);

  const [mtrlArray, setMtrlArray] = useState([]);
  //after selecting material disable dynamic para 1 2 3
  const [boolPara1, setBoolPara1] = useState(false);
  const [boolPara2, setBoolPara2] = useState(false);
  const [boolPara3, setBoolPara3] = useState(false);

  let [para1Label, setPara1Label] = useState("Para 1");
  let [para2Label, setPara2Label] = useState("Para 2");
  let [para3Label, setPara3Label] = useState("Para 3");

  const [unitLabel1, setUnitLabel1] = useState("");
  const [unitLabel2, setUnitLabel2] = useState("");
  const [unitLabel3, setUnitLabel3] = useState("");

  const [mtrlStock, setMtrlStock] = useState({});
  const [formHeader, setFormHeader] = useState({
    rvId: "",
    receiptDate: "", //currDate, //.split("/").reverse().join("-"),
    rvNo: "",
    rvDate: "", //.split("/").reverse().join("-"),
    status: "",
    customer: "",
    customerName: "",
    reference: "",
    weight: "",
    calcWeight: "",
    type: "",
    address: "",
  });

  const [inputPart, setInputPart] = useState({
    id: "",
    rvId: "",
    srl: "",
    custCode: "",
    mtrlCode: "",
    material: "",
    shapeMtrlId: "",
    shapeID: "",
    dynamicPara1: "",
    dynamicPara2: "",
    dynamicPara3: "",
    qty: "",
    inspected: "",
    accepted: "",
    totalWeightCalculated: "",
    totalWeight: "",
    locationNo: "",
    upDated: "",
    qtyAccepted: 0,
    qtyReceived: 0,
    qtyRejected: 0,
    qtyUsed: 0,
    qtyReturned: 0,
  });

  async function fetchData() {
    const url =
      endpoints.getByTypeMaterialReceiptRegisterByRvID +
      "?id=" +
      location.state.id;
    getRequest(url, (data) => {
      formHeader.rvId = data.RvID;
      formHeader.receiptDate = formatDate(new Date(data.ReceiptDate), 4);
      formHeader.rvNo = data.RV_No;
      formHeader.rvDate = formatDate(new Date(data.RV_Date), 3);
      formHeader.status = data.RVStatus;
      formHeader.customer = data.Cust_Code;
      formHeader.customerName = data.Customer;
      formHeader.reference = data.CustDocuNo;
      formHeader.weight = data.TotalWeight;
      formHeader.calcWeight = data.TotalCalculatedWeight;
      formHeader.type = data.Type;

      //setFormHeader(formHeader);

      //get customer details for address
      getRequest(endpoints.getCustomers, (data1) => {
        const found = data1.find((obj) => obj.Cust_Code === data.Cust_Code);
        formHeader.address = found.Address;
        setFormHeader(formHeader);
      });

      //enable disable add to stock button
      //check stock alredy exist or not
      let url3 = endpoints.checkStockAvailable + "?rvno=" + formHeader.rvNo;

      getRequest(url3, (data4) => {
        //console.log("data 4 = ", data4);
        //length = 0 means no stock
        if (data4.length === 0) {
          //console.log("Stock alredy found");
          setBoolVal2(false);
          setBoolVal3(true);
        } else {
          //console.log("stock not found");
          setBoolVal2(true);
          setBoolVal3(false);
        }
      });

      //get material details
      const url1 =
        endpoints.getMtrlReceiptDetailsByRvID + "?id=" + location.state.id;
      getRequest(url1, (data2) => {
        console.log("table data  = ", data2);
        data2.forEach((obj) => {
          obj.id = obj.Mtrl_Rv_id;
          obj.rvId = obj.RvID;
          obj.srl = obj.Srl;
          obj.custCode = obj.Cust_Code;
          obj.mtrlCode = obj.Mtrl_Code;
          obj.material = obj.Material;
          obj.shapeMtrlId = obj.ShapeMtrlID;
          obj.shapeID = obj.ShapeID;
          obj.dynamicPara1 = obj.DynamicPara1;
          obj.dynamicPara2 = obj.DynamicPara1;
          obj.dynamicPara3 = obj.DynamicPara1;
          obj.qty = obj.Qty;
          obj.inspected = obj.Inspected;
          obj.accepted = obj.Accepted;
          obj.totalWeightCalculated = obj.TotalWeightCalculated;
          obj.totalWeight = obj.TotalWeight;
          obj.locationNo = obj.LocationNo;
          obj.upDated = obj.UpDated;
          obj.qtyAccepted = obj.QtyAccepted;
          obj.qtyReceived = obj.QtyReceived;
          obj.qtyRejected = obj.QtyRejected;
          obj.qtyUsed = obj.QtyUsed;
          obj.qtyReturned = obj.QtyReturned;
        });
        setMtrlArray(data2);

        //find shape of material
        for (let i = 0; i < data2.length; i++) {
          let material = data2[i];
          const url2 =
            endpoints.getRowByMtrlCode + "?code=" + data2[i].Mtrl_Code;
          getRequest(url2, (data3) => {
            if (material.Shape === "Units") {
              setPara1Label("Qty"); //Nos
              setPara2Label("");
              setPara3Label("");
              setBoolPara1(false);
              setBoolPara2(true);
              setBoolPara3(true);
              setUnitLabel1("Nos");
              setUnitLabel2("");
              setUnitLabel3("");
            } else if (material.Shape === "Block") {
              setPara1Label("Length"); //mm
              setPara2Label("Width");
              setPara3Label("Height");
              setBoolPara1(false);
              setBoolPara2(false);
              setBoolPara3(false);
              setUnitLabel1("mm");
              setUnitLabel2("mm");
              setUnitLabel3("mm");
            } else if (material.Shape === "Plate") {
              setPara1Label("Length"); //mm
              setPara2Label("Width");
              setPara3Label("");
              setBoolPara1(false);
              setBoolPara2(false);
              setBoolPara3(true);
              setUnitLabel1("mm");
              setUnitLabel2("mm");
              setUnitLabel3("");
            } else if (material.Shape === "Sheet") {
              setPara1Label("Width"); //mm
              setPara2Label("Length"); //mm
              setPara3Label("");
              setBoolPara1(false);
              setBoolPara2(false);
              setBoolPara3(true);
              setUnitLabel1("mm");
              setUnitLabel2("mm");
              setUnitLabel3("");
            } else if (material.Shape === "Tiles") {
              setPara1Label("");
              setPara2Label("");
              setPara3Label("");
              setBoolPara1(true);
              setBoolPara2(true);
              setBoolPara3(true);
              setUnitLabel1("");
              setUnitLabel2("");
              setUnitLabel3("");
            } else if (material.Shape === "Tube") {
              setPara1Label("Length"); //mm
              setPara2Label("");
              setPara3Label("");
              setBoolPara1(false);
              setBoolPara2(true);
              setBoolPara3(true);
              setUnitLabel1("mm");
              setUnitLabel2("");
              setUnitLabel3("");
            } else if (material.Shape === "Cylinder") {
              setPara1Label("Volume"); //CubicMtr
              setPara2Label("");
              setPara3Label("");
              setBoolPara1(false);
              setBoolPara2(true);
              setBoolPara3(true);
              setUnitLabel1("CubicMtr");
              setUnitLabel2("");
              setUnitLabel3("");
            }
          });
        }

        //setFormHeader(formHeader);
        //console.log(data2);
      });
    });
    //console.log("data = ", formHeader);
  }

  useEffect(() => {
    fetchData();
    //formHeader.ReceiptDate = formatDate(new Date(), 4);
  }, []);

  // useEffect(() => {
  //   console.log("use state mtrlarray");
  // }, [mtrlArray]);

  function updateCount(cnt, callback) {
    setTimeout(async () => {
      mtrlArray.map((obj) => {
        if (obj.Mtrl_Rv_id === mtrlStock.Mtrl_Rv_id) {
          obj.UpDated = cnt;
        }
      });
      await delay(500);
      setMtrlArray(mtrlArray);
      //console.log("mtrl arry = ", mtrlArray);
      callback("hello");
    }, 500);
  }
  const addToStock = async () => {
    if (Object.keys(mtrlStock).length === 0) {
      toast.error("Please Select Material");
    } else {
      const newRow = {
        //mtrlStockId :
        mtrlRvId: mtrlStock.Mtrl_Rv_id,
        custCode: mtrlStock.Cust_Code,
        customer: formHeader.customerName,
        custDocuNo: "",
        rvNo: formHeader.rvNo,
        mtrlCode: mtrlStock.Mtrl_Code,
        shapeID: mtrlStock.shapeID,
        shape: "",
        material: mtrlStock.material,
        dynamicPara1: mtrlStock.dynamicPara1,
        dynamicPara2: mtrlStock.dynamicPara2,
        dynamicPara3: mtrlStock.dynamicPara3,
        dynamicPara4: "0.00",
        locked: 0,
        scrap: 0,
        issue: 0,
        weight: formHeader.weight,
        scrapWeight: "0.00",
        srl: mtrlStock.Srl,
        ivNo: "",
        ncProgramNo: "",
        locationNo: mtrlStock.locationNo,
        qtyAccepted: mtrlStock.qtyAccepted,
      };
      //console.log("before api");
      postRequest(endpoints.insertMtrlStockList, newRow, async (data) => {
        //console.log("data = ", data);
        if (data.affectedRows !== 0) {
          //enable remove stock buttons
          toast.success("Stock Added Successfully");
          setBoolVal2(true);
          setBoolVal3(false);
        } else {
          toast.error("Stock Not Added");
        }
      });

      //update updated status = 1
      let updateObj = {
        id: mtrlStock.Mtrl_Rv_id,
        upDated: 1,
      };
      postRequest(
        endpoints.updateMtrlReceiptDetailsUpdated,
        updateObj,
        async (data) => {
          console.log("updated = 1");
        }
      );

      // updateCount(1, (nm) => {
      //   console.log("value updated");
      //   console.log("mtrl arry = ", mtrlArray);
      //   setMtrlArray(mtrlArray);
      // });
      //console.log("prev mtrlArray = ", mtrlArray);
      //console.log("prev mtrlStock = ", mtrlStock);

      for (let i = 0; i < mtrlArray.length; i++) {
        if (mtrlArray[i].Mtrl_Rv_id == mtrlStock.Mtrl_Rv_id) {
          mtrlArray[i].upDated = 1;
          //console.log("Its Updated");
        }
      }
      await delay(500);
      let newArray = mtrlArray;
      console.log("mtrle new array = ", newArray);
      setMtrlArray([]);
      await delay(200);
      setMtrlArray(newArray);

      //console.log("input part ", inputPart);
      //console.log("formheader ", formHeader);
      //console.log("mtrlstock ", mtrlArray);
    }
  };

  const removeStock = async () => {
    if (Object.keys(mtrlStock).length === 0) {
      toast.error("Please Select Material");
    } else {
      postRequest(endpoints.deleteMtrlStockByRVNo, formHeader, async (data) => {
        //console.log("data = ", data);
        if (data.affectedRows !== 0) {
          //enable remove stock buttons
          toast.success("Stock Removed Successfully");
          setBoolVal2(false);
          setBoolVal3(true);
        } else {
          toast.error("Stock Not Removed");
        }
      });

      //update updated status = 1
      let updateObj = {
        id: mtrlStock.Mtrl_Rv_id,
        upDated: 0,
      };
      postRequest(
        endpoints.updateMtrlReceiptDetailsUpdated,
        updateObj,
        async (data) => {
          console.log("updated = 0");
        }
      );
      //console.log("prev mtrlArray = ", mtrlArray);
      //console.log("prev mtrlStock = ", mtrlStock);

      for (let i = 0; i < mtrlArray.length; i++) {
        if (mtrlArray[i].Mtrl_Rv_id == mtrlStock.Mtrl_Rv_id) {
          mtrlArray[i].upDated = 0;
          //console.log("Its Updated");
        }
      }
      await delay(500);
      let newArray = mtrlArray;
      console.log("mtrle new array = ", newArray);
      setMtrlArray([]);
      await delay(200);
      setMtrlArray(newArray);
    }
  };

  const columns = [
    {
      text: "#",
      dataField: "id",
      hidden: true,
    },
    {
      text: "Srl",
      dataField: "srl",
    },
    {
      text: "Mtrl Code",
      dataField: "mtrlCode",
      headerStyle: { whiteSpace: "nowrap" },
    },
    {
      text: unitLabel1 !== "" ? para1Label + "(" + unitLabel1 + ")" : "",
      dataField: "dynamicPara1",
    },
    {
      text: unitLabel2 !== "" ? para2Label + "(" + unitLabel2 + ")" : "",
      dataField: "dynamicPara2",
    },
    {
      text: unitLabel3 !== "" ? para3Label + "(" + unitLabel3 + ")" : "",
      dataField: "dynamicPara3",
    },
    {
      text: "Qty",
      dataField: "qty",
    },
    {
      text: "Inspected",
      dataField: "inspected",
      formatter: (celContent, row) => (
        <div className="checkbox">
          <lable>
            <input
              type="checkbox"
              checked={row.Inspected == 1 ? true : false}
            />
          </lable>
        </div>
      ),
    },
    {
      text: "Location No",
      dataField: "locationNo",
      headerStyle: { whiteSpace: "nowrap" },
    },
    {
      text: "Updated",
      dataField: "updated",
      formatter: (celContent, row) => (
        <div className="checkbox">
          <lable>
            <input type="checkbox" checked={row.upDated == 1 ? true : false} />
          </lable>
        </div>
      ),
    },
  ];

  // const selectRow = {
  //   mode: "radio",
  //   clickToSelect: true,
  //   bgColor: "#8A92F0",
  //   onSelect: (row, isSelect, rowIndex, e) => {
  //     // mtrlArray.map((obj) => {
  //     //   if (obj.id == row.id) {
  //     //     setMtrlStock(obj);
  //     //   }
  //     // });
  //     setInputPart({
  //       // id: row.id,
  //       // partId: row.partId,
  //       // unitWeight: row.unitWeight,
  //       // qtyAccepted: row.qtyAccepted,
  //       // qtyRejected: row.qtyRejected,
  //       // qtyReceived: row.qtyReceived,
  //       id: row.id,
  //       srl: row.srl,
  //       mtrlCode: row.mtrlCode,
  //       dynamicPara1: row.dynamicPara1,
  //       dynamicPara2: row.dynamicPara2,
  //       dynamicPara3: row.dynamicPara3,
  //       qty: row.qty,
  //       inspected: row.inspected,
  //       locationNo: row.locationNo,
  //       upDated: row.upDated,
  //     });
  //   },
  // };

  const selectRow = {
    mode: "radio",
    clickToSelect: true,
    bgColor: "#8A92F0",
    // style: (row, rowIndex) => {
    //   const backgroundColor = row.isSelected ? "#8A92F0" : "white"; // Change the colors accordingly
    //   return { backgroundColor };
    // },
    onSelect: (row, isSelect, rowIndex, e) => {
      console.log("Selected Row:", row);
      console.log("Is Select:", isSelect);
      console.log("Row Index:", rowIndex);
      console.log("Event:", e);

      setInputPart({
        id: row.id,
        srl: row.srl,
        mtrlCode: row.mtrlCode,
        dynamicPara1: row.dynamicPara1,
        dynamicPara2: row.dynamicPara2,
        dynamicPara3: row.dynamicPara3,
        qty: row.qty,
        inspected: row.inspected,
        locationNo: row.locationNo,
        upDated: row.upDated,
      });
    },
  };

  return (
    <div>
      <div>
        <h4 className="title">Material Receipt Voucher</h4>

        <div className="row">
          <div className="col-md-3">
            <label className="form-label">Receipt Date</label>
            <input
              type="text"
              name="receiptDate"
              value={formHeader.receiptDate}
              readOnly
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">RV No</label>
            <input type="text" name="rvNo" value={formHeader.rvNo} readOnly />
          </div>
          <div className="col-md-3">
            <label className="form-label">RV Date</label>
            <input
              type="text"
              name="rvDate"
              value={formHeader.rvDate}
              readOnly
            />
            {/* value={currDate} */}
          </div>
          <div className="col-md-3">
            <label className="form-label">Status</label>
            <input
              type="text"
              name="status"
              value={formHeader.status}
              readOnly
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <label className="form-label">Customer</label>
            <select
              className="ip-select"
              name="customer"
              disabled={boolVal}
              // onChange={changeCustomer}
            >
              <option value={formHeader.customer} disabled selected>
                {formHeader.customerName}
              </option>

              {/* {customers.map((customer, index) => (
                  <option value={customer.Cust_Code}>
                    {customer.Cust_name}
                  </option>
                ))} */}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Weight</label>
            <input
              type="text"
              name="weight"
              required
              value={formHeader.weight}
              disabled={boolVal}
              // onChange={InputHeaderEvent}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <label className="form-label">Reference</label>
            <input
              type="text"
              name="reference"
              value={formHeader.reference}
              disabled={boolVal}
              // onChange={InputHeaderEvent}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Calculated Weight</label>
            <input
              type="text"
              name="calculatedWeight"
              value={formHeader.calcWeight}
              readOnly
            />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-8 justify-content-center">
            <div className="row">
              <div className="col-md-3 col-sm-12">
                <button className="button-style" disabled={boolVal}>
                  Save
                </button>
              </div>
              <div className="col-md-3 col-sm-12">
                <button className="button-style" disabled={boolVal}>
                  Allot RV No
                </button>
              </div>
              <div className="col-md-3 col-sm-12">
                <button className="button-style" disabled={boolVal}>
                  Delete RV
                </button>
              </div>
              <div className="col-md-3 col-sm-12">
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
          <div className="col-md-4 mb-3">
            <label className="form-label"></label>
            <textarea
              id="exampleFormControlTextarea1"
              rows="4"
              style={{ width: "330px" }}
              value={formHeader.address}
              readOnly
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div
            style={{ height: "330px", overflowY: "scroll" }}
            className="col-md-8 col-sm-12"
          >
            <BootstrapTable
              keyField="Id"
              columns={columns}
              data={mtrlArray}
              striped
              hover
              condensed
              selectRow={selectRow}
              headerClasses="header-class "
            ></BootstrapTable>
          </div>
          {/* <div className="col-md-6 col-sm-12">
           <div
              className="table-data"
              style={{ height: "480px", overflowY: "scroll" }}
            >
              <Tables theadData={getHeadings()} tbodyData={data3} />
            </div> 
          </div> */}
          <div className="col-md-4 col-sm-12">
            <div className="ip-box form-bg">
              <div className="row justify-content-center mt-2">
                <button
                  className="button-style "
                  style={{ width: "155px" }}
                  disabled={boolVal}
                >
                  Add Serial
                </button>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-6 col-sm-12">
                  <button
                    className="button-style "
                    style={{ width: "155px" }}
                    disabled={boolVal2}
                    onClick={addToStock}
                  >
                    Add to stock
                  </button>
                </div>
                <div className="col-md-6 col-sm-12">
                  <button
                    className="button-style "
                    style={{ width: "155px" }}
                    disabled={boolVal3}
                    onClick={removeStock}
                  >
                    Remove stock
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="ip-box form-bg">
                  <div className="row">
                    <p className="form-title-deco mt-2">
                      <h5>Serial Details</h5>
                    </p>

                    <div className="col-md-4 ">
                      <label className="form-label">Part ID</label>
                    </div>
                    <div className="col-md-8" style={{ marginTop: "8px" }}>
                      <select
                        className="ip-select dropdown-field"
                        disabled={boolVal}
                      >
                        <option value="" disabled selected>
                          Select Material
                        </option>
                        {/* <option value="option 1">001</option>
                          <option value="option 1">002</option>
                          <option value="option 1">003</option>
                          <option value="option 1">004</option> */}
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <label className="form-label">Para 1</label>
                    </div>
                    <div className="col-md-8 ">
                      <input
                        className="in-field"
                        value={inputPart.dynamicPara1}
                        disabled={boolVal}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <label className="form-label">Para 2</label>
                    </div>
                    <div className="col-md-8 ">
                      <input
                        className="in-field"
                        disabled={boolVal}
                        value={inputPart.dynamicPara2}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <label className="form-label">Para 3</label>
                    </div>
                    <div className="col-md-8 ">
                      <input
                        className="in-field"
                        disabled={boolVal}
                        value={inputPart.dynamicPara3}
                      />
                    </div>
                  </div>
                  <div className="col-md-12  mt-3">
                    <p className="form-title-deco">
                      <h5>Quantity Details</h5>
                    </p>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="form-label">Received</label>
                        <input
                          className="in-field"
                          disabled={boolVal}
                          value={inputPart.qtyReceived}
                        />
                      </div>

                      <div className="col-md-6">
                        <div
                          className="col-md-12 mt-2"
                          style={{ display: "flex", gap: "5px" }}
                        >
                          <input
                            className="form-check-input mt-2"
                            type="checkbox"
                            checked={inputPart.inspected == 1 ? true : false}
                            id="flexCheckDefault"
                            disabled={boolVal}
                          />
                           <label className="form-label">Inspected</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="form-label">Accepted</label>
                        <input
                          className="in-field"
                          disabled={boolVal}
                          value={inputPart.qtyAccepted}
                        />
                      </div>

                      <div className="col-md-6">
                        <div
                          className="col-md-12 mt-2"
                          style={{ display: "flex", gap: "5px" }}
                        >
                          <input
                            className="form-check-input mt-2"
                            type="checkbox"
                            checked={inputPart.upDated == 1 ? true : false}
                            id="flexCheckDefault"
                            disabled={boolVal}
                          />
                           <label className="form-label">Updated</label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mt-2">
                        <label
                          className="form-label"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          Wt Calculated 2
                        </label>
                        <input
                          className="in-field"
                          disabled={boolVal}
                          value={inputPart.totalWeightCalculated}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="form-label">Weight</label>
                        <input
                          className="in-field"
                          disabled={boolVal}
                          value={inputPart.totalWeight}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 ">
                        <label className="form-label">Location</label>
                        <select
                          className="ip-select dropdown-field"
                          disabled={boolVal}
                        >
                          {/* <option value="option 1">001</option>
                            <option value="option 1">002</option>
                            <option value="option 1">003</option>
                            <option value="option 1">004</option> */}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center mt-2 mb-4">
                <button
                  className="button-style "
                  style={{ width: "155px" }}
                  disabled={boolVal}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpenButtonOpenSheetUnit;
