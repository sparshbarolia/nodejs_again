const {Schema , model} = require('mongoose');
const {createHmac , randomBytes} = require('crypto');

const userSchema = new Schema({
    fullName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    //salt is for hashing password
    salt:{
        type: String,
    },
    password:{
        type: String,
        required: true,
    },
    profileImageURL:{
        type: String,
        default: "/images/default.png",
    },
    role:{
        type: String,
        enum: ["USER" , "ADMIN"],  //mtlb in dono me se ek hi hona chahiye role
        default: "USER",
    },
},{timestamps: true});

// Define a pre-save middleware function to hash the password before saving
// do not use arrow function here,this keyword me rr hojata h
userSchema.pre("save", function(next) {     //This is kind of middleware
    // 'this' refers to the document being saved
    const user = this; 

    // Hash the password if it's modified or new
    if(!user.isModified("password")) return;

    //A random salt is generated using the randomBytes function. 
    //A salt is used to add randomness to the hashed password, which 
    //enhances security.
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256",salt)  //sha256=hashing algo
        .update(user.password)
        .digest("hex");
    
    //jo doc save krne vale h,vaha salt ki jagah hmara salt daldo
    //or password ki jagah hmara hashedPassword daldo 
    //and then save to database
    this.salt = salt;
    this.password = hashedPassword;

    // Continue with the save operation
    next();
});

//In Mongoose, statics are functions that you define on the schema itself
userSchema.static("matchPassword" , async function(email,password){
    //here,this means userSchema
    const userData = await this.findOne({email});
    if(!userData) throw new Error("User not found");

    const salt = userData.salt;
    const hashedPassword = userData.password;

    //hash the userprovided password
    //and match it with hashedPassword from database
    const userProvidedHash = createHmac("sha256",salt)
        .update(password)
        .digest("hex");

    if(hashedPassword !== userProvidedHash){
        throw new Error("Incorrect Password");
    }
    
    return userData;
})

const User = model("user",userSchema);

module.exports = User;