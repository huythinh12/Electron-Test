const express = require('express')
const app = express()
const port = 8000

app.use(express.json())

app.use("/api",require("./routes/api"))
// console.log("xin chao moi nguoi ")
// app.get('/', function(req, res){
   
//     res.send('Server is ready!');
    
// });
app.listen(port, (err)=>{
    if(err) return console.log(`Error:${error}`)
    console.log(`appp is running on port ${port} thinh`)
})
