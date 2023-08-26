import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
export default function FirstTable(props) {
  return (
    <>
      <Table
        hover
        condensed
        className="table-data border header-class table-striped"
      >
        <thead className="text-white">
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
                val === props.firstTableSelectedRow ? "selectedRowClr" : ""
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
              <td>{val.Weight}</td>
              <td>{val.ScrapWeight}</td>
              <td>{val.InStock}</td>
              <td>
                <input type="checkbox" name="" id="" />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
    // <div>FirstTable</div>
  );
}
