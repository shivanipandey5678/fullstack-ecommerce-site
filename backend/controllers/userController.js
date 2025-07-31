import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import validator from 'validator';


const generateToken = async (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY);

}
// route for login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const exist = await User.findOne({ email });
        //checking user exist or not
        if (!exist) {
            return res.status(400).json({ success: false, message: 'User not found' })
        }
        if ( !email || !password) {
            return res.status(400).json({ success: false, message: 'Please fill all required fields:  email, and password' })
        }
        const isMatch=await bcrypt.compare(password,exist.password);
        if(!isMatch){
            return res.status(400).json({ success: false, message: 'Please Enter valid password' })
        }
        const token=await generateToken(exist._id);
        res.status(200).json({ success: true, token, message: 'User LoggedIn successfully' })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message,"hint":'loginUser' })
    
    }

}

// route for register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {


        const exist = await User.findOne({ email });
        //checking user exist or not
        if (exist) {
            res.status(400).json({ success: false, message: 'User already exist' })
        }
        if (!name || !email || !password) {
            res.status(400).json({ success: false, message: 'Please fill all required fields: name, email, and password' })
        }
        //validating input
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Please provide correct email' });

        }
        //checking length of password
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' })

        }
        //checking for strong password
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!strongPasswordRegex.test(password)) {
            return res.status(400).json({ success: false, message: "Password must include uppercase, lowercase, number, and special character" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name, email, password: hashedPassword

        })
        const user = await newUser.save();

        const token =await  generateToken(user._id);
       
        res.status(200).json({ success: true, token, message: 'User registered successfully' })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message ,"hint":'registerUser'})
    }
}

//route for admin login
const adminLogin = async (req, res) => {
    const {email,password}=req.body;

    if ( !email || !password) {
        return res.status(400).json({ success: false, message: 'Please fill all required fields:  email, and password' })
    }
    try {
        if(email!==process.env.ADMIN_EMAIL && password!==process.env.ADMIN_PASSWORD){
            return res.status(400).json({success:false,message:'Please enter valid crediantials'})
        }
        const token=jwt.sign(email+password, process.env.JWT_SECRET_KEY);
        res.status(200).json({ success: true, message: 'Admin loggedIn successfully',token })
    
    } catch (error) {
        res.status(500).json({ success: false, message: error.message ,"hint":'adminLogin' })
    }
   
}

export { loginUser, registerUser, adminLogin } 
