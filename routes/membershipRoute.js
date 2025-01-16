const express = require("express");
const router = express();
const membershipController = require("../controllers/membershipController");
router.use(express.urlencoded({ extended: true }));

router.get("/membership-code", membershipController.getMembershipForm);
router.post("/membership-code", membershipController.updateMembership);

module.exports = router;
