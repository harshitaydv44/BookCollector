import User from "../model/usermodel.js";
import bcryptjs from 'bcryptjs';

export const signup = async(req,res) => {
   try{
    console.log("Signup route hit");
      const{fullname,email,password} = req.body;
      console.log("Received data:",fullname,email,password);
      const user = await User.findOne({email});
      if(user){
        return res.status(400).json({message:"User already exists"})
      }
       const hashPassword =  await bcryptjs.hash(password,8);

      const createdUser = new User({
        fullname: fullname,
        email: email,
        password:hashPassword,
      });
      await createdUser.save()
      res.status(201).json({message:"User created successfully",
        user:{
            _id:createdUser._id,
            fullname: createdUser.fullname,
            email: createdUser.email,
        },
      });
   } catch (error){
     console.log("Error:" + error.message);
     res.status(500).json({message:"Internal server error"})


   }
};

export const login = async(req,res) => {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        const isMatch =  bcryptjs.compareSync(password,user.password);
        if(!user || !isMatch){
            return res.status(400).json({message:"Inavalid username or password"});
          } else{
            res.status(200).json({message:"Login successfully",user:{
                
                _id:user._id,
                fullname:user.fullname,
                email:user.email,
            }})
          }
       
    } catch (error){
        console.log("Error:" + error.message)
        res.status(500).json({message:"Internal server error"})
        
    }
}