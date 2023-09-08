import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
export default function FirstTable(props) {
  // console.log("props in frist table..", props);

  return (
    <>
      <Table
        hover
        condensed
        className="table-data border header-class table-striped"
      >
        <thead className="text-white">
          <tr>
            <th>RV No</th>
          </tr>
        </thead>
        <tbody>
          {props.firstTableData.map((val, key) => (
            <tr
              onClick={() => props.selectRowFirstFunc(val)}
              className={
                val.RvID === props.firstTableSelectedRow.RvID
                  ? "rowSelectedClass"
                  : ""
              }
            >
              <td>{val.RV_No}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
