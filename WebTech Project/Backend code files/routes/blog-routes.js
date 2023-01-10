import express from "express";
import {
  addReview,
  deleteReview,
  getAllReviews,
  getByID,
  // getByUserId,
  updateReview,
} from "../controllers/blog-controller.js";

const blogRouter = express.Router();

blogRouter.get("/", getAllReviews);
blogRouter.post("/add", addReview);
blogRouter.put("/update/:id", updateReview);
blogRouter.get("/:id", getByID);
blogRouter.delete("/:id", deleteReview);
// blogRouter.get("/user/:id/", getByUserId);

export default blogRouter;
