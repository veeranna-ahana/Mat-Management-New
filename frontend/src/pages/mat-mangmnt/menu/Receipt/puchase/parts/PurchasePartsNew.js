import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import CreateYesNoModal from "../../../../components/CreateYesNoModal";
import DeleteSerialYesNoModal from "../../../../components/DeleteSerialYesNoModal";
import DeleteRVModal from "../../../../components/DeleteRVModal";
import BootstrapTable from "react-bootstrap-table-next";
import Table from "react-bootstrap/Table";
import { formatDate } from "../../../../../../utils";

const { getRequest, postRequest } = require("../../../../../api/apiinstance");
const { endpoints } = require("../../../../../api/constants");

function PurchasePartsNew() {
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
  //const [boolVal4, setBoolVal4] = useState(false);

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

  let [formHeader, setFormHeader] = useState({
    rvId: "",
    receiptDate: "", //formatDate(new Date(), 4), //currDate, //.split("/").reverse().join("-"),
    rvNo: "Draft",
    rvDate: "", //currDate, //.split("/").reverse().join("-"),
    status: "Created",
    customer: "0000",
    customerName: "",
    reference: "",
    weight: "0",
    calcWeight: "0",
    type: "Parts",
    address: "",
  });

  async function fetchCustData() {
    getRequest(endpoints.getCustomers, (data) => {
      setCustdata(data);

      const found = data.find((obj) => obj.Cust_Code == 0);
      //setCustDetailVal(found.Address);

      setFormHeader((preValue) => {
        //console.log(preValue)
        return {
          ...preValue,
          customerName: found.Cust_name,
          customer: found.Cust_Code,
          address: found.Address,
        };
      });
    });
    //console.log("data = ", custdata);

    //fetch part
    getRequest(endpoints.getCustBomList, (data) => {
      const foundPart = data.filter((obj) => obj.Cust_code == 0);
      setMtrlDetails(foundPart);
    });
  }

  useEffect(() => {
    fetchCustData();
    //setPartArray(partArray);
  }, []); //[inputPart]);

  /*  let changeCustomer = async (e) => {
    e.preventDefault();
    const { value, name } = e.target;

    const found = custdata.find((obj) => obj.Cust_Code === value);
    //setCustDetailVal(found.Address);

    setFormHeader((preValue) => {
      //console.log(preValue)
      return {
        ...preValue,
        [name]: value,
        customerName: found.Cust_name,
        customer: found.Cust_Code,
        address: found.Address,
      };
    });
    //fetchMtrlData();

    //const foundPart = mtrlDetails.filter((obj) => obj.Cust_code == value);
    //setMtrlDetails(foundPart);
    getRequest(endpoints.getCustBomList, (data) => {
      const foundPart = data.filter((obj) => obj.Cust_code == value);
      setMtrlDetails(foundPart);
    });
  };
*/
  const columns = [
    {
      text: "#",
      dataField: "id",
      hidden: true,
    },
    {
      text: "Part Id",
      dataField: "partId",
      headerStyle: { whiteSpace: "nowrap" },
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
      if (data.affectedRows !== 0) {
      } else {
        toast.error("Record Not Updated");
      }
    });

    const newArray = partArray.map((p) =>
      //p.id === "d28d67b2-6c32-4aae-a7b6-74dc985a3cff"
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
    setCalcWeightVal(parseFloat(totwt).toFixed(2));
  };

  //add new part
  let { partId, unitWeight, qtyReceived, qtyAccepted, qtyRejected } = inputPart;
  //let id = uuid();
  const addNewPart = (e) => {
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

    // console.log("partarray = ", partArray);

    //insert blank row in table
    postRequest(endpoints.insertPartReceiptDetails, inputPart, (data) => {
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
        setInputPart(inputPart);
      } else {
        toast.error("Record Not Inserted");
      }
    });

    //console.log("after = ", partArray);
  };

  const deleteButtonState = () => {
    setModalOpen(true);
  };
  //delete part
  const handleDelete = () => {
    //minus calculated weight
    // console.log("partarray = ", partArray);
    console.log("id = ", inputPart.id);

    postRequest(endpoints.deletePartReceiptDetails, inputPart, (data) => {
      if (data.affectedRows !== 0) {
        const newArray = partArray.filter(
          (p) =>
            //p.id === "d28d67b2-6c32-4aae-a7b6-74dc985a3cff"
            p.id !== inputPart.id
        );
        setPartArray(newArray);
        toast.success("Material Deleted");
      }
    });

    //cal weight
    let totwt = 0;
    partArray.map((obj) => {
      totwt =
        parseFloat(totwt) +
        parseFloat(obj.unitWeight) * parseFloat(obj.qtyReceived);
      //console.log(newWeight);
    });
    setCalcWeightVal(parseFloat(totwt).toFixed(2));
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
        unitWeight: row.unitWeight,
        qtyAccepted: row.qtyAccepted,
        qtyRejected: row.qtyRejected,
        qtyReceived: row.qtyReceived,
      });
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

  const insertHeaderFunction = () => {
    //to save data
    postRequest(
      endpoints.insertHeaderMaterialReceiptRegister,
      formHeader,
      (data) => {
        //console.log("data = ", data);
        if (data.affectedRows !== 0) {
          setFormHeader((preValue) => {
            return {
              ...preValue,
              rvId: data.insertId,
            };
          });
          setSaveUpdateCount(saveUpdateCount + 1);
          toast.success("Record Saved Successfully");
          //enable part section and other 2 buttons
          setBoolVal1(false);
        } else {
          toast.error("Record Not Inserted");
        }
      }
    );
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

  const saveButtonState = async (e) => {
    e.preventDefault();
    if (formHeader.customer.length == 0) {
      toast.error("Please Select Customer");
    } else if (formHeader.reference.length === 0) {
      toast.error("Please Enter Customer Document Material Reference");
    } else {
      if (saveUpdateCount == 0) {
        formHeader.receiptDate = formatDate(new Date(), 4);
        formHeader.rvDate = currDate;
        setFormHeader(formHeader);
        await delay(500);

        insertHeaderFunction();
        setBoolVal2(true);
      } else {
        //to update data
        updateHeaderFunction();
      }
    }
  };
  console.log("formheader", formHeader);

  const allotRVButtonState = (e) => {
    e.preventDefault();

    if (partArray.length === 0) {
      toast.error("Add Details Before Saving");
    } else if (
      partArray.length !== 0 &&
      (formHeader.weight == 0.0 ||
        formHeader.weight == "0" ||
        formHeader.weight === null ||
        formHeader.weight === undefined)
    ) {
      toast.error(
        "Enter the Customer Material Weight as per Customer Document"
      );
    } else {
      // show model form

      let flag1 = 0;
      for (let i = 0; i < partArray.length; i++) {
        if (
          partArray[i].partId == "" ||
          partArray[i].unitWeight == "" ||
          partArray[i].qtyReceived == "" ||
          partArray[i].qtyAccepted == ""
        ) {
          flag1 = 1;
        }
        if (partArray[i].qtyAccepted > partArray[i].qtyReceived) {
          flag1 = 2;
          console.log("Setting flag1 to 2");
        }
      }
      if (flag1 == 1) {
        toast.error("Please fill correct Part details");
      } else if (flag1 === 2) {
        toast.error("QtyAccepted should be less than or equal to QtyReceived");
      } else {
        //show model form
        setShow(true);
      }
    }
    // if (formHeader.weight == "0") {
    //   toast.error(
    //     "Enter the Customer Material Weight as per Customer Document"
    //   );
    // } else {
    //   //show model form
    //   setShow(true);
    // }

    // ADDED POPUP FOR ALLOTRVNO
    // if (partArray.length === 0) {
    //   toast.error("Add Details Before Saving");
    // } else {
    //   setShow(true);
    // }
  };

  const allotRVYesButton = (data) => {
    //console.log("data = ", formHeader);
    setFormHeader(data);
    //console.log("formheader = ", formHeader);
    setBoolVal4(true);

    //window.location.reload();
    //nav("/MaterialManagement/Receipt/Purchase/Parts/New");
    //console.log("formheader = ", formHeader);
    //formHeader = data;
    //formHeader.rvNo = data.rvNo;
    //setFormHeader(formHeader);

    /*setFormHeader((preValue) => {
      return {
        ...preValue,
        rvNo: data.rvNo,
      };
    });*/

    //console.log("formHeader = ", formHeader);
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
          nav("/MaterialManagement/Receipt/Purchase/Parts/New", {
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
              type="text"
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
              {custdata.map((customer, index) =>
                customer.Cust_Code == 0 ? (
                  <option key={index} value={customer.Cust_Code}>
                    {customer.Cust_name}
                  </option>
                ) : (
                  ""
                )
              )}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Reference</label>
            <input
              type="text"
              name="reference"
              value={formHeader.reference}
              onChange={InputHeaderEvent}
              disabled={boolVal2 & boolVal4}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Calculated Weight</label>
            <input
              type="text"
              name="calculatedWeight"
              value={calcWeightVal}
              readOnly
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 justify-content-center">
            <button
              className="button-style"
              // style={{ width: "196px" }}
              style={{ marginLeft: "60px" }}
              onClick={saveButtonState}
              disabled={boolVal4}
            >
              Save
            </button>
            <button
              className="button-style"
              style={{ width: "196px" }}
              disabled={boolVal1 | boolVal4}
              onClick={allotRVButtonState}
            >
              Allot RV No
            </button>
            <button
              className="button-style"
              style={{ width: "196px" }}
              disabled={boolVal1 | boolVal4}
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
        {/*<div className="col-md-6 col-sm-12">
           <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Part Id</th>
                <th>Unit Wt</th>
                <th>Qty Received</th>
                <th>Qty Accepted</th>
                <th>Qty Rejected</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {partArray.map((part, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{part.partId}</td>
                  <td>{part.unitWeight}</td>
                  <td>{part.qtyReceived}</td>
                  <td>{part.qtyAccepted}</td>
                  <td>{part.qtyRejected}</td>
                  <td>
                    <button
                      className="btn btn-danger form-control"
                      onClick={() => handleDelete(part.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> 
        </div>*/}
        <div className="col-md-4 col-sm-12">
          <div className="ip-box form-bg">
            <div className="row justify-content-center mt-2 mb-3">
              <button
                className="button-style "
                style={{ width: "155px" }}
                onClick={addNewPart}
                disabled={boolVal1 | boolVal4}
              >
                Add New
              </button>
            </div>
            <div className="row">
              <div className="col-md-4 ">
                <label className="form-label mt-1">Part ID</label>
              </div>
              <div className="col-md-8">
                <select
                  className="ip-select dropdown-field"
                  name="partId"
                  value={inputPart.partId}
                  onChange={changePartHandle}
                  disabled={boolVal3 | boolVal4}
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
              </div>
              <div className="col-md-4">
                <label className="form-label mt-1">Unit Wt</label>
              </div>
              <div className="col-md-8 ">
                <input
                  className="in-field"
                  type="text"
                  name="unitWeight"
                  value={inputPart.unitWeight}
                  onChange={changePartHandle}
                  //onKeyUp={changePartHandle1}
                  disabled={boolVal3 | boolVal4}
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
                  type="text"
                  name="qtyReceived"
                  //value={tempVal}
                  value={inputPart.qtyReceived}
                  onChange={changePartHandle}
                  disabled={boolVal3 | boolVal4}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label mt-1">QtyAccepted</label>
              </div>
              <div className="col-md-8 ">
                <input
                  className="in-field"
                  type="text"
                  name="qtyAccepted"
                  value={inputPart.qtyAccepted}
                  onChange={changePartHandle}
                  disabled={boolVal3 | boolVal4}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <label className="form-label mt-1">QtyRejected</label>
              </div>
              <div className="col-md-8 ">
                <input
                  className="in-field"
                  type="text"
                  value={inputPart.qtyReceived - inputPart.qtyAccepted}
                  name="qtyRejected"
                  readOnly
                />
              </div>
            </div>

            <div className="row justify-content-center mt-3 mb-4">
              <button
                className="button-style "
                style={{ width: "155px" }}
                disabled={boolVal3 | boolVal4}
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

export default PurchasePartsNew;
