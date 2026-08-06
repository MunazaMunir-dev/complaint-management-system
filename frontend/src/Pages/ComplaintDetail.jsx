import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import API from "../api/axios";

function ComplaintDetails() {

  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const token = localStorage.getItem("token");

  // ======================
  // GET COMPLAINT
  // ======================

  const getComplaint = async () => {
    try {

      const res = await API.get(
        `/complaints/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaint(res.data.complaint);

      if (res.data.complaint.rating > 0) {
        setRating(res.data.complaint.rating);
      }

      if (res.data.complaint.feedback) {
        setFeedback(res.data.complaint.feedback);
      }

    } catch (error) {

      console.log(error);

      toast.error("Failed to load complaint");

    }
  };

  // ======================
  // GET COMMENTS
  // ======================

  const getComments = async () => {

    try {

      const res = await API.get(
        `/comments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments(res.data.comments);

    } catch (error) {

      console.log(error);

    }

  };

  // ======================
  // ADD COMMENT
  // ======================

  const addComment = async (e) => {

    e.preventDefault();

    if (!message.trim()) return;

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

      setMessage("");

      getComments();

      toast.success("Comment Added");

    } catch (error) {

      console.log(error);

      toast.error("Failed");

    }

  };

  // ======================
  // SUBMIT RATING
  // ======================

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

      toast.success("Thank you for your feedback ❤️");

      getComplaint();

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Failed"
      );

    }

  };

  useEffect(() => {

    getComplaint();

    getComments();

  }, []);

  if (!complaint) {

    return (

      <div className="min-h-screen flex justify-center items-center text-2xl font-bold">

        Loading...

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">

      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">

        <Link
          to="/user/complaints"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          ← Back
        </Link>

        <h1 className="text-4xl font-bold mt-6 mb-6 dark:text-white">

          {complaint.title}

        </h1>

        {

          complaint.image && (

            <img

              src={`http://localhost:5000/uploads/${complaint.image}`}

              alt="Complaint"

              className="w-full h-96 object-cover rounded-xl mb-8"

            />

          )

        }

        <div className="space-y-4">

          <p className="dark:text-white">

            <b>Description</b>

            <br />

            {complaint.description}

          </p>

          <p className="dark:text-white">

            <b>Category :</b> {complaint.category}

          </p>

          <p className="dark:text-white">

            <b>Location :</b> {complaint.location}

          </p>

          <p className="dark:text-white">

            <b>Status :</b>

            <span
              className={`ml-3 px-3 py-1 rounded-full text-white

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

          <p className="dark:text-white">

            <b>Submitted By :</b>

            {" "}

            {complaint.user?.name}

          </p>

          <p className="dark:text-white">

            <b>Email :</b>

            {" "}

            {complaint.user?.email}

          </p>

          <p className="dark:text-white">

            <b>Created :</b>

            {" "}

            {new Date(
              complaint.createdAt
            ).toLocaleString()}

          </p>

        </div>

        <div className="mt-8 bg-gray-100 dark:bg-gray-700 rounded-xl p-5">

          <h2 className="text-2xl font-bold dark:text-white">

            Admin Reply

          </h2>

          <p className="mt-3 dark:text-gray-200">

            {complaint.adminReply || "No Reply Yet"}

          </p>

        </div>
                {/* =========================
            RATING & FEEDBACK
        ========================== */}

        {complaint.status === "Resolved" && (

          <div className="mt-10 bg-gray-100 dark:bg-gray-700 rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-5 dark:text-white">
              ⭐ Rate Our Service
            </h2>

            <div className="flex gap-3 mb-5">

              {[1, 2, 3, 4, 5].map((star) => (

                <FaStar
                  key={star}
                  size={35}
                  onClick={() =>
                    complaint.rating === 0 &&
                    setRating(star)
                  }
                  className={`cursor-pointer transition

                  ${
                    star <= rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }

                  ${
                    complaint.rating > 0
                      ? "cursor-not-allowed"
                      : "hover:scale-125"
                  }
                  `}
                />

              ))}

            </div>

            <textarea
              rows="4"
              value={feedback}
              disabled={complaint.rating > 0}
              onChange={(e) =>
                setFeedback(e.target.value)
              }
              placeholder="Write your feedback..."
              className="w-full border rounded-lg p-3 dark:bg-gray-800 dark:text-white"
            />

            {

              complaint.rating > 0 ? (

                <div className="mt-5 bg-green-100 text-green-700 p-3 rounded-lg">

                  You already rated this complaint ⭐
                  ({complaint.rating}/5)

                </div>

              ) : (

                <button
                  onClick={submitRating}
                  className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                >
                  Submit Feedback
                </button>

              )

            }

          </div>

        )}

        {/* =========================
            COMMENTS
        ========================== */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-5 dark:text-white">
            Comments
          </h2>

          <div className="space-y-4">

            {

              comments.map((comment) => (

                <div
                  key={comment._id}
                  className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg"
                >

                  <p className="font-bold dark:text-white">
                    {comment.user?.name}
                  </p>

                  <p className="dark:text-gray-200">
                    {comment.message}
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(
                      comment.createdAt
                    ).toLocaleString()}
                  </p>

                </div>

              ))

            }

          </div>

          <form
            onSubmit={addComment}
            className="mt-6"
          >

            <textarea
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              placeholder="Write your comment..."
              className="w-full border p-3 rounded-lg dark:bg-gray-700 dark:text-white"
            />

            <button
              className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              Send Comment
            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default ComplaintDetails; 