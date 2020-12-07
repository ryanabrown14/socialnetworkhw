const {User, Thought} = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'thought data not found'});
                return;
            }
            res.json(dbThoughtData);
        }).catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    addThought({params, body}, res) {
        Thought.create(body)
        .then(dbThoughtData => {
            User.findOneAndUpdate(
                {_id: body.userId},
                {$push:{thoughts: dbThoughtData._id}},
                {new: true}
            )
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({message: 'User not found!'});
                    return;
                }
                res.json(dbThoughtData);
            }).catch(err => res.json(err));
        }).catch(err => res.status(400).json(err));
    },
    deleteThought({params}, res){
        Thought.findOneAndDelete({_id: params.id})
        .then(dbThoughtData  =>{
            if(!dbThoughtData){
                res.status(404).json({message:'No thought found'});
                return;
            }
            User.findByIdAndUpdate(
                
                    {username: dbThoughtData.username},
                    {$pull: {thoughts: params.id}}
                
            ).then(()=> {
                res.json({message: 'Thought Deleted!'});
            })
            .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(500).json(err));
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id },body,{ new: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },



};
module.exports = thoughtController;