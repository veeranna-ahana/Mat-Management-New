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
          </tr>
        </thead>
        <tbody>
          {props.thirdTableData.map((val, key) => (
            <tr>
              <td>{key + 1}</td>
              <td>{val.PartIdNew}</td>
              <td>{val.QtyReturnedNew}</td>
              <td>{val.Remarks}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
