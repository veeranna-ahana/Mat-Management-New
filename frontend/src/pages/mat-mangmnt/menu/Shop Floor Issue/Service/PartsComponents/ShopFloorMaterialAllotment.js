import React, { useEffect, useState } from "react";
import NavComp from "../Components/NavComp";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import TreeView from "react-treeview";
import "react-treeview/react-treeview.css";
import { toast } from "react-toastify";
import axios from "axios";

const { getRequest, postRequest } = require("../../../../../api/apiinstance");
const { endpoints } = require("../../../../../api/constants");

function ShopFloorMaterialAllotment(props) {
  const nav = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [ncid, setncid] = useState("");

  console.log("Props Type", props.type);
  console.log("Props HasBom", props.hasbom);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const fetchData = async () => {
    //get table data
    let url1 =
      endpoints.getShopFloorServicePartTable +
      "?type=" +
      props.type +
      "&hasbom=" +
      props.hasbom;
    await getRequest(url1, async (data) => {
      //delay(5000);
      data = data.filter((obj) => {
        return obj["PStatus"] !== "Completed";
      });
      //await delay(3000);
      console.log("new table data = ", data);
      setTableData(data);
      //setAllData(data);
    });
    let url2 =
      endpoints.getShopFloorServiceTreeViewMachine +
      "?type=" +
      props.type +
      "&hasbom=" +
      props.hasbom;
    await getRequest(url2, async (data) => {
      data.forEach(async (item) => {
        let url3 =
          endpoints.getShopFloorServiceTreeViewProcess +
          "?type=" +
          props.type +
          "&hasbom=" +
          props.hasbom +
          "&machine=" +
          item.machine +
          "&tree=1";
        await getRequest(url3, async (data1) => {
          item["process"] = data1;
          data1.forEach(async (item1) => {
            let url4 =
              endpoints.getShopFloorServiceTreeViewMtrlCode +
              "?type=" +
              props.type +
              "&hasbom=" +
              props.hasbom +
              "&machine=" +
              item.machine +
              "&process=" +
              item1.MProcess +
              "&tree=1";
            await getRequest(url4, async (data2) => {
              item1["material"] = data2;
            });
          });
        });
      });
      if (props.formtype === "Parts") {
        await delay(800);
      } else {
        await delay(800);
      }
      setTreeData(data);
      console.log("data = ", data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log("tableData", tableData);

  const columns = [
    {
      text: "Id",
      dataField: "Ncid",
      hidden: true,
    },
    {
      text: "Task No",
      dataField: "TaskNo",
      headerStyle: { whiteSpace: "nowrap" },
    },
    {
      text: "PStatus",
      dataField: "PStatus",
    },
    {
      text: "Cust Name",
      dataField: "Cust_Name",
      headerStyle: { whiteSpace: "nowrap" },
    },
    {
      text: "NCProgram No",
      dataField: "NCProgramNo",
      headerStyle: { whiteSpace: "nowrap" },
    },
    {
      text: "Machine",
      dataField: "Machine",
    },
    {
      text: "Operation",
      dataField: "Operation",
    },
    {
      text: "Mtrl Code",
      dataField: "Mtrl_Code",
      headerStyle: { whiteSpace: "nowrap" },
    },
    {
      text: "Source",
      dataField: "CustMtrl",
    },
    {
      text: "Qty",
      dataField: "Qty",
    },
    {
      text: "QtyAllotted",
      dataField: "QtyAllotted",
    },
  ];

  const treeViewclickMachine = (machine) => {
    //console.log("tree view click machine : ", e);
    //get table data
    let url =
      endpoints.getShopFloorServiceTreeViewProcess +
      "?type=" +
      props.type +
      "&hasbom=" +
      props.hasbom +
      "&machine=" +
      machine +
      "&tree=0";
    getRequest(url, async (data) => {
      data = data.filter((obj) => obj["PStatus"] !== "Completed");
      console.log("table data 2", data);
      setTableData(data);
    });
  };

  const treeViewclickProcess = (machine, process) => {
    //console.log("machine = ", machine, " process = ", process);
    let url =
      endpoints.getShopFloorServiceTreeViewMtrlCode +
      "?type=" +
      props.type +
      "&hasbom=" +
      props.hasbom +
      "&machine=" +
      machine +
      "&process=" +
      process +
      "&tree=0";
    getRequest(url, async (data) => {
      data = data.filter((obj) => obj["PStatus"] !== "Completed");
      console.log("table data 3", data);
      setTableData(data);
    });
  };

  const treeViewclickMaterial = (machine, process, material) => {
    //console.log("machine = ", machine, " process = ", process);
    let url =
      endpoints.getShopFloorServiceTreeViewMtrlCodeClick +
      "?type=" +
      props.type +
      "&hasbom=" +
      props.hasbom +
      "&machine=" +
      machine +
      "&process=" +
      process +
      "&material=" +
      material;
    getRequest(url, async (data) => {
      data = data.filter((obj) => obj["PStatus"] !== "Completed");
      console.log("table data 4", data);
      setTableData(data);
    });
  };

  const selectRow = {
    mode: "radio",
    clickToSelect: true,
    bgColor: "#98A8F8",
    onSelect: (row, isSelect, rowIndex, e) => {
      setncid(row.Ncid);
    },
  };

  const allotMaterial = () => {
    if (ncid === "") {
      toast.error("Please select table row");
    } else {
      if (props.formtype == "Parts") {
        nav(
          "/MaterialManagement/ShopFloorIssue/Service/Parts/ShopFloorAllotmentForm", //MaterialAllotmentMain

          {
            state: { ncid },
          }
        );
      } else if (props.formtype == "Units" || props.formtype == "Others") {
        nav(
          "/MaterialManagement/ShopFloorIssue/Service/Units/MaterialAllotmentForm", //UnitsMatAllotmentForm
          {
            state: { ncid },
          }
        );
      }
    }
  };
  return (
    <div>
      <h4 className="title">Shop Floor Material Allotment</h4>
      <div className="row-md-6 justify-content-center mt-1 mb-2">
        <h4 style={{ marginLeft: "30px" }}>{props.formtype}</h4>
        <button
          className="button-style "
          style={{ width: "155px" }}
          onClick={allotMaterial}
          // disabled={boolVal1 | boolVal4}
        >
          Allot Material
        </button>
        <button
          className="button-style ms-2"
          style={{ width: "155px" }}
          id="btnclose"
          type="submit"
          onClick={() => nav("/MaterialManagement")}
        >
          Close
        </button>
      </div>
      <div className="row mt-4">
        <div className="col-md-2">
          {/* <NavComp /> */}
          {treeData?.map((node, i) => {
            const machine = node.machine;
            const label = <span className="node">{machine}</span>;
            return (
              <TreeView
                key={machine + "|" + i}
                nodeLabel={label}
                defaultCollapsed={true}
                onClick={() => treeViewclickMachine(machine)}
              >
                {node.process?.map((pro) => {
                  const label2 = <span className="node">{pro.MProcess}</span>;
                  return (
                    <TreeView
                      nodeLabel={label2}
                      key={pro.MProcess}
                      defaultCollapsed={true}
                      onClick={() =>
                        treeViewclickProcess(machine, pro.MProcess)
                      }
                    >
                      {pro.material?.map((mat) => {
                        const label3 = (
                          <span className="node">{mat.Mtrl_Code}</span>
                        );
                        return (
                          <TreeView
                            nodeLabel={label3}
                            key={mat.Mtrl_Code}
                            defaultCollapsed={true}
                            onClick={() =>
                              treeViewclickMaterial(
                                machine,
                                pro.MProcess,
                                mat.Mtrl_Code
                              )
                            }
                          ></TreeView>
                        );
                      })}
                    </TreeView>
                  );
                })}
              </TreeView>
            );
          })}
        </div>
        <div className="col-md-10">
          <div style={{ height: "375px", overflow: "scroll" }}>
            <BootstrapTable
              keyField="Ncid"
              columns={columns}
              data={tableData}
              striped
              hover
              condensed
              //pagination={paginationFactory()}
              selectRow={selectRow}
              headerClasses="header-class tableHeaderBGColor"
            ></BootstrapTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopFloorMaterialAllotment;
