const router = require("express").Router()

const { mongoose } = require("mongoose")
const Waitlist = require("../models/Waitlist")

router.post("/addWait/:email", async (req, res) => {
  const { email } = req.params

  if (email) {
    let user = await Waitlist.findOne({ email })

    if (user) {
      res.status(400).json({
        message: 'You are already on our waitlist',
        success: false,
      })
    } else {
      Waitlist.create({
        _id: new mongoose.Types.ObjectId(),
        email
      })

      res.status(201).json({
        message: "Congratulations, you are now on the waitlist",
        success: true,
      })
    }
  }
})

module.exports = router
