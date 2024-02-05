import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import BootstrapTable from "react-bootstrap-table-next";
import Table from "react-bootstrap/Table";
import CreateYesNoModal from "../../components/CreateYesNoModal";
import DeleteSerialYesNoModal from "../../components/DeleteSerialYesNoModal";
import DeleteRVModal from "../../components/DeleteRVModal";
import { formatDate } from "../../../../utils";
import { useLocation } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";

const { getRequest, postRequest } = require("../../../api/apiinstance");
const { endpoints } = require("../../../api/constants");

function OpenButtonDraftPartList() {
  const location = useLocation();

  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteRvModalOpen, setDeleteRvModalOpen] = useState(false);
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const currDate = new Date()
    .toJSON()
    .slice(0, 10)
    .split("-")
    .reverse()
    .join("/");

  //initial disable
  const [boolVal1, setBoolVal1] = useState(true);
  //after clicking save button
  const [boolVal2, setBoolVal2] = useState(false);
  //after clicking add button
  const [boolVal3, setBoolVal3] = useState(true);
  //after clicking allot rv button
  const [boolVal4, setBoolVal4] = useState(false);

  const [partUniqueId, setPartUniqueId] = useState();
  const [partArray, setPartArray] = useState([]);

  const [partVal, setPartVal] = useState([]);
  const [inputPart, setInputPart] = useState({
    id: "",
    partId: "",
    unitWeight: "",
    qtyReceived: "",
    qtyAccepted: "",
    qtyRejected: "0",
  });

  //const [custDetailVal, setCustDetailVal] = useState("");
  const [calcWeightVal, setCalcWeightVal] = useState(0);

  //const currDateTime = new Date();
  let [custdata, setCustdata] = useState([]);
  let [mtrlDetails, setMtrlDetails] = useState([]);
  const [saveUpdateCount, setSaveUpdateCount] = useState(0);
  const [selectedPart, setSelectedPart] = useState([]);

  let [formHeader, setFormHeader] = useState({
    rvId: "",
    receiptDate: "", //formatDate(new Date(), 4), //currDate, //.split("/").reverse().join("-"),
    rvNo: "", //"Draft",
    rvDate: "", //currDate, //.split("/").reverse().join("-"),
    status: "", //"Created",
    customer: "",
    customerName: "",
    reference: "",
    weight: "",
    calcWeight: "",
    type: "", //"Parts",
    address: "",
  });

  async function fetchData() {
    const url =
      endpoints.getByTypeMaterialReceiptRegisterByRvID +
      "?id=" +
      location.state.id;
    getRequest(url, (data) => {
      console.log("data = ", data);
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

      //data.ReceiptDate = formatDate(new Date(data.ReceiptDate), 4);
      //data.RV_Date = formatDate(new Date(data.RV_Date), 3);
      //setFormHeader(data);

      //get customer details for address
      getRequest(endpoints.getCustomers, (data1) => {
        const found = data1.find((obj) => obj.Cust_Code === data.Cust_Code);
        // data.address = found.Address;
        formHeader.address = found.Address;
        setFormHeader(formHeader);
        setCalcWeightVal(data.TotalCalculatedWeight);

        //get part details
        const url1 =
          endpoints.getPartReceiptDetailsByRvID + "?id=" + location.state.id;
        getRequest(url1, (data2) => {
          console.log("dataa.........", data2);
          data2.forEach((obj) => {
            obj["id"] = obj["Id"];
            obj["partId"] = obj["PartId"];
            obj["unitWeight"] = obj["UnitWt"];
            obj["qtyReceived"] = obj["QtyReceived"];
            obj["qtyAccepted"] = obj["QtyAccepted"];
            obj["qtyRejected"] = obj["QtyRejected"];
          });
          setPartArray(data2);
          //setFormHeader(formHeader);
          //console.log(data2);
        });
      });

      //fetch part names from bomlist
      getRequest(endpoints.getCustBomList, (data3) => {
        const foundPart = data3.filter(
          (obj) => obj.Cust_code == data.Cust_Code
        );
        setMtrlDetails(foundPart);
      });
    });
    //console.log("data = ", custdata);
  }

  useEffect(() => {
    fetchData();
    //setPartArray(partArray);
  }, []); //[inputPart]);

  const columns = [
    {
      text: "#",
      dataField: "id",
      hidden: true,
    },
    {
      text: "Part Id",
      dataField: "partId",
    },
    {
      text: "Unit Wt",
      dataField: "unitWeight",
      headerStyle: { whiteSpace: "nowrap" },
    },
    {
      text: "Qty Received",
      dataField: "qtyReceived",
      headerStyle: { whiteSpace: "nowrap" },
    },
    {
      text: "Qty Accepted",
      dataField: "qtyAccepted",
      headerStyle: { whiteSpace: "nowrap" },
    },
    {
      text: "Qty Rejected",
      dataField: "qtyRejected",
      formatter: (celContent, row) => <div className="">{qtyRejected}</div>,
      headerStyle: { whiteSpace: "nowrap" },
    },
  ];

  // const changePartID = (e) => {
  //   e.preventDefault();
  //   const { value, name } = e.target;

  //   setInputPart((preValue) => {
  //     //console.log(preValue)
  //     return {
  //       ...preValue,
  //       [name]: value,
  //     };
  //   });

  //   inputPart[name] = value;
  //   setInputPart(inputPart);

  //   postRequest(endpoints.updatePartReceiptDetails, inputPart, (data) => {
  //     if (data.affectedRows !== 0) {
  //     } else {
  //       toast.error("Record Not Updated");
  //     }
  //   });

  //   const newArray = partArray.map((p) =>
  //     p.id === partUniqueId
  //       ? {
  //           ...p,
  //           [name]: value,
  //         }
  //       : p
  //   );

  //   setPartArray(newArray);
  // };

  const changePartID = (selected) => {
    setSelectedPart(selected);

    setInputPart((preValue) => ({
      ...preValue,
      partId: selected.length > 0 ? selected[0].PartId : "",
    }));

    postRequest(endpoints.updatePartReceiptDetails, inputPart, (data) => {
      if (data.affectedRows !== 0) {
        // Handle success, if needed
      } else {
        toast.error("Record Not Updated");
      }
    });

    const newArray = partArray.map((p) =>
      p.id === partUniqueId
        ? {
            ...p,
            partId: selected.length > 0 ? selected[0].PartId : "",
          }
        : p
    );

    setPartArray(newArray);
  };

  const changePartHandle = (e) => {
    const { value, name } = e.target;
    if (name === "unitWeight" && parseFloat(value) < 0) {
      toast.error("unitWeight should be a positive value");
    }
    setInputPart((preValue) => {
      //console.log(preValue)
      return {
        ...preValue,
        [name]: value,
      };
    });
    inputPart[name] = value;
    inputPart.custBomId = formHeader.customer;
    inputPart.rvId = formHeader.rvId;
    // inputPart.qtyRejected = 0;
    inputPart.qtyRejected = inputPart.qtyReceived - inputPart.qtyAccepted;
    inputPart.qtyUsed = 0;
    inputPart.qtyReturned = 0;
    inputPart.qtyIssued = 0;
    setInputPart(inputPart);

    //update blank row with respected to modified part textfield
    postRequest(endpoints.updatePartReceiptDetails, inputPart, (data) => {
      if (data?.affectedRows !== 0) {
      } else {
        toast.error("Record Not Updated");
      }
    });

    const newArray = partArray.map((p) =>
      p.id === partUniqueId
        ? {
            ...p,
            [name]: value,
          }
        : p
    );

    setPartArray(newArray);

    let totwt = 0;
    partArray.map((obj) => {
      totwt =
        parseFloat(totwt) +
        parseFloat(obj.unitWeight) * parseFloat(obj.qtyReceived);
      //console.log(newWeight);
    });

    console.log("totwt", totwt);
    setCalcWeightVal(parseFloat(totwt).toFixed(2));
    setFormHeader({ ...formHeader, calcWeight: parseFloat(totwt).toFixed(2) });
  };

  let { partId, unitWeight, qtyReceived, qtyAccepted, qtyRejected } = inputPart;

  const addNewPart = (e) => {
    // console.log("entering into add new ");
    setBoolVal3(false);

    //clear all part fields
    inputPart.rvId = formHeader.rvId;
    inputPart.partId = "";
    inputPart.qtyAccepted = 0;
    inputPart.qtyReceived = 0;
    inputPart.qtyRejected = 0;
    inputPart.qtyUsed = 0;
    inputPart.qtyReturned = 0;
    inputPart.qtyIssued = 0;
    inputPart.unitWeight = 0;
    inputPart.custBomId = formHeader.customer;

    //insert blank row in table
    postRequest(endpoints.insertPartReceiptDetails, inputPart, (data) => {
      // console.log("entering into add new");
      if (data.affectedRows !== 0) {
        let id = data.insertId;
        inputPart.id = id;
        setPartArray([
          ...partArray,
          { id, partId, unitWeight, qtyReceived, qtyAccepted, qtyRejected },
        ]);
        //const newWeight = calcWeightVal + unitWeight * qtyReceived;
        //setCalcWeightVal(parseFloat(newWeight).toFixed(2));

        //let uniqueid = uuid();
        setPartUniqueId(id);
        let newRow = {
          id: id,
          partId: "",
          unitWeight: "",
          qtyReceived: "",
          qtyAccepted: "",
          qtyRejected: "",
        };
        //setPartArray(newRow);
        setPartArray([...partArray, newRow]);
        setSelectedPart([]);
        setInputPart(inputPart);
      } else {
        toast.error("Record Not Inserted");
      }
    });

    //console.log("after = ", partArray);
  };

  const deleteButtonState = () => {
    console.log("partArray", partArray);
    if (!inputPart?.id) {
      toast.error("Select Part");
    } else {
      setModalOpen(true);
    }
  };

  //delete part
  const handleDelete = () => {
    //minus calculated weight

    postRequest(endpoints.deletePartReceiptDetails, inputPart, (data) => {
      console.log("data", data);
      if (data.affectedRows !== 0) {
        const newArray = partArray.filter((p) => p.id !== inputPart.id);
        console.log("Delete Part Array", newArray);
        setPartArray(newArray);
        toast.success("Material Deleted");
        setInputPart({
          id: "",
          partId: "",
          unitWeight: "",
          qtyReceived: "",
          qtyAccepted: "",
          qtyRejected: "0",
        });
        setSelectedPart([]);

        let totwt = 0;
        newArray.map((obj) => {
          totwt =
            parseFloat(totwt) +
            parseFloat(obj.unitWeight) * parseFloat(obj.qtyReceived);
          //console.log(newWeight);
        });
        setCalcWeightVal(parseFloat(totwt).toFixed(2));
        formHeader.calcWeight = parseFloat(totwt).toFixed(2);
        setFormHeader(formHeader);

        postRequest(
          endpoints.updateHeaderMaterialReceiptRegister,
          formHeader,
          (data) => {
            if (data.affectedRows !== 0) {
            }
          }
        );
      }
    });

    //cal weight
  };

  const selectRow = {
    mode: "radio",
    clickToSelect: true,
    bgColor: "#8A92F0",
    onSelect: (row, isSelect, rowIndex, e) => {
      setPartUniqueId(row.id);
      setInputPart({
        id: row.id,
        partId: row.partId,
        // partId: isSelect ? row.partId : "",
        unitWeight: row.unitWeight,
        qtyAccepted: row.qtyAccepted,
        qtyRejected: row.qtyRejected,
        qtyReceived: row.qtyReceived,
      });
      setSelectedPart([{ PartId: row.partId }]);
    },
  };

  //input header change event
  const InputHeaderEvent = (e) => {
    const { value, name } = e.target;
    setFormHeader((preValue) => {
      //console.log(preValue)
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const updateHeaderFunction = () => {
    //console.log("update formheader = ", formHeader);
    postRequest(
      endpoints.updateHeaderMaterialReceiptRegister,
      formHeader,
      (data) => {
        //console.log("data = ", data);
        if (data.affectedRows !== 0) {
          setSaveUpdateCount(saveUpdateCount + 1);
          toast.success("Record Updated Successfully");
          //enable part section and other 2 buttons
          setBoolVal1(false);
        } else {
          toast.error("Record Not Updated");
        }
      }
    );
  };

  console.log("inputPart", inputPart);

  const saveButtonState = (e) => {
    e.preventDefault();
    if (formHeader.customer.length == 0) {
      toast.error("Please Select Customer");
    } else if (formHeader.reference.length == 0)
      toast.error("Please Enter Customer Document Material Reference");
    else if (
      parseFloat(inputPart.qtyAccepted) > parseFloat(inputPart.qtyReceived)
    ) {
      toast.error("Accepted value should be less than or equal to Received");
    }
    // else if (inputPart.qtyAccepted === "" || inputPart.qtyReceived === "") {
    //   toast.error("Received and Accepted Qty cannot be empty");
    // }
    else {
      updateHeaderFunction();
    }
  };

  const allotRVButtonState = (e) => {
    e.preventDefault();

    if (partArray.length === 0) {
      toast.error("Add Details Before Saving");
    } else if (
      partArray.length !== 0 &&
      (formHeader.weight == 0.0 ||
        formHeader.weight === null ||
        formHeader.weight === undefined)
    ) {
      toast.error(
        "Enter the Customer Material Weight as per Customer Document"
      );
    } else {
      //NEW CODE FOR FORM VALIDATION
      let flag1 = 0;
      for (let i = 0; i < partArray.length; i++) {
        if (partArray[i].mtrlCode == "") {
          flag1 = 1;
          break;
        }

        if (
          partArray[i].dynamicPara1 == "" ||
          partArray[i].dynamicPara1 == "0" ||
          partArray[i].dynamicPara1 == 0.0
        ) {
          flag1 = 2;
          console.log("Setting flag1 to 2");
          break; // Add a break to ensure this condition is not overwritten by subsequent checks
        }

        if (
          partArray[i].qtyReceived === "" ||
          partArray[i].qtyReceived === "0" ||
          partArray[i].qtyReceived === 0.0 ||
          partArray[i].qtyReceived === undefined
        ) {
          flag1 = 3;
          console.log("Setting flag1 to 3");
        }

        if (
          partArray[i].qtyAccepted == "" ||
          partArray[i].qtyAccepted == "0" ||
          partArray[i].qtyAccepted == 0.0 ||
          partArray[i].qtyAccepted === undefined
        ) {
          flag1 = 4;
          console.log("Setting flag1 to 4");
        }

        if (partArray[i].locationNo == "") {
          flag1 = 5;
          console.log("Setting flag1 to 5");
        }
        if (partArray[i].qtyAccepted > partArray[i].qtyReceived) {
          flag1 = 6;
        }
      }

      console.log("flag1 value:", flag1);

      if (flag1 === 1) {
        toast.error("Select Material");
      } else if (flag1 === 2) {
        toast.error("Parameters cannot be Zero");
      } else if (flag1 === 4) {
        toast.error("Received and Accepted Qty cannot be Zero");
      } else if (flag1 === 5) {
        toast.error("Select Location");
      } else if (flag1 === 6) {
        toast.error("QtyAccepted should be less than or equal to QtyReceived");
      } else {
        // Show model form
        setShow(true);
      }
    }
  };

  const allotRVYesButton = async (data) => {
    await delay(500);
    setFormHeader(data);
    setBoolVal4(true);
  };
  const deleteRVButton = async () => {
    setDeleteRvModalOpen(true);
  };
  const deleteRVButtonState = () => {
    postRequest(
      endpoints.deleteHeaderMaterialReceiptRegisterAndDetails,
      formHeader,
      (data) => {
        if (data.affectedRows !== 0) {
          toast.success("Record is Deleted");
          nav("/MaterialManagement/Receipt/CustomerJobWork/Parts/New", {
            replace: true,
          });
          window.location.reload();
        }
      }
    );
  };
  const handleYes = () => {
    handleDelete();
    setModalOpen(false);
  };
  const handleRVYes = () => {
    deleteRVButtonState();
    setDeleteRvModalOpen(false);
  };

  const blockInvalidQtyChar = (e) =>
    ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault();

  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  return (
    <div>
      <CreateYesNoModal
        show={show}
        setShow={setShow}
        formHeader={formHeader}
        allotRVYesButton={allotRVYesButton}
      />
      <DeleteSerialYesNoModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        message="You want to delete material,are you sure ?"
        handleYes={handleYes}
      />
      <DeleteRVModal
        deleteRvModalOpen={deleteRvModalOpen}
        setDeleteRvModalOpen={setDeleteRvModalOpen}
        message="You want to delete RV,are you sure ?"
        handleRVYes={handleRVYes}
      />
      <div>
        <h4 className="title">Customer Parts Receipt Voucher</h4>

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
              type="number"
              onKeyDown={blockInvalidChar}
              min="0"
              name="weight"
              value={formHeader.weight}
              onChange={InputHeaderEvent}
              disabled={boolVal4}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            <label className="form-label">Customer</label>
            <select
              className="ip-select mt-1"
              name="customer"
              //onChange={changeCustomer}
              disabled={boolVal1}
            >
              <option value={formHeader.customer} disabled selected>
                {formHeader.customerName}
              </option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Reference</label>
            <input
              type="text"
              name="reference"
              value={formHeader.reference}
              onChange={InputHeaderEvent}
              disabled={boolVal2 && boolVal4}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Calculated Weight</label>
            <input
              type="number"
              name="calculatedWeight"
              value={formHeader.calcWeight}
              // value={calcWeightVal}
              readOnly
            />
          </div>
        </div>

        <div className="row ">
          <div className="col-md-8 justify-content-center">
            <button
              className="button-style"
              onClick={saveButtonState}
              style={{ marginLeft: "60px" }}
              disabled={boolVal4}
            >
              Save
            </button>
            <button
              className="button-style"
              disabled={boolVal4}
              onClick={allotRVButtonState}
            >
              Allot RV No
            </button>

            <button
              className="button-style"
              disabled={boolVal4}
              onClick={deleteRVButton}
            >
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
          <div className="col-md-4 mb-3 mt-3">
            <textarea
              id="exampleFormControlTextarea1"
              rows="4"
              style={{ width: "400px", height: "40px" }}
              value={formHeader.address}
              readOnly
            ></textarea>
          </div>
        </div>
      </div>
      <div className="row">
        <div
          style={{ height: "330px", overflowY: "scroll" }}
          className="col-md-8 col-sm-12"
        >
          <BootstrapTable
            keyField="id"
            columns={columns}
            data={partArray}
            striped
            hover
            condensed
            selectRow={selectRow}
            headerClasses="header-class tableHeaderBGColor"
          ></BootstrapTable>
        </div>

        <div className="col-md-4 col-sm-12">
          <div className="ip-box form-bg">
            <div className="row justify-content-center mt-1 mb-3">
              <button
                className="button-style "
                style={{ width: "155px" }}
                onClick={addNewPart}
                //disabled={boolVal1 | boolVal4}
                disabled={boolVal4}
              >
                Add New
              </button>
            </div>
            <div className="row">
              <div className="col-md-4">
                <label className="form-label mt-1">Part ID</label>
                {/* </div>
              <div className="col-md-8" style={{ marginTop: "8px" }}> */}
              </div>
              {/* <div className="col-md-8">
                <select
                  className="ip-select dropdown-field"
                  name="partId"
                  value={inputPart.partId}
                  onChange={changePartID}
                  disabled={boolVal4}
                >
                  <option value="" disabled selected>
                    Select Part
                  </option>
                  {mtrlDetails.map((part, index) => (
                    <option key={index} value={part.PartId}>
                      {part.PartId}
                    </option>
                  ))}
                </select>
              </div> */}
              <div className="col-md-8 mt-2">
                <Typeahead
                  className="in-field"
                  id="partId"
                  labelKey="PartId"
                  options={mtrlDetails}
                  selected={selectedPart}
                  onChange={changePartID}
                  disabled={boolVal4}
                  placeholder="Select Part"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 ">
                <label className="form-label mt-1">Unit Wt</label>
              </div>
              <div className="col-md-8 ">
                <input
                  className="in-field"
                  type="number"
                  name="unitWeight"
                  value={inputPart.unitWeight}
                  onChange={changePartHandle}
                  //onKeyUp={changePartHandle1}
                  onKeyDown={blockInvalidQtyChar}
                  min="0"
                  disabled={boolVal4}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 ">
                <label className="form-label mt-1">QtyReceived</label>
              </div>
              <div className="col-md-8 ">
                <input
                  className="in-field"
                  type="number"
                  name="qtyReceived"
                  min="0"
                  //value={tempVal}
                  value={inputPart.qtyReceived}
                  onChange={changePartHandle}
                  onKeyDown={blockInvalidQtyChar}
                  disabled={boolVal4}
                />
              </div>
              <div className="col-md-8 "></div>
            </div>
            <div className="row">
              <div className="col-md-4 ">
                <label className="form-label mt-1">QtyAccepted</label>
              </div>
              <div className="col-md-8 ">
                <input
                  className="in-field"
                  type="number"
                  name="qtyAccepted"
                  value={inputPart.qtyAccepted}
                  onChange={changePartHandle}
                  onKeyDown={blockInvalidQtyChar}
                  min="0"
                  disabled={boolVal4}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 ">
                <label className="form-label mt-1">QtyRejected</label>
              </div>
              <div className="col-md-8 ">
                <input
                  className="in-field"
                  type="number"
                  value={inputPart.qtyReceived - inputPart.qtyAccepted}
                  name="qtyRejected"
                  readOnly
                />
              </div>
              <div className="col-md-8 "></div>
            </div>

            <div className="row justify-content-center mt-3 mb-4">
              <button
                className="button-style "
                style={{ width: "155px" }}
                disabled={boolVal4}
                onClick={deleteButtonState}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpenButtonDraftPartList;
