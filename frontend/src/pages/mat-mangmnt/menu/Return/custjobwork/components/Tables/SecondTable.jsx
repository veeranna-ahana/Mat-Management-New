import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
export default function SecondTable(props) {
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
            <th>Mtrl Stock ID</th>
            {/* <th>Issue</th> */}
            <th>Weight</th>
            <th>Scrap Weight</th>
            <th>RV ID</th>
          </tr>
        </thead>
        <tbody>
          {props.secondTableData.map((val, key) => (
            <tr
              onClick={() => props.selectRowSecondFun(val)}
              className={
                // checking if item exist then classname...selected-row else ''
                props.thirdTableData.some(
                  (el) => el.MtrlStockID === val.MtrlStockID
                )
                  ? "selected-row"
                  : ""
              }
            >
              <td>{key + 1}</td>
              <td>{val.MtrlStockID}</td>
              {/* <td>
                <input type="checkbox" name="" id="" checked={val.Issue} />

              </td> */}
              <td>{val.Weight}</td>
              <td>{val.ScrapWeight}</td>
              <td>{val.RVId}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
