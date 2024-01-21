import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
export default function ThirdTable(props) {
  return (
    <>
      <Table striped className="table-data border" style={{ border: "1px" }}>
        <thead className="tableHeaderBGColor">
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
              <td>{parseFloat(val.Weight).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
