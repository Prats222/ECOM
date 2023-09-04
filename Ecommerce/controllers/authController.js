import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

export const registerController = async(req,res)=> {
    try {
     const{name,email,password,phone,address}=req.body   
     //validation
     if(!name){
        return res.send({error:'Name is required'})
     }
     if(!email){
        return res.send({error:'Email is required'})
     }
     if(!password){
        return res.send({error:'password is required'})
     }
     if(!phone){
        return res.send({error:'Phone is required'})
     }
     if(!address){
        return res.send({error:'addrees is required'})
     }

     //check user
     const existinguser = await userModel.findOne({email})
    // existing user
    if (existinguser){
        return res.status (200).send({
            success:true,
            message:'already Registered please login'
        })
    }

    //Register user
     const hashedPassword = await hashPassword(password)
     //saving the psw
     const user= await new userModel({name,email, phone, address, password:hashedPassword}).save()//key is password its value is hashedpassword

     res.status(201).send({
        success:true,
        message:'User Registered Succesfully',
        user
     })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in registeration',
            error
        })
    }
};

