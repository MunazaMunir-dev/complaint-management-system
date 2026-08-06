import {
  useEffect,
  useState
} from "react";

import toast from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  FaSpinner,
  FaSearch
} from "react-icons/fa";

import API from "../api/axios";


function AdminComplaints(){


const [complaints,setComplaints] = useState([]);

const [loading,setLoading] = useState(true);

const [search,setSearch] = useState("");

const [filterStatus,setFilterStatus] = useState("All");

const [reply,setReply] = useState({});


const token = localStorage.getItem("token");




useEffect(()=>{

getComplaints();

},[]);






// GET COMPLAINTS

const getComplaints = async()=>{


try{


setLoading(true);


const res = await API.get(

"/admin/complaints",

{
headers:{
Authorization:`Bearer ${token}`
}
}

);



setComplaints(
res.data.complaints || []
);


}

catch(error){

console.log(error);

toast.error(
"Failed to load complaints"
);


}

finally{

setLoading(false);

}


};


const exportComplaintsPDF = () => {

  const doc = new jsPDF();


  doc.setFontSize(18);

  doc.text(
    "All Complaints Report",
    20,
    20
  );


  const tableData = complaints.map((item)=>[

    item.title,

    item.user?.name || "N/A",

    item.category,

    item.status,

    new Date(item.createdAt)
    .toLocaleDateString()

]);
  autoTable(doc, {

    startY: 35,

   head: [
[
"Title",
"User",
"Category",
"Priority",
"Status",
"Date"
]
],

    body: tableData 

  });


  doc.save(
    "All_Complaints_Report.pdf"
  );

};





// UPDATE STATUS

const updateStatus = async(id,status)=>{


try{


await API.put(

`/complaints/admin/status/${id}`,

{
status
},

{
headers:{
Authorization:`Bearer ${token}`
}
}

);



toast.success(
"Status Updated"
);



getComplaints();



}

catch(error){

console.log(error);

toast.error(
"Status update failed"
);


}



};









// DELETE

const deleteComplaint = async(id)=>{


const confirmDelete = window.confirm(
"Delete this complaint?"
);


if(!confirmDelete)
return;



try{


await API.delete(

`/complaints/${id}`,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);



toast.success(
"Complaint Deleted"
);



getComplaints();


}

catch(error){

console.log(error);

toast.error(
"Delete failed"
);


}



};








// REPLY

const sendReply = async(id)=>{


try{


await API.put(

`/complaints/reply/${id}`,

{
adminReply:reply[id]
},

{
headers:{
Authorization:`Bearer ${token}`
}
}

);



toast.success(
"Reply Sent"
);



setReply({

...reply,

[id]:""

});



getComplaints();



}

catch(error){

console.log(error);

toast.error(
"Reply failed"
);


}



};








// SEARCH FILTER

const filteredComplaints = complaints.filter((item)=>{


const searchMatch =

item.title
?.toLowerCase()
.includes(
search.toLowerCase()
);



const statusMatch =

filterStatus==="All"

||

item.status===filterStatus;



return searchMatch && statusMatch;


});






if(loading){


return(

<div className="
min-h-screen
flex
justify-center
items-center
">


<FaSpinner

size={50}

className="
animate-spin
text-blue-600
"

/>


</div>

)


}







return(


<div className="
p-6
">


<h1 className="
text-3xl
font-bold
mb-6
dark:text-white
">

All Complaints

</h1>

<button

onClick={exportComplaintsPDF}

className="
bg-red-600 
text-white 
px-5 
py-2 
rounded-lg
"

>

📄 Export PDF

</button>





{/* SEARCH FILTER */}


<div className="
bg-white
dark:bg-gray-800
p-5
rounded-xl
shadow
mb-6
grid
md:grid-cols-2
gap-4
">



<div className="
relative
">


<FaSearch

className="
absolute
left-4
top-4
text-gray-400
"

/>



<input

type="text"

placeholder="Search complaint..."

value={search}

onChange={(e)=>
setSearch(e.target.value)
}


className="
w-full
border
rounded-lg
p-3
pl-12
dark:bg-gray-700
dark:text-white
"

/>


</div>






<select

value={filterStatus}

onChange={(e)=>
setFilterStatus(e.target.value)
}

className="
border
rounded-lg
p-3
dark:bg-gray-700
dark:text-white
"

>


<option>
All
</option>


<option>
Pending
</option>


<option>
In Progress
</option>


<option>
Resolved
</option>


</select>



</div>









{/* TABLE */}


<div className="
bg-white
dark:bg-gray-800
rounded-xl
shadow
overflow-x-auto
">


<table className="
w-full
min-w-[1100px]
">



<thead className="
bg-gray-100
dark:bg-gray-700
">


<tr>

<th className="p-4 text-left">
Image
</th>


<th className="p-4 text-left">
Title
</th>


<th className="p-4 text-left">
User
</th>


<th className="p-4 text-left">
Status
</th>

<th className="p-4 text-left">
Priority
</th>
<th className="p-4 text-left">
Actions
</th>


<th className="p-4 text-left">
Reply
</th>
<th className="p-4 text-left">
Tracking ID
</th>

</tr>


</thead>








<tbody>


{

filteredComplaints.map((item)=>(


<tr

key={item._id}

className="
border-b
dark:border-gray-700
"


>





<td className="p-4">


{

item.image ?

<img

src={`http://localhost:5000/uploads/${item.image}`}

className="
w-16
h-16
rounded-lg
object-cover
"

/>

:

"No Image"


}



</td>





<td className="p-4 dark:text-white">

{item.title}

</td>







<td className="p-4 dark:text-white">

{item.user?.name || "Unknown"}

</td>








<td className="p-4">


<span className="
bg-yellow-500
text-white
px-3
py-1
rounded-full
">


{item.status}


</span>


</td>



<td className="p-4">

<span
className={`
px-3
py-1
rounded-full
text-white

${
item.priority === "High"

? "bg-red-600"

: item.priority === "Medium"

? "bg-yellow-500"

: "bg-green-600"

}
`}
>

{item.priority}

</span>

</td>



<td className="p-4">


<div className="
flex
gap-2
flex-wrap
">


<button

onClick={()=>updateStatus(
item._id,
"In Progress"
)}

className="
bg-blue-600
text-white
px-3
py-2
rounded-lg
"

>

Progress

</button>





<button

onClick={()=>updateStatus(
item._id,
"Resolved"
)}

className="
bg-green-600
text-white
px-3
py-2
rounded-lg
"

>

Resolve

</button>





<button

onClick={()=>deleteComplaint(item._id)}

className="
bg-red-600
text-white
px-3
py-2
rounded-lg
"

>

Delete

</button>



</div>


</td>


<td className="p-4 dark:text-white font-semibold">
{item.trackingId}
</td>




<td className="p-4">


<textarea

value={reply[item._id] || ""}

onChange={(e)=>

setReply({

...reply,

[item._id]:e.target.value

})

}


className="
border
rounded-lg
p-2
w-60
dark:bg-gray-700
dark:text-white
"


placeholder="Reply..."

>



</textarea>



<button

onClick={()=>sendReply(item._id)}

className="
mt-2
bg-purple-600
text-white
px-4
py-2
rounded-lg
"

>

Send

</button>



</td>






</tr>


))


}



</tbody>


</table>


</div>



</div>


);


}


export default AdminComplaints;