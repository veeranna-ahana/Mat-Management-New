import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
export default function FirstTable(props) {
  // const [checkedCheckBox, setCheckedCheckBox] = useState(false);

  // remove materials from third table for particular document.... func
  const removeMtrlThirdTable = (rowData, k) => {
    // checked===false

    let found = false;
    // console.log("clicked checkbox", rowData);

    const newArray = props.allData.filter((obj) => {
      return (
        obj.RV_No === rowData.RV_No &&
        obj.Mtrl_Code === rowData.Mtrl_Code &&
        obj.DynamicPara1 === rowData.DynamicPara1 &&
        obj.DynamicPara2 === rowData.DynamicPara2
      );
    });

    // console.log("newArray", newArray);

    for (let i = 0; i < newArray.length; i++) {
      const element = newArray[i];

      found = props.thirdTableData.some(
        (el) => el.Cust_Docu_No === element.Cust_Docu_No
      );

      if (found) {
        // console.log("found");
        const newThirdTableData = props.thirdTableData.filter(
          (data) => data.Cust_Docu_No !== element.Cust_Docu_No
        );
        props.setThirdTableData(newThirdTableData);
        // console.log("deleted");
        // break;
        // console.log("test if");
      } else {
        // console.log("not found");
        // break;
        // console.log("test continue");
      }
    }

    // const found = props.thirdTableData.some(
    //   (el) => el.MtrlStockID === rowData.MtrlStockID
    // );
    // if (found) {
    //   // deleting the element if found
    // const newThirdTableData = thirdTableData.filter(
    //   (data) => data !== rowData
    // );
    // setThirdTableData(newThirdTableData);
    // // console.log("deleted");

    //   // setThirdTableData([thirdTableData.remove(rowData)]);
    //   // console.log("deselected", thirdTableData);
    // }

    // const newThirdTableData = props.thirdTableData.filter(
    //   (data) => data !== rowData
    // );
    // props.setThirdTableData(newThirdTableData);
    // console.log("deleted");
  };

  // console.log("props.thirdTableData", props.thirdTableData);
  const firstTableCheckBoxClickFunc = (rowData, k) => {
    // setCheckedCheckBox(!checkedCheckBox);

    let issueChecked = document.getElementById(`checkBoxFirstTable${k}`);

    // console.log("checked???...", issueChecked.checked);
    if (issueChecked.checked) {
      // checked===true

      removeMtrlThirdTable(rowData, k);

      const newArray = props.allData.filter((obj) => {
        return (
          obj.RV_No === rowData.RV_No &&
          obj.Mtrl_Code === rowData.Mtrl_Code &&
          obj.DynamicPara1 === rowData.DynamicPara1 &&
          obj.DynamicPara2 === rowData.DynamicPara2
        );
      });

      props.setThirdTableData(props.thirdTableData.concat(newArray));

      // for (let i = 0; i < newArray.length; i++) {
      //   // const element = newArray[i];
      //   console.log("element", newArray[i]);
      //   props.setThirdTableData([...props.thirdTableData, newArray[i]]);
      // }
    } else {
      removeMtrlThirdTable(rowData, k);
      //   // checked===false

      //   let found = false;
      //   // console.log("clicked checkbox", rowData);

      //   const newArray = props.allData.filter((obj) => {
      //     return (
      //       obj.RV_No === rowData.RV_No &&
      //       obj.Mtrl_Code === rowData.Mtrl_Code &&
      //       obj.DynamicPara1 === rowData.DynamicPara1 &&
      //       obj.DynamicPara2 === rowData.DynamicPara2
      //     );
      //   });

      //   // console.log("newArray", newArray);

      //   for (let i = 0; i < newArray.length; i++) {
      //     const element = newArray[i];

      //     found = props.thirdTableData.some(
      //       (el) => el.Cust_Docu_No === element.Cust_Docu_No
      //     );

      //     if (found) {
      //       // console.log("found");
      //       const newThirdTableData = props.thirdTableData.filter(
      //         (data) => data.Cust_Docu_No !== element.Cust_Docu_No
      //       );
      //       props.setThirdTableData(newThirdTableData);
      //       // console.log("deleted");
      //       // break;
      //       // console.log("test if");
      //     } else {
      //       // console.log("not found");
      //       // break;
      //       // console.log("test continue");
      //     }
      //   }

      //   // const found = props.thirdTableData.some(
      //   //   (el) => el.MtrlStockID === rowData.MtrlStockID
      //   // );
      //   // if (found) {
      //   //   // deleting the element if found
      //   // const newThirdTableData = thirdTableData.filter(
      //   //   (data) => data !== rowData
      //   // );
      //   // setThirdTableData(newThirdTableData);
      //   // // console.log("deleted");

      //   //   // setThirdTableData([thirdTableData.remove(rowData)]);
      //   //   // console.log("deselected", thirdTableData);
      //   // }

      //   // const newThirdTableData = props.thirdTableData.filter(
      //   //   (data) => data !== rowData
      //   // );
      //   // props.setThirdTableData(newThirdTableData);
      //   // console.log("deleted");
    }
    // let found = false;
    // console.log("clicked checkbox", rowData);

    // const newArray = props.allData.filter((obj) => {
    //   return (
    //     obj.RV_No === rowData.RV_No &&
    //     obj.Mtrl_Code === rowData.Mtrl_Code &&
    //     obj.DynamicPara1 === rowData.DynamicPara1 &&
    //     obj.DynamicPara2 === rowData.DynamicPara2
    //   );
    // });

    // console.log("newArray", newArray);

    // // checking the mtrlStockId exist for that document, if yes... remove the existing and add the whole/ if no...add the whole
    // for (let i = 0; i < newArray.length; i++) {
    //   const element = newArray[i];

    //   found = props.thirdTableData.some(
    //     (el) => el.MtrlStockID === element.MtrlStockID
    //   );

    //   if (found) {
    //     console.log("found");
    //     break;
    //     // console.log("test if");
    //   } else {
    //     console.log("not found");
    //     // break;
    //     // console.log("test continue");
    //   }
    // }

    // // if (found) {
    // //   // deleting the element if found
    // //   const newThirdTableData = thirdTableData.filter(
    // //     (data) => data !== rowData
    // //   );
    // //   setThirdTableData(newThirdTableData);
    // //   // console.log("deleted");

    // //   // setThirdTableData([thirdTableData.remove(rowData)]);
    // //   // console.log("deselected", thirdTableData);
    // // } else {
    // //   // inserting the element if not found
    // //   setThirdTableData([...thirdTableData, rowData]);
    // //   // console.log("inserted");
    // // }
  };

  // console.log(
  //   "inside... includes",
  //   props.allData.filter((obj) => {
  //     return (
  //       obj.RV_No === val.RV_No &&
  //       obj.Mtrl_Code === val.Mtrl_Code &&
  //       obj.DynamicPara1 === val.DynamicPara1 &&
  //       obj.DynamicPara2 === val.DynamicPara2
  //     );
  //   })
  // );

  return (
    <>
      <Table striped className="table-data border" style={{ border: "1px" }}>
        <thead className="tableHeaderBGColor">
          <tr>
            <th>SL No</th>
            <th>RV No</th>
            <th>Cust Document</th>
            <th>Material Code</th>
            <th>Width</th>
            <th>Length</th>
            <th>Scrap</th>
            <th>Weight</th>
            <th>Scrap Weight</th>
            <th>In Stock</th>
            <th>Issue</th>
          </tr>
        </thead>
        <tbody>
          {props.firstTableData.map((val, k) => (
            <tr
              onClick={() => props.selectRowFirstFun(val)}
              className={
                val === props.firstTableSelectedRow[0] ? "rowSelectedClass" : ""
              }
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
              <td>{parseFloat(val.Weight).toFixed(2)}</td>
              <td>{parseFloat(val.ScrapWeight).toFixed(2)}</td>
              <td>{val.InStock}</td>
              <td>
                <input
                  type="checkbox"
                  name=""
                  id={`checkBoxFirstTable${k}`}
                  // checked={checkedCheckBox}
                  onClick={() => firstTableCheckBoxClickFunc(val, k)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
    // <div>FirstTable</div>
  );
}
