import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  FaEye,
  FaTrash
} from "react-icons/fa";
import {
  Link
} from "react-router-dom";


import API from "../api/axios";



function MyComplaints(){


const [complaints,setComplaints] = useState([]);

const [loading,setLoading] = useState(true);


const token = localStorage.getItem("token");






const getMyComplaints = async()=>{


try{


const res = await API.get(

"/complaints/my",

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);



setComplaints(
res.data.complaints || []
);



setLoading(false);



}

catch(error){


console.log(error);


toast.error(
"Failed to load complaints"
);


setLoading(false);



}



};







useEffect(()=>{


getMyComplaints();


},[]);









const deleteComplaint = async(id)=>{


const confirm = window.confirm(
"Delete this complaint?"
);



if(!confirm)
return;



try{


await API.delete(

`/complaints/${id}`,

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);



toast.success(
"Complaint deleted"
);



getMyComplaints();



}

catch(error){


console.log(error);


toast.error(
"Delete failed"
);



}



};








if(loading){


return(

<div className="
min-h-screen
flex
items-center
justify-center
text-xl
font-bold
">

Loading Complaints...

</div>

)

}








return(


<div className="
min-h-screen
bg-gray-100

dark:bg-gray-900

p-6

">





<div className="
max-w-7xl
mx-auto
">





<h1 className="
text-4xl
font-bold
dark:text-white
mb-8
">

My Complaints

</h1>









<div className="
bg-white

dark:bg-gray-800

rounded-xl

shadow-lg

overflow-x-auto

">







<table className="
w-full
min-w-[900px]
">






<thead className="
bg-gray-200

dark:bg-gray-700

">


<tr>



<th className="
p-4
text-left
dark:text-white
">

Title

</th>




<th className="
p-4
text-left
dark:text-white
">

Category

</th>





<th className="
p-4
text-left
dark:text-white
">

Location

</th>



<th className="p-4">
Tracking ID
</th>

<th className="
p-4
text-left
dark:text-white
">

Status

</th>





<th className="
p-4
text-left
dark:text-white
">

Admin Reply

</th>





<th className="
p-4
dark:text-white
">

Action

</th>



</tr>



</thead>








<tbody>

{

complaints.map((item)=>(


<tr

key={item._id}

className="
border-b
dark:border-gray-700
"

>



<td className="
p-4
dark:text-white
font-semibold
">

{item.title}

</td>







<td className="
p-4
dark:text-gray-200
">

{item.category}

</td>








<td className="
p-4
dark:text-gray-200
">

{item.location}

</td>


<td className="
p-4
dark:text-gray-200
">

{item.trackingId}

</td>





<td className="p-4">


<span

className={`

px-4
py-2
rounded-full
text-white

${
item.status==="Pending"

?

"bg-yellow-500"

:

item.status==="In Progress"

?

"bg-blue-600"

:

"bg-green-600"

}

`}

>


{item.status}


</span>



</td>










<td className="
p-4
dark:text-gray-200
">


{

item.adminReply

?

item.adminReply

:

"No reply yet"

}



</td>










<td className="
p-4
">


<div className="
flex
gap-2
">

<Link

to={`/user/complaints/${item._id}`}

className="
bg-blue-600
text-white
px-3
py-2
rounded-lg
flex
items-center
justify-center
"

>

<FaEye/>

</Link>







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


<FaTrash/>


</button>





</div>


</td>







</tr>



))


}



</tbody>






</table>






</div>






</div>







</div>


);


}



export default MyComplaints;