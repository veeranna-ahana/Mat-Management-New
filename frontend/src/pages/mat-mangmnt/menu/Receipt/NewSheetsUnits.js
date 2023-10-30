import React, { useEffect, useState } from "react";
import { formatDate, getWeight } from "../../../../utils";
import { toast } from "react-toastify";
import CreateYesNoModal from "../../components/CreateYesNoModal";
import DeleteSerialYesNoModal from "../../components/DeleteSerialYesNoModal";
import DeleteRVModal from "../../components/DeleteRVModal";
import { useNavigate } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import { Typeahead } from "react-bootstrap-typeahead";

const { getRequest, postRequest } = require("../../../api/apiinstance");
const { endpoints } = require("../../../api/constants");

function NewSheetsUnits(props) {
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
  //falg for add to stock and remove stock
  const [boolValStock, setBoolValStock] = useState("off");

  //after selecting material disable dynamic para 1 2 3
  const [boolPara1, setBoolPara1] = useState(false);
  const [boolPara2, setBoolPara2] = useState(false);
  const [boolPara3, setBoolPara3] = useState(false);

  const [mtrlArray, setMtrlArray] = useState([]);
  const [checkboxState, setCheckboxState] = useState();
  const [mtrlStock, setMtrlStock] = useState({});
  //after clicking inspected checkbox
  const [boolVal5, setBoolVal5] = useState(false);

  //after clicking alllotrv enable add to stock / remove stock
  const [boolVal6, setBoolVal6] = useState(true);
  const [boolVal7, setBoolVal7] = useState(true);

  // enable add to stock / remove stock
  // const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [rmvBtn, setRmvBtn] = useState(false);
  const [addBtn, setAddBtn] = useState(false);

  const [insCheck, setInsCheck] = useState(false);
  const [calcWeightVal, setCalcWeightVal] = useState(0);
  const [saveUpdateCount, setSaveUpdateCount] = useState(0);
  const [shape, setShape] = useState();
  // console.log("propss...............................", props);
  const [formHeader, setFormHeader] = useState({
    rvId: "",
    receiptDate: "", //formatDate(new Date(), 4),
    rvNo: "Draft",
    rvDate: "", //currDate,
    status: "Created",
    customer: props.type2 === "purchase" ? "0000" : "",
    customerName:
      props.type2 === "purchase" ? "MAGOD LASER MACHINING PVT LTD" : "",

    reference: "",
    weight: "0",
    calcWeight: "0",
    type: props.type === "sheets" ? "Sheets" : "Units",
    // address: "",
    address:
      props.type2 === "purchase"
        ? "Plot No 72 , Phase II KAIDB Indl  Area KAIDB Indl  Area Jigani Anekal Taluk"
        : "",
  });

  let [custdata, setCustdata] = useState([]);
  let [mtrlDetails, setMtrlDetails] = useState([]);
  let [locationData, setLocationData] = useState([]);
  let [para1Label, setPara1Label] = useState("Para 1");
  let [para2Label, setPara2Label] = useState("Para 2");
  let [para3Label, setPara3Label] = useState("Para 3");

  const [unitLabel1, setUnitLabel1] = useState("");
  const [unitLabel2, setUnitLabel2] = useState("");
  const [unitLabel3, setUnitLabel3] = useState("");

  // State to keep track of selected rows
  const [selectedRows, setSelectedRows] = useState([]);

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
    updated: "",
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
    },
    {
      text: unitLabel1 !== "" ? para1Label : "",
      dataField: "dynamicPara1",
    },
    // + "(" + unitLabel1 + ")"
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
    getRequest(endpoints.getCustomers, (data) => {
      if (props.type2 === "purchase") {
        data = data.filter((obj) => obj.Cust_Code == 0);
      }
      //Cust_Code == 0
      for (let i = 0; i < data.length; i++) {
        data[i].label = data[i].Cust_name;
      }
      setCustdata(data);
    });
    getRequest(endpoints.getMaterialLocationList, (data) => {
      setLocationData(data);
    });
    getRequest(endpoints.getMtrlData, (data) => {
      setMtrlDetails(data);
    });
    // console.log("data = ", custdata);
  }

  useEffect(() => {
    fetchData();
    //setPartArray(partArray);
  }, []); //[inputPart]);

  // useEffect(() => {
  //   setFormHeader(formHeader);
  // }, [formHeader]); //[inputPart]);

  console.log(formHeader);
  let changeCustomer = async (e) => {
    //e.preventDefault();
    //const { value, name } = e.target;
    console.log(custdata);
    const found = custdata.find((obj) => obj.Cust_Code === e[0].Cust_Code);
    // setCustDetailVal(found.Address);
    console.log("found.Address", found.Address);

    setFormHeader((preValue) => {
      // console.log(preValue);
      return {
        ...preValue,
        //[name]: value,
        customerName: found.Cust_name,
        customer: found.Cust_Code,
        address: found.Address,
      };
    });

    // getRequest(endpoints.getCustBomList, (data) => {
    //   const foundPart = data.filter((obj) => obj.Cust_code == value);
    //   setMtrlDetails(foundPart);
    // });
  };

  let changeCustomer1 = async (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    console.log("e.target", e.target);
    const found = custdata.find((obj) => obj.Cust_Code === value);
    //setCustDetailVal(found.Address);

    console.log("found.Address", found.Address);
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
  };

  // console.log("customerName", formHeader);
  let changeMtrl = async (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    //console.log("value = ", value);
    mtrlDetails.map((material) => {
      if (material.Mtrl_Code === value) {
        //update the mtrl_data related columns
        let url1 = endpoints.getRowByMtrlCode + "?code=" + value;
        getRequest(url1, async (mtrlData) => {
          // console.log("mtrldata= ", mtrlData.Shape);
          let Mtrlshape = mtrlData.Shape;
          setShape(Mtrlshape);
          inputPart.material = mtrlData.Mtrl_Type;
          inputPart.shapeMtrlId = mtrlData.ShapeMtrlID;
          let url2 = endpoints.getRowByShape + "?shape=" + mtrlData.Shape;
          getRequest(url2, async (shapeData) => {
            //console.log("shapedata = ", shapeData);
            inputPart.shapeID = shapeData.ShapeID;
            setInputPart(inputPart);

            // if (shape !== material.Shape) {
            //   toast.error("Please select a same type of part");
            //   console.log("Please select a same type of part");
            // }
          });
        });
        // console.log("material.Shape", material.Shape);

        if (shape !== null && shape !== undefined && shape !== material.Shape) {
          toast.error("Please select a same type of part");
        }

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

    // console.log("Before update = ", inputPart.shapeMtrlId);
    console.log("inputPart ..... ", inputPart);

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
        // console.log("data = ", data);
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
        // console.log("data = ", data);
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
    console.log("formHeader.customer", formHeader);

    if (formHeader.customer.length == 0) {
      toast.error("Please Select Customer");
    } else if (formHeader.reference.length == 0) {
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
        }
      }
    }
  };
  // console.log("formheader", formHeader);

  // console.log("part array = ", materialArray);
  const allotRVButtonState = (e) => {
    e.preventDefault();

    if (materialArray.length === 0) {
      toast.error("Add Details Before Saving");
    } else if (materialArray.length !== 0 && formHeader.weight == "0") {
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
          break; // Add a break to ensure this condition is not overwritten by subsequent checks
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
        }
        if (materialArray[i].qtyAccepted > materialArray[i].qtyReceived) {
          flag1 = 6;
        }
      }

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

    // if (formHeader.weight == "0") {
    //   toast.error(
    //     "Enter the Customer Material Weight as per Customer Document"
    //   );
    // } else {
    //   //show model form
    //   setShow(true);
    // }

    //ADDED POPUP FOR ALLOTRVNO
    // if (materialArray.length === 0) {
    //   toast.error("Add Details Before Saving");
    // } else {
    //   setShow(true);
    // }
  };

  const allotRVYesButton = async (data) => {
    await delay(500);
    setFormHeader(data);
    setBoolVal4(true);
    setBoolVal6(false);
  };

  const deleteButtonState = () => {
    setModalOpen(true);
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
          if (props.type === "units") {
            toast.success("Record is Deleted");
            nav("/MaterialManagement/Receipt/CustomerJobWork/Units/New", {
              replace: true,
            });
            window.location.reload();
          } else {
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
    updated,
  } = inputPart;

  const addNewMaterial = (e) => {
    setBoolVal3(false);

    //clear all part fields
    inputPart.rvId = formHeader.rvId;
    inputPart.srl = "0";
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
    // console.log("partarray = ", partArray);
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
        // srl = count.toString();
        // console.log("srll", srl);
        //set inserted id
        inputPart.srl = srl;
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
        // console.log("materialArray", materialArray);
        // console.log("newRow", newRow);

        //setPartArray(newRow);
        setMaterialArray([...materialArray, newRow]);
        // console.log("materialArray", materialArray);

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

    // console.log("after = ", inputPart);
  };

  //delete part
  const handleDelete = () => {
    if (inputPart.id.length === 0) {
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
          // setOpen(true);
          //reset all fields
          //Object.keys(inputPart).forEach((key) => (inputPart[key] = null));
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

      // setOpen(true);

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
    const { value, name } = e.target;

    // console.log(
    //   "eventvalue....",
    //   e.target.value,
    //   "name....",
    //   name,
    //   "id....",
    //   id
    // );
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
    setInputPart(inputPart);
    //console.log(inputPart);

    // if (name === "qtyReceived") {
    //   setInsCheck(false);
    // }
    if (name === "qtyAccepted") {
      //calculate weight
      if (e.target.value) {
        let val = e.target.value;
        //get mtrl_data by mtrl_code
        let url = endpoints.getRowByMtrlCode + "?code=" + inputPart.mtrlCode;
        getRequest(url, async (data) => {
          //setCustdata(data);
          console.log("data...", data);
          // console.log(
          //   "inputPart.qtyAccepted...",
          //   parseFloat(inputPart.qtyAccepted)
          // );
          // console.log(
          //   "inputPart.dynamicPara1...",
          //   parseFloat(inputPart.dynamicPara1)
          // );
          // console.log(
          //   "inputPart.dynamicPara2...",
          //   parseFloat(inputPart.dynamicPara2)
          // );
          // console.log(
          //   "inputPart.dynamicPara3...",
          //   parseFloat(inputPart.dynamicPara3)
          // );

          let TotalWeightCalculated =
            parseFloat(inputPart.qtyAccepted) *
            getWeight(
              data,
              parseFloat(inputPart.dynamicPara1),
              parseFloat(inputPart.dynamicPara2),
              parseFloat(inputPart.dynamicPara3)
            );

          console.log("TotalWeightCalculated...", TotalWeightCalculated);

          TotalWeightCalculated = TotalWeightCalculated / (1000 * 1000);
          console.log("TotalWeightCalculated", TotalWeightCalculated);

          inputPart.totalWeightCalculated = parseFloat(
            TotalWeightCalculated
          ).toFixed(2);

          inputPart.totalWeight = parseFloat(TotalWeightCalculated).toFixed(2);
          inputPart["TotalWeightCalculated"] = TotalWeightCalculated;
          inputPart["TotalWeight"] = TotalWeightCalculated;

          setInputPart(inputPart);
          // console.log("formHeader", formHeader);
          //update forheader in database
          postRequest(
            endpoints.updateHeaderMaterialReceiptRegister,
            formHeader,
            (data) => {}
          );

          //update material array:
          const newArray = materialArray.map((p) =>
            //p.id === "d28d67b2-6c32-4aae-a7b6-74dc985a3cff"
            p.id === id
              ? {
                  ...p,
                  [name]: value,
                  qty: inputPart.qtyReceived,
                  // inspected: inputPart.inspected,
                  inspected: inputPart.inspected == true ? 1 : 0,
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

          formHeader.calcWeight = parseFloat(totwt).toFixed(2);
          setFormHeader(formHeader);
          delay(500);
          // console.log("form header = ", formHeader);
          //update calc weight in header
          postRequest(
            endpoints.updateHeaderMaterialReceiptRegister,
            formHeader,
            (data) => {
              if (data.affectedRows !== 0) {
              }
            }
          );
        });
        //inputPart[name] = value;
        //setInputPart(inputPart);

        //console.log("inputPart : ", inputPart);
      }
    }
    const newArray = materialArray.map((p) =>
      //p.id === "d28d67b2-6c32-4aae-a7b6-74dc985a3cff"
      p.id === id
        ? {
            ...p,
            [name]: value,
            qty: inputPart.qtyReceived,
            // inspected: inputPart.inspected == "on" ? 1 : 0,
            inspected: inputPart.inspected == true ? 1 : 0,
            // inspected: inputPart.inspected,
          }
        : p
    );
    setMaterialArray(newArray);
    await delay(500);

    console.log("materialarray.......:", materialArray);
    // console.log("selectedRowss:", selectedRows);
    console.log("inputPart", inputPart);
    //update blank row with respected to modified part textfield
    postRequest(endpoints.updateMtrlReceiptDetailsAfter, inputPart, (data) => {
      if (data?.affectedRows !== 0) {
      } else {
        toast.error("Record Not Updated");
      }
    });
    await delay(500);
  };

  // row selection
  const selectRow = {
    mode: "radio",
    clickToSelect: true,
    bgColor: "#8A92F0",
    onSelect: (row, isSelect, rowIndex, e) => {
      // setIsButtonEnabled(row.updated === 1);

      setCheckboxState(row.updated);

      console.log("row", row);
      setSelectedRows(row);
      setInputPart(row);

      if (row.updated === 1) {
        setRmvBtn(true);
        setAddBtn(false);
      } else {
        setRmvBtn(false);
        setAddBtn(true);
      }

      // let accepted = "";
      // let totalWeightCalculated = "";
      const url1 = endpoints.getMtrlReceiptDetailsByID + "?id=" + row.id;
      getRequest(url1, async (data2) => {
        console.log("data2 ........", data2);
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
          obj.dynamicPara2 = obj.DynamicPara2;
          obj.dynamicPara3 = obj.DynamicPara3;
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
        console.log("data2", data2);
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

      console.log("inspected", inspected);
      console.log("updated", updated);
      // setInputPart({
      //   qtyAccepted: row.qtyAccepted,
      //   qtyRejected: row.qtyRejected,
      //   qtyReceived: row.qtyReceived,
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
      //   totalWeightCalculated: row.totalWeightCalculated,
      // });
    },
  };

  // console.log("setCheckboxState", checkboxState);

  // console.log("selectedRowss:", selectedRows);
  // console.log("inputpart:", inputPart);

  // const addToStock
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
      console.log("newrow = ", newRow);
      //console.log("before api");
      postRequest(endpoints.insertMtrlStockList, newRow, async (data) => {
        // console.log("data = ", data);
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
      console.log("mtrlstock = ", mtrlStock);
      //console.log("before materialArray = ", materialArray);
      //update updated status = 1
      let updateObj = {
        id: mtrlStock.Mtrl_Rv_id,
        upDated: 1,
      };
      console.log("updateObj", updateObj);
      postRequest(
        endpoints.updateMtrlReceiptDetailsUpdated,
        updateObj,
        async (data) => {
          console.log("updated", data.upDated);
        }
      );
      //update checkbox
      for (let i = 0; i < materialArray.length; i++) {
        if (materialArray[i].mtrlCode == mtrlStock.Mtrl_Code) {
          materialArray[i].updated = 1;
        }
        // setMaterialArray(materialArray);
        // console.log("materialArray[i].updated = 1", materialArray[i].updated);
      }
      await delay(500);
      setInputPart({ ...inputPart, updated: 1 });
      setMaterialArray(materialArray);
      // console.log("after materialArray = ", materialArray);
    }

    // // Update checkboxState based on materialArray
    // const updatedCheckboxState = materialArray.map(
    //   (item) => item.updated === 1
    // );
    // setCheckboxState(updatedCheckboxState);
  };
  // console.log("after materialArray = ", materialArray[i]?.updated);

  // const removeToStock
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
            // setMaterialArray(materialArray);
          }
          await delay(500);
          setMaterialArray(materialArray);
          setInputPart({ ...inputPart, updated: 0 });
        } else {
          toast.error("Stock Not Removed");
        }
      });
    }
    // // Update checkboxState based on materialArray
    // const updatedCheckboxState = materialArray.map(
    //   (item) => item.updated === 0
    // );
    // setCheckboxState(updatedCheckboxState);
  };

  console.log("mtrlarray11223344", mtrlArray);

  const handleYes = () => {
    if (inputPart.id.length === 0) {
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
          // setOpen(true);
          //reset all fields
          //Object.keys(inputPart).forEach((key) => (inputPart[key] = null));
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

      // setOpen(true);

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

  console.log("1234", inputPart.updated);

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
              type="number"
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
            {props.type2 !== "purchase" ? (
              <Typeahead
                id="basic-example"
                name="customer"
                options={custdata}
                //disabled={props.type2 === "purchase" ? true : boolVal2}
                placeholder="Select Customer"
                onChange={(label) => changeCustomer(label)}
                disabled={boolVal2}
              />
            ) : (
              <select
                className="ip-select"
                name="customer"
                disabled={props.type2 === "purchase" ? true : boolVal2}
                onChange={changeCustomer1}
              >
                {props.type2 === "purchase" ? (
                  ""
                ) : (
                  <option value="" disabled selected>
                    Select Customer
                  </option>
                )}

                {props.type2 === "purchase"
                  ? custdata.map((customer, index) =>
                      customer.Cust_Code == 0 ? (
                        <option key={index} value={customer.Cust_Code}>
                          {customer.Cust_name}
                        </option>
                      ) : (
                        ""
                      )
                    )
                  : custdata.map((customer, index) => (
                      <option key={index} value={customer.Cust_Code}>
                        {customer.Cust_name}
                      </option>
                    ))}
              </select>
            )}
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
              type="number"
              name="calculatedWeight"
              //value={formHeader.calcWeight}
              value={calcWeightVal}
              readOnly
            />
          </div>
          {/* <div className="col-md-4">
            <label className="form-label">Weight</label>
            <input
              type="number"
              name="weight"
              required
              value={formHeader.weight}
              onChange={InputHeaderEvent}
              disabled={boolVal4}
            />
          </div> */}
        </div>

        <div className="row">
          {/* <div className="col-md-8">
            <label className="form-label">Reference</label>
            <input
              type="text"
              name="reference"
              value={formHeader.reference}
              onChange={InputHeaderEvent}
              disabled={boolVal2 & boolVal4}
            />
          </div> */}
          {/* <div className="col-md-4">
            <label className="form-label">Calculated Weight</label>
            <input
              type="number"
              name="calculatedWeight"
              //value={formHeader.calcWeight}
              value={calcWeightVal}
              readOnly
            />
          </div> */}
        </div>

        <div className="row">
          <div className="col-md-8 justify-content-center">
            <button
              className="button-style"
              style={{ marginLeft: "70px" }}
              // style={{ width: "120px" }}
              onClick={saveButtonState}
              disabled={boolVal4}
            >
              Save
            </button>
            <button
              className="button-style"
              // style={{ width: "150px" }}
              disabled={boolVal1 | boolVal4}
              onClick={allotRVButtonState}
            >
              Allot RV No
            </button>

            <button
              className="button-style"
              // style={{ width: "196px" }}
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
          <div className="col-md-3 mb-3 mt-4">
            {/* <label className="form-label"></label> */}
            <textarea
              id="exampleFormControlTextarea1"
              rows="2"
              style={{ width: "400px", height: "40px" }}
              // className="form-control"
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
              <div className="row justify-content-center">
                <div className="col-md-6 col-sm-12">
                  <button
                    className="button-style "
                    style={{ width: "155px" }}
                    //onClick={addNewPart}
                    disabled={boolVal1 | boolVal4}
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
                    // onClick={handleDelete}
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
                  <p className="form-title-deco mt-1">
                    <h5>Serial Details</h5>
                  </p>
                  <div className="row">
                    <div className="col-md-3 ">
                      <label className="form-label">Part ID</label>
                    </div>
                    <div className="col-md-8" style={{ marginTop: "7px" }}>
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

                        {props.type === "sheets"
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
                          : props.type === "units"
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

                  {/* <div className="row mt-2">
                    <div className="col-md-3">
                      <label className="form-label">{para1Label}</label>
                    </div>
                    <div className="col-md-6 ">
                      <input
                        type="number"
                        // className="in-fields"
                        className="in-field"
                        name="dynamicPara1"
                        value={inputPart.dynamicPara1}
                        disabled={boolVal3 | boolVal4 | boolPara1 | boolVal5}
                        min="0"
                        onChange={(e) => {
                          changeMaterialHandle(e, inputPart.id);
                        }}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label mt-1">{unitLabel1}</label>
                    </div>
                  </div> */}

                  {!(boolVal3 || boolPara1) && (
                    <div className="row mt-2">
                      <div className="col-md-3">
                        <label className="form-label">{para1Label}</label>
                      </div>
                      <div className="col-md-6 ">
                        <input
                          type="number"
                          className="in-field"
                          name="dynamicPara1"
                          disabled={boolVal5 || boolVal4}
                          value={inputPart.dynamicPara1}
                          min="0"
                          onChange={(e) => {
                            changeMaterialHandle(e, inputPart.id);
                          }}
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label mt-1">{unitLabel1}</label>
                      </div>
                    </div>
                  )}

                  {/* <div className="row">
                    <div className="col-md-3">
                      <label className="form-label">{para2Label}</label>
                    </div>
                    <div className="col-md-6 ">
                      <input
                        type="number"
                        className="in-field"
                        name="dynamicPara2"
                        value={inputPart.dynamicPara2}
                        disabled={boolVal3 | boolVal4 | boolPara2 | boolVal5}
                        min="0"
                        onChange={(e) => {
                          changeMaterialHandle(e, inputPart.id);
                        }}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label mt-1">{unitLabel2}</label>
                    </div>
                  </div> */}
                  {!(boolVal3 || boolPara2) && (
                    <div className="row">
                      <div className="col-md-3">
                        <label className="form-label">{para2Label}</label>
                      </div>
                      <div className="col-md-6 ">
                        <input
                          type="number"
                          className="in-field"
                          name="dynamicPara2"
                          disabled={boolVal5 || boolVal4}
                          value={inputPart.dynamicPara2}
                          min="0"
                          onChange={(e) => {
                            changeMaterialHandle(e, inputPart.id);
                          }}
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label mt-1">{unitLabel2}</label>
                      </div>
                    </div>
                  )}

                  {/* <div className="row">
                    <div className="col-md-3">
                      <label className="form-label">{para3Label}</label>
                    </div>
                    <div className="col-md-6 ">
                      <input
                        type="number"
                        className="in-field"
                        name="dynamicPara3"
                        value={inputPart.dynamicPara3}
                        disabled={boolVal3 | boolVal4 | boolPara3 | boolVal5}
                        min="0"
                        onChange={(e) => {
                          changeMaterialHandle(e, inputPart.id);
                        }}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label mt-1">{unitLabel3}</label>
                    </div>
                  </div> */}
                  {!(boolVal3 || boolPara3) && (
                    <div className="row">
                      <div className="col-md-3">
                        <label className="form-label">{para3Label}</label>
                      </div>
                      <div className="col-md-6 ">
                        <input
                          type="number"
                          className="in-field"
                          name="dynamicPara3"
                          disabled={boolVal5 || boolVal4}
                          value={inputPart.dynamicPara3}
                          min="0"
                          onChange={(e) => {
                            changeMaterialHandle(e, inputPart.id);
                          }}
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label mt-1">{unitLabel3}</label>
                      </div>
                    </div>
                  )}

                  <p className="form-title-deco mt-2">
                    <h5>Quantity Details</h5>
                  </p>
                  <div className="row">
                    <div className="col-md-3 col-sm-12 ">
                      <label className="form-label mt-1">Received</label>
                    </div>
                    <div className="col-md-4 col-sm-12">
                      <input
                        type="number"
                        className="in-field"
                        name="qtyReceived"
                        // defaultValue={0}
                        value={inputPart.qtyReceived}
                        disabled={boolVal3 | boolVal4}
                        // min="0"
                        onChange={(e) => {
                          changeMaterialHandle(e, inputPart.id);
                        }}
                      />
                    </div>
                    <div className="col-md-5  ">
                      {/* <div className="row"> */}
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
                          /*checked={
                                inputPart.inspected === "1" ? true : false
                              }*/
                          disabled={boolVal3 | boolVal4}
                          onChange={(e) => {
                            changeMaterialHandle(e, inputPart.id);
                            // console.log("evnet..1", e.target.checked);
                          }}
                        />
                        <label className="form-label mt-1">Inspected</label>
                      </div>
                      {/* </div> */} 
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 col-sm-12 mt-1">
                      <label className="form-label">Accepted</label>
                    </div>
                    <div className="col-md-4 col-sm-12">
                      <input
                        type="number"
                        className="in-field"
                        name="qtyAccepted"
                        // defaultValue={0}
                        value={inputPart.qtyAccepted}
                        disabled={boolVal3 | boolVal4 | !boolVal5}
                        min="0"
                        onChange={(e) => {
                          changeMaterialHandle(e, inputPart.id);
                        }}
                      />
                    </div>
                    <div className="col-md-5 ">
                      <div
                        className="col-md-12"
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
                          // disabled={true}
                          onChange={(e) => {
                            changeMaterialHandle(e, inputPart.id);
                          }}
                        />
                        <label className="form-label mt-1">Updated</label>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-2">
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
                        onChange={(e) => {
                          changeMaterialHandle(e, inputPart.id);
                        }}
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
                        type="number"
                        className="in-field"
                        name="totalWeight"
                        value={inputPart.totalWeight}
                        // onChange={changeMaterialHandle}
                        onChange={(e) => {
                          changeMaterialHandle(e, inputPart.id);
                        }}
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
                  <div className="row justify-content-center mt-3 mb-4">
                    {/* <button
                      className="button-style "
                      style={{ width: "155px" }}
                      disabled={boolVal3 | boolVal4}
                      // onClick={handleDelete}
                      onClick={deleteButtonState}
                    >
                      Delete Serial
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewSheetsUnits;
