import React, { useEffect, useState } from "react";
import { formatDate, getWeight } from "../../../../utils";
import { toast } from "react-toastify";
import CreateYesNoModal from "../../components/CreateYesNoModal";
import { useNavigate } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import { useLocation } from "react-router-dom";

const { getRequest, postRequest } = require("../../../api/apiinstance");
const { endpoints } = require("../../../api/constants");

function OpenButtonDraftSheetUnit() {
  const location = useLocation();

  const nav = useNavigate();
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const [show, setShow] = useState(false);

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

  //after selecting material disable dynamic para 1 2 3
  const [boolPara1, setBoolPara1] = useState(false);
  const [boolPara2, setBoolPara2] = useState(false);
  const [boolPara3, setBoolPara3] = useState(false);

  //after clicking inspected checkbox
  const [boolVal5, setBoolVal5] = useState(false);

  const [insCheck, setInsCheck] = useState(false);
  const [calcWeightVal, setCalcWeightVal] = useState(0);
  const [saveUpdateCount, setSaveUpdateCount] = useState(0);

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
            <input type="checkbox" checked={row.UpDated == 1 ? true : false} />
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

      console.log("data = ", data);
      //data.ReceiptDate = formatDate(new Date(data.ReceiptDate), 4);
      //data.RV_Date = formatDate(new Date(data.RV_Date), 3);
      //setFormHeader(formHeader);

      //get customer details for address
      getRequest(endpoints.getCustomers, (data1) => {
        const found = data1.find((obj) => obj.Cust_Code === data.Cust_Code);
        data.address = found.Address;
        setFormHeader(formHeader);
        setCalcWeightVal(data.TotalCalculatedWeight);
      });
      //get material details
      const url1 =
        endpoints.getMtrlReceiptDetailsByRvID + "?id=" + location.state.id;
      getRequest(url1, (data2) => {
        //console.log("data2  = ", data2);
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
        //console.log("data 2 = ", data2);
        setMaterialArray(data2);

        //find shape of material
        //console.log("data2 = ", data2);
        for (let i = 0; i < data2.length; i++) {
          const url2 =
            endpoints.getRowByMtrlCode + "?code=" + data2[i].Mtrl_Code;
          getRequest(url2, (data3) => {
            //console.log("data3 = ", data3);

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
              setPara3Label("");
              setUnitLabel1("mm");
              setUnitLabel2("mm");
              setUnitLabel3("");
            } else if (data3.Shape === "Sheet") {
              setPara1Label("Width");
              setPara2Label("Length");
              setPara3Label("");
              setUnitLabel1("mm");
              setUnitLabel2("mm");
              setUnitLabel3("");
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
    console.log("para1 label = ", para1Label);
  }

  useEffect(() => {
    fetchData();
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
          //console.log("mtrldata = ", mtrlData);
          inputPart.material = mtrlData.Mtrl_Type;
          inputPart.shapeMtrlId = mtrlData.ShapeMtrlID;
          let url2 = endpoints.getRowByShape + "?shape=" + mtrlData.Shape;
          getRequest(url2, async (shapeData) => {
            //console.log("shapedata = ", shapeData);
            inputPart.shapeID = shapeData.ShapeID;
            setInputPart(inputPart);
          });
        });

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

    console.log("Before update = ", inputPart);

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

  let changeLocation = async (e) => {
    e.preventDefault();
    const { value, name } = e.target;

    //update input Array set material code
    setInputPart((preValue) => {
      //console.log(preValue)
      return {
        ...preValue,
        [name]: value,
      };
    });
    inputPart[name] = value;
    setInputPart(inputPart);

    //update databse row
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

  const saveButtonState = (e) => {
    e.preventDefault();
    if (formHeader.customer.length == 0) {
      toast.error("Please Select Customer");
    } else if (formHeader.reference.length == 0)
      toast.error("Please Enter Customer Document Material Reference");
    else {
      /*if (saveUpdateCount == 0) {
        insertHeaderFunction();
        setBoolVal2(true);
      } else {
        //to update data
        updateHeaderFunction();
      }*/
      updateHeaderFunction();
    }
  };

  const allotRVButtonState = (e) => {
    e.preventDefault();

    if (formHeader.weight == "0") {
      toast.error(
        "Enter the Customer Material Weight as per Customer Document"
      );
    } else {
      //show model form
      setShow(true);
    }
  };

  const allotRVYesButton = async (data) => {
    //console.log("data = ", formHeader);
    await delay(500);
    setFormHeader(data);
    setBoolVal4(true);
    //console.log("formheader = ", formHeader);
    //console.log("formheader = ", formHeader);
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
    inputPart.upDated = 0.0;
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
          upDated: "",
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

  //delete part
  const handleDelete = () => {
    if (inputPart.id.length === 0) {
      toast.error("Select Material");
    } else {
      //console.log("id = ", inputPart.id);
      console.log("input part = ", inputPart);
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

  const changeMaterialHandle = async (e) => {
    const { value, name } = e.target;

    setInputPart((preValue) => {
      //console.log(preValue)
      return {
        ...preValue,
        [name]: value,
      };
    });
    inputPart[name] = value;
    //inputPart.custCode = formHeader.customer;
    //inputPart.rvId = formHeader.rvId;

    //checkbox update
    if (name === "inspected") {
      if (e.target.checked) {
        inputPart.inspected = 1;
        setBoolVal5(true);
        setInsCheck(true);
      } else {
        inputPart.inspected = 0;
        setBoolVal5(false);
        setInsCheck(false);
      }
    }

    inputPart[name] = value;
    setInputPart(inputPart);
    //console.log(inputPart);

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
                  //qty: inputPart.qtyReceived,
                  //inspected: inputPart.inspected,
                }
              : p
          );
          setMaterialArray(newArray);
          console.log("material array = ", materialArray);
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

        //console.log("inputPart : ", inputPart);
      }
    }
    const newArray = materialArray.map((p) =>
      //p.id === "d28d67b2-6c32-4aae-a7b6-74dc985a3cff"
      p.id === partUniqueId
        ? {
            ...p,
            [name]: value,
            qty: inputPart.qtyReceived,
            inspected: inputPart.inspected == "on" ? 1 : 0,
          }
        : p
    );

    setMaterialArray(newArray);
    await delay(500);

    //update blank row with respected to modified part textfield
    postRequest(endpoints.updateMtrlReceiptDetails, inputPart, (data) => {
      if (data.affectedRows !== 0) {
      } else {
        toast.error("Record Not Updated");
      }
    });
    await delay(500);
  };

  const selectRow = {
    mode: "radio",
    clickToSelect: true,
    bgColor: "#8A92F0",
    onSelect: (row, isSelect, rowIndex, e) => {
      setInputPart({
        // id: row.id,
        // partId: row.partId,
        // unitWeight: row.unitWeight,
        // qtyAccepted: row.qtyAccepted,
        // qtyRejected: row.qtyRejected,
        // qtyReceived: row.qtyReceived,
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
      <CreateYesNoModal
        show={show}
        setShow={setShow}
        formHeader={formHeader}
        allotRVYesButton={allotRVYesButton}
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
              disabled={true}
              //onChange={changeCustomer}
            >
              <option value={formHeader.customer} disabled selected>
                {formHeader.customerName}
              </option>
            </select>
          </div>
          <div className="col-md-4">
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
          <div className="col-md-8">
            <label className="form-label">Reference</label>
            <input
              type="text"
              name="reference"
              value={formHeader.reference}
              onChange={InputHeaderEvent}
              disabled={boolVal2 & boolVal4}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Calculated Weight</label>
            <input
              type="text"
              name="calculatedWeight"
              value={calcWeightVal}
              readOnly
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-8 justify-content-center">
            <div className="row">
              <div className="col-md-3 col-sm-12">
                <button
                  className="button-style"
                  onClick={saveButtonState}
                  disabled={boolVal4}
                >
                  Save
                </button>
              </div>
              <div className="col-md-3 col-sm-12">
                <button
                  className="button-style"
                  disabled={boolVal4}
                  onClick={allotRVButtonState}
                >
                  Allot RV No
                </button>
              </div>
              <div className="col-md-3 col-sm-12">
                <button
                  className="button-style"
                  disabled={boolVal4}
                  onClick={deleteRVButtonState}
                >
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
          <div className="col-md-8 col-sm-12">
            <div style={{ height: "330px", overflowY: "scroll" }}>
              <BootstrapTable
                keyField="id"
                columns={columns}
                data={materialArray}
                striped
                hover
                condensed
                selectRow={selectRow}
                headerClasses="header-class "
              ></BootstrapTable>
            </div>

            {/* <div
              className="table-data"
              style={{ height: "480px", overflowY: "scroll" }}
            >
             <Tables theadData={getHeadings()} tbodyData={data3} />
            </div> */}
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="ip-box form-bg">
              <div className="row justify-content-center mt-2">
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
              <div className="row justify-content-center">
                <div className="col-md-6 col-sm-12">
                  <button
                    className="button-style "
                    style={{ width: "155px" }}
                    disabled={true}
                  >
                    Add to stock
                  </button>
                </div>
                <div className="col-md-6 col-sm-12">
                  <button
                    className="button-style "
                    style={{ width: "155px" }}
                    disabled={true}
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
                        onChange={changeMtrl}
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

                  <div className="row">
                    <div className="col-md-4">
                      <label className="form-label">{para1Label}</label>
                    </div>
                    <div className="col-md-8 ">
                      <input
                        className="in-field"
                        name="dynamicPara1"
                        value={inputPart.dynamicPara1}
                        disabled={boolVal3 | boolVal4 | boolPara1 | boolVal5}
                        onChange={changeMaterialHandle}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">{unitLabel1}</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <label className="form-label">{para2Label}</label>
                    </div>
                    <div className="col-md-8 ">
                      <input
                        className="in-field"
                        name="dynamicPara2"
                        value={inputPart.dynamicPara2}
                        onChange={changeMaterialHandle}
                        disabled={boolVal3 | boolVal4 | boolPara2 | boolVal5}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">{unitLabel2}</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <label className="form-label">{para3Label}</label>
                    </div>
                    <div className="col-md-8 ">
                      <input
                        className="in-field"
                        name="dynamicPara3"
                        value={inputPart.dynamicPara3}
                        onChange={changeMaterialHandle}
                        disabled={boolVal3 | boolVal4 | boolPara3 | boolVal5}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">{unitLabel3}</label>
                    </div>
                  </div>
                  <div className="col-md-12 ">
                    <p className="form-title-deco">
                      <h5>Quantity Details</h5>
                    </p>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="form-label">Received</label>
                        <input
                          className="in-field"
                          name="qtyReceived"
                          value={inputPart.qtyReceived}
                          disabled={boolVal3 | boolVal4}
                          onChange={changeMaterialHandle}
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
                            id="flexCheckDefault"
                            name="inspected"
                            checked={insCheck}
                            /*checked={
                                inputPart.inspected === "1" ? true : false
                              }*/
                            disabled={boolVal3 | boolVal4}
                            onChange={changeMaterialHandle}
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
                          name="qtyAccepted"
                          value={inputPart.qtyAccepted}
                          disabled={boolVal3 | boolVal4 | !boolVal5}
                          onChange={changeMaterialHandle}
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
                            id="flexCheckDefault"
                            name="updated"
                            value={inputPart.upDated}
                            disabled={boolVal3 | boolVal4}
                            onChange={changeMaterialHandle}
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
                          name="totalWeightCalculated"
                          value={inputPart.totalWeightCalculated}
                          disabled={true}
                        />
                      </div>
                      <div className="col-md-8 "></div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mt-1">
                        <label className="form-label">Weight</label>
                        <input
                          className="in-field"
                          name="totalWeight"
                          value={inputPart.totalWeight}
                          onChange={changeMaterialHandle}
                          disabled={boolVal3 | boolVal4}
                        />
                      </div>
                      <div className="col-md-8 "></div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mt-1 ">
                        <label className="form-label">Location</label>
                        <select
                          className="ip-select dropdown-field"
                          onChange={changeLocation}
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

                          {/* <option value="option 1">001</option>
                            <option value="option 1">002</option>
                            <option value="option 1">003</option>
                            <option value="option 1">004</option> */}
                        </select>
                      </div>
                      <div
                        className="col-md-8"
                        style={{ marginTop: "8px" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center mt-3 mb-4">
                <button
                  className="button-style "
                  style={{ width: "155px" }}
                  disabled={boolVal4}
                  onClick={handleDelete}
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

export default OpenButtonDraftSheetUnit;
