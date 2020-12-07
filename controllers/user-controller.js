const {User, Thought} = require("../models");

const userController = {
    getAllUsers(req, res){
        User.find({})
        .select('-__V')
        .then(dbUserData => res.json(dbUserData))
        .catch((err) =>{
            console.log(err);
            res.sendStatus(400);
        });
    },
    getUserById({params}, res){
        User.findOne({_id: params.id})
        .populate([
            {path: 'thoughts', select: "-__v"}
        ])
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData){
                res.sendStatus(404);
                return;
            }
            res.json(dbUserData);

        }).catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    updateUser({ params, body }, res) 
        {
            User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
        },
    deleteUser({params}, res){
        User.findOneAndDelete({_id: params.id})
        .then((dbUserData) => {
            if(!dbUserData){
                res.sendStatus(404);
                return;
            }
            res.json(dbUserData);

        }).catch((err) => {
            console.log(err);
            res.sendStatus(err);
        });
    },
    




};
module.exports = userController;