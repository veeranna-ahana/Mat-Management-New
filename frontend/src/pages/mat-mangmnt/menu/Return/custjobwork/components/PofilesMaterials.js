import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import CreateDCModal from "../../../../components/CreateDCModal";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import { formatDate, get_Iv_DetailsEntry } from "../../../../../../utils";
import CreateReturnNewModal from "../../../../components/CreateReturnNewModal";
import FirstTable from "./Tables/FirstTable";
import SecondTable from "./Tables/SecondTable";
import ThirdTable from "./Tables/ThirdTable";
import ConfirmationModal from "./Modals/ConfimationModal";

const { getRequest, postRequest } = require("../../../../../api/apiinstance");
const { endpoints } = require("../../../../../api/constants");

function PofilesMaterials(props) {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const [show, setShow] = useState(false);
  const [srlMaterialType, setSrlMaterialType] = useState("");
  const [srlIVID, setSrlIVID] = useState("");
  const [IVNOVal, setIVNOVal] = useState("");

  const [firstTableData, setFirstTableData] = useState([]);
  const [secondTableData, setSecondTableData] = useState([]);
  // const [thirdTable, setThirdTable] = useState([]);
  const [thirdTableData, setThirdTableData] = useState([]);
  let [objShape, setObjShape] = useState({});
  let [objMaterial, setObjMaterial] = useState({});

  let [selectedSecond, setSelectedSecond] = useState({ selected: [] });

  let [firstTableSelectedRow, setFirstTableSelectedRow] = useState([]);

  let [allData, setAllData] = useState([]);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  // const [buttonClicked, setButtonClicked] = useState("");

  const [runningNo, setRunningNo] = useState([]);
  // const [currentRunningNo, setCurrentRunningNo] = useState([]);
  // const [detailsDataToPosted, setDetailsDataToPosted] = useState([]);

  // let [propsValue, setPropsValue] = useState(props.custCode);

  const handleShow = () => setShow(true);

  const fetchData = () => {
    setFirstTableData([]);
    setSecondTableData([]);
    setThirdTableData([]);
    setFirstTableSelectedRow([]);
    //console.log("props = ", props);
    if (props && props.custCode.length !== 0) {
      let url1 =
        endpoints.profileMaterialFirst + "?Cust_Code=" + props.custCode;
      getRequest(url1, (data) => {
        if (data?.length > 0) {
          data.forEach((item, i) => {
            item.id = i + 1;
            item.Issue = false;
          });
          setFirstTableData(data);
        } else {
          toast.warning("No materials data found for selected Customer");
        }
      });

      //fetch second table data
      let url2 =
        endpoints.profileMaterialSecond + "?Cust_Code=" + props.custCode;
      getRequest(url2, (data) => {
        setAllData(data);
        // console.log("all data...", data);
      });

      // getAllMaterial for create return vocuher
      getRequest(endpoints.getMtrlData, async (MtrlData) => {
        setObjMaterial(MtrlData);
      });

      // getAllShapes for create return vocuher
      getRequest(endpoints.getAllShapes, async (shapeData) => {
        setObjShape(shapeData);
      });
    }
  };

  const getRunningNo = async () => {
    let SrlType = "MaterialReturnIV";
    let yyyy = formatDate(new Date(), 6).toString();
    let UnitName = "Jigani";
    const insertRunningNoVal = {
      UnitName: UnitName,
      SrlType: SrlType,
      ResetPeriod: "Year",
      ResetValue: "0",
      EffectiveFrom_date: `${yyyy}-01-01`,
      Reset_date: `${yyyy}-12-31`,
      Running_No: "0",
      UnitIntial: "0",
      Prefix: "",
      Suffix: "",
      Length: "4",
      Period: yyyy,
    };

    // var runningNo = [];
    postRequest(
      endpoints.getAndInsertRunningNo,
      insertRunningNoVal,
      (runningNo) => {
        // console.log("post done", runningNo);
        setRunningNo(runningNo);
        // runningNo = runningNo;
      }
    );
    // await delay(30);
    // console.log("runningNo", runningNo);
  };

  useEffect(() => {
    fetchData();
  }, [props.custCode]);

  // const columnsFirst = [
  //   {
  //     text: "#",
  //     dataField: "id",
  //     hidden: true,
  //   },
  //   {
  //     text: "RV No",
  //     dataField: "RV_No",
  //     editable: false,
  //   },
  //   {
  //     text: "Cust Document",
  //     dataField: "Cust_Docu_No",
  //     editable: false,
  //   },
  //   {
  //     text: "Mtrl code",
  //     dataField: "Mtrl_Code",
  //     editable: false,
  //   },
  //   {
  //     text: "Width",
  //     dataField: "DynamicPara1",
  //     editable: false,
  //   },
  //   {
  //     text: "Length",
  //     dataField: "DynamicPara2",
  //     editable: false,
  //   },
  //   {
  //     text: "Scrap",
  //     dataField: "Scrap",
  //     editable: false,
  //     formatter: (celContent, row) => (
  //       <div className="checkbox">
  //         <lable>
  //           <input type="checkbox" checked={celContent === 0 ? false : true} />
  //         </lable>
  //       </div>
  //     ),
  //   },
  //   {
  //     text: "Weight",
  //     dataField: "Weight",
  //     editable: false,
  //   },
  //   {
  //     text: "Scrap Weight",
  //     dataField: "ScrapWeight",
  //     editable: false,
  //   },
  //   {
  //     text: "In Stock",
  //     dataField: "InStock",
  //     editable: false,
  //   },
  //   /*    {
  //     text: "Issue",
  //     dataField: "Issue",
  //     type: "bool",
  //     //editable: true,
  //     editor: {
  //       type: Type.CHECKBOX,
  //       value: "true:false",
  //     },
  //     formatter: (celContent, row) => (
  //       <div className="checkbox">
  //         <lable>
  //           <input
  //             type="checkbox"
  //             onChange={firstTableCheckoxChange(row)}
  //             checked={celContent === true ? true : false}
  //           />
  //         </lable>
  //       </div>
  //     ),
  //   },*/
  // ];

  // const columnsSecond = [
  //   /*{
  //     text: "#",
  //     dataField: "id",
  //     hidden: true,
  //   },*/
  //   {
  //     text: "MtrlStockID",
  //     dataField: "MtrlStockID",
  //     editable: false,
  //   },
  //   {
  //     text: "Issue",
  //     dataField: "Issue",
  //     type: "bool",
  //     editor: {
  //       type: Type.CHECKBOX,
  //       value: "true:false",
  //     },
  //     formatter: (celContent, row) => (
  //       <div className="checkbox">
  //         <lable>
  //           <input
  //             type="checkbox"
  //             checked={celContent === true ? true : false}
  //           />
  //         </lable>
  //       </div>
  //     ),
  //   },
  //   {
  //     text: "Weight",
  //     dataField: "Weight",
  //     editable: false,
  //   },
  //   {
  //     text: "ScrapWeight",
  //     dataField: "ScrapWeight",
  //     editable: false,
  //   },
  //   {
  //     text: "RVId",
  //     dataField: "RVId",
  //     editable: false,
  //   },
  // ];
  // const columnsThird = [
  //   {
  //     text: "#",
  //     dataField: "id",
  //     hidden: true,
  //   },
  //   {
  //     text: "MtrlStockID",
  //     dataField: "MtrlStockID",
  //     editable: false,
  //   },
  //   {
  //     text: "Mtrl_Code",
  //     dataField: "Mtrl_Code",
  //     editable: false,
  //   },
  //   {
  //     text: "DynamicPara1",
  //     dataField: "DynamicPara1",
  //     editable: false,
  //   },
  //   {
  //     text: "DynamicPara2",
  //     dataField: "DynamicPara2",
  //     editable: false,
  //   },
  //   {
  //     text: "Weight",
  //     dataField: "Weight",
  //     editable: false,
  //   },
  // ];

  const selectRowFirstFun = (rowData) => {
    // console.log("inside first select................", rowData);

    // console.log("all, data", allData);
    setFirstTableSelectedRow([]);
    setFirstTableSelectedRow([rowData]);

    const newArray = allData.filter((obj) => {
      return (
        obj.RV_No === rowData.RV_No &&
        obj.Mtrl_Code === rowData.Mtrl_Code &&
        obj.DynamicPara1 === rowData.DynamicPara1 &&
        obj.DynamicPara2 === rowData.DynamicPara2
      );
    });

    // console.log("newArray", newArray);
    setSecondTableData([]);
    setSecondTableData(newArray);
    // console.log("all data.....", allData);
    // setFirstTableSelectedRow([]);
    // for (let i = 0; i < allData.length; i++) {
    //   const element = allData[i];
    //   if (
    //     rowData.RV_No === element.RV_No &&
    //     rowData.RvID === element.RVId &&
    //     rowData.Cust_Code === element.Cust_Code
    //   ) {
    //   // console.log("data inside...", element);
    //   }
    //   //firstTableSelectedRow.push.apply(firstTableSelectedRow, row)
    // }
    // allData.map((obj) => {
    // });

    // console.log("selected first table..", firstTableSelectedRow);
    // setSelectedSecond({
    //   selected: [],
    // });

    // //console.log("first table = ", firstTable);
    // //console.log("second table = ",secondTable)

    // //store selected row data

    // const newArray = allData.filter((obj) => {
    //   return (
    //     obj.RV_No === row.RV_No &&
    //     obj.Mtrl_Code === row.Mtrl_Code &&
    //     obj.DynamicPara1 === row.DynamicPara1 &&
    //     obj.DynamicPara2 === row.DynamicPara2
    //   );
    // });

    // console.log("newArray... getting the selected row data...", newArray);

    // let arr = [];
    // //mark checkbox of second table
    // newArray.forEach(async (item, i) => {
    //   arr = [...arr, item.MtrlStockID];
    // });

    // console.log("arr...getting all the selected mtrlstockids ", arr);

    // // selecting all the mtrlstckids by default in second table

    // // setSelectedSecond({
    // //   selected: arr,
    // // });

    // setSelectedSecond({
    //   selected: [],
    // });

    // //console.log("new array = ", newArray);
    // console.log("selectedSecond...... ", selectedSecond);
    // setSecondTable(newArray);
    // // thirdTable.push.apply(thirdTable, newArray);
    // // setThirdTable(thirdTable);
    // //   mode: "checkbox",
    // //   clickToSelect: true,
    // //   selectColumnPosition: "right",
    // //   selectionHeaderRenderer: () => "Issue",
    // //   bgColor: "#8A92F0",
    // //   onSelect: (row, isSelect, rowIndex) => {
    // //     if (isSelect) {
    // //       //console.log("first table = ", firstTable);
    // //       //console.log("second table = ",secondTable)

    // //       //store selected row data
    // //       setFirstTableSelectedRow(
    // //         //firstTableSelectedRow.push.apply(firstTableSelectedRow, row)
    // //         [...firstTableSelectedRow, firstTable[rowIndex]]
    // //       );

    // //       const newArray = allData.filter((obj) => {
    // //         return (
    // //           obj.RV_No === row.RV_No &&
    // //           obj.Mtrl_Code === row.Mtrl_Code &&
    // //           obj.DynamicPara1 === row.DynamicPara1 &&
    // //           obj.DynamicPara2 === row.DynamicPara2
    // //         );
    // //       });

    // //     // console.log("newArray... getting the selected row data...", newArray);

    // //       let arr = [];
    // //       //mark checkbox of second table
    // //       newArray.forEach(async (item, i) => {
    // //         arr = [...arr, item.MtrlStockID];
    // //       });

    // //     // console.log("arr...getting all the selected mtrlstockids ", arr);

    // //       // selecting all the mtrlstckids by default in second table

    // //       // setSelectedSecond({
    // //       //   selected: arr,
    // //       // });

    // //       setSelectedSecond({
    // //         selected: [],
    // //       });

    // //       //console.log("new array = ", newArray);
    // //     // console.log("selectedSecond...... ", selectedSecond);
    // //       setSecondTable(newArray);
    // //       // thirdTable.push.apply(thirdTable, newArray);
    // //       // setThirdTable(thirdTable);
    // //     } else {
    // //       //remove row in selectedTRow array
    // //       setFirstTableSelectedRow(
    // //         firstTableSelectedRow.filter((obj) => {
    // //           return (
    // //             obj.RV_No !== row.RV_No &&
    // //             obj.Mtrl_Code !== row.Mtrl_Code &&
    // //             obj.DynamicPara1 !== row.DynamicPara1 &&
    // //             obj.DynamicPara2 !== row.DynamicPara2
    // //           );
    // //         })
    // //       );

    // //       //console.log("selected = ", selectedSecond);
    // //       //console.log("third table = ", thirdTable);
    // //       let newData = thirdTable.filter((obj, index) => {
    // //         return (
    // //           obj.RV_No !== row.RV_No ||
    // //           obj.Mtrl_Code !== row.Mtrl_Code ||
    // //           obj.DynamicPara1 !== row.DynamicPara1 ||
    // //           obj.DynamicPara2 !== row.DynamicPara2
    // //         );
    // //       });

    // //       setSelectedSecond({
    // //         selected: [],
    // //       });

    // //       // setThirdTable(newData);
    // //     }
    // //   },
  };

  const selectRowSecondFun = (rowData) => {
    // console.log("inside second select", rowData);
    // console.log("third table length", thirdTableData.length);
    // if (thirdTableData.length > 0) {
    //   for (let i = 0; i < thirdTableData.length; i++) {
    //     const element = thirdTableData[i];
    //     // console.log("before", element);
    //     if (element === rowData) {
    //     // console.log("no need to insert");
    //       break;
    //     } else {
    //     // console.log("need to insert");
    //       setThirdTableData([...thirdTableData, rowData]);
    //       break;
    //     }
    //   }
    // } else {
    // // console.log("first element to insert");

    //   setThirdTableData([...thirdTableData, rowData]);
    // }

    // function add(arr, name) {
    // const { length } = arr;
    // const id = length + 1;
    const found = thirdTableData.some(
      (el) => el.MtrlStockID === rowData.MtrlStockID
    );
    if (found) {
      // deleting the element if found
      const newThirdTableData = thirdTableData.filter(
        (data) => data !== rowData
      );
      setThirdTableData(newThirdTableData);
      // console.log("deleted");

      // setThirdTableData([thirdTableData.remove(rowData)]);
      // console.log("deselected", thirdTableData);
    } else {
      // inserting the element if not found
      setThirdTableData([...thirdTableData, rowData]);
      // console.log("inserted");
    }

    // return arr;
    // }

    // console.log("rowdata", rowData);

    // for (let i = 0; i < thirdTableData.length; i++) {
    //   const element = thirdTableData[i];
    // // console.log("element", element);
    // }

    // console.log('rowdata', rowData);

    // setThirdTableData([...thirdTableData, rowData]);

    // console.log("after", thirdTableData);
    //setFirstTableSingleRow(row);
    //console.log("third table = ", thirdTable);
    //console.log("row = ", row);

    // const newArray = allData.filter((obj) => {
    //   return obj.MtrlStockID === row.MtrlStockID;
    // });

    // let arr = [];
    // //mark checkbox of second table
    // newArray.forEach(async (item, i) => {
    //   arr = [...selectedSecond.selected, item.MtrlStockID];
    // });
    // setSelectedSecond({
    //   selected: arr,
    // });
    // //console.log("new array = ", newArray);
    // //console.log("selected = ", selectedSecond);
    // //setSecondTable(newArray);
    // thirdTable.push.apply(thirdTable, newArray);
    // setThirdTable(thirdTable);
  };
  // const selectRowSecond = {
  //   mode: "checkbox",
  //   clickToSelect: true,
  //   bgColor: "#8A92F0",
  //   selected: selectedSecond.selected,
  //   onSelect: (row, isSelect) => {
  //     if (isSelect) {
  //       //setFirstTableSingleRow(row);
  //       //console.log("third table = ", thirdTable);
  //       //console.log("row = ", row);

  //       const newArray = allData.filter((obj) => {
  //         return obj.MtrlStockID === row.MtrlStockID;
  //       });

  //       let arr = [];
  //       //mark checkbox of second table
  //       newArray.forEach(async (item, i) => {
  //         arr = [...selectedSecond.selected, item.MtrlStockID];
  //       });
  //       setSelectedSecond({
  //         selected: arr,
  //       });
  //       //console.log("new array = ", newArray);
  //       //console.log("selected = ", selectedSecond);
  //       //setSecondTable(newArray);
  //       thirdTable.push.apply(thirdTable, newArray);
  //       setThirdTable(thirdTable);
  //     } else {
  //       //console.log("third table = ", thirdTable);
  //       //console.log("row = ", row);
  //       let newData = thirdTable.filter((obj, index) => {
  //         return obj.MtrlStockID !== row.MtrlStockID;
  //       });

  //       //secondTable.forEach((item, i) => {
  //       setSelectedSecond({
  //         selected: selectedSecond.selected.filter((ele) => {
  //           return ele !== row.MtrlStockID;
  //         }),
  //       });
  //       //});

  //       // setSelectedSecond({
  //       //   selected: [],
  //       // });

  //       setThirdTable(newData);
  //     }
  //   },
  // };

  // createReturnVoucherFunc
  // let createReturnVoucher = async () => {
  // // console.log("selected rows = ", thirdTableData);
  //   // console.log("second = ", secondTable);

  //   get_Iv_DetailsEntry();
  //   if (thirdTableData.length === 0) {
  //     toast.error("Please select the customer");
  //   } else {
  //     //get running no and assign to RvNo
  //     let yyyy = formatDate(new Date(), 6).toString();
  //     //console.log("yy = ", yyyy);
  //     const url =
  //       endpoints.getRunningNo + "?SrlType=MaterialReturnIV&Period=" + yyyy;
  //     getRequest(url, (data) => {
  //       data.map((obj) => {
  //         let newNo = parseInt(obj.Running_No) + 1;
  //         //let no = "23/000" + newNo;
  //         let series = "";
  //         //add prefix zeros
  //         for (
  //           let i = 0;
  //           i < parseInt(obj.Length) - newNo.toString().length;
  //           i++
  //         ) {
  //           series = series + "0";
  //         }
  //         series = series + "" + newNo;
  //         // loop ends here
  //         // console.log("series = ", series);
  //         //get last 2 digit of year
  //         let yy = formatDate(new Date(), 6).toString().substring(2);
  //         let no = yy + "/" + series;
  //         //console.log("no = ", no);
  //         //console.log("first = ", firstTable);
  //         //console.log("selected rows = ", firstTableSelectedRow);
  //         //console.log("second = ", secondTable);
  //         //console.log("third = ", thirdTableData);

  //         setIVNOVal(no);

  //         let newRowMaterialIssueRegister = {
  //           IV_No: no,
  //           IV_Date: formatDate(new Date(), 5),
  //           Cust_code: props.custCode,
  //           Customer: props.custName,
  //           CustCSTNo: props.custCST,
  //           CustTINNo: props.custTIN,
  //           CustECCNo: props.custECC,
  //           CustGSTNo: props.custGST,
  //           EMail: "",
  //           PkngDcNo: "",
  //           PkngDCDate: null,
  //           TotalWeight: thirdTableData[0].TotalWeight,
  //           TotalCalculatedWeight: thirdTableData[0].TotalCalculatedWeight,
  //           UpDated: 0,
  //           IVStatus: "draft",
  //           Dc_ID: 0,
  //           Type: thirdTableData[0].Type,
  //         };
  //         //insert first table
  //         postRequest(
  //           endpoints.insertMaterialIssueRegister,
  //           newRowMaterialIssueRegister,
  //           (data) => {
  //             //console.log("data = ", data);
  //             if (data.affectedRows !== 0) {
  //             // console.log("Record inserted 1 : materialIssueRegister");
  //               //insert second table
  //               setSrlIVID(data.insertId);

  //               for (let i = 0; i < firstTableSelectedRow.length; i++) {
  //                 //find Qty
  //                 const foundArray = thirdTableData.filter((obj) => {
  //                   return (
  //                     obj.RV_No === firstTableSelectedRow[i].RV_No &&
  //                     obj.Mtrl_Code === firstTableSelectedRow[i].Mtrl_Code &&
  //                     obj.DynamicPara1 ===
  //                       firstTableSelectedRow[i].DynamicPara1 &&
  //                     obj.DynamicPara2 === firstTableSelectedRow[i].DynamicPara2
  //                   );
  //                 });
  //                 //total instock - third table added rows
  //                 let qty = foundArray.length;

  //                 //find material description
  //                 let url2 =
  //                   endpoints.getRowByShape +
  //                   "?shape=" +
  //                   firstTableSelectedRow[i].Shape;
  //                 getRequest(url2, async (data) => {
  //                   setObjShape(data);
  //                 });

  //                 let url3 =
  //                   endpoints.getRowByMtrlCode +
  //                   "?code=" +
  //                   firstTableSelectedRow[i].Mtrl_Code;
  //                 getRequest(url3, async (data) => {
  //                   setObjMaterial(data);
  //                 });

  //                 //console.log("Shape = ", objShape, " mtrl = ", objMaterial);

  //                 let mtrlDescription =
  //                   get_Iv_DetailsEntry(
  //                     firstTableSelectedRow[i].Scrap,
  //                     firstTableSelectedRow[i].DynamicPara1,
  //                     firstTableSelectedRow[i].DynamicPara2,
  //                     firstTableSelectedRow[i].DynamicPara3,
  //                     firstTableSelectedRow[i].Material,
  //                     firstTableSelectedRow[i].Shape,
  //                     objShape,
  //                     objMaterial
  //                   ) +
  //                   " ** " +
  //                   firstTableSelectedRow[i].Cust_Docu_No;
  //                 //console.log("desc = ", mtrlDescription);

  //                 let newRowMtrlIssueDetails = {
  //                   Iv_Id: data.insertId,
  //                   Srl: i + 1,
  //                   IV_Date: null,
  //                   IV_No: "",
  //                   Cust_Code: props.custCode,
  //                   Customer: "",
  //                   MtrlDescription: mtrlDescription,
  //                   Mtrl_Code: firstTableSelectedRow[i].Mtrl_Code,
  //                   Material: firstTableSelectedRow[i].Material,
  //                   PkngDCNo: "",
  //                   cust_docu_No: "",
  //                   RV_No: "",
  //                   RV_Srl: "",
  //                   Qty: qty,
  //                   TotalWeightCalculated:
  //                     firstTableSelectedRow[i].TotalCalculatedWeight,
  //                   TotalWeight: firstTableSelectedRow[i].TotalWeight,
  //                   UpDated: 0,
  //                   RvId: firstTableSelectedRow[i].RvID,
  //                   Mtrl_Rv_id: firstTableSelectedRow[i].Mtrl_Rv_id,
  //                 };
  //               // console.log(
  //                   "newRowMtrlIssueDetails : ",
  //                   newRowMtrlIssueDetails
  //                 );
  //                 postRequest(
  //                   endpoints.insertMtrlIssueDetails,
  //                   newRowMtrlIssueDetails,
  //                   async (data) => {
  //                     //console.log("data = ", data);
  //                     if (data.affectedRows !== 0) {
  //                     // console.log("Record inserted 1 : materialIssueDetails");
  //                     } else {
  //                       toast.error("Record Not Inserted");
  //                     }
  //                   }
  //                 );
  //               }
  //             } else {
  //               toast.error("Record Not Inserted");
  //             }
  //           }
  //         );

  //         //update mtrlStocklist by ivno and issue
  //         for (let i = 0; i < thirdTableData.length; i++) {
  //           const mtrlstockData = {
  //             Issue: 0,
  //             Iv_No: no,
  //             MtrlStockID: thirdTableData[i].MtrlStockID,
  //           };
  //           postRequest(
  //             endpoints.updateIssueIVNo,
  //             mtrlstockData,
  //             async (data) => {}
  //           );
  //         }

  //         //insert into material Return Details
  //         const inputDataDelete = {
  //           IV_No: no,
  //         };
  //         postRequest(
  //           endpoints.deleteMtrlStockByIVNo,
  //           inputDataDelete,
  //           async (data) => {}
  //         );

  //         //delete

  //         //update the running no
  //         const inputData = {
  //           SrlType: "MaterialReturnIV",
  //           Period: formatDate(new Date(), 6),
  //           RunningNo: newNo,
  //         };
  //         postRequest(endpoints.updateRunningNo, inputData, async (data) => {});

  //         setSrlMaterialType("material");
  //         setShow(true);
  //       });
  //     });
  //   }
  // };

  // testing for creat return voucher
  // useEffect(() => {
  //   let dataToPost = [];
  //   for (let i = 0; i < thirdTableData.length; i++) {
  //     const element = thirdTableData[i];
  //     if (dataToPost.length === 0) {
  //       dataToPost.push({ ...element, SrlNo: i + 1, Qty: 1 });
  //     } else {
  //       const filterData = dataToPost.filter(
  //         (obj) => obj.Cust_Docu_No === element.Cust_Docu_No
  //       );

  //       if (filterData.length > 0) {
  //         let changeRow = filterData[0];

  //         changeRow.Qty = changeRow.Qty + 1;
  //         dataToPost[changeRow.SrlNo - 1] = changeRow;
  //         // dataToPost[filterData.SrlNo - 1].Qty =
  //         //   dataToPost[filterData.SrlNo - 1].Qty + 1;
  //         // console.log("exist", i + 1);
  //       } else {
  //         // console.log("insert", i + 1);
  //         dataToPost.push({ ...element, SrlNo: i + 1, Qty: 1 });
  //       }

  //       // console.log("filterdata", filterData);

  //       // for (let j = 0; j < dataToPost.length; j++) {
  //       //   const datatopostElement = dataToPost[j];

  //       //   // console.log("1", datatopostElement.Cust_Docu_No);
  //       //   // console.log("2", element.Cust_Docu_No);
  //       //   // console.log(
  //       //   //   "condition",
  //       //   //   datatopostElement.Cust_Docu_No === element.Cust_Docu_No
  //       //   // );
  //       //   if (datatopostElement.Cust_Docu_No === element.Cust_Docu_No) {
  //       //     console.log("exist");
  //       //     break;
  //       //   } else {
  //       //     dataToPost.push(element);

  //       //     console.log("insert");
  //       //   }
  //       // }
  //     }
  //   }
  //   // console.log("dataToPost", dataToPost);

  //   let data = [];
  //   const abc = dataToPost.filter((obj) => obj != undefined);
  //   for (let i = 0; i < abc.length; i++) {
  //     const element = abc[i];
  //     console.log("element", element);
  //     // data.push(element);

  //     if (data.length === 0) {
  //       data.push(element);
  //     } else {
  //       // data.push(element);

  //       if (!(data.filter((obj) => obj.RVId === element.RVId).length > 0)) {
  //         data.push(element);
  //       }
  //       // else {
  //       // }

  //       // console.log(
  //       //   "mamama",
  //       //   data.filter((obj) => obj.RVId != element.RVId)
  //       // );
  //       // console.log("data element", element.RVId);

  //       // data.filter((obj) => {
  //       //   console.log("obj", obj.RVId === element.RVId, "...", obj.RVId);
  //       // });
  //     }
  //   }

  //   console.log("dataToPost", dataToPost);
  //   console.log("data", data);

  //   // console.log(
  //   //   "datafilter",
  //   //   data.filter((obj) => obj != undefined)
  //   // );
  // }, [thirdTableData]);

  const createReturnVoucherValidationFunc = () => {
    getRunningNo();
    setConfirmModalOpen(true);
  };
  const createReturnVoucherFunc = async () => {
    // console.log("running...", runningNo);

    // await delay(90);
    // console.log("runningNo", runningNo);
    if (props.custCode) {
      if (firstTableSelectedRow.length > 0 || secondTableData.length > 0) {
        if (thirdTableData.length > 0) {
          // .....................
          // //get running no and assign to RvNo
          // let SrlType = "MaterialReturnIV";
          // let yyyy = formatDate(new Date(), 6).toString();
          // let UnitName = "Jigani";
          // const url =
          //   endpoints.getRunningNo +
          //   `?SrlType=${SrlType}&Period=${yyyy}&UnitName=${UnitName}`;
          // let runningNoArr = [];
          // getRequest(url, (runningNo) => {
          //   runningNoArr = runningNo;
          //   console.log("first", runningNo);
          // });

          // // console.log("no insert", runningNoArr);

          // await delay(30);
          // if (runningNoArr.length === 0) {
          //   // console.log("need to insert");
          //   const insertRunningNoVal = {
          //     UnitName: UnitName,
          //     SrlType: SrlType,
          //     ResetPeriod: "Year",
          //     ResetValue: "0",
          //     EffectiveFrom_date: `${yyyy}-01-01`,
          //     Reset_date: `${yyyy}-12-31`,
          //     Running_No: "0",
          //     UnitIntial: "0",
          //     Prefix: "",
          //     Suffix: "",
          //     Length: "4",
          //     Period: yyyy,
          //   };

          //   postRequest(
          //     endpoints.insertRunningNo,
          //     insertRunningNoVal,
          //     (insertRunningNoData) => {
          //       console.log("insertRunningNoData", insertRunningNoData);
          //     }
          //   );

          //   getRequest(url, (runningNo) => {
          //     runningNoArr = runningNo;
          //     console.log("second", runningNo);
          //   });
          //   // await delay(30);
          //   // console.log("inserted", runningNoArr);
          // }

          // // await delay(30);
          // // +
          // // yyyy +
          // // "?UnitName=" +
          // // UnitName;

          // console.log("final", runningNoArr);

          // console.log("runningNo", runningNo);
          if (runningNo.length > 0) {
            // console.log("clicked");
            let newNo = parseInt(runningNo[0].Running_No) + 1;
            let series = "";
            if (newNo < 1000) {
              //add prefix zeros
              for (
                let i = 0;
                i < parseInt(runningNo[0].Length) - newNo.toString().length;
                i++
              ) {
                series = series + "0";
              }
              series = series + "" + newNo;
            } else {
              series = newNo;
            }
            // console.log("series", series);
            //adding last 2 digit of year
            let yy = formatDate(new Date(), 6).toString().substring(2);
            let no = yy + "/" + series;
            setIVNOVal(no);
            // creating var for register starts
            // calculating the total weights for selected materials in third table for register
            let RVTotalWeight = 0;
            let RVTotalCalWeight = 0;
            for (let i = 0; i < thirdTableData.length; i++) {
              const element = thirdTableData[i];
              // console.log("element...", element);
              RVTotalWeight =
                parseFloat(RVTotalWeight) + parseFloat(element.Weight);
              // parseFloat(RVTotalWeight) + parseFloat(element.TotalWeight);
              RVTotalCalWeight =
                parseFloat(RVTotalCalWeight) + parseFloat(element.Weight);
              // parseFloat(element.TotalCalculatedWeight);
            }
            let newRowMaterialIssueRegister = {
              IV_No: no,
              IV_Date: formatDate(new Date(), 5),
              Cust_code: props.custCode,
              Customer: props.custName,
              CustCSTNo: props.custCST,
              CustTINNo: props.custTIN,
              CustECCNo: props.custECC,
              CustGSTNo: props.custGST,
              EMail: "",
              PkngDcNo: null,
              PkngDCDate: null,
              TotalWeight: RVTotalWeight,
              TotalCalculatedWeight: RVTotalCalWeight,
              UpDated: 0,
              IVStatus: "Draft",
              Dc_ID: 0,
              Type: thirdTableData[0].Type,
            };
            // creating var for register ends now post to BE
            postRequest(
              endpoints.insertMaterialIssueRegister,
              newRowMaterialIssueRegister,
              (respRegister) => {
                //console.log("insertId", respRegister.insertId);
                // console.log("first post done in register...", data);
                if (respRegister.insertId) {
                  setSrlIVID(respRegister.insertId);
                  // creating var for details starts
                  let dataToPost = [];
                  for (let i = 0; i < thirdTableData.length; i++) {
                    const element = thirdTableData[i];
                    if (dataToPost.length === 0) {
                      dataToPost.push({
                        ...element,
                        SrlNo: i + 1,
                        Qty: 1,
                        MtrlStockID: element.MtrlStockID,
                      });
                    } else {
                      const filterData = dataToPost.filter(
                        (obj) => obj.Cust_Docu_No === element.Cust_Docu_No
                      );
                      if (filterData.length > 0) {
                        let changeRow = filterData[0];
                        changeRow.Qty = changeRow.Qty + 1;
                        dataToPost[changeRow.SrlNo - 1] = changeRow;
                      } else {
                        dataToPost.push({
                          ...element,
                          SrlNo: i + 1,
                          Qty: 1,
                          MtrlStockID: element.MtrlStockID,
                        });
                      }
                    }
                  }
                  let detailsFilteredData = [];
                  const abc = dataToPost.filter((obj) => obj != undefined);
                  for (let i = 0; i < abc.length; i++) {
                    const element = abc[i];
                    // console.log("element", element);
                    if (detailsFilteredData.length === 0) {
                      detailsFilteredData.push(element);
                    } else {
                      if (
                        !(
                          detailsFilteredData.filter(
                            (obj) => obj.RVId === element.RVId
                          ).length > 0
                        )
                      ) {
                        detailsFilteredData.push(element);
                      }
                    }
                  }
                  // console.log("dataToPost", dataToPost);
                  // console.log("detailsFilteredData", detailsFilteredData);
                  for (let j = 0; j < detailsFilteredData.length; j++) {
                    const element = detailsFilteredData[j];
                    let MtrlData;
                    let ShapeData;
                    // get mtrl data
                    for (let m = 0; m < objMaterial.length; m++) {
                      const mtrlElement = objMaterial[m];
                      if (mtrlElement.Mtrl_Code === element.Mtrl_Code) {
                        MtrlData = mtrlElement;
                        break;
                      }
                    }
                    // get shape data
                    for (let s = 0; s < objShape.length; s++) {
                      const shapeElement = objShape[s];
                      if (shapeElement.Shape === MtrlData.Shape) {
                        ShapeData = shapeElement;
                        break;
                      }
                    }
                    // generate the mtrl description
                    let mtrlDescription =
                      get_Iv_DetailsEntry(
                        element.Scrap,
                        element.DynamicPara1,
                        element.DynamicPara2,
                        element.DynamicPara3,
                        element.Material,
                        MtrlData.Shape,
                        ShapeData,
                        MtrlData
                      ) +
                      " /** " +
                      element.Cust_Docu_No;
                    // console.log("mtrlDescription", mtrlDescription);
                    let newRowMtrlIssueDetails = {
                      Iv_Id: respRegister.insertId,
                      Srl: j + 1,
                      IV_Date: null,
                      IV_No: "",
                      Cust_Code: props.custCode,
                      Customer: "",
                      MtrlDescription: mtrlDescription,
                      Mtrl_Code: element.Mtrl_Code,
                      Material: element.Material,
                      PkngDCNo: "",
                      cust_docu_No: element.Cust_Docu_No,
                      RV_No: element.RV_No,
                      RV_Srl: "",
                      Qty: element.Qty,
                      TotalWeightCalculated: (
                        parseFloat(element.Qty) * parseFloat(element.Weight)
                      )
                        // parseFloat(element.TotalCalculatedWeight)
                        .toFixed(3),
                      TotalWeight: (
                        parseFloat(element.Qty) * parseFloat(element.Weight)
                      )
                        // parseFloat(element.TotalWeight)
                        .toFixed(3),
                      UpDated: 0,
                      RvId: element.RvID || 0,
                      Mtrl_Rv_id: element.Mtrl_Rv_id,
                    };
                    // console.log(
                    //   "newRowMtrlIssueDetails",
                    //   newRowMtrlIssueDetails
                    // );
                    // post to details
                    postRequest(
                      endpoints.insertMtrlIssueDetails,
                      newRowMtrlIssueDetails,
                      async (issueDetailsData) => {
                        //console.log("data = ", data);
                        if (issueDetailsData.affectedRows !== 0) {
                          // console.log(
                          //   `Record inserted ${
                          //     j + 1
                          //   } : materialIssueDetails`
                          // );
                          // toast.success('Data recoreded sucessfully')
                        } else {
                          toast.error("Uncaught Error (002)");
                        }
                      }
                    );
                  }
                  for (let i = 0; i < thirdTableData.length; i++) {
                    const element = thirdTableData[i];
                    const mtrlstockData = {
                      Issue: 1,
                      Iv_No: no,
                      MtrlStockID: element.MtrlStockID,
                    };
                    postRequest(
                      endpoints.updateIssueIVNo,
                      mtrlstockData,
                      async (mtrlUpdateData) => {
                        // console.log(
                        //   "mtrlUpdateData...",
                        //   mtrlUpdateData
                        // );
                        const inputData = {
                          SrlType: "MaterialReturnIV",
                          Period: formatDate(new Date(), 6),
                          RunningNo: newNo,
                        };
                        postRequest(
                          endpoints.updateRunningNo,
                          inputData,
                          async (updateRunningNoData) => {
                            // console.log(
                            //   "updateRunningNoData",
                            //   updateRunningNoData
                            // );
                            // toast.success(
                            //   "Data inserted successfully..."
                            // );
                            setSrlMaterialType("material");
                            setShow(true);
                          }
                        );
                      }
                    );
                  }
                } else {
                  toast.error("Uncaught error while posting data (001)");
                }
              }
            );
            //......................................................................................
            // // creating var for details starts
            // let dataToPost = [];
            // for (let i = 0; i < thirdTableData.length; i++) {
            //   const element = thirdTableData[i];
            //   if (dataToPost.length === 0) {
            //     dataToPost.push({ ...element, SrlNo: i + 1, Qty: 1 });
            //   } else {
            //     const filterData = dataToPost.filter(
            //       (obj) => obj.Cust_Docu_No === element.Cust_Docu_No
            //     );
            //     if (filterData.length > 0) {
            //       let changeRow = filterData[0];
            //       changeRow.Qty = changeRow.Qty + 1;
            //       dataToPost[changeRow.SrlNo - 1] = changeRow;
            //     } else {
            //       dataToPost.push({ ...element, SrlNo: i + 1, Qty: 1 });
            //     }
            //   }
            // }
            // let data = [];
            // const abc = dataToPost.filter((obj) => obj != undefined);
            // for (let i = 0; i < abc.length; i++) {
            //   const element = abc[i];
            //   // console.log("element", element);
            //   if (data.length === 0) {
            //     data.push(element);
            //   } else {
            //     if (
            //       !(
            //         data.filter((obj) => obj.RVId === element.RVId).length > 0
            //       )
            //     ) {
            //       data.push(element);
            //     }
            //   }
            // }
            // // console.log("dataToPost", dataToPost);
            // // console.log("data", data);
            // for (let j = 0; j < data.length; j++) {
            //   const element = data[j];
            //   let MtrlData;
            //   let ShapeData;
            //   // get mtrl data
            //   for (let m = 0; m < objMaterial.length; m++) {
            //     const mtrlElement = objMaterial[m];
            //     if (mtrlElement.Mtrl_Code === element.Mtrl_Code) {
            //       MtrlData = mtrlElement;
            //       break;
            //     }
            //   }
            //   // get shape data
            //   for (let s = 0; s < objShape.length; s++) {
            //     const shapeElement = objShape[s];
            //     if (shapeElement.Shape === MtrlData.Shape) {
            //       ShapeData = shapeElement;
            //       break;
            //     }
            //   }
            //   // generate the mtrl description
            //   let mtrlDescription =
            //     get_Iv_DetailsEntry(
            //       element.Scrap,
            //       element.DynamicPara1,
            //       element.DynamicPara2,
            //       element.DynamicPara3,
            //       element.Material,
            //       MtrlData.Shape,
            //       ShapeData,
            //       MtrlData
            //     ) +
            //     " /** " +
            //     element.Cust_Docu_No;
            //   // console.log("mtrlDescription", mtrlDescription);
            //   let newRowMtrlIssueDetails = {
            //     Iv_Id: "data.insertId from register",
            //     Srl: "sl no from loop",
            //     IV_Date: null,
            //     IV_No: "",
            //     Cust_Code: props.custCode,
            //     Customer: "",
            //     MtrlDescription: mtrlDescription,
            //     Mtrl_Code: element.Mtrl_Code,
            //     Material: element.Material,
            //     PkngDCNo: "",
            //     cust_docu_No: element.Cust_Docu_No,
            //     RV_No: element.RV_No,
            //     RV_Srl: "",
            //     Qty: element.Qty,
            //     TotalWeightCalculated: (
            //       parseFloat(element.Qty) *
            //       parseFloat(element.TotalCalculatedWeight)
            //     ).toFixed(3),
            //     TotalWeight: (
            //       parseFloat(element.Qty) * parseFloat(element.TotalWeight)
            //     ).toFixed(3),
            //     UpDated: 0,
            //     RvId: element.RvID || 0,
            //     Mtrl_Rv_id: element.Mtrl_Rv_id,
            //   };
            //   console.log("newRowMtrlIssueDetails", newRowMtrlIssueDetails);
            // }
            // old 1
            // console.log("clicked", thirdTableData);
            // let detailsDataToPosted = [];
            // for (let j = 0; j < thirdTableData.length; j++) {
            //   const element = thirdTableData[j];
            //   let MtrlData;
            //   let ShapeData;
            //   // get mtrl data
            //   for (let m = 0; m < objMaterial.length; m++) {
            //     const mtrlElement = objMaterial[m];
            //     if (mtrlElement.Mtrl_Code === element.Mtrl_Code) {
            //       MtrlData = mtrlElement;
            //       break;
            //     }
            //   }
            //   // get shape data
            //   for (let s = 0; s < objShape.length; s++) {
            //     const shapeElement = objShape[s];
            //     if (shapeElement.Shape === MtrlData.Shape) {
            //       ShapeData = shapeElement;
            //       break;
            //     }
            //   }
            //   // generate the mtrl description
            //   let mtrlDescription =
            //     get_Iv_DetailsEntry(
            //       element.Scrap,
            //       element.DynamicPara1,
            //       element.DynamicPara2,
            //       element.DynamicPara3,
            //       element.Material,
            //       MtrlData.Shape,
            //       ShapeData,
            //       MtrlData
            //     ) +
            //     " /** " +
            //     element.Cust_Docu_No;
            //   console.log("mtrlDescription", mtrlDescription);
            //   let newRowMtrlIssueDetails = {
            //     Iv_Id: "data.insertId from register",
            //     Srl: "sl no from loop",
            //     IV_Date: null,
            //     IV_No: "",
            //     Cust_Code: props.custCode,
            //     Customer: "",
            //     MtrlDescription: mtrlDescription,
            //     Mtrl_Code: element.Mtrl_Code,
            //     Material: element.Material,
            //     PkngDCNo: "",
            //     cust_docu_No: element.Cust_Docu_No,
            //     RV_No: element.RV_No,
            //     RV_Srl: "",
            //     Qty: 1,
            //     TotalWeightCalculated: element.TotalCalculatedWeight,
            //     TotalWeight: element.TotalWeight,
            //     UpDated: 0,
            //     RvId: element.RvID || 0,
            //     Mtrl_Rv_id: element.Mtrl_Rv_id,
            //   };
            //   if (detailsDataToPosted.length === 0) {
            //     // no data, simply push it...
            //     detailsDataToPosted.push(newRowMtrlIssueDetails);
            //   } else {
            //     // data found, verify and push...
            //     detailsDataToPosted.map((val, key) => {
            //       // if data exist in array
            //       // console.log("vallll", val.MtrlDescription);
            //       if (
            //         val.MtrlDescription ===
            //         newRowMtrlIssueDetails.MtrlDescription
            //       ) {
            //         let newQty =
            //           parseInt(val.Qty) +
            //           parseInt(newRowMtrlIssueDetails.Qty);
            //         let newTotalWeight =
            //           parseFloat(val.TotalWeight) +
            //           parseFloat(newRowMtrlIssueDetails.TotalWeight);
            //         let newTotalWeightCalculated =
            //           parseFloat(val.TotalWeightCalculated) +
            //           parseFloat(
            //             newRowMtrlIssueDetails.TotalWeightCalculated
            //           );
            //         detailsDataToPosted[key].Qty = newQty;
            //         detailsDataToPosted[key].TotalWeight = newTotalWeight;
            //         detailsDataToPosted[key].TotalWeightCalculated =
            //           newTotalWeightCalculated;
            //       } else {
            //         detailsDataToPosted.push(newRowMtrlIssueDetails);
            //       }
            //     });
            //   }
            // }
            // console.log("datatatata", detailsDataToPosted);
          } else {
            toast.error("Unable to create the running no");
          }
        } else {
          toast.error(
            "Select atleast one Material for creating the return voucher"
          );
        }
      } else {
        toast.error("Select the Document for creating the return voucher");
      }
    } else {
      toast.error("Select the Customer for creating the return voucher");
    }
  };

  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-9 p-0">
            {/* <div className="row">
            <div className="col-md-4">
              <div className="rvNO">
                <label className="form-label">RV No</label>
                <input
                  type="text"
                  name="rvNo"
                  disabled
                  value={rvNoval}
                  // className="in-field"
                />
              </div>
            </div>
            <div className="col-md-8">
              <div className="customerRef">
                <label className="form-label">Customer Ref</label>
                <input
                  // className="in-field"
                  type="text"
                  name="customerRef"
                  disabled
                  value={custRefval}
                />
              </div>
            </div>
          </div> */}
          </div>
          <div className="col-md-3">
            <div className="d-flex align-items-center justify-content-end">
              <button
                className="button-style mx-0"
                style={{ width: "200px" }}
                // onClick={createReturnVoucherFunc}
                onClick={(e) => {
                  createReturnVoucherValidationFunc();
                }}
              >
                Create Return Voucher
              </button>
            </div>
          </div>
        </div>
        <div className="p-2"></div>

        <div className="row">
          <div className="col-md-12">
            <div
              style={{
                maxHeight: "400px",
                overflow: "auto",
              }}
            >
              <FirstTable
                firstTableData={firstTableData}
                selectRowFirstFun={selectRowFirstFun}
                firstTableSelectedRow={firstTableSelectedRow}
                thirdTableData={thirdTableData}
                setThirdTableData={setThirdTableData}
                allData={allData}
              />

              {/* <BootstrapTable
            keyField="id"
            columns={columnsFirst}
            data={firstTable}
            striped
            hover
            condensed
            selectRow={selectRowFirst}
            headerClasses="header-class tableHeaderBGColor"
          ></BootstrapTable> */}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div style={{ maxHeight: "400px", overflow: "auto" }}>
              <SecondTable
                secondTableData={secondTableData}
                selectRowSecondFun={selectRowSecondFun}
                thirdTableData={thirdTableData}
              />
              {/* <BootstrapTable
              keyField="MtrlStockID"
              columns={columnsSecond}
              data={secondTable}
              striped
              hover
              condensed
              selectRow={selectRowSecond}
              headerClasses="header-class tableHeaderBGColor"
            ></BootstrapTable> */}
            </div>
          </div>
          <div className="col-md-6">
            <div style={{ maxHeight: "400px", overflow: "auto" }}>
              <ThirdTable thirdTableData={thirdTableData} />
              {/* <BootstrapTable
              keyField="MtrlStockID"
              columns={columnsThird}
              data={thirdTable}
              striped
              hover
              condensed
              headerClasses="header-class tableHeaderBGColor"
            ></BootstrapTable> */}
            </div>
          </div>
        </div>
      </div>

      {/* create return voucher modal  */}
      <CreateReturnNewModal
        show={show}
        setShow={setShow}
        srlMaterialType={srlMaterialType}
        srlIVID={srlIVID}
        IVNOVal={IVNOVal}
      />

      {/* confirmation modal */}
      <ConfirmationModal
        confirmModalOpen={confirmModalOpen}
        setConfirmModalOpen={setConfirmModalOpen}
        // yesClickedFunc={cancelPN}
        yesClickedFunc={createReturnVoucherFunc}
        message={"Are you sure to create the return voucher ?"}
      />
    </>
  );
}

