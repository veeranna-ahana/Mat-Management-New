const materialIssueRegisterRouter = require("express").Router();
const { misQuery, setupQuery, misQueryMod } = require("../../helpers/dbconn");
const { logger } = require("../../helpers/logger");

materialIssueRegisterRouter.post("/insert", async (req, res, next) => {
  try {
    let {
      IV_No,
      IV_Date,
      Cust_code,
      Customer,
      CustCSTNo,
      CustTINNo,
      CustECCNo,
      CustGSTNo,
      EMail,
      PkngDcNo,
      PkngDCDate,
      TotalWeight,
      TotalCalculatedWeight,
      UpDated,
      IVStatus,
      Dc_ID,
      Type,
    } = req.body;

    misQueryMod(
      `insert into  material_issue_register (IV_No,IV_Date, Cust_code, Customer, CustCSTNo, CustTINNo, CustECCNo, CustGSTNo, EMail, PkngDcNo, PkngDCDate, TotalWeight, TotalCalculatedWeight, UpDated, IVStatus, Dc_ID, Type) values ("${IV_No}","${IV_Date}","${Cust_code}","${Customer}","${CustCSTNo}","${CustTINNo}","${CustECCNo}","${CustGSTNo}","${EMail}","${PkngDcNo}",${PkngDCDate},"${TotalWeight}","${TotalCalculatedWeight}","${UpDated}","${IVStatus}","${Dc_ID}","${Type}")`,
      (err, data) => {
        if (err) logger.error(err);
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

materialIssueRegisterRouter.post("/updateDCWeight", async (req, res, next) => {
  // console.log("reqqqq..", req.body);

  let flag = false;
  try {
    // let { Iv_Id, PkngDcNo, TotalWeight } = req.body;
    // console.log(
    //   `update  material_issue_register set PkngDcNo = "${PkngDcNo}", TotalWeight = ${TotalWeight} where Iv_Id = ${Iv_Id} `
    // );
    // `update  material_issue_register set PkngDcNo = "${PkngDcNo}", TotalWeight = ${TotalWeight} where Iv_Id = ${Iv_Id} `,

    misQueryMod(
      `update  material_issue_register set PkngDcNo = "${req.body.formHeader.PkngDcNo}", TotalWeight = '${req.body.formHeader.TotalWeight}' where Iv_Id = '${req.body.formHeader.Iv_Id}' `,
      (err, data1) => {
        if (err) logger.error(err);

        if (data1.affectedRows !== 0) {
          for (let i = 0; i < req.body.outData.length; i++) {
            const element = req.body.outData[i];

            try {
              misQueryMod(
                `UPDATE magodmis.mtrlissuedetails SET TotalWeightCalculated = '${element.TotalWeightCalculated}', UpDated = ${element.UpDated} WHERE (Iv_Id = '${element.Iv_Id}')`,
                (err, data) => {
                  if (err) logger.error(err);
                  // res.send(data)
                }
              );
            } catch (error) {
              next(error);
            }
            flag = true;
          }

          if (flag) {
            res.send(data1);
            // console.log("successfull");
          } else {
            res.send("Error found while updating (BE001)");
          }
        } else {
          res.send("Error found while updating (BE001)");
        }
      }
    );
  } catch (error) {
    next(error);
  }
});

materialIssueRegisterRouter.post(
  "/updateStatusCancel",
  async (req, res, next) => {
    try {
      let { Iv_Id } = req.body;
      misQueryMod(
        `update  material_issue_register set IVStatus='Cancelled' where Iv_Id = ${Iv_Id} `,
        (err, data) => {
          if (err) logger.error(err);
          res.send(data);
        }
      );
    } catch (error) {
      next(error);
    }
  }
);

materialIssueRegisterRouter.post(
  "/updateStatusDCNoDCID",
  async (req, res, next) => {
    try {
      let { Iv_Id, PkngDcNo, Dc_ID } = req.body;
      misQueryMod(
        `update  material_issue_register set IVStatus='Returned', PkngDcNo = "${PkngDcNo}", PkngDCDate =now(), Dc_ID = "${Dc_ID}" where Iv_Id = ${Iv_Id} `,
        (err, data) => {
          if (err) logger.error(err);
          res.send(data);
        }
      );
    } catch (error) {
      next(error);
    }
  }
);

materialIssueRegisterRouter.get(
  "/getMaterialIssueRegisterRouterByIVID",
  async (req, res, next) => {
    let id = req.query.id;
    try {
      await misQueryMod(
        `Select *,
        DATE_FORMAT(PkngDCDate, '%d/%m/%Y') AS PkngDCDate,
        DATE_FORMAT(IV_Date, '%d/%m/%Y') AS IV_Date from magodmis.material_issue_register where Iv_Id = ${id}`,
        (err, data) => {
          // console.log("getMaterialIssueRegisterRouterByIVID", data);
          if (err) logger.error(err);
          res.send(data[0]);
        }
      );
    } catch (error) {
      next(error);
    }
  }
);

materialIssueRegisterRouter.get(
  "/getAllReturnListing",
  async (req, res, next) => {
    let type = req.query.type;
    if (type === "customer") {
      try {
        await misQueryMod(
          "select * from material_issue_register where cust_code not like 0000 order by iv_no DESC limit 200",
          (err, data) => {
            if (err) logger.error(err);
            res.send(data);
          }
        );
      } catch (error) {
        next(error);
      }
    } else if (type === "pending") {
      try {
        await misQueryMod(
          "select * from material_issue_register where pkngdcno is null and ivstatus not like 'cancelled' order by iv_no DESC",
          (err, data) => {
            if (err) logger.error(err);
            res.send(data);
          }
        );
      } catch (error) {
        next(error);
      }
    } else if (type === "sales") {
      try {
        await misQueryMod(
          "select * from material_issue_register where cust_code = 0000 order by iv_no DESC limit 200",
          (err, data) => {
            if (err) logger.error(err);
            res.send(data);
          }
        );
      } catch (error) {
        next(error);
      }
    } else if (type === "cancelled") {
      try {
        await misQueryMod(
          "select * from material_issue_register where ivstatus like 'cancelled' order by iv_no DESC limit 200",
          (err, data) => {
            if (err) logger.error(err);
            res.send(data);
          }
        );
      } catch (error) {
        next(error);
      }
    }
  }
);
/*
materialIssueRegisterRouter.get(
  "/allPendingDispatchRouter",
  async (req, res, next) => {
    try {
      await misQueryMod(
        "Select * from magodmis.material_issue_register where cust_code not like 0000 order by IV_No desc limit 200",
        (err, data) => {
          if (err) logger.error(err);
          res.send(data);
        }
      );
    } catch (error) {
      next(error);
    }
  }
);
materialIssueRegisterRouter.get(
  "/checkPendingDispatchRouter",
  async (req, res, next) => {
    try {
      let customer = req.query.customer;

      await misQueryMod(
        `Select IV_No,IV_Date,Cust_code,Customer,TotalWeight,Type from magodmis.material_issue_register where Customer= "${customer}" limit 200`,
        (err, data) => {
          if (err) logger.error(err);
          res.send(data);
        }
      );
    } catch (error) {
      next(error);
    }
  }
);

materialIssueRegisterRouter.get("/customerIVlist", async (req, res, next) => {
  try {
    await misQueryMod(
      "Select * from magodmis.material_issue_register where pkngdcno is null and ivstatus not like 'cancelled' order by IV_No desc limit 200",
      (err, data) => {
        if (err) logger.error(err);
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});
materialIssueRegisterRouter.get("/cancelledList", async (req, res, next) => {
  try {
    await misQueryMod(
      "Select * from magodmis.material_issue_register where  ivstatus  like 'cancelled' order by IV_No desc limit 200",
      (err, data) => {
        if (err) logger.error(err);
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});
materialIssueRegisterRouter.get("/SalesIVList", async (req, res, next) => {
  try {
    await misQueryMod(
      "Select * from magodmis.material_issue_register where cust_code not like 0000 order by IV_No desc limit 200 ",
      (err, data) => {
        if (err) logger.error(err);
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
}); */

materialIssueRegisterRouter.post("/postCancleIV", async (req, res, next) => {
  // console.log("reqq..", req.body);
  // res.send("got the data..");
  // let id = req.query.id;
  try {
    await misQueryMod(
      `UPDATE magodmis.material_issue_register SET IVStatus = 'Cancelled' WHERE (Iv_Id = '${req.body.Iv_Id}')`,
      (err, data) => {
        if (err) logger.error(err);
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});
module.exports = materialIssueRegisterRouter;
