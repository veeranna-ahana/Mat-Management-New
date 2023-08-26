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

  let [firstTableData, setFirstTableData] = useState([]);
  let [secondTableData, setSecondTableData] = useState([]);
  let [thirdTable, setThirdTable] = useState([]);
  let [objShape, setObjShape] = useState({});
  let [objMaterial, setObjMaterial] = useState({});

  let [selectedSecond, setSelectedSecond] = useState({ selected: [] });

  let [firstTableSelectedRow, setFirstTableSelectedRow] = useState([]);

  let [allData, setAllData] = useState([]);

  let [propsValue, setPropsValue] = useState(props.custCode);

  const handleShow = () => setShow(true);

  const fetchData = () => {
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
      });

      //fetch second table data
      let url2 =
        endpoints.profileMaterialSecond + "?Cust_Code=" + props.custCode;
      getRequest(url2, (data) => {
        setAllData(data);
      });
    }
  };

  useEffect(() => {
    //setPropsValue(props.custCode);
    fetchData();
    //console.log("S props value = ", propsValue);
  }, [props.custCode]);

  const columnsFirst = [
    {
      text: "#",
      dataField: "id",
      hidden: true,
    },
    {
      text: "RV No",
      dataField: "RV_No",
      editable: false,
    },
    {
      text: "Cust Document",
      dataField: "Cust_Docu_No",
      editable: false,
    },
    {
      text: "Mtrl code",
      dataField: "Mtrl_Code",
      editable: false,
    },
    {
      text: "Width",
      dataField: "DynamicPara1",
      editable: false,
    },
    {
      text: "Length",
      dataField: "DynamicPara2",
      editable: false,
    },
    {
      text: "Scrap",
      dataField: "Scrap",
      editable: false,
      formatter: (celContent, row) => (
        <div className="checkbox">
          <lable>
            <input type="checkbox" checked={celContent === 0 ? false : true} />
          </lable>
        </div>
      ),
    },
    {
      text: "Weight",
      dataField: "Weight",
      editable: false,
    },
    {
      text: "Scrap Weight",
      dataField: "ScrapWeight",
      editable: false,
    },
    {
      text: "In Stock",
      dataField: "InStock",
      editable: false,
    },
    /*    {
      text: "Issue",
      dataField: "Issue",
      type: "bool",
      //editable: true,
      editor: {
        type: Type.CHECKBOX,
        value: "true:false",
      },
      formatter: (celContent, row) => (
        <div className="checkbox">
          <lable>
            <input
              type="checkbox"
              onChange={firstTableCheckoxChange(row)}
              checked={celContent === true ? true : false}
            />
          </lable>
        </div>
      ),
    },*/
  ];

  const columnsSecond = [
    /*{
      text: "#",
      dataField: "id",
      hidden: true,
    },*/
    {
      text: "MtrlStockID",
      dataField: "MtrlStockID",
      editable: false,
    },
    {
      text: "Issue",
      dataField: "Issue",
      type: "bool",
      editor: {
        type: Type.CHECKBOX,
        value: "true:false",
      },
      formatter: (celContent, row) => (
        <div className="checkbox">
          <lable>
            <input
              type="checkbox"
              checked={celContent === true ? true : false}
            />
          </lable>
        </div>
      ),
    },
    {
      text: "Weight",
      dataField: "Weight",
      editable: false,
    },
    {
      text: "ScrapWeight",
      dataField: "ScrapWeight",
      editable: false,
    },
    {
      text: "RVId",
      dataField: "RVId",
      editable: false,
    },
  ];
  const columnsThird = [
    {
      text: "#",
      dataField: "id",
      hidden: true,
    },
    {
      text: "MtrlStockID",
      dataField: "MtrlStockID",
      editable: false,
    },
    {
      text: "Mtrl_Code",
      dataField: "Mtrl_Code",
      editable: false,
    },
    {
      text: "DynamicPara1",
      dataField: "DynamicPara1",
      editable: false,
    },
    {
      text: "DynamicPara2",
      dataField: "DynamicPara2",
      editable: false,
    },
    {
      text: "Weight",
      dataField: "Weight",
      editable: false,
    },
  ];
  // console.log("selected first table..", firstTableSelectedRow);

  const selectRowFirstFun = (rowData) => {
    console.log("clciked................", rowData);

    // console.log("all, data", allData);
    setFirstTableSelectedRow([]);
    setFirstTableSelectedRow(rowData);

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
    //     console.log("data inside...", element);
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

    // //       console.log("newArray... getting the selected row data...", newArray);

    // //       let arr = [];
    // //       //mark checkbox of second table
    // //       newArray.forEach(async (item, i) => {
    // //         arr = [...arr, item.MtrlStockID];
    // //       });

    // //       console.log("arr...getting all the selected mtrlstockids ", arr);

    // //       // selecting all the mtrlstckids by default in second table

    // //       // setSelectedSecond({
    // //       //   selected: arr,
    // //       // });

    // //       setSelectedSecond({
    // //         selected: [],
    // //       });

    // //       //console.log("new array = ", newArray);
    // //       console.log("selectedSecond...... ", selectedSecond);
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
  const selectRowSecond = {
    mode: "checkbox",
    clickToSelect: true,
    bgColor: "#8A92F0",
    selected: selectedSecond.selected,
    onSelect: (row, isSelect) => {
      if (isSelect) {
        //setFirstTableSingleRow(row);
        //console.log("third table = ", thirdTable);
        //console.log("row = ", row);

        const newArray = allData.filter((obj) => {
          return obj.MtrlStockID === row.MtrlStockID;
        });

        let arr = [];
        //mark checkbox of second table
        newArray.forEach(async (item, i) => {
          arr = [...selectedSecond.selected, item.MtrlStockID];
        });
        setSelectedSecond({
          selected: arr,
        });
        //console.log("new array = ", newArray);
        //console.log("selected = ", selectedSecond);
        //setSecondTable(newArray);
        thirdTable.push.apply(thirdTable, newArray);
        setThirdTable(thirdTable);
      } else {
        //console.log("third table = ", thirdTable);
        //console.log("row = ", row);
        let newData = thirdTable.filter((obj, index) => {
          return obj.MtrlStockID !== row.MtrlStockID;
        });

        //secondTable.forEach((item, i) => {
        setSelectedSecond({
          selected: selectedSecond.selected.filter((ele) => {
            return ele !== row.MtrlStockID;
          }),
        });
        //});

        // setSelectedSecond({
        //   selected: [],
        // });

        setThirdTable(newData);
      }
    },
  };
  let createReturnVoucher = async () => {
    //console.log("selected rows = ", firstTableSelectedRow);
    //console.log("second = ", secondTable);

    get_Iv_DetailsEntry();
    if (thirdTable.length === 0) {
      toast.error("Please select the customer");
    } else {
      //get running no and assign to RvNo
      let yyyy = formatDate(new Date(), 6).toString();
      //console.log("yy = ", yyyy);
      const url =
        endpoints.getRunningNo + "?SrlType=MaterialReturnIV&Period=" + yyyy;
      getRequest(url, (data) => {
        data.map((obj) => {
          let newNo = parseInt(obj.Running_No) + 1;
          //let no = "23/000" + newNo;
          let series = "";
          //add prefix zeros
          for (
            let i = 0;
            i < parseInt(obj.Length) - newNo.toString().length;
            i++
          ) {
            series = series + "0";
          }
          series = series + "" + newNo;
          //console.log("series = ", series);
          //get last 2 digit of year
          let yy = formatDate(new Date(), 6).toString().substring(2);
          let no = yy + "/" + series;
          //console.log("no = ", no);
          //console.log("first = ", firstTable);
          //console.log("selected rows = ", firstTableSelectedRow);
          //console.log("second = ", secondTable);
          //console.log("third = ", thirdTable);

          setIVNOVal(no);

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
            PkngDcNo: "",
            PkngDCDate: null,
            TotalWeight: thirdTable[0].TotalWeight,
            TotalCalculatedWeight: thirdTable[0].TotalCalculatedWeight,
            UpDated: 0,
            IVStatus: "draft",
            Dc_ID: 0,
            Type: thirdTable[0].Type,
          };
          //insert first table
          postRequest(
            endpoints.insertMaterialIssueRegister,
            newRowMaterialIssueRegister,
            (data) => {
              //console.log("data = ", data);
              if (data.affectedRows !== 0) {
                //console.log("Record inserted 1 : materialIssueRegister");
                //insert second table
                setSrlIVID(data.insertId);

                for (let i = 0; i < firstTableSelectedRow.length; i++) {
                  //find Qty
                  const foundArray = thirdTable.filter((obj) => {
                    return (
                      obj.RV_No === firstTableSelectedRow[i].RV_No &&
                      obj.Mtrl_Code === firstTableSelectedRow[i].Mtrl_Code &&
                      obj.DynamicPara1 ===
                        firstTableSelectedRow[i].DynamicPara1 &&
                      obj.DynamicPara2 === firstTableSelectedRow[i].DynamicPara2
                    );
                  });
                  //total instock - third table added rows
                  let qty = foundArray.length;

                  //find material description
                  let url2 =
                    endpoints.getRowByShape +
                    "?shape=" +
                    firstTableSelectedRow[i].Shape;
                  getRequest(url2, async (data) => {
                    setObjShape(data);
                  });

                  let url3 =
                    endpoints.getRowByMtrlCode +
                    "?code=" +
                    firstTableSelectedRow[i].Mtrl_Code;
                  getRequest(url3, async (data) => {
                    setObjMaterial(data);
                  });

                  //console.log("Shape = ", objShape, " mtrl = ", objMaterial);

                  let mtrlDescription =
                    get_Iv_DetailsEntry(
                      firstTableSelectedRow[i].Scrap,
                      firstTableSelectedRow[i].DynamicPara1,
                      firstTableSelectedRow[i].DynamicPara2,
                      firstTableSelectedRow[i].DynamicPara3,
                      firstTableSelectedRow[i].Material,
                      firstTableSelectedRow[i].Shape,
                      objShape,
                      objMaterial
                    ) +
                    " ** " +
                    firstTableSelectedRow[i].Cust_Docu_No;
                  //console.log("desc = ", mtrlDescription);

                  let newRowMtrlIssueDetails = {
                    Iv_Id: data.insertId,
                    Srl: i + 1,
                    IV_Date: null,
                    IV_No: "",
                    Cust_Code: props.custCode,
                    Customer: "",
                    MtrlDescription: mtrlDescription,
                    Mtrl_Code: firstTableSelectedRow[i].Mtrl_Code,
                    Material: firstTableSelectedRow[i].Material,
                    PkngDCNo: "",
                    cust_docu_No: "",
                    RV_No: "",
                    RV_Srl: "",
                    Qty: qty,
                    TotalWeightCalculated:
                      firstTableSelectedRow[i].TotalCalculatedWeight,
                    TotalWeight: firstTableSelectedRow[i].TotalWeight,
                    UpDated: 0,
                    RvId: firstTableSelectedRow[i].RvID,
                    Mtrl_Rv_id: firstTableSelectedRow[i].Mtrl_Rv_id,
                  };
                  //console.log(
                  //   "newRowMtrlIssueDetails : ",
                  //   newRowMtrlIssueDetails
                  // );
                  postRequest(
                    endpoints.insertMtrlIssueDetails,
                    newRowMtrlIssueDetails,
                    async (data) => {
                      //console.log("data = ", data);
                      if (data.affectedRows !== 0) {
                        //console.log("Record inserted 1 : materialIssueDetails");
                      } else {
                        toast.error("Record Not Inserted");
                      }
                    }
                  );
                }
              } else {
                toast.error("Record Not Inserted");
              }
            }
          );

          //update mtrlStocklist by ivno and issue
          for (let i = 0; i < thirdTable.length; i++) {
            const mtrlstockData = {
              Issue: 0,
              Iv_No: no,
              MtrlStockID: thirdTable[i].MtrlStockID,
            };
            postRequest(
              endpoints.updateIssueIVNo,
              mtrlstockData,
              async (data) => {}
            );
          }

          //insert into material Return Details
          const inputDataDelete = {
            IV_No: no,
          };
          postRequest(
            endpoints.deleteMtrlStockByIVNo,
            inputDataDelete,
            async (data) => {}
          );

          //delete

          //update the running no
          const inputData = {
            SrlType: "MaterialReturnIV",
            Period: formatDate(new Date(), 6),
            RunningNo: newNo,
          };
          postRequest(endpoints.updateRunningNo, inputData, async (data) => {});

          setSrlMaterialType("material");
          setShow(true);
        });
      });
    }
  };
  return (
    <>
      <div>
        <button
          className="button-style"
          style={{ width: "200px" }}
          onClick={createReturnVoucher}
        >
          Create Return Voucher
        </button>
      </div>
      <div className="row-md-12 table-data mt-3">
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
          />
          {/* <Table
            hover
            condensed
            className="table-data border header-class table-striped"
          >
            <thead className="text-white">
              <tr>
                <th>Sl No</th>
                <th>RV No</th>
                <th>Cust Document</th>
                <th>Mtrl code</th>
                <th>Width</th>
                <th>Length</th>
                <th>Scrap</th>
                <th>Weight</th>
                <th>Scrap Weight</th>
                <th>In Stock</th>
                <th>Issue</th>
              </tr>
            </thead>
            <tbody>
              {firstTable.map((val, k) => (
                <tr
                  onClick={() => selectRowFirst(val)}
                  // className={
                  //   val.DC_Inv_No === selectedSecond ? "selectedRowClr" : ""
                  // }
                >
                  <td>{k + 1}</td>
                  <td>{val.RV_No}</td>
                  <td>{val.Cust_Docu_No}</td>
                  <td>{val.Mtrl_Code}</td>
                  <td>{val.DynamicPara1}</td>
                  <td>{val.DynamicPara2}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={val.Scrap === 0 ? false : true}
                    />
                  </td>
                  <td>{val.Weight}</td>
                  <td>{val.ScrapWeight}</td>
                  <td>{val.InStock}</td>
                  <td>
                    <input type="checkbox" name="" id="" />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table> */}

          {/* <BootstrapTable
            keyField="id"
            columns={columnsFirst}
            data={firstTable}
            striped
            hover
            condensed
            selectRow={selectRowFirst}
            headerClasses="header-class "
          ></BootstrapTable> */}
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6 col-sm-12">
          <div style={{ maxHeight: "400px", overflow: "auto" }}>
            {" "}
            <SecondTable secondTableData={secondTableData} />
            {/* <BootstrapTable
              keyField="MtrlStockID"
              columns={columnsSecond}
              data={secondTable}
              striped
              hover
              condensed
              selectRow={selectRowSecond}
              headerClasses="header-class "
            ></BootstrapTable> */}
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div style={{ maxHeight: "400px", overflow: "auto" }}>
            <ThirdTable />
            {/* <BootstrapTable
              keyField="MtrlStockID"
              columns={columnsThird}
              data={thirdTable}
              striped
              hover
              condensed
              headerClasses="header-class "
            ></BootstrapTable> */}
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
