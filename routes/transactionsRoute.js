const express = require("express");
const Transaction = require("../models/Transaction.js"); // Transaction model
const moment = require("moment"); // For date manipulation
const router = express.Router(); // Express Router

// POST /api/transactions/add-transaction - Add a new transaction
router.post("/add-transaction", async (req, res) => {
  try {
    const newtransaction = new Transaction(req.body); // Create new Transaction instance
    await newtransaction.save(); // Save to database
    res.status(201).send("Transaction Added Successfully"); // Return success
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ message: "Error adding transaction", error: error.message });
  }
});

// POST /api/transactions/edit-transaction - Edit an existing transaction
router.post("/edit-transaction", async (req, res) => {
  try {
    const { transactionId, payload } = req.body; // Destructure transaction ID and updated payload
    await Transaction.findOneAndUpdate({ _id: transactionId }, payload, { new: true }); // Find and update
    res.status(200).send("Transaction Updated Successfully"); // Return success
  } catch (error) {
    console.error("Error editing transaction:", error);
    res.status(500).json({ message: "Error updating transaction", error: error.message });
  }
});

// POST /api/transactions/delete-transaction - Delete a transaction
router.post("/delete-transaction", async (req, res) => {
  try {
    const { transactionId } = req.body; // Destructure transaction ID
    await Transaction.findOneAndDelete({ _id: transactionId }); // Find and delete
    res.status(200).send("Transaction Deleted Successfully"); // Return success
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ message: "Error deleting transaction", error: error.message });
  }
});

// POST /api/transactions/get-all-transactions - Get all transactions for a user with filters
router.post("/get-all-transactions", async (req, res) => {
  try {
    const { userid, frequency, selectedRange, type } = req.body;

    let query = { userid }; // Start with filtering by user ID

    // Apply date range filtering based on frequency or custom range
    if (frequency !== "custom") {
      // For predefined frequencies (e.g., '7', '30', '365' days)
      const startDate = moment().subtract(Number(frequency), "days").toDate();
      query.date = { $gte: startDate };
    } else {
      // For custom date range
      if (selectedRange && selectedRange.length === 2) {
        query.date = {
          $gte: moment(selectedRange[0]).startOf('day').toDate(), // Start of the first day
          $lte: moment(selectedRange[1]).endOf('day').toDate(),   // End of the second day
        };
      }
    }

    // Apply transaction type filtering
    if (type !== 'all') {
      query.type = type;
    }

    const transactions = await Transaction.find(query); // Execute the query
    res.status(200).json(transactions); // Return filtered transactions
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Error fetching transactions", error: error.message });
  }
});

module.exports = router;
