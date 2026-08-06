import { useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

function ComplaintTracking() {

  const [trackingId, setTrackingId] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(false);


  const searchComplaint = async () => {

    if(!trackingId){
      return toast.error("Enter Tracking ID");
    }


    try{

      setLoading(true);


      const res = await API.get(
        `/complaints/track/${trackingId}`
      );


      setComplaint(res.data.complaint);

    }
    catch(error){

      console.log(error);

      toast.error(
        "Complaint not found"
      );

      setComplaint(null);

    }
    finally{

      setLoading(false);

    }

  };


  return (

    <div className="min-h-screen bg-gray-100 p-8">


      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">


        <h1 className="text-3xl font-bold mb-6">
          Track Your Complaint
        </h1>


        <div className="flex gap-3">


          <input

            value={trackingId}

            onChange={(e)=>setTrackingId(e.target.value)}

            placeholder="Enter CMP-XXXXXXXX"

            className="border p-3 rounded w-full"

          />


          <button

            onClick={searchComplaint}

            className="bg-blue-600 text-white px-6 rounded"

          >
            Search

          </button>


        </div>



        {
          loading &&

          <p className="mt-5">
            Loading...
          </p>

        }



        {
          complaint && (

          <div className="mt-8 bg-gray-100 p-6 rounded-xl">


            <h2 className="text-2xl font-bold">
              {complaint.title}
            </h2>


            <p className="mt-3">
              <b>Category:</b> {complaint.category}
            </p>


            <p>
              <b>Location:</b> {complaint.location}
            </p>


            <p>
              <b>Tracking ID:</b> {complaint.trackingId}
            </p>



            <p>

              <b>Status:</b>

              <span className="ml-2 bg-yellow-500 text-white px-3 py-1 rounded-full">

                {complaint.status}

              </span>

            </p>



            <h3 className="text-xl font-bold mt-6">
              Timeline
            </h3>


            {
              complaint.statusHistory.map((item,index)=>(

                <div 
                key={index}
                className="mt-3 bg-white p-4 rounded"
                >

                  <b>{item.status}</b>

                  <p>
                    {item.message}
                  </p>

                  <small>
                    {new Date(item.date).toLocaleString()}
                  </small>

                </div>

              ))
            }



            <h3 className="text-xl font-bold mt-6">
              Admin Reply
            </h3>


            <p>
              {complaint.adminReply || "No reply yet"}
            </p>


          </div>

          )
        }


      </div>


    </div>

  );

}


export default ComplaintTracking;