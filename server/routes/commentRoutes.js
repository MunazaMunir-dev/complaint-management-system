const express = require("express");

const router = express.Router();


const {protect} = require("../middleware/authMiddleware");


const {
 createComment,
 getComments
}=require("../controllers/commentController");



// Add Comment

router.post(
 "/:complaintId",
 protect,
 createComment
);



// Get Comments

router.get(
 "/:complaintId",
 protect,
 getComments
);



module.exports = router;