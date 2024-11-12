const express=require('express')
const {handleGenerateShortURL,handleGetRedirectURL,handleGetAnalytics}=require("../controllers/url")
const router=express.Router();


router.post('/',handleGenerateShortURL)

router.get('/:shortID',handleGetRedirectURL)

router.get('/analytics/:shortID',handleGetAnalytics)

module.exports=router; 