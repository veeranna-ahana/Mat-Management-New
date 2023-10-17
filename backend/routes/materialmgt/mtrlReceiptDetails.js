const mtrlReceiptDetailsRouter = require("express").Router();
const { misQueryMod } = require("../../helpers/dbconn");
const req = require("express/lib/request");
const { logger } = require("../../helpers/logger");

mtrlReceiptDetailsRouter.get(
  "/getMtrlReceiptDetailsByID",
  async (req, res, next) => {
    try {
      let id = req.query.id;
      //console.log(`SELECT * FROM mtrl_part_receipt_details where RvID = ${id}`);
      misQueryMod(
        `SELECT * FROM mtrlreceiptdetails where Mtrl_Rv_id = ${id}`,
        (err, data) => {
          if (err) logger.error(err);
          res.json(data);
        }
      );
    } catch (error) {
      next(error);
    }
  }
);

mtrlReceiptDetailsRouter.get(
  "/getMtrlReceiptDetailsByRvID",
  async (req, res, next) => {
    try {
      let id = req.query.id;
      //console.log(`SELECT * FROM mtrl_part_receipt_details where RvID = ${id}`);
      misQueryMod(
        `SELECT * FROM mtrlreceiptdetails where RvID = ${id} order by RvID`,
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

mtrlReceiptDetailsRouter.post(
  "/insertMtrlReceiptDetails",
  async (req, res, next) => {
    //console.log("req", req.body);

    try {
      let {
        rvId,
        srl,
        custCode,
        mtrlCode,
        material,
        shapeMtrlId,
        shapeID,
        dynamicPara1,
        dynamicPara2,
        dynamicPara3,
        qty,
        inspected,
        accepted,
        totalWeightCalculated,
        totalWeight,
        locationNo,
        updated,
        qtyAccepted,
        qtyReceived,
        qtyRejected,
        qtyUsed,
        qtyReturned,
      } = req.body;
      /*console.log(
        `insert into  mtrlreceiptdetails (RvID,Srl,Cust_Code,Mtrl_Code,Material,ShapeMtrlID,ShapeID,DynamicPara1,DynamicPara2,DynamicPara3,Qty,Inspected,Accepted,TotalWeightCalculated,TotalWeight,LocationNo,Updated,QtyReceived,QtyRejected,QtyAccepted,QtyUsed,QtyReturned) values ("${rvId}","${srl}","${custCode}","${mtrlCode}","${material}",${shapeMtrlId},${shapeID},${dynamicPara1},${dynamicPara2},${dynamicPara3},${qty},${inspected},${accepted},${totalWeightCalculated},${totalWeight},"${locationNo}",${upDated},${qtyReceived},"${qtyRejected}","${qtyAccepted}","${qtyUsed}","${qtyReturned}")`
      );*/
      misQueryMod(
        `insert into  mtrlreceiptdetails (RvID,Srl,Cust_Code,Mtrl_Code,Material,ShapeMtrlID,ShapeID,DynamicPara1,DynamicPara2,DynamicPara3,Qty,Inspected,Accepted,TotalWeightCalculated,TotalWeight,LocationNo,Updated,QtyReceived,QtyRejected,QtyAccepted,QtyUsed,QtyReturned) values ("${rvId}","${srl}","${custCode}","${mtrlCode}","${material}",${shapeMtrlId},${shapeID},${dynamicPara1},${dynamicPara2},${dynamicPara3},${qty},${inspected},${accepted},${totalWeightCalculated},${totalWeight},"${locationNo}",${updated},${qtyReceived},"${qtyRejected}","${qtyAccepted}","${qtyUsed}","${qtyReturned}")`,
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

mtrlReceiptDetailsRouter.post(
  "/updateMtrlReceiptDetails",
  async (req, res, next) => {
    //console.log("result", req.body);
    // try {
    //   let {
    //     id,
    //     srl,
    //     mtrlCode,
    //     dynamicPara1,
    //     dynamicPara2,
    //     dynamicPara3,
    //     qty,
    //     inspected,
    //     // accepted,
    //     // totalWeightCalculated,
    //     // totalWeight,
    //     locationNo,
    //     // updated,
    //     qtyAccepted,
    //     qtyReceived,
    //   } = req.body;
    //   inspected = inspected == "on" ? "1" : "0";
    //   misQueryMod(
    //     `update mtrlreceiptdetails set RvID = "${rvId}", Srl = "${srl}",Cust_Code = "${custCode}",Mtrl_Code = "${mtrlCode}",Material = "${material}",ShapeMtrlID = ${shapeMtrlId},ShapeID = ${shapeID},DynamicPara1 = ${dynamicPara1},DynamicPara2 = ${dynamicPara2}, DynamicPara3 = ${dynamicPara3}, Qty = ${qty},Inspected = ${inspected}, LocationNo = "${locationNo}",Updated = ${updated}, QtyAccepted = ${qtyAccepted},QtyReceived = "${qtyReceived}",QtyRejected = "${qtyRejected}",QtyUsed = "${qtyUsed}",QtyReturned = "${qtyReturned}" where Mtrl_Rv_id = ${id}`,
    //     (err, data) => {
    //       if (err) logger.error(err);
    //       res.json(data);
    //     }
    //   );
    // } catch (error) {
    //   next(error);
    // }
  }
);

mtrlReceiptDetailsRouter.post(
  "/updateMtrlReceiptDetailsUpdated",
  async (req, res, next) => {
    //console.log("requpdate2", req.body);
    try {
      let { id, upDated } = req.body;
      misQueryMod(
        `update mtrlreceiptdetails set Updated = ${upDated} where Mtrl_Rv_id = ${id}`,
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

mtrlReceiptDetailsRouter.post(
  "/deleteMtrlReceiptDetails",
  async (req, res, next) => {
    try {
      let { id } = req.body;
      //console.log(`delete from mtrl_part_receipt_details where id = ${id}`);
      misQueryMod(
        `delete from mtrlreceiptdetails where Mtrl_Rv_id = ${id}`,
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

module.exports = mtrlReceiptDetailsRouter;