export default PofilesMaterials;

// <div>
// <button
//   className="button-style"
//   style={{ width: "200px" }}
//   onClick={createReturnVoucherFunc}
// >
//   Create Return Voucher
// </button>
// </div>
// <div className="row-md-12 table-data mt-3">
// <div
//   style={{
//     maxHeight: "400px",
//     overflow: "auto",
//   }}
// >
//   <FirstTable
//     firstTableData={firstTableData}
//     selectRowFirstFun={selectRowFirstFun}
//     firstTableSelectedRow={firstTableSelectedRow}
//     thirdTableData={thirdTableData}
//     setThirdTableData={setThirdTableData}
//     allData={allData}
//   />

//   {/* <BootstrapTable
//     keyField="id"
//     columns={columnsFirst}
//     data={firstTable}
//     striped
//     hover
//     condensed
//     selectRow={selectRowFirst}
//     headerClasses="header-class tableHeaderBGColor"
//   ></BootstrapTable> */}
// </div>
// </div>
// <div className="row mt-3">
// <div className="col-md-6 col-sm-12">
//   <div style={{ maxHeight: "400px", overflow: "auto" }}>
//     <SecondTable
//       secondTableData={secondTableData}
//       selectRowSecondFun={selectRowSecondFun}
//       thirdTableData={thirdTableData}
//     />
//     {/* <BootstrapTable
//       keyField="MtrlStockID"
//       columns={columnsSecond}
//       data={secondTable}
//       striped
//       hover
//       condensed
//       selectRow={selectRowSecond}
//       headerClasses="header-class tableHeaderBGColor"
//     ></BootstrapTable> */}
//   </div>
// </div>
// <div className="col-md-6 col-sm-12">
//   <div style={{ maxHeight: "400px", overflow: "auto" }}>
//     <ThirdTable thirdTableData={thirdTableData} />
//     {/* <BootstrapTable
//       keyField="MtrlStockID"
//       columns={columnsThird}
//       data={thirdTable}
//       striped
//       hover
//       condensed
//       headerClasses="header-class tableHeaderBGColor"
//     ></BootstrapTable> */}
//   </div>
// </div>
// </div>
