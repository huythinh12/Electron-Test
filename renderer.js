// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const electron = require('electron');
const Notification = electron.remote.Notification;
console.log("xin chao ");

const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'
var button = document.getElementById('btn_Notify')



//custom notification 
const options = {
    title: NOTIFICATION_TITLE,
    // subtitle: 'Subtitle of the Notification', ---------->macos
    body: NOTIFICATION_BODY,
    silent: false,
    // icon: path.join(__dirname, '../assets/image.png'), 
    // hasReply: true,  ----> for macos
    timeoutType: 'never',
    // replyPlaceholder: 'Reply Here',     -------->for macos
    // sound: path.join(__dirname, '../assets/sound.mp3'), -------->for macos
    // urgency: 'critical' , -------->for linux
    // closeButtonText: 'Close Button', -------->for macos
    // actions: [ { -----------> for macos
    //     type: 'button',
    //     text: 'Show Button'
    // }]
}
const customNotification = new Notification(options)

// function showNotification () {
//   new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY, }).show()
// }
button.addEventListener('click', (event) => {
    console.log(Notification.isSupported());
    customNotification.show()
})


customNotification.addListener('click', () => {
    console.log('Notification is Clicked');
});