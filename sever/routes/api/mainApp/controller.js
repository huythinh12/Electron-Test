const {Notification ,app} = require('electron')
const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

let options = {
    title: NOTIFICATION_TITLE,
    body: NOTIFICATION_BODY,
    silent: true,
    timeoutType: 'never',

}

//custom notification 
// let customNotification = null
// app.on('ready', ()=>{
// //     customNotification = new Notification(options)


// })

let customNotification;
function CallNotify(options){
    customNotification = new Notification(options)
    customNotification.addListener('click', () => {
        console.log('Notification is Clicked');
    });
    customNotification.addListener('close', () => {
        console.log('Notification is close');
    });
    
    customNotification.show()
}
module.exports.pushNotification = (req,res,next) => {
    const {name,age,desc} = req.body
    try{
        if(!name || !age|| !desc){
            res.status(500).json({error: "bad request from body"})
        }
        else{
            res.status(200).json({success:req.body})
            options.title = req.body.name
            options.body = req.body.desc
            CallNotify(options)
            console.log(req.body)
        }
    }
    catch(error){
        console.log(`error messesage from pushNotification post request : ${error}`)
    }
  
} 

