import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
export default function ThirdTable(props) {
  function changeQTY(key, val) {
    // console.log("fdsffsfddsfadsfdafdsbv", key);
    let arr = [];
    for (let i = 0; i < props.thirdTableData.length; i++) {
      const element = props.thirdTableData[i];
      if (i === key) {
        element.QtyReturnedNew = val;
      }
      arr.push(element);
    }

    props.setThirdTableData(arr);
  }
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
              <td>
                <input
                  type="number"
                  value={val.QtyReturnedNew}
                  min={"0"}
                  onChange={(e) => changeQTY(key, e.target.value)}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                  }}
                />
                {/* {val.QtyReturnedNew} */}
              </td>
              <td>{val.Remarks}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
