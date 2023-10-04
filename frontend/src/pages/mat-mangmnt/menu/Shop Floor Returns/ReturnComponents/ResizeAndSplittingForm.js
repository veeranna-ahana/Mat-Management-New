import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useLocation } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import { toast } from "react-toastify";
import YesNoModal from "../../../components/YesNoModal";
import { getWeight } from "../../../../../utils";
import { useNavigate } from "react-router-dom";
import SplitMaterialYesNoModal from "../../../components/SplitMaterialYesNoModal";

import Axios from "axios";
const { getRequest, postRequest } = require("../../../../api/apiinstance");
const { endpoints } = require("../../../../api/constants");

function ResizeAndSplittingForm() {
  const nav = useNavigate();
  const location = useLocation();

  console.log("row data = ", location?.state?.secondTableRow);

  const [formHeader, setFormHeader] = useState({
    materialCode: location?.state?.secondTableRow[0].Mtrl_Code,
    quantity: location?.state?.secondTableRow.length,
    para1:
      location?.state?.type == "storeresize"
        ? location?.state?.secondTableRow[0].DynamicPara1
        : location?.state?.secondTableRow[0].Para1,
    para2:
      location?.state?.type == "storeresize"
        ? location?.state?.secondTableRow[0].DynamicPara2
        : location?.state?.secondTableRow[0].Para2,
  });
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [counter, setCounter] = useState(1);
  const [showYesNo, setShowYesNo] = useState(false);
  let [locationData, setLocationData] = useState([]);
  const [inputData, setInputData] = useState({
    Location: "",
    MtrlStock_ID: counter,
    DynamicPara1: "",
    DynamicPara2: "",
    InStock: "",
    Weight: "",
  });
  const columns = [
    {
      text: "id",
      dataField: "id",
      hidden: true,
    },
    {
      text: "Location",
      dataField: "Location",
    },
    {
      text: "MtrlStock ID",
      dataField: "MtrlStock_ID",
    },
    {
      text: "DynamicPara1",
      dataField: "DynamicPara1",
    },
    {
      text: "DynamicPara2",
      dataField: "DynamicPara2",
    },
    {
      text: "InStock",
      dataField: "InStock",
    },
    {
      text: "Weight",
      dataField: "Weight",
    },
  ];

  // const [flagTest, setFlagTest] = useState([]);

  const selectRow = {
    mode: "radio",
    clickToSelect: true,
    bgColor: "#98A8F8",
    onSelect: (row, isSelect, rowIndex, e) => {
      setSelectedRow(row);
    },
  };

  const addNew = () => {
    let newRow = {
      Location: "",
      MtrlStock_ID: counter,
      DynamicPara1: "",
      DynamicPara2: "",
      InStock: "",
      Weight: "",
    };
    //setPartArray(newRow);
    setTableData([...tableData, newRow]);
    setCounter(counter + 1);

    //clear all data
    setInputData((preValue) => {
      //console.log(preValue)
      return {
        Location: "",
        MtrlStock_ID: counter,
        DynamicPara1: "",
        DynamicPara2: "",
        InStock: "",
        Weight: "",
      };
    });
  };

  const changeHandler = (e) => {
    const { value, name } = e.target;

    const newArray = tableData.map((p) =>
      p.MtrlStock_ID === tableData.length
        ? {
            ...p,
            [name]: value,
          }
        : p
    );

    setInputData((preValue) => {
      //console.log(preValue)
      return {
        ...preValue,
        [name]: value,
      };
    });

    //console.log(newArray);
    setTableData(newArray);
  };

  const deleteItem = () => {
    const newArray = tableData.filter(
      (p) => p.MtrlStock_ID !== selectedRow.MtrlStock_ID
    );
    setTableData(newArray);
  };

  const fetchData = () => {
    getRequest(endpoints.getMaterialLocationList, (data) => {
      setLocationData(data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const focusOutEvent = (e) => {
    const { value, name } = e.target;
    if (value < 10) {
      toast.error("Value should be more than 10 mm");
    }
  };

  const splitMaterialButton = () => {
    let SheetArea = formHeader.para1 * formHeader.para2;

    var totalSplitArea = 0;
    for (let i = 0; i < tableData.length; i++) {
      totalSplitArea +=
        tableData[i].DynamicPara1 *
        tableData[i].DynamicPara2 *
        tableData[i].InStock;
    }

    if (SheetArea !== totalSplitArea) {
      toast.error("Split Sheet area does not add up to original sheet area");
    } else {
      for (let i = 0; i < tableData.length; i++) {
        if (
          tableData[i].DynamicPara1 < 10 ||
          tableData[i].DynamicPara2 < 10 ||
          tableData[i].InStock < 1
        ) {
          toast.error("Check Parameters for Resizing");
        } else if (tableData[i].Location.length === 0) {
          toast.error("Select Location for Resized Sheets");
        } else {
          //get mtrl_data by mtrl_code
          let url =
            endpoints.getRowByMtrlCode + "?code=" + formHeader.materialCode;
          getRequest(url, async (data) => {
            let totwt = 0;
            totwt = getWeight(
              data,
              parseFloat(tableData[i].DynamicPara1),
              parseFloat(tableData[i].DynamicPara2),
              parseFloat(0)
            );

            tableData[i].Weight = Math.round(0.000001 * totwt);
          });
        }
      }
      setShowYesNo(true);
      /*If MsgBox("Do you wish to split the material as indicated and save it. Changes once done cannot be undone", MsgBoxStyle.YesNo) = MsgBoxResult.No Then
        Exit Sub
    End If*/
    }
    // console.log("clicked");
  };
  // const flagTest = [];

  const modalYesNoResponse = (msg) => {
    // console.log("msg = ", msg);
    if (msg == "yes") {
      if (location?.state?.type == "return") {
        for (let i = 0; i < location?.state?.secondTableRow.length; i++) {
          if (location?.state?.secondTableRow[i].Rejected === 1) {
            //return the sheet
            let paraData1 = {
              id: location?.state?.secondTableRow[i].IssueID,
            };
            postRequest(
              endpoints.updateShopfloorMaterialIssueRegisterQtyReturnedAddOne,
              paraData1,
              (data) => {
                console.log("rejected : updated shopfloorregisterqtyreturned");
              }
            );

            //Set issued less by one
            let paraData2 = {
              Id: location?.state?.secondTableRow[i].NcID,
              Qty: 1,
            };
            postRequest(
              endpoints.updateQtyAllotedncprograms,
              paraData2,
              (data) => {
                console.log("rejected : updated qtyallotted ncprograms");
              }
            );
          }
          if (location?.state?.secondTableRow[i].Used === 1) {
            //return the sheet
            let paraData1 = {
              id: location?.state?.secondTableRow[i].IssueID,
            };
            postRequest(
              endpoints.updateShopfloorMaterialIssueRegisterQtyReturnedAddOne,
              paraData1,
              (data) => {
                console.log("used : updated shopfloorregisterqtyreturned");
              }
            );
          }

          //update stock list
          let paraData3 = {
            LocationNo: "ScrapYard",
            MtrlStockID: location?.state?.secondTableRow[i].ShapeMtrlID,
          };
          postRequest(endpoints.updateMtrlStockLock3, paraData3, (data) => {
            console.log("updated stock list");
          });

          //updatencprogrammtrlallotmentlistReturnStock
          let paraData4 = {
            id: location?.state?.secondTableRow[i].NcPgmMtrlId,
          };
          postRequest(
            endpoints.updatencprogrammtrlallotmentlistReturnStock,
            paraData4,
            (data) => {
              console.log("updated ncprogrammtrlallotmentreturnstock");
            }
          );
        }

        //insert mtrl stock list
        for (let i = 0; i < tableData.length; i++) {
          let paraData3 = {
            DynamicPara1: tableData[i].DynamicPara1,
            DynamicPara2: tableData[i].DynamicPara2,
            DynamicPara3: 0,
            LocationNo: tableData[i].Location,
            Weight: tableData[i].Weight,
            MtrlStockID:
              location?.state?.secondTableRow[0].ShapeMtrlID + "/P" + (i + 1),
            MtrlStockIDNew: location?.state?.secondTableRow[0].ShapeMtrlID,
          };
          postRequest(endpoints.insertByMtrlStockID, paraData3, (data) => {
            console.log("inserted stock list");
          });
        }
        toast.success("Spliting done Successfully");
        nav("/materialmanagement/ShopFloorReturns/PendingList");
      } else if (location?.state?.type == "storeresize") {
        // console.log("secondTableRow........", location?.state?.secondTableRow);
        // console.log("resizeTableData........", tableData);
        // console.log("location data...........", location.state);
        //insert mtrl stock list
        for (let i = 0; i < tableData.length; i++) {
          const element0 = tableData[i];

          // console.log('forrrr111111111..', element0);
          for (let j = 0; j < location?.state?.secondTableRow.length; j++) {
            const element1 = location?.state?.secondTableRow[j];
            // console.log("forrrr111111111..", element0);
            // console.log("forrrr222222222222..", element1);

            // console.log("paraaaaaaaaa.......", paraData3);

            let urlGet =
              endpoints.getDataByMtrlStockIdResize +
              "?MtrlStockID=" +
              element1.MtrlStockID;
            getRequest(urlGet, async (selectData) => {
              // console.log("data from BE selecteData", selectData);

              if (selectData.length > 0) {
                let paraData3 = {
                  MtrlStockID: element1.MtrlStockID + "/P" + (i + 1),
                  MtrlStockIDOld: element1.MtrlStockID,

                  Mtrl_Rv_id: selectData[0].Mtrl_Rv_id,
                  Cust_Code: selectData[0].Cust_Code,
                  Customer: selectData[0].Customer,
                  RV_No: selectData[0].RV_No,
                  Cust_Docu_No: null,
                  Mtrl_Code: selectData[0].Mtrl_Code,
                  Shape: selectData[0].Shape,
                  Material: selectData[0].Material,
                  DynamicPara1: element0.DynamicPara1,
                  DynamicPara2: element0.DynamicPara2,
                  DynamicPara3: 0,
                  DynamicPara4: 0,
                  Locked: 0,
                  Scrap: 0,
                  Issue: 1,
                  Weight: element0.Weight,
                  ScrapWeight: selectData[0].ScrapWeight,
                  IV_No: selectData[0].IV_No,
                  NCProgramNo: null,
                  LocationNo: element0.Location,

                  // DynamicPara1: element0.DynamicPara1,
                  // DynamicPara2: element0.DynamicPara2,
                  // DynamicPara3: 0,
                  // DynamicPara4: 0,
                  // LocationNo: element0.Location,
                  // Weight: element0.Weight,
                  // MtrlStockID: element1.MtrlStockID + "/P" + (i + 1),
                  // MtrlStockIDOld: element1.MtrlStockID,
                };

                // console.log("paraData3...", paraData3);
                postRequest(
                  endpoints.insertByMtrlStockIDResize,
                  paraData3,
                  (data) => {
                    if (data.affectedRows > 0) {
                      // flagTest.push(1);
                      // setFlagTest([...flagTest, 1]);
                      // console.log("test...");
                    }
                    // console.log("inserted stock list.....", flagTest);
                  }
                );
              } else {
                toast.error("unaught error");
              }
            });
          }
        }

        // //update stock list
        // for (let i = 0; i < location?.state?.secondTableRow.length; i++) {
        //   let paraData3 = {
        //     LocationNo: "ScrapYard",
        //     MtrlStockID: location?.state?.secondTableRow[i].ShapeMtrlID,
        //   };
        //   postRequest(endpoints.updateMtrlStockLock3, paraData3, (data) => {
        //     // console.log("updated stock list");
        //   });
        // }

        // update the old mtrl...

        for (let j = 0; j < location?.state?.secondTableRow.length; j++) {
          const element = location?.state?.secondTableRow[j];

          // console.log("element", element.MtrlStockID);

          let paraData3 = {
            LocationNo: "ScrapYard",
            MtrlStockID: element.MtrlStockID,
          };
          postRequest(endpoints.updateMtrlStockLock3, paraData3, (data) => {
            // console.log("updated stock list", data);
            if (data.affectedRows > 0) {
              // flagTest.push(2);
              // setFlagTest([...flagTest, 2]);
            }
          });
        }

        toast.success("Resize Successfull");
        setTimeout(() => {
          // document.getElementById("result").innerHTML = "Hello, I am here";
          nav("/MaterialManagement/StoreManagement/ResizeSheets");
        }, 500);
        // flagTest.push(5);
        // console.log("flagTest", flagTest.length);
        // if (flagTest.sort().reverse()[0] === 0) {
        //   toast.error("Error while inserting new material");
        // } else if (flagTest.sort().reverse()[0] === 1) {
        //   toast.error("Error while udating the material");
        // } else if (flagTest.sort().reverse()[0] === 2) {
        //   toast.success("Resize Successfull");
        // } else {
        //   toast.error("Uncaught error while updating Material");
        // }
      }
    }
  };
  return (
    <div>
      <SplitMaterialYesNoModal
        show={showYesNo}
        setShow={setShowYesNo}
        message="Do you wish to split the material as indicated and save it. Changes once done cannot be undone"
        modalResponse={modalYesNoResponse}
      />
      <h4 className="title">Material Resize and Splitting Form</h4>
      <div className="table_top_style">
        <div className="row">
          <div className="col-md-9">
            <label className="form-label">Material Code</label>
            <input
              className="form-label"
              name="materialCode"
              value={formHeader.materialCode}
              disabled
            />
          </div>

          <div className="col-md-3 mt-2">
            <button className="button-style " onClick={splitMaterialButton}>
              Split Material
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <label className="form-label">Quantity</label>
            <input
              className="form-label"
              name="quantity"
              value={formHeader.quantity}
              disabled
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Para1</label>
            <input
              className="form-label"
              name="para1"
              value={formHeader.para1}
              disabled
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Para2</label>
            <input
              className="form-label"
              name="para2"
              value={formHeader.para2}
              disabled
            />
          </div>
          <div className="col-md-3 mt-2">
            <button
              className="button-style "
              id="btnclose"
              type="submit"
              onClick={() => {
                nav("/MaterialManagement/ShopFloorReturns/PendingList");
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="row">
          <div className="col-md-8">
            <div
              style={{
                height: "400px",
                overflowY: "scroll",
                marginTop: "30px",
              }}
            >
              <BootstrapTable
                keyField="MtrlStock_ID"
                columns={columns}
                data={tableData}
                striped
                hover
                condensed
                selectRow={selectRow}
                headerClasses="header-class"
              ></BootstrapTable>
            </div>
          </div>
          <div className="col-md-4 mt-4 ">
            <div className="ip-box form-bg">
              <div className="row">
                <div className="col-md-3 mt-1 ">
                  <label className="form-label">Srl NO</label>
                </div>

                <div className="col-md-4 ">
                  <input
                    className="in-field"
                    readOnly
                    value={inputData.MtrlStock_ID}
                  />
                </div>
                <div className="col-md-3 ">
                  <button
                    className="button-style mt-3"
                    style={{ width: "130px" }}
                    onClick={addNew}
                  >
                    Add New
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mt-1 ">
                  <label className="form-label">Para1</label>
                </div>

                <div className="col-md-4 ">
                  <input
                    type="number"
                    className="in-field"
                    name="DynamicPara1"
                    onChange={changeHandler}
                    value={inputData.DynamicPara1}
                    onBlur={focusOutEvent}
                  />
                </div>
                <div className="col-md-3 ">
                  <button
                    className="button-style mt-3"
                    style={{ width: "130px" }}
                    onClick={deleteItem}
                  >
                    Delete Item
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mt-1">
                  <label className="form-label">Para2</label>
                </div>
                <div className="col-md-9 ">
                  <input
                    type="number"
                    className="in-field"
                    name="DynamicPara2"
                    onChange={changeHandler}
                    value={inputData.DynamicPara2}
                    onBlur={focusOutEvent}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mt-1 ">
                  <label className="form-label">Quantity</label>
                </div>
                <div className="col-md-9 ">
                  <input
                    type="number"
                    className="in-field"
                    name="InStock"
                    onChange={changeHandler}
                    value={inputData.InStock}
                  />
                </div>
              </div>
              <div className="row mt-2 mb-3">
                {" "}
                <div className="col-md-3 mt-1 ">
                  <label className="form-label">Location</label>{" "}
                </div>{" "}
                <div className="col-md-9" style={{ marginTop: "8px" }}>
                  {" "}
                  <select
                    className="ip-select dropdown-field"
                    name="Location"
                    onChange={changeHandler}
                    value={inputData.Location}
                  >
                    <option value="" disabled selected>
                      Select Location
                    </option>
                    {locationData.map((location, index) => (
                      <option key={index} value={location.LocationNo}>
                        {location.LocationNo}
                      </option>
                    ))}
                  </select>{" "}
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResizeAndSplittingForm;
