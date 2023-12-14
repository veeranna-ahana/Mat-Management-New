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

  let [propsValue, setPropsValue] = useState(props.custCode);

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
        data.forEach((item, i) => {
          item.id = i + 1;
          item.Issue = false;
        });
        setFirstTableData(data);
        // console.log("first table...", data);
      });

      //fetch second table data
      let url2 =
        endpoints.profileMaterialSecond + "?Cust_Code=" + props.custCode;
      getRequest(url2, (data) => {
        setAllData(data);
        // console.log("all data...", data);
      });
    }
  };

  useEffect(() => {
    //setPropsValue(props.custCode);
    fetchData();
    //console.log("S props value = ", propsValue);
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

  const createReturnVoucherFunc = () => {
    // console.log(
    //   "props.custCode",
    //   props.custCode,
    //   "secondTableData",
    //   secondTableData,
    //   "firstTableSelectedRow",
    //   firstTableSelectedRow,
    //   "thirdTableData",
    //   thirdTableData
    // );

    if (props.custCode) {
      if (firstTableSelectedRow.length > 0 || secondTableData.length > 0) {
        if (thirdTableData.length > 0) {
          // console.log("third table data", thirdTableData);
          //get running no and assign to RvNo
          let yyyy = formatDate(new Date(), 6).toString();
          //console.log("yy = ", yyyy);
          const url =
            endpoints.getRunningNo + "?SrlType=MaterialReturnIV&Period=" + yyyy;
          getRequest(url, (data) => {
            data.map((obj) => {
              let newNo = parseInt(obj.Running_No) + 1;
              //let no = "23/000" + newNo;
              // console.log("newNo", newNo);
              let series = "";
              if (newNo < 1000) {
                //add prefix zeros
                for (
                  let i = 0;
                  i < parseInt(obj.Length) - newNo.toString().length;
                  i++
                ) {
                  series = series + "0";
                }
                series = series + "" + newNo;
              } else {
                series = newNo;
              }
              // loop ends here
              // console.log("series = ", series);
              //get last 2 digit of year
              let yy = formatDate(new Date(), 6).toString().substring(2);
              let no = yy + "/" + series;
              //console.log("no = ", no);
              // console.log("nonnonono", no);
              //console.log("first = ", firstTable);
              //console.log("selected rows = ", firstTableSelectedRow);
              //console.log("second = ", secondTable);
              //console.log("third = ", thirdTableData);

              setIVNOVal(no);
              // console.log("no", no);

              // calculating the total weights for selected materials in third table
              let RVTotalWeight = 0;
              let RVTotalCalWeight = 0;
              for (let i = 0; i < thirdTableData.length; i++) {
                const element = thirdTableData[i];
                // console.log("elemt", element);
                RVTotalWeight =
                  parseFloat(RVTotalWeight) + parseFloat(element.TotalWeight);
                RVTotalCalWeight =
                  parseFloat(RVTotalCalWeight) +
                  parseFloat(element.TotalCalculatedWeight);
              }
              // loop ends..........................

              // console.log(
              //   "total weight",
              //   RVTotalWeight,
              //   "cal weight",
              //   RVTotalCalWeight
              // );

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
              postRequest(
                endpoints.insertMaterialIssueRegister,
                newRowMaterialIssueRegister,
                (data) => {
                  // console.log("first post done in register...", data);

                  if (data.insertId) {
                    setSrlIVID(data.insertId);
                    for (let j = 0; j < thirdTableData.length; j++) {
                      const element = thirdTableData[j];

                      //find material

                      let url3 =
                        endpoints.getRowByMtrlCode +
                        "?code=" +
                        element.Mtrl_Code;
                      getRequest(url3, async (MtrlData) => {
                        setObjMaterial(MtrlData);
                        // console.log("material data..", MtrlData);

                        //find shape
                        let url2 =
                          endpoints.getRowByShape + "?shape=" + MtrlData.Shape;
                        getRequest(url2, async (shapeData) => {
                          setObjShape(shapeData);
                          // console.log("shape data..", shapeData);

                          let mtrlDescription =
                            get_Iv_DetailsEntry(
                              element.Scrap,
                              element.DynamicPara1,
                              element.DynamicPara2,
                              element.DynamicPara3,
                              element.Material,
                              MtrlData.Shape,
                              shapeData,
                              MtrlData
                            ) +
                            " /** " +
                            element.Cust_Docu_No;
                          // testing for print without dimension , dc and date...
                          // console.log(
                          //   "mtrlDescription",
                          //   mtrlDescription
                          //     ?.split("/**")[0]
                          //     ?.split(".00")[0]
                          //     ?.replace(/[0-9]/g, "")
                          //     ?.split("Quantity")[0]
                          // );
                          // console.log(
                          //   "mtrlDescription",
                          //   mtrlDescription,
                          //   "no.....",
                          //   j
                          // );

                          let newRowMtrlIssueDetails = {
                            Iv_Id: data.insertId,
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
                            Qty: 1,
                            TotalWeightCalculated:
                              element.TotalCalculatedWeight,
                            TotalWeight: element.TotalWeight,
                            UpDated: 0,
                            RvId: element.RvID ? element.RvID : 0,
                            Mtrl_Rv_id: element.Mtrl_Rv_id,
                          };
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
                              } else {
                                toast.error("Uncaught Error (002)");
                              }
                            }
                          );
                        });
                      });
                    }

                    // let mtrlDescription =
                    // get_Iv_DetailsEntry(
                    //   firstTableSelectedRow[i].Scrap,
                    //   firstTableSelectedRow[i].DynamicPara1,
                    //   firstTableSelectedRow[i].DynamicPara2,
                    //   firstTableSelectedRow[i].DynamicPara3,
                    //   firstTableSelectedRow[i].Material,
                    //   firstTableSelectedRow[i].Shape,
                    //   objShape,
                    //   objMaterial
                    // ) +
                    // " ** " +
                    // firstTableSelectedRow[i].Cust_Docu_No;
                  } else {
                    toast.error("Uncaught error while posting data (001)");
                  }
                }
              );
            });
          });
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
                onClick={createReturnVoucherFunc}
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
