module.exports.pushNotification = (req,res,next) => {
    const {name,age,desc} = req.body
    if(!name || !age|| !desc){
        res.status(500).json({error: "bad request from body"})
    }
    else{
        res.status(200).json({success:req.body})
        console.log(req.body)
    }
} 