import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import BootstrapTable from "react-bootstrap-table-next";
import LocationLisModal from "./LocationLisModal";
import YesNoModal from "../../components/YesNoModal";
import { useNavigate } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";

const { getRequest, postRequest } = require("../../../api/apiinstance");
const { endpoints } = require("../../../api/constants");

function LocationList(props) {
  const nav = useNavigate();
  const [open, setOpen] = useState();
  const [show, setShow] = useState(false);
  const [btnState, setBtnState] = useState("");
  const [shape, setShape] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [formHeader, setFormHeader] = useState({
    location: "",
    storage: "",
    capacity: "",
  });

  const fetchData = async () => {
    //load shapes
    getRequest(endpoints.getAllShapeNames, async (data) => {
      for (let i = 0; i < data.length; i++) {
        data[i].label = data[i].Shape;
      }

      setShape(data);
    });

    console.log("shapes", shape);
    getRequest(endpoints.getMaterialLocationList, (data) => {
      for (let i = 0; i < data.length; i++) {
        data[i].id = i + 1;
      }
      setTableData(data);
      console.log("table data = ", data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const InputEvent = (e) => {
    const { value, name } = e.target;
    setFormHeader((preValue) => {
      //console.log(preValue)
      return {
        ...preValue,
        [name]: value,
      };
    });

    if (btnState === "save") {
      //update
    }
  };
  const InputEventShape = (e) => {
    //const { value, name } = e.target;
    setFormHeader((preValue) => {
      //console.log(preValue)
      return {
        ...preValue,
        storage: e[0]?.Shape,
      };
    });

    if (btnState === "save") {
      //update
    }
  };

  const deleteButton = () => {
    //console.log("form header = ", formHeader);
    //console.log("selected row = ", selectedRow);
    let url1 =
      endpoints.getLocationListMtrlStockCount +
      "?location=" +
      selectedRow.LocationNo;
    getRequest(url1, async (data) => {
      console.log("count = " + data.count);
      if (data.count > 0) {
        toast.error(
          selectedRow.LocationNo +
            " has material in it. Clear / move material before deleting the storage loaction"
        );
      } else {
        setShow(true);
      }
    });
  };
  const modalResponse = (msg) => {
    console.log("msg = ", msg);
    if (msg === "yes") {
      let paraData1 = {
        LocationNo: selectedRow.LocationNo,
      };
      postRequest(endpoints.deleteMaterialLocationList, paraData1, (data) => {
        console.log("Location Deleted");
        toast.success("Location Deleted");
        getRequest(endpoints.getMaterialLocationList, (data) => {
          for (let i = 0; i < data.length; i++) {
            data[i].id = i + 1;
          }
          setTableData(data);
        });
      });
    }
  };
  const addButton = () => {
    setBtnState("add");
    setFormHeader((preValue) => {
      return {
        location: "",
        storage: "",
        capacity: "",
      };
    });

    //insert black row in table
    tableData.push({
      Capacity: "",
      CapacityUtilised: 0,
      CurrentCapacity: 0,
      LocationNo: "",
      StorageType: "",
      id: tableData.length + 1,
    });
    setTableData(tableData);
  };
  const saveButton = () => {
    setBtnState("save");

    //update
    let paraData1 = {
      LocationNo: selectedRow.LocationNo,
      StorageType: formHeader.storage,
      Capacity: formHeader.capacity,
    };
    postRequest(endpoints.updateMaterialLocationList, paraData1, (data) => {
      console.log("Location Updated");
      toast.success("Location Updated");
      getRequest(endpoints.getMaterialLocationList, (data) => {
        for (let i = 0; i < data.length; i++) {
          data[i].id = i + 1;
        }
        setTableData(data);
        //console.log("table data = ", data);
      });
    });
  };
  const insertData = () => {
    console.log("blur");
    if (btnState === "add") {
      let paraData1 = {
        LocationNo: formHeader.location,
        StorageType: formHeader.storage,
        Capacity: formHeader.capacity,
      };
      postRequest(endpoints.insertMaterialLocationList, paraData1, (data) => {
        getRequest(endpoints.getMaterialLocationList, (data) => {
          for (let i = 0; i < data.length; i++) {
            data[i].id = i + 1;
          }
          setTableData(data);
        });
      });

      setBtnState("");
    }
  };
  const columns = [
    {
      text: "id",
      dataField: "id",
      hidden: true,
    },
    {
      text: "LocationNo",
      dataField: "LocationNo",
    },
    {
      text: "StorageType",
      dataField: "StorageType",
    },
    {
      text: "Capacity",
      dataField: "Capacity",
    },
    {
      text: "CapacityUtilised",
      dataField: "CapacityUtilised",
    },
  ];
  const selectRow = {
    mode: "radio",
    clickToSelect: true,
    bgColor: "#98A8F8",
    onSelect: (row, isSelect, rowIndex, e) => {
      if (isSelect) {
        console.log("row = ", row);
        setSelectedRow(row);
        setFormHeader((preValue) => {
          return {
            location: row.LocationNo,
            storage: row.StorageType,
            capacity: row.Capacity,
          };
        });
      }
    },
  };
  return (
    <div>
      <YesNoModal
        show={show}
        setShow={setShow}
        message="Do you want to remove this location?"
        modalResponse={modalResponse}
      />
      <LocationLisModal open={open} setOpen={setOpen} />
      <h4 className="title">Material Storage Location Manager</h4>
      <div className="row">
        <div className="col-md-7 col-sm-12">
          <div style={{ height: "450px", overflowY: "scroll" }}>
            <BootstrapTable
              keyField="id"
              columns={columns}
              data={tableData}
              striped
              hover
              condensed
              selectRow={selectRow}
              headerClasses="header-class"
            ></BootstrapTable>
          </div>
        </div>
        <div className="col-md-5 col-sm-12">
          <div className="ip-box form-bg">
            <div className="row">
              <div className="col-md-5 ">
                <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                  Location No/Name
                </label>
              </div>
              <div className="col-md-7 ">
                <input
                  className="in-field"
                  type="text"
                  name="location"
                  value={formHeader.location}
                  onChange={InputEvent}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-5 mt-2 ">
                <label className="form-label">Storage Type</label>
              </div>
              <div className="col-md-7" style={{ marginTop: "8px" }}>
                {/* <select
                          className="ip-select dropdown-field"
                          name="storage"
                          onChange={InputEvent}
                          defaultValue={formHeader.storage}
                          value={formHeader.storage}
                        >
                          <option value="" disabled selected>
                            Select Shape
                          </option>
                          {shape.map((sh, index) => (
                            <option key={index} value={sh.Shape}>
                              {sh.Shape}
                            </option>
                          ))}
                        </select> */}
                {shape.length > 0 ? (
                  <Typeahead
                    id="basic-example"
                    name="storage"
                    options={shape}
                    placeholder="Select Storage Type"
                    onChange={(label) => InputEventShape(label)}
                    className="in-field"
                  />
                ) : (
                  <p>Loading storage types...</p>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-md-5 ">
                <label className="form-label">Storage Capacity</label>
              </div>
              <div className="col-md-7 ">
                <input
                  className="in-field"
                  type="text"
                  name="capacity"
                  value={formHeader.capacity}
                  onChange={InputEvent}
                  onBlur={insertData}
                />
              </div>
            </div>

            <div className="row mt-3 mb-3">
              <div className="col-md-3 col-sm-12">
                <button
                  className="button-style "
                  style={{ width: "100px" }}
                  onClick={addButton}
                >
                  Add
                </button>
              </div>
              <div className="col-md-3 col-sm-12">
                <button
                  className="button-style"
                  style={{ width: "100px" }}
                  onClick={deleteButton}
                >
                  Delete
                </button>
              </div>
              <div className="col-md-3 col-sm-12">
                <button
                  className="button-style "
                  style={{ width: "100px" }}
                  onClick={saveButton}
                >
                  Save
                </button>
              </div>
              <div className="col-md-3 col-sm-12">
                <button
                  className="button-style"
                  style={{ width: "100px" }}
                  id="btnclose"
                  type="submit"
                  onClick={() => nav("/MaterialManagement")}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationList;
