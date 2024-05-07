const router = require("express").Router();

const mailController= require("../controllers/mailController");
  
  //send mail
  router.post("/send", mailController.passwordVerificationMail);

  module.exports = router;