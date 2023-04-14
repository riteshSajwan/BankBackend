const router = require("express").Router();
const Customer = require("../models/Customer");
const Transfer = require("../models/Transfer");

//REGISTER  customers
router.post("/register", async (req, res) => {
  try {
    const newCustomer = new Customer({
      c_id: req.body.c_id,
      name: req.body.name,
      email: req.body.email,
      balance: req.body.balance,
    });

    const customer = await newCustomer.save();
    res.status(200).json({message:"User Registered Successfully"});
  } catch (err) {
    res.status(500).json({error:"err"});
  }
});

router.get("/getusers", async (req, res) => {
  try {
    const allCustomers = await Customer.find({});
    res.status(200).json(allCustomers);

    // console.log("allCustomers",allCustomers);
  } catch (err) {
    res.status(500).json({error:"err"});
  }
});

router.get("/gethistory", async (req, res) => {
  try {
    const allHistory = await Transfer.find({});
    res.status(200).json(allHistory);
    // console.log(allHistory);
  } catch (err) {
    res.status(500).json({error:"err"});
  }
});

router.post("/transfer", async (req, res) => {
  let c = 0;
  try {
    const sender = await Customer.find({ name: req.body.sender });
    c++;
    const newTransfer = new Transfer({
      t_id: c,
      sender: req.body.sender,
      receiver: req.body.receiver,
      amount: req.body.amount,
    });
    const transfer = await newTransfer.save();

    const updatedReceiver = await Customer.findOneAndUpdate(
      { name: req.body.receiver },
      { $inc: { balance: req.body.amount } },
      { new: true }
    );

    const updatedSender = await Customer.findOneAndUpdate(
      { name: req.body.sender },
      { $inc: { balance: -req.body.amount } },
      { new: true }
    );
    res.status(200).json([transfer, updatedReceiver, updatedSender]);
  } catch (err) {
    res.status(500).json({error:"err"});
  }
  // try {
  //   const updatedReceiver = await Customer.findOneAndUpdate(
  //     { name: req.body.receiver },
  //     { $inc: { balance: req.body.amount } },
  //     { new: true }
  //   );
  //   res.status(200).json(updatedReceiver);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

module.exports = router;
