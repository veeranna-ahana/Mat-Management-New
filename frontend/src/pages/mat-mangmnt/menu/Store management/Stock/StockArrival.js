import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import BootstrapTable from "react-bootstrap-table-next";
import { useNavigate } from "react-router-dom";

const { getRequest, postRequest } = require("../../../../api/apiinstance");
const { endpoints } = require("../../../../api/constants");

function StockArrival() {
  const nav = useNavigate();
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const [firstTable, setFirstTable] = useState([]);
  const [secondTable, setSecondTable] = useState([]);
  const [thirdTable, setThirdTable] = useState([]);

  const [dateVal, setDateVal] = useState("1988-01-01");
  const [open, setOpen] = useState();
  const handleOpen = () => {
    setOpen(true);
  };

  const fetchData = async () => {};

  useEffect(() => {
    fetchData();
  }, []);

  const InputEvent = (e) => {
    const { name, value } = e.target;
    console.log("value = ", value);
    setDateVal(value);
  };

  const columns1 = [
    {
      text: "id",
      dataField: "id",
      hidden: true,
    },
    {
      text: "RV_No",
      dataField: "RV_No",
    },
    {
      text: "CustDocuNo",
      dataField: "CustDocuNo",
    },
    {
      text: "Material",
      dataField: "Material",
    },
    {
      text: "Calculated Weight",
      dataField: "TotalWeightCalculated",
    },
    {
      text: "Total Weight",
      dataField: "TotalWeight",
    },
  ];

  const columns2 = [
    {
      text: "id",
      dataField: "id",
      hidden: true,
    },
    {
      text: "RV_No",
      dataField: "RV_No",
    },
    {
      text: "Srl",
      dataField: "Srl",
    },
    {
      text: "Calculated Weight",
      dataField: "TotalWeightCalculated",
    },
    {
      text: "Total Weight",
      dataField: "TotalWeight",
    },
  ];
  const columns3 = [
    {
      text: "id",
      dataField: "id",
      hidden: true,
    },
    {
      text: "RV_No",
      dataField: "RV_No",
    },
    {
      text: "CustDocuNo",
      dataField: "CustDocuNo",
    },
    {
      text: "Material",
      dataField: "Material",
    },
    {
      text: "Total Weight",
      dataField: "WeightIN",
    },
  ];

  const loadData = () => {
    //first table
    const url1 = endpoints.getStockArrivalFirstTable + "?date=" + dateVal;
    getRequest(url1, (data) => {
      for (let i = 0; i < data.length; i++) {
        data[i].id = i + 1;
      }
      setFirstTable(data);
      console.log("first table = ", data);
    });

    //second table
    const url2 = endpoints.getStockArrivalSecondTable + "?date=" + dateVal;
    getRequest(url2, (data) => {
      for (let i = 0; i < data.length; i++) {
        data[i].id = i + 1;
      }
      setSecondTable(data);
      console.log("second table = ", data);
    });

    //third table
    const url3 = endpoints.getStockArrivalThirdTable + "?date=" + dateVal;
    getRequest(url3, (data) => {
      for (let i = 0; i < data.length; i++) {
        data[i].id = i + 1;
      }
      setThirdTable(data);
      console.log("third table = ", data);
    });
  };

  const updateLedger = async () => {
    let flag = 0;
    for (let i = 0; i < secondTable.length; i++) {
      if (secondTable[i].TotalWeight <= 0) {
        flag = 1;
      }
    }
    if (flag == 1) {
      toast.error("Update Receipt Weight before updating stock ledger");
    } else {
      console.log("else");
      let flag1 = 0;
      for (let i = 0; i < firstTable.length; i++) {
        //insertStockArrivalMtrlReceiptList
        let paraData1 = {
          Rv_Date: dateVal,
          RV_No: firstTable[i].RV_No,
          CustDocuNo: firstTable[i].CustDocuNo,
          Material: firstTable[i].Material,
          WeightIN: firstTable[i].TotalWeight,
        };
        postRequest(
          endpoints.insertStockArrivalMtrlReceiptList,
          paraData1,
          (data) => {
            flag1 = 1;
            console.log("updated");
          }
        );
      }
      await delay(300);
      if (flag1 == 1) {
        toast.success("Stock Ledger is Updated");
        loadData();
      }
    }
  };
  return (
    <div>
      {" "}
      <h4 className="title">Stock Arrival Updater Form </h4>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-2">
          <label className="form-label">Stock Date</label>
          <input type="date" name="date" onChange={InputEvent} />
        </div>
        <div className="col-md-3">
          <button className="button-style" onClick={loadData}>
            Load Data
          </button>
        </div>
        <div className="col-md-3">
          <button
            className="button-style"
            style={{ width: "200px" }}
            onClick={updateLedger}
          >
            Update Stock Ledger
          </button>
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
      <div className="row mt-4">
        <div className="col-md-7">
          {" "}
          <div className="row">
            <div style={{ height: "200px", overflowY: "scroll" }}>
              <BootstrapTable
                keyField="id"
                columns={columns1}
                data={firstTable}
                striped
                hover
                condensed
                //selectRow={selectRow1}
                headerClasses="header-class tableHeaderBGColor"
              ></BootstrapTable>
            </div>
          </div>
          <div className="row mt-3">
            <div style={{ height: "200px", overflowY: "scroll" }}>
              <BootstrapTable
                keyField="id"
                columns={columns2}
                data={secondTable}
                striped
                hover
                condensed
                //selectRow={selectRow1}
                headerClasses="header-class tableHeaderBGColor"
              ></BootstrapTable>{" "}
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div style={{ height: "400px", overflowY: "scroll" }}>
            <BootstrapTable
              keyField="id"
              columns={columns3}
              data={thirdTable}
              striped
              hover
              condensed
              //selectRow={selectRow1}
              headerClasses="header-class tableHeaderBGColor"
            ></BootstrapTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockArrival;
