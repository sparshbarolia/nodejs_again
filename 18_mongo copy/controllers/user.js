const UserDB = require("../models/user");

async function displayUsers(req,res){
    const allDbUsers = await UserDB.find({});  //empty means sbhi data le aao

    const html = `
    <ul>
        ${allDbUsers.map((user) => `<li> ${user.firstName} - ${user.email} </li>`).join("")}
    </ul>
    `;
    res.send(html);
};

async function getAllUsers(req,res){
    const allDbUsers = await UserDB.find({});

    //json data h to res.json likha
    return res.json(allDbUsers);
};

async function getUserById(req,res) {
    const DbUserWithId = await UserDB.findById(req.params.id);
    
    return res.json(DbUserWithId);
}

async function addUser(req,res) {
    //TODO -> create new user
    const body = req.body;

    //new entry created in DB
    await UserDB.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    })

    //ye status code and json msg POSTMAN pr dikhega
    return res.status(201).json({msg : "success"});
}

async function editJobtitleById(req,res) {
    //TODO -> edit the user with id

    //                            (<jis ID ko change krna> , <kya change krna usme>)
    await UserDB.findByIdAndUpdate(req.params.id , {jobTitle: "switched"})

    return res.json({status: "success"});
}
async function dltUserById(req,res) {
    //TOTO -> delete the user with id
    await UserDB.findByIdAndDelete(req.params.id);

    return res.json({status: "success"});
}

module.exports = {
    displayUsers,
    getAllUsers,
    getUserById,
    addUser,
    editJobtitleById,
    dltUserById
}