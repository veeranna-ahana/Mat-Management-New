import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
export default function FirstTable(props) {
  //   console.log("props in frist table..", props);

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
            {/* <th>Action</th> */}
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
              {/* <th>
                <input type="text" />
            </th> */}
            </tr>
          ))}
          {/* <tr>
            <th>RV No</th>
            <th>Action</th>
          </tr>{" "}
          <tr>
            <th>RV No</th>
            <th>Action</th>
          </tr>{" "}
          <tr>
            <th>RV No</th>
            <th>Action</th>
          </tr> */}
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
