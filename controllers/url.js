const shortid = require('shortid');

const URL=require('../models/url');


async function handleGenerateShortURL(req,res) {
    const body=req.body
    if(!body.url) return res.status(400).json({err:"please pass url"})
    const shortID=shortid();
    
    const url=await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[],
        createdBy:req.user._id
    })
    console.log("shorturl created");
    return res.redirect('/')
}

async function handleGetRedirectURL(req,res) {
    const shortID=req.params.shortID
    const entry=await URL.findOneAndUpdate({
        shortId:shortID,
    },
    {
        $push:{
            visitHistory:{timestamp:Date.now()}
        }
    }
)
res.redirect(entry.redirectURL)
}

async function handleGetAnalytics(req,res) {
    const shortID=req.params.shortID
    const url=await URL.findOne({
        shortId:shortID
    })
    return res.json({totalClicks:url.visitHistory.length,analytics:url.visitHistory})
}

module.exports={handleGenerateShortURL,handleGetRedirectURL,handleGetAnalytics}