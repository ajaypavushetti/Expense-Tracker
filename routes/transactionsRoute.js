const express = require("express");
const Transaction = require("../models/Transaction.js");
const moment = require("moment");
const router = express.Router();

router.post("/add-transaction", async (req, res) => {
  try {
    const newtransaction = new Transaction(req.body);
    await newtransaction.save();
    res.send("Transaction Added Successfully ");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/edit-transaction", async (req, res) => {
  try {
    await Transaction.findOneAndUpdate({_id : req.body.transactionId},req.body.payload)
    res.send("Transaction Updated Successfully ");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/delete-transaction", async (req, res) => {
  try {
    await Transaction.findOneAndDelete({_id : req.body.transactionId})
    res.send("Transaction Deleted Successfully ");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/get-all-transactions", async (req, res) => {
  try {
    const { userid, frequency, selectedRange, type } = req.body;

    // Calculate the date range based on frequency (in days)
    const startDate = moment().subtract(Number(frequency), "days").toDate();

    const transactions = await Transaction.find({
      userid,
      ...(frequency !== "custom" ? {date: {
        $gte:  moment().subtract(Number(frequency), "d").toDate(),
      },}
    :{
        date : {
          $gte : selectedRange[0],
          $lte : selectedRange[1]
        }

    }),
    ...(type!== 'all' && {type})
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json(error);
  }
});

module.exports = router;
