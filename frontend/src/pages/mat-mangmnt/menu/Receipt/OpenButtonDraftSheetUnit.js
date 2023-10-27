import React, { useEffect, useState } from "react";
import { formatDate, getWeight } from "../../../../utils";
import { toast } from "react-toastify";
import CreateYesNoModal from "../../components/CreateYesNoModal";
import DeleteSerialYesNoModal from "../../components/DeleteSerialYesNoModal";
import DeleteRVModal from "../../components/DeleteRVModal";
import { useNavigate } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import { useLocation } from "react-router-dom";

const { getRequest, postRequest } = require("../../../api/apiinstance");
const { endpoints } = require("../../../api/constants");

function OpenButtonDraftSheetUnit(props) {
  const location = useLocation();
  // console.log("location.state", location?.state?.type);

  const nav = useNavigate();
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const [show, setShow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteRvModalOpen, setDeleteRvModalOpen] = useState(false);
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
  //after clicking inspected checkbox
  const [boolVal5, setBoolVal5] = useState(false);

  //after clicking alllotrv enable add to stock / remove stock
  const [boolVal6, setBoolVal6] = useState(true);
  const [boolVal7, setBoolVal7] = useState(true);

  //falg for add to stock and remove stock
  const [boolValStock, setBoolValStock] = useState("off");

  // enable add to stock / remove stock
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // inspected checkbox
  const [boolVal8, setBoolVal8] = useState(false);

  //after selecting material disable dynamic para 1 2 3
  const [boolPara1, setBoolPara1] = useState(false);
  const [boolPara2, setBoolPara2] = useState(false);
  const [boolPara3, setBoolPara3] = useState(false);

  const [insCheck, setInsCheck] = useState(false);
  const [calcWeightVal, setCalcWeightVal] = useState(0);
  const [saveUpdateCount, setSaveUpdateCount] = useState(0);

  const [rmvBtn, setRmvBtn] = useState(false);
  const [addBtn, setAddBtn] = useState(false);

  const [mtrlArray, setMtrlArray] = useState([]);
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

  //const [mtrlArray, setMtrlArray] = useState([]);
  let [para1Label, setPara1Label] = useState("Para 1");
  let [para2Label, setPara2Label] = useState("Para 2");
  let [para3Label, setPara3Label] = useState("Para 3");

  const [unitLabel1, setUnitLabel1] = useState("");
  const [unitLabel2, setUnitLabel2] = useState("");
  const [unitLabel3, setUnitLabel3] = useState("");

  let [custdata, setCustdata] = useState([]);
  let [mtrlDetails, setMtrlDetails] = useState([]);
  let [locationData, setLocationData] = useState([]);

  const [partUniqueId, setPartUniqueId] = useState();
  const [materialArray, setMaterialArray] = useState([]);
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
      dataField: "dynamicPara1",
    },
    {
      text: unitLabel2 !== "" ? para2Label : "",
      dataField: "dynamicPara2",
    },
    {
      text: unitLabel3 !== "" ? para3Label : "",
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
            <input type="checkbox" checked={row.inspected} />
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
            <input type="checkbox" checked={row.updated == 1 ? true : false} />
          </lable>
        </div>
      ),
    },
  ];

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

      // console.log("data = ", data);
      //data.ReceiptDate = formatDate(new Date(data.ReceiptDate), 4);
      //data.RV_Date = formatDate(new Date(data.RV_Date), 3);
      //setFormHeader(formHeader);

      //get customer details for address
      // getRequest(endpoints.getCustomers, (data1) => {
      //   const found = data1.find((obj) => obj.Cust_Code === data.Cust_Code);
      //   data.address = found.Address;
      //   console.log("data.address", data.address);
      //   setFormHeader(formHeader);
      //   setCalcWeightVal(data.TotalCalculatedWeight);
      // });

      getRequest(endpoints.getCustomers, (data1) => {
        const found = data1.find((obj) => obj.Cust_Code === data.Cust_Code);
        formHeader.address = found.Address;
        console.log("formHeader.address", formHeader.address);
        setFormHeader(formHeader);
        setCalcWeightVal(data.TotalCalculatedWeight);
      });
      //get material details
      const url1 =
        endpoints.getMtrlReceiptDetailsByRvID + "?id=" + location.state.id;
      getRequest(url1, (data2) => {
        console.log("data2  = ", data2);
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
          obj.upDated = obj.UpDated;
          obj.qtyAccepted = obj.QtyAccepted;
          obj.qtyReceived = obj.QtyReceived;
          obj.qtyRejected = obj.QtyRejected;
          obj.qtyUsed = obj.QtyUsed;
          obj.qtyReturned = obj.QtyReturned;
        });
        // console.log("data 2 = ", data2);
        setMaterialArray(data2);
        //find shape of material
        // console.log("data2 = ", data2);
        for (let i = 0; i < data2.length; i++) {
          const url2 =
            endpoints.getRowByMtrlCode + "?code=" + data2[i].Mtrl_Code;
          getRequest(url2, (data3) => {
            console.log("data3 = ", data3);

            if (data3.Shape === "Block") {
              setPara1Label("Length");
              setPara2Label("Width");
              setPara3Label("Height");
              setUnitLabel1("mm");
              setUnitLabel2("mm");
              setUnitLabel3("mm");
            } else if (data3.Shape === "Plate") {
              setPara1Label("Length");
              setPara2Label("Width");
              // setPara3Label("");
              setUnitLabel1("mm");
              setUnitLabel2("mm");
              // setUnitLabel3("");
            } else if (data3.Shape === "Sheet") {
              setPara1Label("Width");
              setPara2Label("Length");
              // setPara3Label("");
              setUnitLabel1("mm");
              setUnitLabel2("mm");
              // setUnitLabel3("");
            } else if (data3.Shape === "Tiles") {
              setPara1Label("");
              setPara2Label("");
              setPara3Label("");
              setUnitLabel1("");
              setUnitLabel2("");
              setUnitLabel3("");
            } else if (data3.Shape.includes("Tube")) {
              setPara1Label("Length");
              setPara2Label("");
              setPara3Label("");
              setUnitLabel1("mm");
              setUnitLabel2("");
              setUnitLabel3("");
            } else if (data3.Shape.includes("Units")) {
              setPara1Label("Qty(Nos)");
              setPara2Label("");
              setPara3Label("");
              setUnitLabel1("Nos");
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

    /*getRequest(endpoints.getCustomers, (data) => {
      setCustdata(data);
    });*/
    getRequest(endpoints.getMaterialLocationList, (data) => {
      setLocationData(data);
    });
    getRequest(endpoints.getMtrlData, (data) => {
      setMtrlDetails(data);
    });
    //console.log("data = ", custdata);
    await delay(500);
    // console.log("para1 label = ", para1Label);
  }

  useEffect(() => {
    fetchData();
    addNewMaterial();
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

    // getRequest(endpoints.getCustBomList, (data) => {
    //   const foundPart = data.filter((obj) => obj.Cust_code == value);
    //   setMtrlDetails(foundPart);
    // });
  };*/
  let changeMtrl = async (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    //console.log("value = ", value);
    mtrlDetails.map((material) => {
      if (material.Mtrl_Code === value) {
        //update the mtrl_data related columns
        let url1 = endpoints.getRowByMtrlCode + "?code=" + value;
        getRequest(url1, async (mtrlData) => {
          // console.log("mtrldata = ", mtrlData);
          inputPart.material = mtrlData.Mtrl_Type;
          inputPart.shapeMtrlId = mtrlData.ShapeMtrlID;
          let url2 = endpoints.getRowByShape + "?shape=" + mtrlData.Shape;
          getRequest(url2, async (shapeData) => {
            // console.log("shapedata = ", shapeData);
            inputPart.shapeID = shapeData.ShapeID;
            setInputPart(inputPart);
          });
        });

        // console.log("1st inputPart", inputPart);

        // if (shape !== null && shape !== undefined && shape !== material.Shape) {
        //   toast.error("Please select a same type of part");
        // }
        console.log("material.Shape", material.Shape);

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
          // setPara3Label("");
          setBoolPara1(false);
          setBoolPara2(false);
          // setBoolPara3(true);
          setUnitLabel1("mm");
          setUnitLabel2("mm");
          // setUnitLabel3("");
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
        } else if (material.Shape.includes("Tube")) {
          setPara1Label("Length"); //mm
          setPara2Label("");
          setPara3Label("");
          setBoolPara1(false);
          setBoolPara2(true);
          setBoolPara3(true);
          setUnitLabel1("mm");
          setUnitLabel2("");
          setUnitLabel3("");
        } else if (material.Shape.includes("Cylinder")) {
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
      }
    });
    //set inputPart set material code
    setInputPart((preValue) => {
      //console.log(preValue)
      return {
        ...preValue,
        [name]: value,
      };
    });

    inputPart[name] = value;
    setInputPart(inputPart);

    // console.log("2nd inputPart update = ", inputPart);

    await delay(500);
    //update database row
    postRequest(endpoints.updateMtrlReceiptDetails, inputPart, (data) => {
      if (data.affectedRows !== 0) {
      } else {
        toast.error("Record Not Updated");
      }
    });

    //update table grid
    const newArray = materialArray.map((p) =>
      //p.id === "d28d67b2-6c32-4aae-a7b6-74dc985a3cff"
      p.id === partUniqueId
        ? {
            ...p,
            [name]: value,
          }
        : p
    );
    setMaterialArray(newArray);
  };

  // let changeLocation = async (e) => {
  //   e.preventDefault();
  //   const { value, name } = e.target;

  //   //update input Array set material code
  //   setInputPart((preValue) => {
  //     //console.log(preValue)
  //     return {
  //       ...preValue,
  //       [name]: value,
  //     };
  //   });
  //   inputPart[name] = value;
  //   setInputPart(inputPart);

  //   //update databse row
  //   postRequest(endpoints.updateMtrlReceiptDetails, inputPart, (data) => {
  //     if (data.affectedRows !== 0) {
  //     } else {
  //       toast.error("Record Not Updated");
  //     }
  //   });

  //   //update table grid
  //   const newArray = materialArray.map((p) =>
  //     //p.id === "d28d67b2-6c32-4aae-a7b6-74dc985a3cff"
  //     p.id === partUniqueId
  //       ? {
  //           ...p,
  //           [name]: value,
  //         }
  //       : p
  //   );
  //   setMaterialArray(newArray);
  // };

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
    } else if (formHeader.reference.length == 0)
      toast.error("Please Enter Customer Document Material Reference");
    else {
      if (saveUpdateCount == 0) {
        formHeader.receiptDate = formatDate(new Date(), 4);
        formHeader.rvDate = currDate;
        setFormHeader(formHeader);
        await delay(500);
        // insertHeaderFunction();
        updateHeaderFunction();
        // toast.success("Record Updated Successfully");
        setBoolVal2(true);
      } else {
        // console.log("part array = ", materialArray);
        let flag1 = 0;
        for (let i = 0; i < materialArray.length; i++) {
          if (
            materialArray[i].mtrlCode == "" ||
            materialArray[i].locationNo == "" ||
            materialArray[i].qtyReceived == "" ||
            materialArray[i].qtyAccepted == ""
          ) {
            flag1 = 1;
          }
        }
        if (flag1 == 1) {
          toast.error("Please fill correct Material details");
        } else {
          //to update data
          updateHeaderFunction();
          toast.success("Record Updated Successfully");
        }
      }
    }
  };
  // console.log("part arrayyyyyy = ", materialArray);
  console.log("formheader.... = ", formHeader);
  const allotRVButtonState = (e) => {
    e.preventDefault();

    if (materialArray.length === 0) {
      toast.error("Add Details Before Saving");
    } else if (
      materialArray.length !== 0 &&
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
      for (let i = 0; i < materialArray.length; i++) {
        if (materialArray[i].mtrlCode == "") {
          flag1 = 1;
          break;
        }

        if (
          materialArray[i].dynamicPara1 == "" ||
          materialArray[i].dynamicPara1 == "0" ||
          materialArray[i].dynamicPara1 == 0.0
        ) {
          flag1 = 2;
          // console.log("Setting flag1 to 2");
          break;
        }

        if (
          materialArray[i].qtyReceived === "" ||
          materialArray[i].qtyReceived === "0" ||
          materialArray[i].qtyReceived === 0.0 ||
          materialArray[i].qtyReceived === undefined
        ) {
          flag1 = 3;
          // console.log("Setting flag1 to 3");
        }

        if (
          materialArray[i].qtyAccepted == "" ||
          materialArray[i].qtyAccepted == "0" ||
          materialArray[i].qtyAccepted == 0.0 ||
          materialArray[i].qtyAccepted === undefined
        ) {
          flag1 = 4;
          // console.log("Setting flag1 to 4");
        }

        if (materialArray[i].locationNo == "") {
          flag1 = 5;
          // console.log("Setting flag1 to 5");
        }
        if (materialArray[i].qtyAccepted > materialArray[i].qtyReceived) {
          flag1 = 6;
          // console.log("Setting flag1 to 6");
        }
      }

      // console.log("flag1 value:", flag1);

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
    //console.log("data = ", formHeader);
    await delay(500);
    setFormHeader(data);
    setBoolVal4(true);
    setBoolVal6(false);
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
          nav(
            "/MaterialManagement/Receipt/CustomerJobWork/SheetsAndOthers/New",
            {
              replace: true,
            }
          );
          window.location.reload();
        }
      }
    );
  };

  let {
    id,
    srl,
    mtrlCode,
    dynamicPara1,
    dynamicPara2,
    dynamicPara3,
    qty,
    inspected,
    locationNo,
    upDated,
  } = inputPart;

  const addNewMaterial = (e) => {
    setBoolVal3(false);

    //clear all part fields
    inputPart.rvId = formHeader.rvId;
    inputPart.srl = "01";
    inputPart.custCode = formHeader.customer;
    inputPart.mtrlCode = "";
    inputPart.material = "";
    inputPart.shapeMtrlId = 0;
    inputPart.shapeID = 0;
    inputPart.dynamicPara1 = 0.0;
    inputPart.dynamicPara2 = 0.0;
    inputPart.dynamicPara3 = 0.0;
    inputPart.qty = 0.0;
    inputPart.inspected = 0;
    inputPart.accepted = 0.0;
    inputPart.totalWeightCalculated = 0.0;
    inputPart.totalWeight = 0.0;
    inputPart.locationNo = "";
    inputPart.updated = 0;
    inputPart.qtyAccepted = 0.0;
    inputPart.qtyReceived = 0.0;
    inputPart.qtyRejected = 0.0;
    inputPart.qtyUsed = 0.0;
    inputPart.qtyReturned = 0.0;

    //uncheck inspected
    setInsCheck(false);
    inputPart.inspected = 0;
    setBoolVal5(false);
    console.log("inputPart = ", inputPart);
    //insert blank row in table
    postRequest(endpoints.insertMtrlReceiptDetails, inputPart, (data) => {
      if (data.affectedRows !== 0) {
        //toast.success("Record added");
        let id = data.insertId;
        inputPart.id = id;
        // inputPart.dynamicPara1 = "";
        // inputPart.dynamicPara2 = "";
        // inputPart.dynamicPara3 = "";

        //count total record in material Array
        let count = materialArray.length + 1;
        srl = "0" + count;
        inputPart.srl = srl;

        //set inserted id
        setPartUniqueId(id);
        let newRow = {
          id: id,
          srl: srl,
          mtrlCode: "",
          dynamicPara1: "",
          dynamicPara2: "",
          dynamicPara3: "",
          qty: "",
          inspected: "",
          locationNo: "",
          updated: "",
        };
        //setPartArray(newRow);
        setMaterialArray([...materialArray, newRow]);

        // setMaterialArray([
        //   ...materialArray,
        //   {
        //     id,
        //     srl,
        //     mtrlCode,
        //     dynamicPara1,
        //     dynamicPara2,
        //     dynamicPara3,
        //     qty,
        //     inspected,
        //     locationNo,
        //     upDated,
        //   },
        // ]);

        setInputPart(inputPart);
      } else {
        toast.error("Record Not Inserted");
      }
    });

    //console.log("after = ", partArray);
  };

  // console.log("3rd inputPart", inputPart);
  const deleteButtonState = () => {
    setModalOpen(true);
  };
  //delete part
  const handleDelete = () => {
    if (inputPart?.id?.length === 0) {
      toast.error("Select Material");
    } else {
      //console.log("id = ", inputPart.id);
      // console.log("input part = ", inputPart);
      postRequest(endpoints.deleteMtrlReceiptDetails, inputPart, (data) => {
        if (data.affectedRows !== 0) {
          const newArray = materialArray.filter(
            (p) =>
              //p.id === "d28d67b2-6c32-4aae-a7b6-74dc985a3cff"
              p.id !== inputPart.id
          );
          setMaterialArray(newArray);
          toast.success("Material Deleted");
        }
      });

      //get mtrl_data by mtrl_code
      let url = endpoints.getRowByMtrlCode + "?code=" + inputPart.mtrlCode;
      getRequest(url, async (data) => {
        let totwt = 0;
        materialArray.map((obj) => {
          totwt =
            parseFloat(totwt) +
            (parseFloat(obj.qtyAccepted) *
              getWeight(
                data,
                parseFloat(obj.dynamicPara1),
                parseFloat(obj.dynamicPara2),
                parseFloat(obj.dynamicPara3)
              )) /
              (1000 * 1000);
        });
        setCalcWeightVal(parseFloat(totwt).toFixed(2));
      });
    }
  };

  const changeMaterialHandle = async (e, id) => {
    // console.log("materialArray..........", materialArray);
    const { value, name } = e.target;
    // console.log("eventvalue....", e.target.value, "id....", id);
    for (let i = 0; i < materialArray.length; i++) {
      const element = materialArray[i];

      if (element.id === id) {
        element[name] = value;

        // console.log("element..................", element);
      }
    }
    // setInputPart((preValue) => {
    //   //console.log(preValue)
    //   return {
    //     ...preValue,
    //     [name]: value,
    //   };
    // });
    // inputPart[name] = value;
    //inputPart.custCode = formHeader.customer;
    //inputPart.rvId = formHeader.rvId;
    inputPart[name] = value;
    //checkbox update
    if (name === "inspected") {
      if (e.target.checked) {
        inputPart.inspected = true;
        setBoolVal5(true);
        setInsCheck(true);
      } else {
        inputPart.inspected = false;
        setBoolVal5(false);
        setInsCheck(false);
      }
    }
    if (name === "qtyReceived") {
      // setInsCheck(false);
      setBoolVal5(false);
      setInsCheck(false);
      inputPart.inspected = false;
      inputPart.qtyAccepted = 0;
    }
    // if (materialArray[0].qty <= 0) {
    //   setBoolVal8(false);
    // } else {
    //   setBoolVal8(true);
    // }

    setInputPart(inputPart);
    // console.log("4th inputPart", inputPart);

    //calculate weight
    if (name === "qtyAccepted") {
      if (e.target.value) {
        let val = e.target.value;
        //get mtrl_data by mtrl_code
        let url = endpoints.getRowByMtrlCode + "?code=" + inputPart.mtrlCode;
        getRequest(url, async (data) => {
          //setCustdata(data);
          let TotalWeightCalculated =
            parseFloat(inputPart.qtyAccepted) *
            getWeight(
              data,
              parseFloat(inputPart.dynamicPara1),
              parseFloat(inputPart.dynamicPara2),
              parseFloat(inputPart.dynamicPara3)
            );

          TotalWeightCalculated = TotalWeightCalculated / (1000 * 1000);
          inputPart.totalWeightCalculated = parseFloat(
            TotalWeightCalculated
          ).toFixed(2);
          inputPart.totalWeight = parseFloat(TotalWeightCalculated).toFixed(2);
          inputPart["TotalWeightCalculated"] = TotalWeightCalculated;
          inputPart["TotalWeight"] = TotalWeightCalculated;
          setInputPart(inputPart);

          //update forheader in database
          postRequest(
            endpoints.updateHeaderMaterialReceiptRegister,
            formHeader,
            (data) => {}
          );

          //update material array:
          const newArray = materialArray.map((p) =>
            //p.id === "d28d67b2-6c32-4aae-a7b6-74dc985a3cff"
            p.id === partUniqueId
              ? {
                  ...p,
                  [name]: value,
                  qty: inputPart.qtyReceived,
                  // inspected: inputPart.inspected,
                }
              : p
          );
          setMaterialArray(newArray);
          // console.log("material array = ", materialArray);
          await delay(500);

          //find calculateweight
          let totwt = 0;
          materialArray.map((obj) => {
            if (obj.id === partUniqueId) {
              totwt =
                parseFloat(totwt) +
                (parseFloat(value) *
                  getWeight(
                    data,
                    parseFloat(obj.dynamicPara1),
                    parseFloat(obj.dynamicPara2),
                    parseFloat(obj.dynamicPara3)
                  )) /
                  (1000 * 1000);
            } else {
              totwt =
                parseFloat(totwt) +
                (parseFloat(obj.qtyAccepted) *
                  getWeight(
                    data,
                    parseFloat(obj.dynamicPara1),
                    parseFloat(obj.dynamicPara2),
                    parseFloat(obj.dynamicPara3)
                  )) /
                  (1000 * 1000);
            }
            //parseFloat(obj.unitWeight) * parseFloat(obj.qtyReceived);
            //console.log(newWeight);
          });
          setCalcWeightVal(parseFloat(totwt).toFixed(2));
        });
        //inputPart[name] = value;
        //setInputPart(inputPart);

        // console.log("inputPart11 : ", inputPart);
      }
    }

    // console.log("5th inputPart", inputPart);
    const newArray = materialArray.map((p) =>
      //p.id === "d28d67b2-6c32-4aae-a7b6-74dc985a3cff"
      p.id === id
        ? {
            ...p,
            [name]: value,
            qty: inputPart.qtyReceived,
            inspected: inputPart.inspected,
          }
        : p
    );

    setMaterialArray(newArray);
    await delay(500);
    // debugger

    console.log("inputpart", inputPart);
    //update blank row with respected to modified part textfield
    postRequest(endpoints.updateMtrlReceiptDetailsAfter, inputPart, (data) => {
      if (data.affectedRows !== 0) {
      } else {
        toast.error("Record Not Updated");
      }
    });
    await delay(500);
  };

  // console.log("setMaterialArray...", materialArray);
  const selectRow = {
    mode: "radio",
    clickToSelect: true,
    bgColor: "#8A92F0",
    onSelect: (row, isSelect, rowIndex, e) => {
      console.log("Row = ", row);
      // console.log("Row = ", row.updated);
      // setIsButtonEnabled(row.updated === 1);
      // setInputPart(row);
      // updated = upDated;
      if (row.updated === 1) {
        setRmvBtn(true);
        setAddBtn(false);
      } else {
        setRmvBtn(false);
        setAddBtn(true);
      }

      const url1 = endpoints.getMtrlReceiptDetailsByID + "?id=" + row.id;
      getRequest(url1, async (data2) => {
        data2?.forEach((obj) => {
          obj.id = obj.Mtrl_Rv_id;
          obj.mtrlRvId = obj.Mtrl_Rv_id;
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
          obj.updated = obj.Updated;
          obj.qtyAccepted = obj.QtyAccepted;
          obj.qtyReceived = obj.QtyReceived;
          obj.qtyRejected = obj.QtyRejected;
          obj.qtyUsed = obj.QtyUsed;
          obj.qtyReturned = obj.QtyReturned;
        });
        setMtrlArray(data2);
        data2?.map(async (obj) => {
          if (obj.id == row.id) {
            setMtrlStock(obj);
            setInputPart({
              qtyAccepted: row.qtyAccepted,
              qtyRejected: obj.qtyRejected,
              qtyReceived: row.qtyReceived,
              id: row.id,
              srl: row.srl,
              mtrlCode: row.mtrlCode,
              dynamicPara1: row.dynamicPara1,
              dynamicPara2: row.dynamicPara2,
              dynamicPara3: row.dynamicPara3,
              qty: row.qty,
              inspected: row.inspected,
              locationNo: row.locationNo,
              updated: row.updated,
              accepted: obj.accepted,
              totalWeightCalculated: obj.totalWeightCalculated,
              totalWeight: row.totalWeight,
            });
          }
        });
      });

      // setInputPart({
      //   // id: row.id,
      //   // partId: row.partId,
      //   // unitWeight: row.unitWeight,
      //   // qtyAccepted: row.qtyAccepted,
      //   // qtyRejected: row.qtyRejected,
      //   // qtyReceived: row.qtyReceived,
      //   id: row.id,
      //   srl: row.srl,
      //   mtrlCode: row.mtrlCode,
      //   dynamicPara1: row.dynamicPara1,
      //   dynamicPara2: row.dynamicPara2,
      //   dynamicPara3: row.dynamicPara3,
      //   qty: row.qty,
      //   inspected: row.inspected,
      //   locationNo: row.locationNo,
      //   updated: row.updated,
      //   accepted: row.accepted,
      //   custCode: row.custCode,
      //   material: row.material,
      //   mtrlCode: row.mtrlCode,
      //   qtyAccepted: row.qtyAccepted,
      //   qtyRejected: row.qtyRejected,
      //   qtyReceived: row.qtyReceived,
      //   qtyUsed: row.qtyUsed,
      //   rvId: row.rvId,
      //   shapeID: row.shapeID,
      //   shapeMtrlId: row.shapeMtrlId,
      //   totalWeight: row.totalWeight,
      //   totalWeightCalculated: row.totalWeightCalculated,
      //   updated: row.updated,
      // });
    },
  };

  // console.log("asdfghjkjhgfdfgjkjvcvnjkjh", inputPart);

  // const changeMaterialHandle = async (e, id) => {
  //   const { value, name } = e.target;

  //   // console.log("eventvalue....", e.target.value, "id....", id);
  //   for (let i = 0; i < materialArray.length; i++) {
  //     const element = materialArray[i];

  //     if (element.id === id) {
  //       element[name] = value;

  //       // console.log("element..................", element);
  //     }
  //   }

  //   // setInputPart((preValue) => {
  //   //   //console.log(preValue)
  //   //   return {
  //   //     ...preValue,
  //   //     [name]: value,
  //   //   };
  //   // });
  //   // inputPart[name] = value;
  //   //inputPart.custCode = formHeader.customer;
  //   //inputPart.rvId = formHeader.rvId;

  //   //checkbox update
  //   if (name === "inspected") {
  //     if (e.target.checked) {
  //       inputPart.inspected = 1;
  //       setBoolVal5(true);
  //       setInsCheck(true);
  //     } else {
  //       inputPart.inspected = 0;
  //       setBoolVal5(false);
  //       setInsCheck(false);
  //     }
  //   }

  //   inputPart[name] = value;
  //   setInputPart(inputPart);
  //   //console.log(inputPart);

  //   //calculate weight
  //   if (name === "qtyAccepted") {
  //     if (e.target.value) {
  //       let val = e.target.value;
  //       //get mtrl_data by mtrl_code
  //       let url = endpoints.getRowByMtrlCode + "?code=" + inputPart.mtrlCode;
  //       getRequest(url, async (data) => {
  //         //setCustdata(data);
  //         console.log("weight", data);
  //         let TotalWeightCalculated =
  //           parseFloat(inputPart.qtyAccepted) *
  //           getWeight(
  //             data,
  //             parseFloat(inputPart.dynamicPara1),
  //             parseFloat(inputPart.dynamicPara2),
  //             parseFloat(inputPart.dynamicPara3)
  //           );

  //         console.log("TotalWeightCalculated", TotalWeightCalculated);

  //         TotalWeightCalculated = TotalWeightCalculated / (1000 * 1000);
  //         // console.log("TotalWeightCalculated", TotalWeightCalculated);

  //         inputPart.totalWeightCalculated = parseFloat(
  //           TotalWeightCalculated
  //         ).toFixed(2);

  //         inputPart.totalWeight = parseFloat(TotalWeightCalculated).toFixed(2);
  //         inputPart["TotalWeightCalculated"] = TotalWeightCalculated;
  //         inputPart["TotalWeight"] = TotalWeightCalculated;

  //         setInputPart(inputPart);
  //         console.log("formHeader", formHeader);
  //         //update forheader in database
  //         postRequest(
  //           endpoints.updateHeaderMaterialReceiptRegister,
  //           formHeader,
  //           (data) => {}
  //         );

  //         //update material array:
  //         const newArray = materialArray.map((p) =>
  //           //p.id === "d28d67b2-6c32-4aae-a7b6-74dc985a3cff"
  //           p.id === id
  //             ? {
  //                 ...p,
  //                 [name]: value,
  //                 //qty: inputPart.qtyReceived,
  //                 //inspected: inputPart.inspected,
  //               }
  //             : p
  //         );
  //         setMaterialArray(newArray);
  //         console.log("material array = ", materialArray);
  //         await delay(500);

  //         //find calculateweight
  //         let totwt = 0;
  //         materialArray.map((obj) => {
  //           if (obj.id === partUniqueId) {
  //             totwt =
  //               parseFloat(totwt) +
  //               (parseFloat(value) *
  //                 getWeight(
  //                   data,
  //                   parseFloat(obj.dynamicPara1),
  //                   parseFloat(obj.dynamicPara2),
  //                   parseFloat(obj.dynamicPara3)
  //                 )) /
  //                 (1000 * 1000);
  //           } else {
  //             totwt =
  //               parseFloat(totwt) +
  //               (parseFloat(obj.qtyAccepted) *
  //                 getWeight(
  //                   data,
  //                   parseFloat(obj.dynamicPara1),
  //                   parseFloat(obj.dynamicPara2),
  //                   parseFloat(obj.dynamicPara3)
  //                 )) /
  //                 (1000 * 1000);
  //           }
  //           //parseFloat(obj.unitWeight) * parseFloat(obj.qtyReceived);
  //           //console.log(newWeight);
  //         });
  //         setCalcWeightVal(parseFloat(totwt).toFixed(2));

  //         formHeader.calcWeight = parseFloat(totwt).toFixed(2);
  //         setFormHeader(formHeader);
  //         delay(500);
  //         console.log("form header = ", formHeader);
  //         //update calc weight in header
  //         postRequest(
  //           endpoints.updateHeaderMaterialReceiptRegister,
  //           formHeader,
  //           (data) => {
  //             if (data.affectedRows !== 0) {
  //             }
  //           }
  //         );
  //       });
  //       //inputPart[name] = value;
  //       //setInputPart(inputPart);

  //       //console.log("inputPart : ", inputPart);
  //     }
  //   }
  //   const newArray = materialArray.map((p) =>
  //     //p.id === "d28d67b2-6c32-4aae-a7b6-74dc985a3cff"
  //     p.id === id
  //       ? {
  //           ...p,
  //           [name]: value,
  //           qty: inputPart.qtyReceived,
  //           inspected: inputPart.inspected == "on" ? 1 : 0,
  //         }
  //       : p
  //   );

  //   setMaterialArray(newArray);
  //   await delay(500);

  //   // if (inputPart.qtyAccepted > inputPart.qtyReceived) {
  //   //   toast.error("QtyAccepted should be less than or equal to QtyReceived");
  //   // }

  //   // console.log("selectedRowss:", selectedRows);
  //   console.log("inputPart", inputPart);
  //   //update blank row with respected to modified part textfield
  //   postRequest(endpoints.updateMtrlReceiptDetails, inputPart, (data) => {
  //     if (data.affectedRows !== 0) {
  //     } else {
  //       toast.error("Record Not Updated");
  //     }
  //   });
  //   await delay(500);
  // };

  console.log("props...................", props);
  // console.log("inpurtpart.srl", inputPart.srl);
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
      // console.log("newrow = ", newRow);
      //console.log("before api");
      postRequest(endpoints.insertMtrlStockList, newRow, async (data) => {
        //console.log("data = ", data);
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
      //console.log("mtrlstock = ", mtrlStock);
      //console.log("before materialArray = ", materialArray);
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
      //update checkbox
      for (let i = 0; i < materialArray.length; i++) {
        if (materialArray[i].mtrlCode == mtrlStock.Mtrl_Code) {
          materialArray[i].updated = 1;
        }
      }
      await delay(500);
      setMaterialArray(materialArray);
      setInputPart({ ...inputPart, updated: 1 });
      //console.log("after materialArray = ", materialArray);
    }
  };
  // console.log("setMaterialArray", materialArray);
  const removeStock = () => {
    if (Object.keys(mtrlStock).length === 0) {
      toast.error("Please Select Material");
    } else {
      postRequest(endpoints.deleteMtrlStockByRVNo, formHeader, async (data) => {
        //console.log("data = ", data);
        if (data.affectedRows !== 0) {
          //enable remove stock buttons
          toast.success("Stock Removed Successfully");
          //setBoolVal2(false);
          //setBoolVal3(true);
          setBoolValStock("off");
          // setBoolVal6(false);
          // setBoolVal7(true);
          setAddBtn(true);
          setRmvBtn(false);

          //update checkbox
          for (let i = 0; i < materialArray.length; i++) {
            if (materialArray[i].mtrlCode == mtrlStock.Mtrl_Code) {
              materialArray[i].updated = 0;
            }
          }
          await delay(500);
          setMaterialArray(materialArray);
          setInputPart({ ...inputPart, updated: 0 });
        } else {
          toast.error("Stock Not Removed");
        }
      });
    }
  };

  const handleYes = () => {
    if (inputPart?.id?.length === 0) {
      toast.error("Select Material");
    } else {
      //console.log("id = ", inputPart.id);
      // console.log("input part = ", inputPart);
      postRequest(endpoints.deleteMtrlReceiptDetails, inputPart, (data) => {
        if (data.affectedRows !== 0) {
          const newArray = materialArray.filter(
            (p) =>
              //p.id === "d28d67b2-6c32-4aae-a7b6-74dc985a3cff"
              p.id !== inputPart.id
          );
          setMaterialArray(newArray);
          toast.success("Material Deleted");
          setInputPart({
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
            updated: "",
            qtyAccepted: 0,
            qtyReceived: 0,
            qtyRejected: 0,
            qtyUsed: 0,
            qtyReturned: 0,
          });
        }
      });

      //get mtrl_data by mtrl_code
      let url = endpoints.getRowByMtrlCode + "?code=" + inputPart.mtrlCode;
      getRequest(url, async (data) => {
        let totwt = 0;
        materialArray.map((obj) => {
          totwt =
            parseFloat(totwt) +
            (parseFloat(obj.qtyAccepted) *
              getWeight(
                data,
                parseFloat(obj.dynamicPara1),
                parseFloat(obj.dynamicPara2),
                parseFloat(obj.dynamicPara3)
              )) /
              (1000 * 1000);
        });
        setCalcWeightVal(parseFloat(totwt).toFixed(2));
      });
    }
    setModalOpen(false);
  };
  const handleRVYes = () => {
    deleteRVButtonState();
    setDeleteRvModalOpen(false);
  };
  // console.log("materialArray", materialArray);
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
              onChange={InputHeaderEvent}
              disabled={boolVal4}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            <label className="form-label">Customer</label>
            <select
              className="ip-select mt-1 "
              name="customer"
              disabled={true}
              //onChange={changeCustomer}
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
              style={{ marginLeft: "70px" }}
              onClick={saveButtonState}
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
          <div className="col-md-4 mb-3 mt-4">
            {/* <label className="form-label"></label> */}
            <textarea
              id="exampleFormControlTextarea1"
              rows="2"
              style={{ width: "400px", height: "40px" }}
              value={formHeader.address}
              readOnly
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 col-sm-12">
            <div style={{ height: "420px", overflowY: "scroll" }}>
              <BootstrapTable
                keyField="id"
                columns={columns}
                data={materialArray}
                striped
                hover
                condensed
                selectRow={selectRow}
                headerClasses="header-class tableHeaderBGColor"
              ></BootstrapTable>
            </div>

            {/* <div
              className="table-data"
              style={{ height: "480px", overflowY: "scroll" }}
            >
             <Tables theadData={getHeadings()} tbodyData={data3} />
            </div> */}
          </div>
          <div
            className="col-md-4 col-sm-12"
            style={{ overflowY: "scroll", height: "420px" }}
          >
            <div className="ip-box form-bg">
              <div className="row justify-content-center mt-2">
                <div className="col-md-6 col-sm-12">
                  <button
                    className="button-style "
                    style={{ width: "155px" }}
                    //onClick={addNewPart}
                    disabled={boolVal4}
                    onClick={addNewMaterial}
                  >
                    Add Serial
                  </button>
                </div>
                <div className="col-md-6 col-sm-12">
                  <button
                    className="button-style "
                    style={{ width: "155px" }}
                    disabled={boolVal3 | boolVal4}
                    onClick={deleteButtonState}
                  >
                    Delete Serial
                  </button>
                </div>
              </div>

              <div className="row  justify-content-center">
                <div className="col-md-6 col-sm-12">
                  <button
                    className="button-style "
                    style={{ width: "155px" }}
                    // disabled={
                    //   /*(props.type2 === "purchase" || props.type === "gas") &&
                    //   boolValStock === "off"
                    //     ? !boolVal4
                    //     : true*/
                    //   boolVal6
                    // }
                    disabled={rmvBtn | boolVal6}
                    onClick={addToStock}
                  >
                    Add to stock
                  </button>
                </div>
                <div className="col-md-6 col-sm-12">
                  <button
                    className="button-style "
                    style={{ width: "155px" }}
                    // disabled={
                    //   /*(props.type2 === "purchase" || props.type === "gas") &&
                    //   boolValStock === "on"
                    //     ? !boolVal4
                    //     : true*/
                    //   boolVal7
                    // }
                    disabled={addBtn | boolVal6}
                    onClick={removeStock}
                  >
                    Remove stock
                  </button>
                </div>
              </div>

              <div className="row">
                <div className="ip-box form-bg">
                  <p className="form-title-deco mt-2">
                    <h5>Serial Details</h5>
                  </p>
                  <div className="row">
                    <div className="col-md-3 ">
                      <label className="form-label">Part ID</label>
                    </div>
                    <div className="col-md-8" style={{ marginTop: "8px" }}>
                      <select
                        className="ip-select dropdown-field"
                        onChange={changeMtrl}
                        defaultValue={" "}
                        value={inputPart.mtrlCode}
                        name="mtrlCode"
                        disabled={boolVal3 | boolVal4 | boolVal5}
                      >
                        <option value="" disabled selected>
                          Select Material
                        </option>

                        {location?.state?.type === "sheets"
                          ? mtrlDetails.map((material, index) =>
                              (material.Shape !== "Units") &
                              (material.Shape !== "Cylinder") &
                              (material.Shape !== null) &
                              (material.Mtrl_Code !== "") ? (
                                <option key={index} value={material.Mtrl_Code}>
                                  {material.Mtrl_Code}
                                </option>
                              ) : (
                                ""
                              )
                            )
                          : location?.state?.type === "units"
                          ? mtrlDetails.map((material, index) =>
                              (material.Shape === "Units") &
                              //(material.Shape !== "Cylinder") &
                              (material.Shape !== null) &
                              (material.Mtrl_Code !== "") ? (
                                <option key={index} value={material.Mtrl_Code}>
                                  {material.Mtrl_Code}
                                </option>
                              ) : (
                                ""
                              )
                            )
                          : mtrlDetails.map((material, index) =>
                              (material.Shape !== null) &
                              (material.Mtrl_Code !== "") ? (
                                <option key={index} value={material.Mtrl_Code}>
                                  {material.Mtrl_Code}
                                </option>
                              ) : (
                                ""
                              )
                            )}
                      </select>
                    </div>
                  </div>
                  {!(boolVal3 || boolVal4 || boolPara1) && (
                    <div className="row mt-3">
                      <div className="col-md-3">
                        <label className="form-label">{para1Label}</label>
                      </div>
                      <div className="col-md-6 ">
                        <input
                          className="in-field"
                          name="dynamicPara1"
                          value={inputPart.dynamicPara1}
                          // disabled={boolVal3 | boolVal4 | boolPara1 | boolVal5}
                          disabled={boolVal5}
                          // onChange={changeMaterialHandle}

                          min="0"
                          onChange={(e) => {
                            changeMaterialHandle(e, inputPart.id);
                          }}
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label">{unitLabel1}</label>
                      </div>
                    </div>
                  )}

                  {!(boolVal3 || boolVal4 || boolPara2) && (
                    <div className="row">
                      <div className="col-md-3">
                        <label className="form-label">{para2Label}</label>
                      </div>
                      <div className="col-md-6">
                        <input
                          className="in-field"
                          name="dynamicPara2"
                          value={inputPart.dynamicPara2}
                          // onChange={changeMaterialHandle}

                          min="0"
                          onChange={(e) => {
                            changeMaterialHandle(e, inputPart.id);
                          }}
                          disabled={boolVal5}
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label">{unitLabel2}</label>
                      </div>
                    </div>
                  )}
                  {!(boolVal3 || boolVal4 || boolPara3) && (
                    <div className="row">
                      <div className="col-md-3">
                        <label className="form-label">{para3Label}</label>
                      </div>
                      <div className="col-md-6 ">
                        <input
                          className="in-field"
                          name="dynamicPara3"
                          value={inputPart.dynamicPara3}
                          // onChange={changeMaterialHandle}

                          min="0"
                          onChange={(e) => {
                            changeMaterialHandle(e, inputPart.id);
                          }}
                          disabled={boolVal5}
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label">{unitLabel3}</label>
                      </div>
                    </div>
                  )}

                  <p className="form-title-deco">
                    <h5>Quantity Details</h5>
                  </p>
                  <div className="row">
                    <div className="col-md-3 col-sm-12">
                      <label className="form-label mt-1">Received</label>
                    </div>
                    <div className="col-md-4 col-sm-12">
                      <input
                        className="in-field"
                        name="qtyReceived"
                        // defaultValue={0}
                        value={
                          (inputPart.qtyReceived = Math.floor(
                            inputPart.qtyReceived
                          ))
                        }
                        disabled={boolVal3 | boolVal4}
                        // onChange={changeMaterialHandle}

                        min="0"
                        onChange={(e) => {
                          changeMaterialHandle(e, inputPart.id);
                        }}
                      />
                    </div>
                    <div className="col-md-5 ">
                      <div
                        className="col-md-12 "
                        style={{ display: "flex", gap: "5px" }}
                      >
                        <input
                          // className="checkBoxStyle mt-2"
                          // type="checkbox"
                          className="form-check-input mt-3"
                          type="checkbox"
                          id="flexCheckDefault"
                          name="inspected"
                          // checked={insCheck}
                          checked={inputPart.inspected}
                          // checked={inputPart.inspected === "1" ? true : false}
                          disabled={boolVal3 | boolVal4}
                          // onChange={changeMaterialHandle}
                          min="0"
                          onChange={(e) => {
                            changeMaterialHandle(e, inputPart.id);
                          }}
                        />
                        <label className="form-label mt-1">Inspected</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 col-sm-12">
                      <label className="form-label mt-1">Accepted</label>
                    </div>
                    <div className="col-md-4 col-sm-12">
                      <input
                        className="in-field"
                        name="qtyAccepted"
                        // defaultValue={0}
                        value={
                          (inputPart.qtyAccepted = Math.floor(
                            inputPart.qtyAccepted
                          ))
                        }
                        disabled={boolVal3 | boolVal4 | !boolVal5}
                        // onChange={changeMaterialHandle}

                        min="0"
                        onChange={(e) => {
                          changeMaterialHandle(e, inputPart.id);
                        }}
                      />
                    </div>

                    <div className="col-md-5 ">
                      <div
                        className="col-md-12 "
                        style={{ display: "flex", gap: "5px" }}
                      >
                        <input
                          // className="checkBoxStyle mt-2"
                          // type="checkbox"
                          className="form-check-input mt-3"
                          type="checkbox"
                          id="flexCheckDefault"
                          name="updated"
                          checked={inputPart.updated === 1 ? true : false}
                          disabled={boolVal3 | boolVal4}
                          // disabled={boolVal}
                          onChange={changeMaterialHandle}
                        />
                        <label className="form-label mt-1">Updated</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label
                        className="form-label"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Wt Calculated 2
                      </label>
                    </div>
                    <div className="col-md-6">
                      <input
                        className="in-field"
                        name="totalWeightCalculated"
                        value={inputPart.totalWeightCalculated}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label">Weight</label>
                    </div>
                    <div className="col-md-6">
                      <input
                        className="in-field"
                        name="totalWeight"
                        value={inputPart.totalWeight}
                        onChange={changeMaterialHandle}
                        disabled={boolVal3 | boolVal4}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 ">
                      <label className="form-label">Location</label>
                    </div>
                    <div className="col-md-6 mt-1">
                      <select
                        className="ip-select dropdown-field"
                        // onChange={changeMaterialHandle}

                        min="0"
                        onChange={(e) => {
                          changeMaterialHandle(e, inputPart.id);
                        }}
                        value={inputPart.locationNo}
                        disabled={boolVal3 | boolVal4}
                        name="locationNo"
                      >
                        <option value="" disabled selected>
                          Select Location
                        </option>
                        {locationData.map((location, index) => (
                          <option key={index} value={location.LocationNo}>
                            {location.LocationNo}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* <div className="row justify-content-center mt-3 mb-4">
                    <button
                      className="button-style "
                      style={{ width: "155px" }}
                      disabled={boolVal3 | boolVal4}
                      onClick={deleteButtonState}
                    >
                      Delete Serial
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpenButtonDraftSheetUnit;
