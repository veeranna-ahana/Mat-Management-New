import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
export default function FirstTable(props) {
  // remove materials from third table for particular document.... func
  const removeMtrlThirdTable = (rowData, k) => {
    let found = false;
    const newArray = props.allData.filter((obj) => {
      return (
        obj.RV_No === rowData.RV_No &&
        obj.Mtrl_Code === rowData.Mtrl_Code &&
        obj.DynamicPara1 === rowData.DynamicPara1 &&
        obj.DynamicPara2 === rowData.DynamicPara2
      );
    });

    for (let i = 0; i < newArray.length; i++) {
      const element = newArray[i];
      found = props.thirdTableData.some(
        (el) => el.Cust_Docu_No === element.Cust_Docu_No
      );

      if (found) {
        const newThirdTableData = props.thirdTableData.filter(
          (data) => data.Cust_Docu_No !== element.Cust_Docu_No
        );
        props.setThirdTableData(newThirdTableData);
      } else {
      }
    }
  };
  const firstTableCheckBoxClickFunc = (rowData, k) => {
    let issueChecked = document.getElementById(`checkBoxFirstTable${k}`);
    if (issueChecked.checked) {
      removeMtrlThirdTable(rowData, k);
      const newArray = props.allData.filter((obj) => {
        return (
          obj.RV_No === rowData.RV_No &&
          obj.Mtrl_Code === rowData.Mtrl_Code &&
          obj.DynamicPara1 === rowData.DynamicPara1 &&
          obj.DynamicPara2 === rowData.DynamicPara2
        );
      });
      props.setThirdTableData(props.thirdTableData.concat(newArray));
    } else {
      removeMtrlThirdTable(rowData, k);
    }
  };

  return (
    <>
      <Table striped className="table-data border">
        <thead className="tableHeaderBGColor">
          <tr>
            <th>SL No</th>
            <th>RV No</th>
            <th>Cust Document</th>
            <th>Material Code</th>
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
          {props.firstTableData.map((val, k) => (
            <tr
              onClick={() => props.selectRowFirstFun(val)}
              className={
                val === props.firstTableSelectedRow[0] ? "rowSelectedClass" : ""
              }
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
              <td>{parseFloat(val.Weight).toFixed(2)}</td>
              <td>{parseFloat(val.ScrapWeight).toFixed(2)}</td>
              <td>{val.InStock}</td>
              <td>
                <input
                  type="checkbox"
                  name=""
                  id={`checkBoxFirstTable${k}`}
                  // checked={checkedCheckBox}
                  onClick={() => firstTableCheckBoxClickFunc(val, k)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
