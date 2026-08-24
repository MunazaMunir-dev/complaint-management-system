import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


function ComplaintDetails() {

  const { id } = useParams();
  

  const token = localStorage.getItem("token");

  const [complaint, setComplaint] = useState(null);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");

  // Rating
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  
const copyTrackingId = () => {

  navigator.clipboard.writeText(
    complaint.trackingId
  );

  toast.success(
    "Tracking ID Copied"
  );

};

  // ==========================
  // Get Complaint
  // ==========================

  const getComplaint = async () => {

    try {

      const res = await API.get(`/complaints/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setComplaint(res.data.complaint);

    } catch (error) {

      console.log(error);
      toast.error("Failed to load complaint");

    }

  };

  // ==========================
  // Get Comments
  // ==========================

  const getComments = async () => {

    try {

      const res = await API.get(`/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setComments(res.data.comments || []);

    } catch (error) {

      console.log(error);

    }

  };
  const exportPDF = () => {

  const doc = new jsPDF();


  doc.setFontSize(18);

  doc.text(
    "Complaint Management System",
    20,
    20
  );


  autoTable(doc, {

    startY: 35,

    body: [

      ["Complaint ID", complaint._id],

      ["Title", complaint.title],

      ["Description", complaint.description],

      ["Category", complaint.category],

      ["Location", complaint.location],

      ["Status", complaint.status],

      ["User", complaint.user?.name],

      ["Email", complaint.user?.email],

      ["Admin Reply", complaint.adminReply || "No Reply"],

      ["Created At",
       new Date(complaint.createdAt)
       .toLocaleString()
      ],

    ],

  });


  doc.save(
    "Complaint_Report.pdf"
  );

};

  // ==========================
  // Update Status
  // ==========================

  const updateStatus = async (status) => {

    try {

      await API.put(

        `/complaints/admin/status/${id}`,

        {
          status,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );

      toast.success("Status Updated");

      getComplaint();

    } catch (error) {

      console.log(error);

      toast.error("Update Failed");

    }

  };

  // ==========================
  // Add Comment
  // ==========================

  const addComment = async (e) => {

    e.preventDefault();

    if (!message.trim()) {
      return toast.error("Write a comment");
    }

    try {

      await API.post(

        `/comments/${id}`,

        {
          message,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );

      toast.success("Comment Added");

      setMessage("");

      getComments();

    } catch (error) {

      console.log(error);

      toast.error("Failed");

    }

  };

  // ==========================
  // Submit Rating
  // ==========================

  const submitRating = async () => {

    if (rating === 0) {
      return toast.error("Select rating first");
    }

    try {

      await API.put(

        `/complaints/${id}/rating`,

        {
          rating,
          feedback,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );

      toast.success("Thank you ❤️");

      getComplaint();

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Failed"
      );

    }

  };

  // ==========================
  // Load Data
  // ==========================

  useEffect(() => {

    getComplaint();
    getComments();

  }, []);

  if (!complaint) {

    return (
      <h2 className="text-center mt-20 text-2xl">
        Loading...
      </h2>
    );

  }

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <Link
  to="/user"
  className="bg-blue-600 text-white px-4 py-2 rounded"
>
  ← Back
</Link>

<h1 className="text-4xl font-bold mt-6 mb-6">
  {complaint.title}
</h1>

<div className="
bg-blue-100
p-4
rounded-xl
flex
items-center
justify-between
mb-6
">

<div>

<p className="font-bold">
Tracking ID
</p>

<p className="text-blue-600 text-xl font-semibold">
{complaint.trackingId}
</p>

</div>


<button

onClick={copyTrackingId}

className="
bg-blue-600
text-white
px-4
py-2
rounded-lg
"

>

📋 Copy

</button>


</div>

{complaint.image && (
  <img
    src={`http://localhost:5000/uploads/${complaint.image}`}
    alt="Complaint"
    className="w-full h-80 object-cover rounded-xl mb-8"
  />
)}

{/* Complaint Info */}


<div className="space-y-4">

  <p>
    <b>Description:</b><br />
    {complaint.description}
  </p>

  <p>
    <b>Category:</b> {complaint.category}
  </p>

  <p>
    <b>Location:</b> {complaint.location}
  </p>


  {/* Priority */}
  <p>
    <b>Priority:</b>

    <span
      className={`
      ml-3
      px-3
      py-1
      rounded-full
      text-white

      ${
        complaint.priority === "High"
        ? "bg-red-600"
        : complaint.priority === "Medium"
        ? "bg-yellow-500"
        : "bg-green-600"
      }
      `}
    >
      {complaint.priority}
    </span>

  </p>


  {/* Status */}
  <p>
    <b>Status:</b>

    <span
      className={`
      ml-3
      px-3
      py-1
      rounded-full
      text-white

      ${
        complaint.status === "Pending"
        ? "bg-yellow-500"
        : complaint.status === "In Progress"
        ? "bg-blue-600"
        : "bg-green-600"
      }
      `}
    >
      {complaint.status}
    </span>

  </p>

  {/* Tracking ID */}


  <div className="flex gap-4">
    <button

onClick={exportPDF}

className="bg-red-600 text-white px-5 py-2 rounded-lg"

>

📄 Export PDF

</button>

    <button
      onClick={() => updateStatus("In Progress")}
      className="bg-blue-600 text-white px-5 py-2 rounded-lg"
    >
      Start Work
    </button>

    <button
      onClick={() => updateStatus("Resolved")}
      className="bg-green-600 text-white px-5 py-2 rounded-lg"
    >
      Resolve
    </button>

  </div>

  <p>
    <b>Submitted By:</b> {complaint.user?.name}
  </p>

  <p>
    <b>Email:</b> {complaint.user?.email}
  </p>

  <p>
    <b>Created At:</b>{" "}
    {new Date(complaint.createdAt).toLocaleString()}
  </p>

</div>

{/* Admin Reply */}

<div className="mt-8 bg-gray-100 p-5 rounded-xl">

  <h2 className="text-xl font-bold">
    Admin Reply
  </h2>

  <p className="mt-3">
    {complaint.adminReply || "No reply yet"}
  </p>

</div>

{/* Timeline */}

<div className="mt-10">

  <h2 className="text-2xl font-bold mb-5">
    Complaint Timeline
  </h2>

  <div className="border-l-4 border-blue-600 pl-6 space-y-5">

    {complaint.statusHistory?.map((item, index) => (

      <div
        key={index}
        className="bg-gray-100 rounded-lg p-5"
      >

        <h3 className="font-bold text-lg">
          {item.status}
        </h3>

        <p className="mt-2">
          {item.message}
        </p>

        <p className="text-sm text-gray-500 mt-2">
          {new Date(item.date).toLocaleString()}
        </p>

      </div>

    ))}

  </div>

</div>
{/* ======================
Comments
====================== */}

<div className="mt-10">

  <h2 className="text-2xl font-bold mb-5">
    Comments
  </h2>

  <div className="space-y-4">

    {comments.map((comment) => (

      <div
        key={comment._id}
        className="bg-gray-100 p-4 rounded-lg"
      >

        <p className="font-bold">
          {comment.user?.name}
        </p>

        <p className="mt-2">
          {comment.message}
        </p>

        <p className="text-sm text-gray-500 mt-2">
          {new Date(comment.createdAt).toLocaleString()}
        </p>

      </div>

    ))}

  </div>

  <form
    onSubmit={addComment}
    className="mt-6"
  >

    <textarea
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Write your comment..."
      className="w-full border p-3 rounded"
    />

    <button
      className="mt-3 bg-blue-600 text-white px-5 py-2 rounded"
    >
      Send Comment
    </button>

  </form>

</div>

{/* ======================
Rating & Feedback
====================== */}

{complaint.status === "Resolved" && (

  <div className="mt-10 bg-gray-100 p-6 rounded-xl">

    <h2 className="text-2xl font-bold mb-5">
      ⭐ Rate Our Service
    </h2>

    <div className="flex gap-3 mb-5">

      {[1,2,3,4,5].map((star) => (

        <span
          key={star}
          onClick={() => setRating(star)}
          className={`text-4xl cursor-pointer ${
            star <= rating
              ? "text-yellow-500"
              : "text-gray-400"
          }`}
        >
          ★
        </span>

      ))}

    </div>

    <textarea
      rows="4"
      value={feedback}
      onChange={(e) => setFeedback(e.target.value)}
      placeholder="Write your feedback..."
      className="w-full border p-3 rounded"
    />

    <button
      onClick={submitRating}
      className="mt-4 bg-green-600 text-white px-6 py-2 rounded"
    >
      Submit Feedback
    </button>

    

  </div>
  

)}

      </div>
    </div>
  );
  }

export default ComplaintDetails;