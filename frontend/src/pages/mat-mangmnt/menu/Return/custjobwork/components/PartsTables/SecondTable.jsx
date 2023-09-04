import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
export default function SecondTable(props) {
  //   console.log("props in second table..", props);

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
            <th>Received</th>
            <th>Rejected</th>
            <th>Issued</th>
            <th>Used</th>
            <th>Returned</th>
          </tr>
        </thead>
        <tbody>
          {props.secondTableData.map((val, key) => (
            <tr
              onClick={() => props.selectRowSecondFunc(val)}
              className={
                val.Id === props.secondSelectedRow.Id ? "selected-row" : ""
              }
            >
              <td>{key + 1}</td>
              <td>{val.PartId}</td>
              <td>{val.QtyReceived}</td>
              <td>{val.QtyRejected}</td>
              <td>{val.QtyIssued}</td>
              <td>{val.QtyUsed}</td>
              <td>{val.QtyReturned}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
