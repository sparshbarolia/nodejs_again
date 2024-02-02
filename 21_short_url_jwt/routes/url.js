const express = require("express");
const {handleGenerateNewShortURL , handleGetAnalytics , handleGetRedirectURL} = require("../controllers/url")


const router = express.Router();

router.post('/',handleGenerateNewShortURL);  // here / means /url mtlb /url pr handleGenerateNewShortURL pr post request jaegi
router.get('/analytics/:shortId',handleGetAnalytics)
router.get("/:shortId" , handleGetRedirectURL)


module.exports = router;