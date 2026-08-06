import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";


function EditComplaint(){

  const {id} = useParams();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");


  const [formData,setFormData] = useState({
    title:"",
    description:"",
    category:"",
    location:""
  });



  const getComplaint = async()=>{

    try{

      const res = await API.get(
        `/complaints/${id}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


      setFormData({

        title:res.data.complaint.title,
        description:res.data.complaint.description,
        category:res.data.complaint.category,
        location:res.data.complaint.location

      });


    }catch(error){

      console.log(error);

    }

  };



  useEffect(()=>{

    getComplaint();

  },[]);




  const handleChange=(e)=>{

    setFormData({

      ...formData,

      [e.target.name]:e.target.value

    });

  };





  const updateComplaint=async(e)=>{

    e.preventDefault();


    try{

      await API.put(

        `/complaints/${id}`,

        formData,

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );


      alert("Complaint Updated");


      navigate("/dashboard");


    }catch(error){

      console.log(error);

    }

  };




  return(

<div className="min-h-screen bg-gray-100 p-8">


<div className="bg-white p-6 rounded-xl shadow">


<h1 className="text-3xl font-bold mb-5">
Edit Complaint
</h1>



<form
onSubmit={updateComplaint}
className="space-y-4"
>


<input
className="w-full border p-3 rounded"
name="title"
value={formData.title}
onChange={handleChange}
/>



<input
className="w-full border p-3 rounded"
name="category"
value={formData.category}
onChange={handleChange}
/>



<input
className="w-full border p-3 rounded"
name="location"
value={formData.location}
onChange={handleChange}
/>



<textarea

className="w-full border p-3 rounded"

name="description"

value={formData.description}

onChange={handleChange}

/>




<button

className="bg-blue-600 text-white px-5 py-3 rounded"

>

Update Complaint

</button>


</form>


</div>


</div>

  );

}


export default EditComplaint;