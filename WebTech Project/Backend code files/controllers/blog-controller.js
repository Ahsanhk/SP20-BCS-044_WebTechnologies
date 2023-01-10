import mongoose from "mongoose";
import Review from "../models/Reviews.js";
import User from "../models/User.js";

export const getAllReviews = async (req, res) => {
  let reviews;
  try {
    reviews = await Review.find().populate("user");
  } catch (error) {
    return console.log(error);
  }
  if (!reviews) {
    return res.status(404).json({ message: "No Reviews" });
  }
  return res.status(200).json({ reviews });
};

export const addReview = async (req, res) => {
  const { title, description, image, user } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res
      .status(400)
      .json({ message: "User not found" });
  }

  const newReview = new Review({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newReview.save({ session });
    existingUser.reviews.push(newReview);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
  return res.status(201).json({ newReview });
};

export const updateReview = async (req, res) => {
  const { title, description } = req.body;
  const reviewId = req.params.id;
  let review;

  try {
    review = await Review.findByIdAndUpdate(reviewId, {
      title,
      description,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!review) {
    return res.status(500).json({ message: "Unable to update" });
  }
  return res.status(200).json({ review });
};

export const getByID = async (req, res) => {
  const reviewId = req.params.id;
  let review;
  try {
    review = await Review.findById(reviewId);
  } catch (error) {
    return console.log(error);
  }
  if (!review) {
    return res.status(404).json({ message: "No Review" });
  }
  return res.status(200).json({ review });
};

export const deleteReview = async (req, res) => {
  const reviewId = req.params.id;
  let review;
  try {
    review = await Review.findByIdAndRemove(reviewId).populate("user");
    await review.user.reviews.pull(review);
    await review.user.save();
  } catch (error) {
    return console.log(error);
  }
  if (!review) {
    return res.status(500).json({ message: "Not Deleted" });
  }
  return res.status(200).json({ message: "Deleted Successfuly" });
};

// export const getByUserId = async (req, res) => {
//   const userId = req.params.id;
//   let userBlogs;
//   try {
//     userBlogs = await User.findById(userId).populate("blogs");
//   } catch (error) {
//     return console.log(error);
//   }
//   if (!userBlogs) {
//     return res.status(404).json({ message: "No blogs Found" });
//   }
//   return res.status(200).json({ user: userBlogs });
// };
