import { errorHandler } from "../utils/error.js";
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import Listing from "../models/listingModel.js";

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only update your own account"));
    }

    try {
        const updateFields = {};
        
        if (req.body.username) updateFields.username = req.body.username;
        if (req.body.email) updateFields.email = req.body.email;
        if (req.body.avatar) updateFields.avatar = req.body.avatar;
        
        // Only hash and update password if it's provided
        if (req.body.password) {
            updateFields.password = bcrypt.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updateFields },
            { new: true }
        );

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401 , 'You can only delete your own account'))
        try {
            await User.findByIdAndDelete(req.params.id)
            res.clearCookie('access_token')
            res.status(200).json('User has been deleted')
        } catch (error) {
            next(error)
        }
}

export const getUserListings = async (req,res,next)=>{
    if(req.user.id === req.params.id){
        try {
           const listings = await Listing.find({userRef : req.params.id})
           res.status(200).json(listings)
        } catch (error) {
            next(error)
        }
    }else{
        return next(errorHandler(401 , 'You can only view your own listings'))
    }
}

export const getUser = async (req, res, next) => {
  try {
    
    const user = await User.findById(req.params.id);
  
    if (!user) return next(errorHandler(404, 'User not found!'));
  
    const { password: pass, ...rest } = user._doc;
  
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};