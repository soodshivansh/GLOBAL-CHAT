// const mongoose = require('mongoose')
// const Message = require("../Schema/Msgschema") 

// //create a message
// const createmessage = async (req,res) =>{
//     const {content} = req.body

//     //add doc to db
//     try{
//         const message = await Message.create({content})
//         res.status(200).json(message)
//     } catch ( error ) {
//         res.status(400).json({error: error.message})
//     }
// }

// module.exports = {
//     createmessage
// }