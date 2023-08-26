import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
export default function ThirdTable() {
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
            <th>Dynamic Para 1</th>
            <th>Dynamic Para 2</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>SL No</td>
            <td>Material Stock ID</td>
            <td>Material Code</td>
            <td>Dynamic Parameter 1</td>
            <td>Dynamic Parameter 2</td>
            <td>Weight</td>
          </tr>{" "}
          <tr>
            <td>SL No</td>
            <td>Material Stock ID</td>
            <td>Material Code</td>
            <td>Dynamic Parameter 1</td>
            <td>Dynamic Parameter 2</td>
            <td>Weight</td>
          </tr>{" "}
          <tr>
            <td>SL No</td>
            <td>Material Stock ID</td>
            <td>Material Code</td>
            <td>Dynamic Parameter 1</td>
            <td>Dynamic Parameter 2</td>
            <td>Weight</td>
          </tr>{" "}
          <tr>
            <td>SL No</td>
            <td>Material Stock ID</td>
            <td>Material Code</td>
            <td>Dynamic Parameter 1</td>
            <td>Dynamic Parameter 2</td>
            <td>Weight</td>
          </tr>{" "}
          <tr>
            <td>SL No</td>
            <td>Material Stock ID</td>
            <td>Material Code</td>
            <td>Dynamic Parameter 1</td>
            <td>Dynamic Parameter 2</td>
            <td>Weight</td>
          </tr>
          {/* {props.firstTable.map((val, k) => (
               <tr
                 onClick={() => selectRowFirst(val)}
                 // className={
                 //   val.DC_Inv_No === selectedSecond ? "selectedRowClr" : ""
                 // }
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
             ))} */}
        </tbody>
      </Table>
    </>
  );
}
