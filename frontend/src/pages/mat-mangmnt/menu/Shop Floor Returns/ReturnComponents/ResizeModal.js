import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ModalComp from "./ModalComp";
import { toast } from "react-toastify";
const { getRequest, postRequest } = require("../../../../api/apiinstance");
const { endpoints } = require("../../../../api/constants");

function ResizeModal({ open1, setOpen1, row, resizeModal }) {
  const [open, setOpen] = useState(false);

  //console.log("row val =", row);
  //var [row, setRow] = useState(row);
  //console.log("row val =", row);
  //setrow(row);
  let [locationData, setLocationData] = useState([]);
  //useEffect(() => {
  getRequest(endpoints.getMaterialLocationList, (data) => {
    setLocationData(data);
  });
  //}, []);

  const handlSave = () => {
    console.log("row = ", row);
    if (row.ReminderPara1 < 10 || row.ReminderPara2 < 10) {
      toast.error("Dimension Should be usable");
    } else if (row.location.length == 0) {
      toast.error("Indicate the Storage Loaction");
    } else {
      resizeModal("ok", row);
      //setOpen(true);
      setOpen1(false);
    }
  };
  const handleCancel = () => {
    toast.warning("Not saved to Stock");
    resizeModal("cancel", row);
    setOpen1(false);
  };

  const InputHeaderEvent = (e) => {
    const { value, name } = e.target;
    console.log("name = ", name, " value = ", value);
    /*row((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });*/
    row[name] = value;
  };
  //rowResizeModal = () => setrow(row);

  return (
    <>
      {/* <ModalComp open={open} setOpen={setOpen} resizeModal={resizeModal} /> */}
      <Modal show={open1} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Magod Material</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <div className="row">
              <div className="col-md-2 mt-5">
                <label className="form-label">Para1</label>
              </div>
              <div className="col-md-3 mt-3 ">
                <label>
                  <b>Previous</b>
                </label>
                <input
                  className="in-field"
                  name="Para1"
                  value={row.Para1}
                  disabled
                />
              </div>
              <div className="col-md-3 mt-3 ">
                <label>
                  <b>Resize To</b>
                </label>
                <input
                  className="in-field"
                  name="ReminderPara1"
                  value={row.ReminderPara1}
                  onChange={InputHeaderEvent}
                />
              </div>
              {/* <div className="col-md-3 mt-3 ">
                <button className="button-style" style={{ width: "80PX" }}>
                  Save
                </button>
              </div> */}
            </div>
            <div className="row">
              <div className="col-md-2 mt-2">
                <label className="form-label">Para2</label>
              </div>
              <div className="col-md-3 ">
                <input
                  className="in-field"
                  name="Para2"
                  value={row.Para2}
                  disabled
                />
              </div>
              <div className="col-md-3 ">
                <input
                  className="in-field"
                  name="ReminderPara2"
                  value={row.ReminderPara2}
                  onChange={InputHeaderEvent}
                />
              </div>
              {/* <div className="col-md-3 ">
                <button className="button-style" style={{ width: "80PX" }}>
                  Cancel
                </button>
              </div> */}
            </div>
            <div className="row mt-2">
              {" "}
              <div className="col-md-12 ">
                <label className="form-label">Location</label>{" "}
              </div>{" "}
              <div className="col-md-11" style={{ marginTop: "8px" }}>
                {" "}
                <select
                  className="ip-select dropdown-field"
                  name="location"
                  onChange={InputHeaderEvent}
                >
                  <option value="" disabled selected>
                    Select Location
                  </option>
                  {locationData.map((location, index) => (
                    <option key={index} value={location.LocationNo}>
                      {location.LocationNo}
                    </option>
                  ))}
                </select>{" "}
              </div>{" "}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlSave}>
            Save
          </Button> */}

          <button
            className="button-style"
            style={{ width: "80px", backgroundColor: "gray" }}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="button-style"
            style={{ width: "80px" }}
            onClick={handlSave}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ResizeModal;
