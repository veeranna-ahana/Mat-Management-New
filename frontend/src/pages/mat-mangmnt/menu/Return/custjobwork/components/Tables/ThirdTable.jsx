import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
export default function ThirdTable(props) {
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
            <th>Mtrl Code</th>
            <th>Width</th>
            <th>Length</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {props.thirdTableData.map((val, key) => (
            <tr>
              <td>{key + 1}</td>
              <td>{val.MtrlStockID}</td>
              <td>{val.Mtrl_Code}</td>
              <td>{val.DynamicPara1}</td>
              <td>{val.DynamicPara2}</td>
              <td>{val.Weight}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
