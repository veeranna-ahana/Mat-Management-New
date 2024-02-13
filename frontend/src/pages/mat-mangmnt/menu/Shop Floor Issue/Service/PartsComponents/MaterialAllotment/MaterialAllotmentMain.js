import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import { toast } from "react-toastify";
import { formatDate } from "../../../../../../../utils";

const {
  getRequest,
  postRequest,
} = require("../../../../../../api/apiinstance");

const { endpoints } = require("../../../../../../api/constants");

function MaterialAllotmentMain() {
  const location = useLocation();
  const nav = useNavigate();
  console.log("ncid = ", location?.state?.ncid);
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const [formHeader, setFormHeader] = useState({});
  const [firstTable, setFirstTable] = useState([]);
  const [secondTable, setSecondTable] = useState([]);
  const [custBOMIdArray, setCustBOMIdArray] = useState([]);
  const [custBOMId, setCustBOMId] = useState([]);
  const [row2, setRow2] = useState(
    secondTable.length > 0 ? secondTable[0] : {}
  );

  const [selectedCell, setSelectedCell] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [issuenowval, setissuenowval] = useState("");
  const [issueidval, setissueidval] = useState("");
  const [btnVisibility, setBtnVisibility] = useState(false);
  const [selectedFirstTableRow, setSelectedFirstTableRow] = useState(null);
  const [selectedSecondTableRows, setSelectedSecondTableRows] = useState([]);
  const [sumOfIssueNow, setSumOfIssueNow] = useState(0);

  const fetchData = async () => {
    let url1 = endpoints.getRowByNCID + "?id=" + location.state?.ncid;
    getRequest(url1, async (data) => {
      setFormHeader(data);

      let url2 = endpoints.getCustomerByCustCode + "?code=" + data.Cust_Code;
      //console.log(url2);
      getRequest(url2, async (data1) => {
        // console.log("url2 data", data1);
        setFormHeader({ ...data, customer: data1.Cust_name });
      });
    });

    delay(1000);
    //get first table data
    let url3 =
      endpoints.getShopFloorAllotmentPartFirstTable +
      "?id=" +
      location.state?.ncid;
    getRequest(url3, async (data) => {
      //setFirstTable(data);
      let tempArray = [];
      for (let i = 0; i < data.length; i++) {
        //console.log("bom id = ", data[i].CustBOM_Id);
        tempArray.push(data[i].CustBOM_Id);

        //find QtyAvailable
        let url5 =
          endpoints.getShopFloorAllotmentPartFirstTableQtyAvl +
          "?id=" +
          data[i].CustBOM_Id;

        getRequest(url5, async (data2) => {
          if (
            (data2 && data2[0] && data2[0]["QtyAvialable"] !== null) ||
            undefined
          ) {
            data[i].QtyAvailable = data2[0]["QtyAvialable"];
          } else {
            data[i].QtyAvailable = 0;
          }
          // data[i].QtyAvailable = data2[0]["QtyAvialable"];
          data[i].issueNow = 0;
          data[i].AlreadyUsed = 0;
          data[i].TotalUsed = 0;
        });
      }

      await delay(2000);
      setFirstTable(data);
      console.log("first table data = ", data);
      //setCustBOMIdArray(tempArray);
      //console.log("custbom ids = ", tempArray);

      if (data.length === 0) {
        toast.warning("There is no material data available.");
      }

      console.log("first table data = ", data);

      for (let i = 0; i < data.length; i++) {
        if (data[i].QtyAvailable === 0) {
          toast.warning(
            "There is no material to allot for this program. Check if you have added the material to customer stock?"
          );
          break;
        }
      }

      if (tempArray.length !== 0) {
        //fetch data in second table
        let url4 =
          endpoints.getShopFloorAllotmentPartSecondTableIds +
          "?bomids=" +
          tempArray;

        getRequest(url4, async (data) => {
          for (let i = 0; i < data.length; i++) {
            data[i].issueNow = 0;
          }
          //setFirstTable(data);
          // console.log("Second table data = ", data);
          setSecondTable(data);

          if (data.length > 0) {
            setRow2(data[0]);
          }
        });
      }
    });

    // await delay(2000);
    //custbom ids array
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    //if (firstTable.issueNow != 0) {
    //setFirstTable(firstTable);
    //setSecondTable(secondTable);
    // }

    console.log("use state call");
  }, [firstTable, secondTable]);

  let issuenowchange = (e) => {
    setissuenowval(e.target.value);
    //console.log("change = ", e.target.value);
  };

  let issuenowonblur = async () => {
    //console.log("on blur : ", issuenowval, " calc = ", formHeader);

    if (issuenowval > formHeader.Qty - formHeader.QtyAllotted) {
      toast.error("Cannot Allot more material than Programmed Quantity");
      setBtnVisibility(true);
    } else {
      setBtnVisibility(false);

      let setQtyAvailable = issuenowval;

      //***** First Examaine the Max Set Quantity THAT can be issued
      for (const key in firstTable) {
        if (
          Math.floor(
            parseInt(firstTable[key].QtyAvailable) /
              parseInt(firstTable[key].QtyPerAssy)
          ) < parseInt(setQtyAvailable)
        ) {
          setQtyAvailable = Math.floor(
            parseInt(firstTable[key].QtyAvailable) /
              parseInt(firstTable[key].QtyPerAssy)
          );
        }
      }

      if (issuenowval > setQtyAvailable) {
        toast.error(
          "Sets Required : " +
            issuenowval +
            " Sets Available : " +
            setQtyAvailable
        );
      } else {
        const updatedFirstTable = firstTable.map((obj1) => {
          const newIssueNow = obj1.QtyPerAssy * setQtyAvailable;

          let flag = 0;

          const updatedSecondTable = secondTable.map((obj2) => {
            if (obj1.CustBOM_Id === obj2.CustBOM_Id && flag === 0) {
              obj2.issueNow = newIssueNow;
              flag = 1;
            }
            return obj2;
          });
          return { ...obj1, issueNow: newIssueNow };
        });

        const sumByCustBOM = {};
        secondTable.forEach((obj2) => {
          const { CustBOM_Id, issueNow } = obj2;
          sumByCustBOM[CustBOM_Id] = (sumByCustBOM[CustBOM_Id] || 0) + issueNow;
        });
        console.log("Sum of issueNow values by CustBOM_Id:", sumByCustBOM);
        await delay(1000);
        setFirstTable(updatedFirstTable);
        setSecondTable(secondTable);
      }
    }
  };

  const releaseProduction = async () => {
    if (issuenowval.length === 0) {
      toast.warning("Please enter Issue Now Value");
      return;
    }

    const sumByCustBOM = {};

    secondTable.forEach((obj2) => {
      const { CustBOM_Id, issueNow } = obj2;
      sumByCustBOM[CustBOM_Id] = (sumByCustBOM[CustBOM_Id] || 0) + issueNow;
    });

    for (const key in sumByCustBOM) {
      const sumIssueNow = sumByCustBOM[key];
      const firstTableEntry = firstTable.find(
        (item) => item.CustBOM_Id === parseInt(key)
      );

      if (firstTableEntry && sumIssueNow !== firstTableEntry.issueNow) {
        toast.error(
          `Issue Quantity Mismatch ${firstTableEntry.PartId} Required: ${firstTableEntry.issueNow} Issuing: ${sumIssueNow}`
        );
        return;
      }
    }

    const hasZeroQtyAvailable = firstTable.some(
      (item) => item.QtyAvailable === 0
    );

    if (hasZeroQtyAvailable) {
      // toast.error("QtyAvailable is 0 for some parts.");
      toast.error(`Set Required: ${issuenowval} Set Available: ${0}  `);
      return;
    }

    for (const secondTableRow of secondTable) {
      const firstTableEntry = firstTable.find(
        (item) => item.CustBOM_Id === secondTableRow.CustBOM_Id
      );

      if (firstTableEntry) {
        const acceptedMinusIssued =
          secondTableRow.QtyAccepted - secondTableRow.QtyIssued;
        const issueNowQuantity = parseInt(secondTableRow.issueNow);

        if (issueNowQuantity > acceptedMinusIssued) {
          toast.error(
            `Parts Not Available RV No ${secondTableRow.RV_No} Part Issue Now: ${firstTableEntry.PartId} Available for Issue: ${acceptedMinusIssued} `
          );
          return;
        }
      }
    }
    CreatePartsIssueVoucher();
  };

  // const releaseProduction = async () => {
  //   if (issuenowval.length === 0) {
  //     toast.warning("Please enter Issue Now Value");
  //     return;
  //   }

  //   const sumByCustBOM = {};

  //   secondTable.forEach((obj2) => {
  //     const { CustBOM_Id, issueNow } = obj2;
  //     sumByCustBOM[CustBOM_Id] = (sumByCustBOM[CustBOM_Id] || 0) + issueNow;
  //   });

  //   for (const key in sumByCustBOM) {
  //     const sumIssueNow = sumByCustBOM[key];
  //     const firstTableEntry = firstTable.find(
  //       (item) => item.CustBOM_Id === parseInt(key)
  //     );

  //     if (firstTableEntry && sumIssueNow !== firstTableEntry.issueNow) {
  //       toast.error(
  //         `Issue Quantity Mismatch ${firstTableEntry.PartId} Required: ${firstTableEntry.issueNow} Issuing: ${sumIssueNow}`
  //       );
  //       return;
  //     }
  //   }

  //   CreatePartsIssueVoucher();
  // };

  function statusFormatter(cell, row, rowIndex, formatExtraData) {
    return formatDate(new Date(cell), 3);
  }

  // const columns2 = [
  //   {
  //     text: "Id",
  //     dataField: "Id",
  //     hidden: true,
  //   },
  //   {
  //     text: "RV No",
  //     dataField: "RV_No",
  //   },
  //   {
  //     text: "RV Date",
  //     dataField: "RV_Date",
  //     formatter: statusFormatter,
  //   },
  //   {
  //     text: "Received",
  //     dataField: "QtyReceived",
  //   },
  //   {
  //     text: "Accepted",
  //     dataField: "QtyAccepted",
  //   },
  //   {
  //     text: "Issued",
  //     dataField: "QtyIssued",
  //   },
  //   {
  //     text: "Issue Now",
  //     dataField: "issueNow",
  //     editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => {
  //       return (
  //         <input
  //           type="number"
  //           {...editorProps}
  //           value={value}
  //           onChange={(e) => handleIssueNowChange(e, row)}
  //         />
  //       );
  //     }
  //   },
  // ];

  const selectRow1 = {
    mode: "radio",
    clickToSelect: true,
    bgColor: "#98A8F8",

    onSelect: (row, isSelect, rowIndex, e) => {
      setCustBOMId(row.CustBOM_Id);
      setSelectedFirstTableRow(isSelect ? row : null);

      const correspondingRows = secondTable.filter(
        (secondTableRow) => secondTableRow.CustBOM_Id === row.CustBOM_Id
      );
      setSelectedSecondTableRows(isSelect ? correspondingRows : []);
    },
  };

  const selectRow2 = {
    mode: "radio",
    clickToSelect: true,
    // bgColor: "#98A8F8",
    onSelect: (row, isSelect, rowIndex, e) => {
      console.log("Selected Row in Second Table:", row);
      setRow2(row);
    },
  };

  // console.log("selectedFirstTableRow", selectedFirstTableRow);
  // console.log("selectedSecondTableRows", selectedSecondTableRows)
  // console.log("Sum of issueNow:", sumOfIssueNow);

  function isSelectedCell(rowId, colId) {
    return (
      selectedCell &&
      selectedCell.rowId === rowId &&
      selectedCell.colId === colId
    );
  }

  const rowStyle1 = (row, rowIndex) => {
    const style = {};
    if (row.CustBOM_Id === custBOMId) {
      style.backgroundColor = "#98A8F8";
    }
    return style;
  };

  const rowStyle2 = (row, rowIndex) => {
    const style = {};
    if (row.CustBOM_Id === custBOMId) {
      // style.backgroundColor = "#32a856";
      style.backgroundColor = "#61f28a";
    }
    return style;
  };

  const CreatePartsIssueVoucher = async () => {
    //get running no and assign to RvNo
    let yyyy = formatDate(new Date(), 6).toString();
    const url =
      endpoints.getRunningNo +
      "?SrlType=ShopFloor_PartIssueVoucher&Period=" +
      yyyy;
    //console.log(url);

    getRequest(url, async (data) => {
      data.map((obj) => {
        let newNo = parseInt(obj.Running_No) + 1;
        console.log("newno = ", newNo);
        //insert into shopfloorpartissueregister

        let header1 = {
          IV_No: newNo,
          Issue_date: formatDate(new Date(), 2),
          NC_ProgramNo: formHeader.NCProgramNo,
          QtyIssued: issuenowval,
          QtyReturned: 0,
          QtyUsed: 0,
          Ncid: formHeader.Ncid,
        };

        postRequest(
          endpoints.insertShopfloorPartIssueRegister,
          header1,

          async (data) => {
            if (data.affectedRows !== 0) {
              //toast.success("Record Inserted Successfully");
              await delay(100);
              setissueidval(data.insertId);
              console.log("data insert id = ", data.insertId);
              //insert into shopfloorBOMIssueDetails

              for (let i = 0; i < secondTable.length; i++) {
                if (secondTable[i].issueNow > 0) {
                  //console.log("NR = ", secondTable[i]);
                  let header3 = {
                    IV_ID: data.insertId,
                    RV_Id: secondTable[i].RVId,
                    PartReceipt_DetailsID: secondTable[i].Id,
                    QtyIssued: secondTable[i].issueNow,
                    QtyReturned: 0,
                    QtyUsed: 0,
                  };

                  postRequest(
                    endpoints.insertShopfloorBOMIssueDetails,
                    header3,
                    async (data) => {
                      if (data.affectedRows !== 0) {
                        //toast.success("Record Inserted Successfully");
                      } else {
                        //toast.error("Record Not Updated");
                      }
                    }
                  );
                }

                //update mtrl part receipt details
                // let header4 = {
                //   Id: secondTable[i].Id,
                //   Qty: secondTable[i].issueNow,
                // };
                // postRequest(
                //   endpoints.updateQtyIssuedPartReceiptDetails1,
                //   header4,
                //   (data) => {
                //     if (data.affectedRows !== 0) {
                //       toast.success("Record updated Successfully");
                //     } else {
                //       toast.error("Record Not Updated");
                //     }
                //   }
                // );

                let header5 = {
                  Id: secondTable[i].Id,
                  Qty: secondTable[i].issueNow,
                };

                postRequest(
                  endpoints.updateQtyIssuedPartReceiptDetails2,
                  header5,
                  async (data) => {
                    if (data.affectedRows !== 0) {
                      //toast.success("Record updated Successfully");
                    } else {
                      //toast.error("Record Not Updated");
                    }
                  }
                );
              }
            } else {
              //toast.error("Record Not Updated");
            }
            //update nc programs

            let header2 = {
              Id: formHeader.Ncid,
              Qty: issuenowval,
            };

            postRequest(
              endpoints.updateQtyAllotedncprograms1,
              header2,
              async (data) => {
                if (data.affectedRows !== 0) {
                  //toast.success("Record updated Successfully");
                } else {
                  //toast.error("Record Not Updated");
                }
              }
            );

            //update running no

            const inputData = {
              SrlType: "ShopFloor_PartIssueVoucher",
              Period: formatDate(new Date(), 6),
              RunningNo: newNo,
            };

            postRequest(endpoints.updateRunningNo, inputData, (data) => {});
            console.log("Return id = ", issueidval);
            //return data.insertId;
            nav(
              "/MaterialManagement/ShopFloorIssue/IVListService/Issued/ShopMatIssueVoucher",

              {
                state: { issueIDVal: data.insertId },
              }
            );
          }
        );
      });
    });
  };

  const updateSumByCustBOM = (tableData) => {
    const sumByCustBOM = {};
    tableData.forEach((row) => {
      const { CustBOM_Id, issueNow } = row;
      if (!sumByCustBOM[CustBOM_Id]) {
        sumByCustBOM[CustBOM_Id] = 0;
      }
      sumByCustBOM[CustBOM_Id] += parseInt(issueNow);
    });

    return sumByCustBOM;
  };

  const handleIssueNowChange = (e, editedRow) => {
    const updatedSecondTable = secondTable.map((row) => {
      if (row.Id === editedRow.Id) {
        return { ...row, issueNow: parseInt(e.target.value) };
      }
      return row;
    });

    setSecondTable(updatedSecondTable);
    const sumByCustBOM = updateSumByCustBOM(updatedSecondTable);
    console.log("Sum of issueNow values by CustBOM_Id:", sumByCustBOM);
  };

  const isAnyQtyAvailableZero = () => {
    return firstTable.some((row) => row.QtyAvailable === 0);
  };

  console.log("secondTable", secondTable);

  return (
    <div>
      <div>
        <h4 className="title">Material Allotment Form</h4>
        <div className="row">
          <div className="col-md-4">
            <label className="form-label">Task No</label>
            <input type="text" value={formHeader.TaskNo} disabled />
          </div>
          <div className="col-md-6">
            <label className="form-label">Customer</label>
            <input type="text" value={formHeader.customer} disabled />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div style={{ marginBottom: "9px" }}>
              <label className="form-label">NC Program No</label>
              <input
                // className="form-label"
                value={formHeader.NCProgramNo}
                disabled
              />
            </div>
          </div>

          <div className="col-md-6">
            <div style={{ marginBottom: "9px" }}>
              <label className="form-label">Material Code</label>
              <input
                // className="form-label"
                value={formHeader.Mtrl_Code}
                disabled
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <label className="form-label">Priority</label>
            <input
              // className="form-label"
              value={formHeader.Priority}
              disabled
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Machine</label>
            <input value={formHeader.Machine} disabled />
          </div>

          <div className="col-md-3">
            <label className="form-label">Quantity</label>
            <input value={formHeader.Qty} disabled />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <label className="form-label">Status</label>
            <input value={formHeader.PStatus} disabled />
          </div>

          <div className="col-md-3">
            <label className="form-label">Process</label>
            <input
              // className="form-label"
              value={formHeader.Operation}
              disabled
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Allotted</label>
            <input
              // className="form-label"
              value={formHeader.QtyAllotted}
              disabled
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <label className="form-label">Source</label>
            <input value="Customer" disabled />
          </div>

          <div className="col-md-3">
            <label className="form-label">Issue Now</label>
            <input
              type="number"
              min="0"
              onChange={issuenowchange}
              value={issuenowval}
              onBlur={issuenowonblur}
              disabled={isAnyQtyAvailableZero() || firstTable.length === 0}
            />
          </div>

          <div className="col-md-3">
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

      <div style={{ height: "250px", overflowY: "scroll", marginTop: "10px" }}>
        {/* <BootstrapTable
          keyField="id"
          columns={columns1}
          data={firstTable}
          striped
          hover
          condensed
          //pagination={paginationFactory()
          selectRow={selectRow1}
           headerClasses="header-class tableHeaderBGColor"
        ></BootstrapTable> */}

        <Table className="table custom-table" striped bordered hover>
          <thead className="header-class">
            <tr>
              <th>Part Id</th>
              <th>Qty / Assembly</th>
              <th>Required</th>
              <th>Already Used</th>
              <th>Total Used</th>
              <th>Rejected</th>
              <th>Available</th>
              <th>Issue Now</th>
            </tr>
          </thead>
          <tbody>
            {firstTable.map((row) => (
              <tr
                key={row.Id}
                style={rowStyle1(row)}
                onClick={() => {
                  selectRow1.onSelect(row, true);
                  // setRow2(row)
                }}
              >
                <td>{row.PartId}</td>
                <td>{row.QtyPerAssy}</td>
                <td>{row.QtyRequired}</td>
                <td>{row.AlreadyUsed}</td>
                <td>{row.TotalUsed}</td>
                <td>{row.QtyRejected}</td>
                <td>{row.QtyAvailable}</td>
                <td>{row.issueNow}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="row mt-4">
        <div className="col-md-8 justify-content-center mb-3">
          <button
            className="button-style"
            style={{ width: "196px" }}
            disabled={btnVisibility}
            onClick={releaseProduction}
          >
            Release To Production
          </button>
        </div>

        <div className="col-md-7">
          <div style={{ height: "300px", overflowY: "scroll" }}>
            <Table className="table custom-table" striped bordered hover>
              <thead className="header-class">
                <tr>
                  {/* <th>ID</th> */}
                  <th>RV No</th>
                  <th>RV Date</th>
                  <th>Received</th>
                  <th>Accepted</th>
                  <th>Issued</th>
                  <th>Issue Now</th>
                </tr>
              </thead>
              <tbody>
                {secondTable.map((row, index) => (
                  <tr
                    key={row.Id}
                    style={rowStyle2(row)}
                    onClick={() => {
                      selectRow2.onSelect(row, true);
                    }}
                  >
                    {/* <td
                      onClick={() => {
                        setSelectedCell({ rowId: row.Id, colId: "Id" });
                        setRow2(row);
                        setSelectedRow(null);
                      }}
                      className={
                        isSelectedCell(row.Id, "Id") ? "selected-row" : ""
                      }
                    >
                      {row.Id}
                    </td> */}

                    <td
                      onClick={() => {
                        setSelectedCell({ rowId: row.Id, colId: "RV_No" });
                        setRow2(row);
                        setSelectedRow(null);
                      }}
                      className={
                        isSelectedCell(row.Id, "RV_No") ? "selected-row" : ""
                      }
                    >
                      {row.RV_No}
                    </td>

                    <td
                      onClick={() => {
                        setSelectedCell({ rowId: row.Id, colId: "RV_Date" });
                        setRow2(row);
                        setSelectedRow(null);
                      }}
                      className={
                        isSelectedCell(row.Id, "RV_Date") ? "selected-row" : ""
                      }
                    >
                      {formatDate(new Date(row.RV_Date), 3)}
                    </td>

                    <td
                      onClick={() => {
                        setSelectedCell({
                          rowId: row.Id,
                          colId: "QtyReceived",
                        });
                        setRow2(row);
                        setSelectedRow(null);
                      }}
                      className={
                        isSelectedCell(row.Id, "QtyReceived")
                          ? "selected-row"
                          : ""
                      }
                    >
                      {row.QtyReceived}
                    </td>

                    <td
                      onClick={() => {
                        setSelectedCell({
                          rowId: row.Id,
                          colId: "QtyAccepted",
                        });
                        setRow2(row);
                        setSelectedRow(null);
                      }}
                      className={
                        isSelectedCell(row.Id, "QtyAccepted")
                          ? "selected-row"
                          : ""
                      }
                    >
                      {row.QtyAccepted}
                    </td>

                    <td
                      onClick={() => {
                        setSelectedCell({ rowId: row.Id, colId: "QtyIssued" });
                        setRow2(row);
                        setSelectedRow(null);
                      }}
                      className={
                        isSelectedCell(row.Id, "QtyIssued")
                          ? "selected-row"
                          : ""
                      }
                    >
                      {row.QtyIssued}
                    </td>

                    <td
                      onClick={() => {
                        setSelectedCell({ rowId: row.Id, colId: "issueNow" });
                        setRow2(row);
                        setSelectedRow(null);
                      }}
                      className={
                        isSelectedCell(row.Id, "issueNow") ? "selected-row" : ""
                      }
                    >
                      <input
                        type="number"
                        min="0"
                        value={row.issueNow}
                        onChange={(e) => handleIssueNowChange(e, row)}
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>

        <div className="col-md-5">
          <div className="ip-box form-bg mb-4">
            <div className="row">
              <div className="col-md-4 mt-2 ">
                <label className="form-label">RV No</label>
              </div>
              <div className="col-md-8 ">
                <input
                  className="in-field"
                  type="text"
                  value={row2.RV_No}
                  disabled
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mt-2 ">
                <label className="form-label">Part ID</label>
              </div>

              <div className="col-md-8" style={{ marginTop: "8px" }}>
                <input
                  className="in-field"
                  type="text"
                  value={row2.PartId}
                  disabled
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mt-1">
                <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                  Qty Received
                </label>
              </div>

              <div className="col-md-8 ">
                <input
                  className="in-field"
                  type="text"
                  name="qtyReceived"
                  // disabled="true"
                  value={row2.QtyReceived}
                  disabled
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mt-1 ">
                <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                  Qty Accepted
                </label>
              </div>

              <div className="col-md-8 ">
                <input
                  className="in-field"
                  type="text"
                  value={row2.QtyAccepted}
                  disabled
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mt-1 ">
                <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                  Qty Issued
                </label>
              </div>

              <div className="col-md-8 ">
                <input
                  className="in-field"
                  type="text"
                  value={row2.QtyIssued}
                  disabled
                />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-4 mt-1 ">
                <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                  Issue Now
                </label>
              </div>

              <div className="col-md-8 ">
                <input
                  className="in-field"
                  type="text"
                  value={row2.issueNow}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaterialAllotmentMain;
