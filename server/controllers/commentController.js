const Comment = require("../models/Comment");


// ==============================
// Add Comment
// ==============================

exports.createComment = async (req,res)=>{

  try{

    const comment = await Comment.create({

      complaint:req.params.complaintId,

      user:req.user.id,

      message:req.body.message

    });


    const populatedComment = await Comment.findById(comment._id)
    .populate("user","name email");


    res.status(201).json({

      message:"Comment Added Successfully",

      comment:populatedComment

    });


  }catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};




// ==============================
// Get Complaint Comments
// ==============================

exports.getComments = async(req,res)=>{

  try{


    const comments = await Comment.find({

      complaint:req.params.complaintId

    })
    .populate("user","name email")
    .sort({
      createdAt:1
    });



    res.status(200).json({

      count:comments.length,

      comments

    });


  }catch(error){


    res.status(500).json({

      message:error.message

    });


  }

};