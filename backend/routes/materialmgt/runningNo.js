const runningNoRouter = require("express").Router();
const { setupQuery, setupQueryMod } = require("../../helpers/dbconn");
const req = require("express/lib/request");
const { logger } = require("../../helpers/logger");

runningNoRouter.get("/getRunningNoBySrlType", async (req, res, next) => {
  try {
    // console.log("req.query", req.query);
    let SrlType = req.query.SrlType;
    let Period = req.query.Period;
    let UnitName = req.query.UnitName;
    setupQueryMod(
      `Select * from magod_setup.magod_runningno where SrlType = "${SrlType}" and Period = "${Period}" and UnitName="${UnitName}"`,
      (err, data) => {
        if (err) logger.error(err);
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

runningNoRouter.post("/updateRunningNoBySrlType", async (req, res, next) => {
  try {
    let { SrlType, Period, RunningNo } = req.body;
    setupQueryMod(
      `update magod_runningno set Running_No = "${RunningNo}" where  SrlType = "${SrlType}" and Period = "${Period}"`,
      (err, data) => {
        if (err) logger.error(err);
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

runningNoRouter.post("/insertRunningNo", async (req, res, next) => {
  try {
    // console.log("insertRunningNo", req.body);
    // let { SrlType, Period, RunningNo } = req.body;
    setupQueryMod(
      `INSERT INTO magod_setup.magod_runningno
        (UnitName, SrlType, ResetPeriod, ResetValue, EffectiveFrom_date, Reset_date, Running_No, UnitIntial, Prefix, Suffix, Length, DerivedFrom, Period, Running_EffectiveDate)
      VALUES
      ('${req.body.UnitName}', '${req.body.SrlType}', '${
        req.body.ResetPeriod
      }', '${req.body.ResetValue || 0}', '${req.body.EffectiveFrom_date}', '${
        req.body.Reset_date
      }', '${req.body.Running_No}', '${req.body.UnitIntial}', '${
        req.body.Prefix || ""
      }', '${req.body.Suffix || ""}', '${req.body.Length || 4}', '${
        req.body.DerivedFrom || 0
      }', '${req.body.Period || ""}', now())`,
      (err, data) => {
        if (err) logger.error(err);
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

module.exports = runningNoRouter;
