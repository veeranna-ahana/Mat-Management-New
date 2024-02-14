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

  const [rmvBtn, setRmvBtn] = useState(false);
  const [addBtn, setAddBtn] = useState(false);
  const [insCheck, setInsCheck] = useState(false);
  //falg for add to stock and remove stock
  const [boolValStock, setBoolValStock] = useState("off");

  const [sheetRowSelect, setSheetRowSelect] = useState(false);
  const [plateRowSelect, setPlateRowSelect] = useState(false);
  const [tubeRowSelect, setTubeRowSelect] = useState(false);
  const [tilesStripRowSelect, setTilesStripRowSelect] = useState(false);
  const [blockRowSelect, setBlockRowSelect] = useState(false);
  const [cylinderRowSelect, setCylinderRowSelect] = useState(false);
  const [unitRowSelect, setUnitRowSelect] = useState(false);

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
        //length = 0 means no stock
        if (data4.length === 0) {
          setBoolVal2(false);
          setBoolVal3(true);
        } else {
          setBoolVal2(true);
          setBoolVal3(false);
        }
      });

      //get material details
      const url1 =
        endpoints.getMtrlReceiptDetailsByRvID + "?id=" + location.state.id;
      getRequest(url1, (data2) => {
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
          obj.dynamicPara2 = obj.DynamicPara2;
          obj.dynamicPara3 = obj.DynamicPara3;
          obj.qty = Math.floor(obj.Qty);
          obj.inspected = obj.Inspected;
          obj.accepted = obj.Accepted;
          obj.totalWeightCalculated = obj.TotalWeightCalculated;
          obj.totalWeight = obj.TotalWeight;
          obj.locationNo = obj.LocationNo;
          obj.updated = obj.UpDated;
          obj.qtyAccepted = obj.QtyAccepted;
          obj.qtyReceived = obj.QtyReceived;
          obj.qtyRejected = obj.QtyRejected;
          obj.qtyUsed = obj.QtyUsed;
          obj.qtyReturned = obj.QtyReturned;
        });
        setMtrlArray(data2);

        //find shape of material
        // for (let i = 0; i < data2.length; i++) {
        //   let material = data2[i];

        //   const url2 =
        //     endpoints.getRowByMtrlCode + "?code=" + data2[i].Mtrl_Code;
        //   getRequest(url2, (data3) => {

        //     if (data3.Shape === "Units") {
        //       setPara1Label("Qty"); //Nos
        //       setPara2Label("");
        //       setPara3Label("");
        //       setBoolPara1(false);
        //       setBoolPara2(true);
        //       setBoolPara3(true);
        //       setUnitLabel1("Nos");
        //       setUnitLabel2("");
        //       setUnitLabel3("");
        //     } else if (data3.Shape === "Block") {
        //       setPara1Label("Length"); //mm
        //       setPara2Label("Width");
        //       setPara3Label("Height");
        //       setBoolPara1(false);
        //       setBoolPara2(false);
        //       setBoolPara3(false);
        //       setUnitLabel1("mm");
        //       setUnitLabel2("mm");
        //       setUnitLabel3("mm");
        //     } else if (data3.Shape === "Plate") {
        //       setPara1Label("Length"); //mm
        //       setPara2Label("Width");
        //       setPara3Label("");
        //       setBoolPara1(false);
        //       setBoolPara2(false);
        //       setBoolPara3(true);
        //       setUnitLabel1("mm");
        //       setUnitLabel2("mm");
        //       setUnitLabel3("");
        //     } else if (data3.Shape === "Sheet") {
        //       setPara1Label("Width"); //mm
        //       setPara2Label("Length"); //mm
        //       setPara3Label("");
        //       setBoolPara1(false);
        //       setBoolPara2(false);
        //       setBoolPara3(true);
        //       setUnitLabel1("mm");
        //       setUnitLabel2("mm");
        //       setUnitLabel3("");
        //     } else if (data3.Shape === "Tiles") {
        //       setPara1Label("");
        //       setPara2Label("");
        //       setPara3Label("");
        //       setBoolPara1(true);
        //       setBoolPara2(true);
        //       setBoolPara3(true);
        //       setUnitLabel1("");
        //       setUnitLabel2("");
        //       setUnitLabel3("");
        //     } else if (data3.Shape === "Tube") {
        //       setPara1Label("Length"); //mm
        //       setPara2Label("");
        //       setPara3Label("");
        //       setBoolPara1(false);
        //       setBoolPara2(true);
        //       setBoolPara3(true);
        //       setUnitLabel1("mm");
        //       setUnitLabel2("");
        //       setUnitLabel3("");
        //     } else if (data3.Shape === "Cylinder") {
        //       setPara1Label("Volume"); //CubicMtr
        //       setPara2Label("");
        //       setPara3Label("");
        //       setBoolPara1(false);
        //       setBoolPara2(true);
        //       setBoolPara3(true);
        //       setUnitLabel1("CubicMtr");
        //       setUnitLabel2("");
        //       setUnitLabel3("");
        //     }
        //   });
        // }

        const url2 =
          endpoints.getRowByMtrlCode + "?code=" + data2[0]?.Mtrl_Code;
        getRequest(url2, (data3) => {
          if (data3.Shape === "Sheet") {
            // Sheet
            setPara1Label("Width");
            setPara2Label("Length");
            setUnitLabel1("mm");
            setUnitLabel2("mm");
            setSheetRowSelect(true);
          } else {
            setSheetRowSelect(false);
          }

          if (data3.Shape === "Plate") {
            // Plate
            setPara1Label("Length");
            setPara2Label("Width");
            setUnitLabel1("mm");
            setUnitLabel2("mm");
            setPlateRowSelect(true);
          } else {
            setPlateRowSelect(false);
          }

          if (data3.Shape.includes("Tube")) {
            // Tube
            setPara1Label("Length");
            setUnitLabel1("mm");
            setTubeRowSelect(true);
          } else {
            setTubeRowSelect(false);
          }

          if (data3.Shape === "Tiles" || data3.Shape === "Strip") {
            // Titles, Strip
            setPara1Label("");
            setUnitLabel1("");
            setTilesStripRowSelect(true);
          } else {
            setTilesStripRowSelect(false);
          }

          if (data3.Shape === "Block") {
            // Block
            setPara1Label("Length");
            setPara2Label("Width");
            setPara3Label("Height");
            setUnitLabel1("mm");
            setUnitLabel2("mm");
            setUnitLabel3("mm");
            setBlockRowSelect(true);
          } else {
            setBlockRowSelect(false);
          }

          if (data3.Shape === "Cylinder") {
            // Cylinder
            setPara1Label("Volume");
            setUnitLabel1("CubicMtr");
            setCylinderRowSelect(true);
          } else {
            setCylinderRowSelect(false);
          }

          if (data3.Shape === "Units") {
            // Units
            setPara1Label("Qty");
            setUnitLabel1("Nos");
            setUnitRowSelect(true);
          } else {
            setUnitRowSelect(false);
          }
        });

        //setFormHeader(formHeader);
      });
    });
  }

  useEffect(() => {
    fetchData();
    //formHeader.ReceiptDate = formatDate(new Date(), 4);
  }, []);

  // useEffect(() => {

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
        // qtyAccepted: mtrlStock.qtyAccepted,
        accepted: mtrlStock.accepted,
      };

      // postRequest(endpoints.insertMtrlStockList, newRow, async (data) => {

      //   if (data.affectedRows !== 0) {
      //     //enable remove stock buttons
      //     toast.success("Stock Added Successfully");
      //     // setBoolVal2(true);
      //     // setBoolVal3(false);
      //     setRmvBtn(true);
      //     setAddBtn(false);
      //   } else {
      //     toast.error("Stock Not Added");
      //   }
      // });

      postRequest(endpoints.insertMtrlStockList, newRow, async (data) => {
        if (data.affectedRows !== 0) {
          //enable remove stock buttons
          toast.success("Stock Added Successfully");
          //setBoolVal2(true);
          //setBoolVal3(false);
          setBoolValStock("on");
          // setBoolVal6(true);
          // setBoolVal7(false);
          setRmvBtn(true);
          setAddBtn(false);
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
          // console.log("updated = 1");s
        }
      );

      // updateCount(1, (nm) => {

      //   setMtrlArray(mtrlArray);
      // });

      for (let i = 0; i < mtrlArray.length; i++) {
        if (mtrlArray[i].Mtrl_Rv_id == mtrlStock.Mtrl_Rv_id) {
          // if (mtrlArray[i].mtrlCode == mtrlStock.Mtrl_Code) {
          mtrlArray[i].updated = 1;
        }
      }
      await delay(500);
      let newArray = mtrlArray;

      setMtrlArray([]);
      await delay(200);
      setMtrlArray(newArray);
      // setInputPart({ ...inputPart, updated: 1 });
    }
  };

  const removeStock = async () => {
    // console.log("mtrlStock.Mtrl_Rv_id", mtrlStock.Mtrl_Rv_id);
    // console.log("mtrlStock.Mtrl_Code", mtrlStock.Mtrl_Code);
    // console.log("inputPart.accepted", inputPart.accepted);
    if (Object.keys(mtrlStock).length === 0) {
      toast.error("Please Select Material");
    } else {
      const requestData = {
        Mtrl_Rv_id: mtrlStock.Mtrl_Rv_id,
        Mtrl_Code: mtrlStock.Mtrl_Code,
        Accepted: inputPart.accepted,
      };

      //update updated status = 1

      postRequest(
        endpoints.deleteMtrlStockByRVNo,
        requestData,
        async (data) => {
          console.log("Remove stock data = ", data);

          if (data.countResult[0].count < parseFloat(inputPart.accepted)) {
            toast.error(
              "Received Material Already used, to return create a Issue Voucher"
            );
            return;
          } else {
            // Validate if the material is already in use for production
            if (data.inUseResult[0].inUseCount > 0) {
              toast.error(
                "Material already in use for production, cannot take out from stock"
              );
              return;
            } else {
              // Only execute this block if the first two conditions are validated
              if (data.deletionResult.affectedRows !== 0) {
                //enable remove stock buttons
                toast.success("Stock Removed Successfully");
                // Update UI state here
                setBoolValStock("off");
                setAddBtn(true);
                setRmvBtn(false);
                //update checkbox
                for (let i = 0; i < mtrlArray.length; i++) {
                  if (mtrlArray[i].mtrlCode == mtrlStock.Mtrl_Code) {
                    mtrlArray[i].upDated = 0;
                  }
                }
                await delay(500);
                setMtrlArray(newArray);
              } else {
                // toast.success("Stock Removed Successfully");
              }
            }
          }
        }
      );

      let updateObj = {
        id: mtrlStock.Mtrl_Rv_id,
        upDated: 0,
      };
      postRequest(
        endpoints.updateMtrlReceiptDetailsUpdated,
        updateObj,
        async (data) => {
          // console.log("updated = 0");
        }
      );

      for (let i = 0; i < mtrlArray.length; i++) {
        if (mtrlArray[i].Mtrl_Rv_id == mtrlStock.Mtrl_Rv_id) {
          mtrlArray[i].updated = 0;
          //console.log("Its Updated");
        }
      }
      await delay(500);
      // console.log(newArray);
      let newArray = mtrlArray;

      setMtrlArray([]);
      await delay(200);
      setMtrlArray(newArray);

      await updateStockRegister();
    }
  };

  const updateStockRegister = async () => {
    try {
      const requestData = {
        rvId: formHeader.rvId,
        custCode: formHeader.customer,
      };

      const response = await postRequest(
        endpoints.updateAfterRemoveStock,
        requestData
      );

      console.log("response", response);
    } catch (error) {
      console.error("Error updating Stock Register:", error);
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
      text: unitLabel1 !== "" ? para1Label : "",
      // text: "Width(Mm)",
      dataField: "dynamicPara1",
    },
    {
      text: unitLabel2 !== "" ? para2Label : "",
      // text: "Length(Mm)",
      dataField: "dynamicPara2",
    },
    {
      text: unitLabel3 !== "" ? para3Label : "",
      // text: "Height(Mm)",
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
      text: "UpDated",
      dataField: "updated",
      formatter: (celContent, row) => (
        <div className="checkbox">
          <lable>
            <input type="checkbox" checked={row.updated == 1 ? true : false} />
          </lable>
        </div>
      ),
    },
  ];

  const selectRow = {
    mode: "radio",
    clickToSelect: true,
    bgColor: "#8A92F0",
    onSelect: (row, isSelect, rowIndex, e) => {
      // setSelectedRows(row);
      setInputPart(row);
      if (row.updated === 1) {
        setRmvBtn(true);
        setAddBtn(false);
      } else {
        setRmvBtn(false);
        setAddBtn(true);
      }
      // console.log("mtrlArray", mtrlArray);
      mtrlArray?.map((obj) => {
        if (obj.id == row.id) {
          setMtrlStock(obj);
          // console.log("obj.totalWeight", obj.totalWeight);
          setInputPart({
            // qtyAccepted: row.qtyAccepted,
            qtyRejected: obj.qtyRejected,
            // qtyReceived: row.qtyReceived,
            id: obj.id,
            srl: obj.srl,
            mtrlCode: row.mtrlCode,
            dynamicPara1: row.dynamicPara1,
            dynamicPara2: row.dynamicPara2,
            dynamicPara3: row.dynamicPara3,
            qty: obj.qty,
            inspected: obj.inspected,
            locationNo: obj.locationNo,
            updated: obj.updated,
            accepted: obj.accepted,
            totalWeightCalculated: obj.totalWeightCalculated,
            totalWeight: obj.totalWeight,
          });
          if (obj.shapeID === 1) {
            // Sheet
            setPara1Label("Width");
            setPara2Label("Length");
            setUnitLabel1("mm");
            setUnitLabel2("mm");
            setSheetRowSelect(true);
          } else {
            setSheetRowSelect(false);
          }

          if (obj.ShapeID === 2) {
            // Plate
            setPara1Label("Length");
            setPara2Label("Width");
            setUnitLabel1("mm");
            setUnitLabel2("mm");
            setPlateRowSelect(true);
          } else {
            setPlateRowSelect(false);
          }

          if (obj.ShapeID === 3 || obj.ShapeID === 4 || obj.ShapeID === 5) {
            setPara1Label("Length");
            setUnitLabel1("mm");
            setTubeRowSelect(true);
          } else {
            setTubeRowSelect(false);
          }

          if (obj.ShapeID === 6 || obj.ShapeID === 7) {
            // Titles, Strip
            setPara1Label("");
            setUnitLabel1("");
            setTilesStripRowSelect(true);
          } else {
            setTilesStripRowSelect(false);
          }

          if (obj.ShapeID === 8) {
            // Block
            setPara1Label("Length");
            setPara2Label("Width");
            setPara3Label("Height");
            setUnitLabel1("mm");
            setUnitLabel2("mm");
            setUnitLabel3("mm");
            setBlockRowSelect(true);
          } else {
            setBlockRowSelect(false);
          }

          if (obj.ShapeID === 9) {
            // Cylinder
            setPara1Label("Volume");
            setUnitLabel1("CubicMtr");
            setCylinderRowSelect(true);
          } else {
            setCylinderRowSelect(false);
          }

          if (obj.ShapeID === 10) {
            // Units
            setPara1Label("Qty");
            setUnitLabel1("Nos");
            setUnitRowSelect(true);
          } else {
            setUnitRowSelect(false);
          }
        }
      });
    },
  };

  console.log("Input Part", inputPart);
  console.log("formHeader", formHeader);
  console.log("rvId", formHeader.rvId);
  console.log("materialArray", mtrlArray);

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
          <div className="col-md-2">
            <label className="form-label">RV No</label>
            <input type="text" name="rvNo" value={formHeader.rvNo} readOnly />
          </div>
          <div className="col-md-2">
            <label className="form-label">RV Date</label>
            <input
              type="text"
              name="rvDate"
              value={formHeader.rvDate}
              readOnly
            />
            {/* value={currDate} */}
          </div>
          <div className="col-md-2">
            <label className="form-label">Status</label>
            <input
              type="text"
              name="status"
              value={formHeader.status}
              readOnly
            />
          </div>
          <div className="col-md-3">
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
          <div className="col-md-5">
            <label className="form-label">Customer</label>
            <select
              className="ip-select mt-1"
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
            <label className="form-label">Reference</label>
            <input
              type="text"
              name="reference"
              value={formHeader.reference}
              disabled={boolVal}
              // onChange={InputHeaderEvent}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Calculated Weight</label>
            <input
              type="text"
              name="calculatedWeight"
              value={formHeader.calcWeight}
              readOnly
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 justify-content-center">
            <button
              className="button-style"
              style={{ marginLeft: "70px" }}
              disabled={boolVal}
            >
              Save
            </button>

            <button className="button-style" disabled={boolVal}>
              Allot RV No
            </button>

            <button className="button-style" disabled={boolVal}>
              Delete RV
            </button>

            <button
              className="button-style "
              id="btnclose"
              type="submit"
              onClick={() => nav("/MaterialManagement")}
            >
              Close
            </button>
          </div>
          <div className="col-md-4 mb-3 mt-4">
            <label className="form-label"></label>
            <textarea
              id="exampleFormControlTextarea1"
              rows="4"
              style={{ width: "400px", height: "40px" }}
              value={formHeader.address}
              readOnly
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div
            style={{ height: "420px", overflowY: "scroll" }}
            className="col-md-8 col-sm-12"
          >
            <BootstrapTable
              keyField="id"
              columns={columns}
              data={mtrlArray}
              striped
              hover
              condensed
              selectRow={selectRow}
              headerClasses="header-class tableHeaderBGColor"
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
          <div
            className="col-md-4 col-sm-12"
            style={{ overflowY: "scroll", height: "420px" }}
          >
            <div className="ip-box form-bg">
              {/* <div className="row justify-content-center mt-2">
                <button
                  className="button-style "
                  style={{ width: "155px" }}
                  disabled={boolVal}
                >
                  Add Serial
                </button>
              </div> */}
              <div className="row justify-content-center">
                <div className="col-md-6 col-sm-12">
                  <button
                    className="button-style "
                    style={{ width: "155px" }}
                    disabled={rmvBtn}
                    onClick={addToStock}
                  >
                    Add to stock
                  </button>
                </div>
                <div className="col-md-6 col-sm-12">
                  <button
                    className="button-style "
                    style={{ width: "155px" }}
                    disabled={addBtn}
                    onClick={removeStock}
                  >
                    Remove stock
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="ip-box form-bg">
                  {/* <div className="row">
                    <p className="form-title-deco mt-2">
                      <h5>Serial Details</h5>
                    </p>

                    <div className="col-md-4">
                      <label className="form-label">Part ID</label>
                    </div>
                    <div className="col-md-8" style={{ marginTop: "8px" }}>
                      <select
                        className="ip-select dropdown-field"
                        disabled={boolVal}
                        // defaultValue={" "}
                        value={inputPart.mtrlCode}
                        name="mtrlCode"
                      >
                        <option value={inputPart.mtrlCode} disabled selected>
                          {inputPart.mtrlCode}
                        </option>
                      </select>
                    </div>
                  </div> */}
                  {/* {!(boolVal3 || boolPara1) && ( */}
                  {/* <div className="row">
                    <div className="col-md-4">
                      <label className="form-label">{para1Label}</label>
                    </div>
                    <div className="col-md-6">
                      <input
                        className="in-field"
                        value={inputPart.dynamicPara1}
                        disabled={boolVal}
                      />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label">{unitLabel1}</label>
                    </div>
                  </div> */}
                  {/* )} */}
                  {/* {!(boolVal3 || boolPara2) && ( */}
                  {/* <div className="row">
                    <div className="col-md-3">
                      <label className="form-label">{para2Label}</label>
                    </div>
                    <div className="col-md-6 ">
                      <input
                        className="in-field"
                        disabled={boolVal}
                        value={inputPart.dynamicPara2}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">{unitLabel2}</label>
                    </div>
                  </div> */}
                  {/* )} */}
                  {/* {!(boolVal3 || boolPara3) && ( */}
                  {/* <div className="row">
                    <div className="col-md-3">
                      <label className="form-label">{para3Label}</label>
                    </div>
                    <div className="col-md-6 ">
                      <input
                        className="in-field"
                        disabled={boolVal}
                        value={inputPart.dynamicPara3}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">{unitLabel3}</label>
                    </div>
                  </div> */}
                  {/* )} */}

                  <div className="row">
                    <p className="form-title-deco mt-2">
                      <h5>Serial Details</h5>
                    </p>

                    <div className="col-md-4">
                      <label className="form-label">Mtrl Code</label>
                    </div>
                    <div className="col-md-8" style={{ marginTop: "8px" }}>
                      <select
                        className="ip-select dropdown-field"
                        disabled={boolVal}
                        // defaultValue={" "}
                        value={inputPart.mtrlCode}
                        name="mtrlCode"
                      >
                        <option value={inputPart.mtrlCode} disabled selected>
                          {inputPart.mtrlCode}
                        </option>
                      </select>
                    </div>
                  </div>

                  {sheetRowSelect && (
                    <div>
                      <div className="row mt-3">
                        <div className="col-md-4">
                          <label className="form-label">{para1Label}</label>
                        </div>
                        <div className="col-md-6">
                          <input
                            type="number"
                            className="in-field"
                            name="dynamicPara1"
                            value={inputPart.dynamicPara1}
                            disabled
                            min="0"
                          />
                        </div>
                        <div className="col-md-2">
                          <label className="form-label">{unitLabel1}</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <label className="form-label">{para2Label}</label>
                        </div>
                        <div className="col-md-6">
                          <input
                            type="number"
                            className="in-field"
                            name="dynamicPara2"
                            value={inputPart.dynamicPara2}
                            min="0"
                            disabled
                          />
                        </div>
                        <div className="col-md-2">
                          <label className="form-label">{unitLabel2}</label>
                        </div>
                      </div>
                    </div>
                  )}

                  {plateRowSelect && (
                    <div>
                      <div className="row mt-3">
                        <div className="col-md-4">
                          <label className="form-label">{para1Label}</label>
                        </div>
                        <div className="col-md-6">
                          <input
                            type="number"
                            className="in-field"
                            name="dynamicPara1"
                            value={inputPart.dynamicPara1}
                            disabled
                            min="0"
                          />
                        </div>
                        <div className="col-md-2">
                          <label className="form-label">{unitLabel1}</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <label className="form-label">{para2Label}</label>
                        </div>
                        <div className="col-md-6">
                          <input
                            type="number"
                            className="in-field"
                            name="dynamicPara2"
                            value={inputPart.dynamicPara2}
                            min="0"
                            disabled
                          />
                        </div>
                        <div className="col-md-2">
                          <label className="form-label">{unitLabel2}</label>
                        </div>
                      </div>
                    </div>
                  )}

                  {tubeRowSelect && (
                    <div>
                      <div className="row mt-3">
                        <div className="col-md-4">
                          <label className="form-label">{para1Label}</label>
                        </div>
                        <div className="col-md-6">
                          <input
                            type="number"
                            className="in-field"
                            name="dynamicPara1"
                            value={inputPart.dynamicPara1}
                            disabled
                            min="0"
                          />
                        </div>
                        <div className="col-md-2">
                          <label className="form-label">{unitLabel1}</label>
                        </div>
                      </div>
                    </div>
                  )}

                  {tilesStripRowSelect && <div></div>}

                  {blockRowSelect && (
                    <div>
                      <div className="row mt-3">
                        <div className="col-md-4">
                          <label className="form-label">{para1Label}</label>
                        </div>
                        <div className="col-md-6">
                          <input
                            type="number"
                            className="in-field"
                            name="dynamicPara1"
                            value={inputPart.dynamicPara1}
                            disabled
                            min="0"
                          />
                        </div>
                        <div className="col-md-2">
                          <label className="form-label">{unitLabel1}</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <label className="form-label">{para2Label}</label>
                        </div>
                        <div className="col-md-6">
                          <input
                            type="number"
                            className="in-field"
                            name="dynamicPara2"
                            value={inputPart.dynamicPara2}
                            min="0"
                            disabled
                          />
                        </div>
                        <div className="col-md-2">
                          <label className="form-label">{unitLabel2}</label>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-4">
                          <label className="form-label">{para3Label}</label>
                        </div>
                        <div className="col-md-6">
                          <input
                            type="number"
                            className="in-field"
                            name="dynamicPara3"
                            value={inputPart.dynamicPara3}
                            min="0"
                            disabled
                          />
                        </div>
                        <div className="col-md-2">
                          <label className="form-label">{unitLabel3}</label>
                        </div>
                      </div>
                    </div>
                  )}

                  {cylinderRowSelect && (
                    <div>
                      <div className="row mt-3">
                        <div className="col-md-3">
                          <label className="form-label">{para1Label}</label>
                        </div>
                        <div className="col-md-6">
                          <input
                            type="number"
                            className="in-field"
                            name="dynamicPara1"
                            value={inputPart.dynamicPara1}
                            disabled
                            min="0"
                          />
                        </div>
                        <div className="col-md-2">
                          <label className="form-label">{unitLabel1}</label>
                        </div>
                      </div>
                    </div>
                  )}

                  {unitRowSelect && (
                    <div>
                      <div className="row mt-3">
                        <div className="col-md-4">
                          <label className="form-label">{para1Label}</label>
                        </div>
                        <div className="col-md-6">
                          <input
                            type="number"
                            className="in-field"
                            name="dynamicPara1"
                            value={inputPart.dynamicPara1}
                            disabled
                            min="0"
                          />
                        </div>
                        <div className="col-md-2">
                          <label className="form-label">{unitLabel1}</label>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="col-md-12  mt-3">
                    <p className="form-title-deco">
                      <h5>Quantity Details</h5>
                    </p>
                    <div className="row">
                      <div className="col-md-3 col-sm-12">
                        <label className="form-label">Received</label>
                      </div>
                      <div className="col-md-4 col-sm-12">
                        <input
                          className="in-field"
                          disabled={boolVal}
                          value={(inputPart.qty = Math.floor(inputPart.qty))}
                        />
                      </div>

                      <div className="col-md-5">
                        <div
                          className="col-md-12"
                          style={{ display: "flex", gap: "5px" }}
                        >
                          <input
                            className="form-check-input mt-3"
                            type="checkbox"
                            id="flexCheckDefault"
                            name="inspected"
                            checked={inputPart.inspected == 1 ? true : false}
                            value={inputPart.inspected}
                            // checked={insCheck}

                            disabled={boolVal}
                          />
                          <label className="form-label mt-1">Inspected</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <label className="form-label">Accepted</label>
                      </div>
                      <div className="col-md-4">
                        <input
                          className="in-field"
                          disabled={boolVal}
                          value={
                            (inputPart.accepted = Math.floor(
                              inputPart.accepted
                            ))
                          }
                        />
                      </div>

                      <div className="col-md-5">
                        <div
                          className="col-md-12 "
                          style={{ display: "flex", gap: "3px" }}
                        >
                          <input
                            className="form-check-input mt-3"
                            type="checkbox"
                            checked={inputPart.updated === 1 ? true : false}
                            id="flexCheckDefault"
                            disabled={boolVal}
                          />
                           <label className="form-label mt-1">Updated</label>
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
                      </div>
                      <div className="col-md-6 mt-1">
                        <input
                          className="in-field"
                          disabled={boolVal}
                          value={inputPart.totalWeightCalculated}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="form-label mt-1">Weight</label>
                      </div>
                      <div className="col-md-6">
                        <input
                          className="in-field"
                          disabled={boolVal}
                          value={inputPart.totalWeight}
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-6 ">
                        <label className="form-label">Location</label>
                      </div>
                      <div className="col-md-6 mt-2">
                        <select
                          className="ip-select dropdown-field"
                          disabled={boolVal}
                        >
                          <option value={inputPart.locationNo}>
                            {inputPart.locationNo}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="row justify-content-center mt-2 mb-4">
                <button
                  className="button-style "
                  style={{ width: "155px" }}
                  disabled={boolVal}
                >
                  Delete
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpenButtonOpenSheetUnit;
