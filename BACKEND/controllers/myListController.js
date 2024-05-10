const Mylist = require('../models/MyList.model');
const User = require('../models/User.model');
const mongoose = require('mongoose');
const TutorialsUser = require('../models/tutorialsUser.model');

// Create a new mylist
exports.createMylist = async (req, res) => {
    try {
      const { tutorialsRef } = req.body;
      const user = await User.findById(req.user._id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if tutorialsRef is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(tutorialsRef)) {
        return res.status(400).json({ message: "Invalid tutorial ID" });
      }
  
      // Check if the user already has a mylist with the same tutorials
      const existingMylist = await Mylist.findOne({ userRef: req.user._id });
  
      if (existingMylist) {
        // Check if the tutorial is already in the user's mylist
        if (existingMylist.tutorialsRef.includes(tutorialsRef)) {
          return res.status(400).json({ message: 'You already have this tutorial in your mylist' });
        }
  
        // Add the new tutorial to the user's mylist
        existingMylist.tutorialsRef.push(tutorialsRef);
        await existingMylist.save();
  
        res.status(200).json({ message: 'Tutorial added to mylist successfully' });
      } else {
        const newMylist = new Mylist({
          userRef: req.user._id,
          tutorialsRef: [tutorialsRef]
        });
  
        await newMylist.save();
  
        res.status(201).json({ message: 'Tutorial added to mylist successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

// Get all tutorials belonging to the logged-in user
exports.getUserTutorials = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const mylists = await Mylist.find({ userRef: req.user._id }).populate('tutorialsRef');

        const tutorials = mylists.map(mylist => mylist.tutorialsRef);

        res.status(200).json(tutorials);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete a mylist
exports.deleteMylist = async (req, res) => {
    try {
        const { id } = req.params;

        const mylist = await Mylist.findOneAndDelete({ _id: id, userRef: req.user._id });

        if (!mylist) {
            return res.status(404).json({ message: "Mylist not found" });
        }

        res.status(200).json({ message: 'Mylist deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};