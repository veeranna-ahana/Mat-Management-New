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
            <th>Part ID</th>
            <th>Return</th>
            <th>Remarks</th>
            {/* <th>Length</th>
            <th>Weight</th> */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>SL No</th>
            <th>Part ID</th>
            <th>Return</th>
            <th>Remarks</th>
            {/* <th>Length</th>
            <th>Weight</th> */}
          </tr>{" "}
          <tr>
            <th>SL No</th>
            <th>Part ID</th>
            <th>Return</th>
            <th>Remarks</th>
            {/* <th>Length</th>
            <th>Weight</th> */}
          </tr>{" "}
          <tr>
            <th>SL No</th>
            <th>Part ID</th>
            <th>Return</th>
            <th>Remarks</th>
            {/* <th>Length</th>
            <th>Weight</th> */}
          </tr>{" "}
          <tr>
            <th>SL No</th>
            <th>Part ID</th>
            <th>Return</th>
            <th>Remarks</th>
            {/* <th>Length</th>
            <th>Weight</th> */}
          </tr>
          {/* {props.thirdTableData.map((val, key) => (
            <tr>
              <td>{key + 1}</td>
              <td>{val.MtrlStockID}</td>
              <td>{val.Mtrl_Code}</td>
              <td>{val.DynamicPara1}</td>
              <td>{val.DynamicPara2}</td>
              <td>{val.Weight}</td>
            </tr>
          ))} */}
        </tbody>
      </Table>
    </>
  );
}
