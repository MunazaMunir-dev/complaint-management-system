import {
  useEffect,
  useState
} from "react";


import {
  io
} from "socket.io-client";

import toast from "react-hot-toast";

import {
  FaBars,
  FaUsers,
  FaClipboardList,
  FaSpinner,
  FaCheckCircle,
  FaMoon,
  FaSun
} from "react-icons/fa";

import {
  Link
} from "react-router-dom";

import API from "../api/axios";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";



function AdminDashboard(){


const [sidebarOpen,setSidebarOpen] = useState(false);


const [stats,setStats] = useState({

totalUsers:0,
totalComplaints:0,
pendingComplaints:0,
inProgressComplaints:0,
resolvedComplaints:0

});


const [complaints,setComplaints] = useState([]);


const [loading,setLoading] = useState(true);



const [darkMode,setDarkMode] = useState(

localStorage.getItem("theme")==="dark"

);



const token = localStorage.getItem("token");




// SOCKET

useEffect(()=>{


const socket = io(
"http://localhost:5000"
);



socket.on(
"connect",
()=>{

console.log("Socket Connected");

}

);



socket.on(
"newComplaint",
()=>{


toast.success(
"New Complaint Received"
);


getStats();

getComplaints();


}

);



return ()=>{

socket.disconnect();

};


},[]);





// DARK MODE


useEffect(()=>{


if(darkMode){

document.documentElement.classList.add("dark");

localStorage.setItem(
"theme",
"dark"
);


}

else{

document.documentElement.classList.remove("dark");

localStorage.setItem(
"theme",
"light"
);


}


},[darkMode]);





// LOAD DATA


useEffect(()=>{


getStats();

getComplaints();


},[]);





// GET STATS


const getStats = async()=>{


try{


const res = await API.get(

"/admin/dashboard",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);


setStats(res.data);


}

catch(error){

console.log(error);

toast.error(
"Stats loading failed"
);

}


};






// RECENT COMPLAINTS


const getComplaints = async()=>{


try{


const res = await API.get(

"/admin/complaints",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);



setComplaints(

res.data.complaints?.slice(0,5) || []

);



setLoading(false);


}

catch(error){

console.log(error);

toast.error(
"Complaints loading failed"
);


setLoading(false);


}



};
if(loading){

return(

<div className="
min-h-screen
flex
items-center
justify-center
bg-gray-100
dark:bg-gray-900
">

<FaSpinner

size={60}

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
flex
min-h-screen
bg-gray-100
dark:bg-gray-900
">


{/* SIDEBAR */}

<AdminSidebar

sidebarOpen={sidebarOpen}

setSidebarOpen={setSidebarOpen}

/>





{/* MAIN */}

<div className="
flex-1
overflow-hidden
">


<AdminNavbar

sidebarOpen={sidebarOpen}

setSidebarOpen={setSidebarOpen}

/>





<div className="
p-4
md:p-8
">





{/* HEADER */}

<div className="
flex
justify-between
items-center
mb-8
">


<div>


<h1 className="
text-3xl
font-bold
dark:text-white
">

Admin Dashboard

</h1>


<p className="
text-gray-500
dark:text-gray-400
">

Overview of Complaint Management System

</p>


</div>




<button

onClick={()=>setDarkMode(!darkMode)}

className="
bg-gray-800
text-white
px-4
py-2
rounded-lg
flex
items-center
gap-2
"

>


{

darkMode

?

<FaSun/>

:

<FaMoon/>

}


{

darkMode

?

"Light"

:

"Dark"

}


</button>



</div>







{/* CARDS */}


<div className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-5
gap-5
mb-10
">



<div className="
bg-blue-600
text-white
p-6
rounded-xl
shadow
">


<FaUsers size={35}/>


<h2 className="
text-3xl
font-bold
mt-3
">

{stats.totalUsers}

</h2>


<p>

Total Users

</p>


</div>





<div className="
bg-purple-600
text-white
p-6
rounded-xl
shadow
">


<FaClipboardList size={35}/>


<h2 className="
text-3xl
font-bold
mt-3
">

{stats.totalComplaints}

</h2>


<p>

Total Complaints

</p>


</div>







<div className="
bg-yellow-500
text-white
p-6
rounded-xl
shadow
">


<FaSpinner size={35}/>


<h2 className="
text-3xl
font-bold
mt-3
">

{stats.pendingComplaints}

</h2>


<p>

Pending

</p>


</div>








<div className="
bg-indigo-600
text-white
p-6
rounded-xl
shadow
">


<h2 className="
text-3xl
font-bold
">

{stats.inProgressComplaints}

</h2>


<p>

In Progress

</p>


</div>








<div className="
bg-green-600
text-white
p-6
rounded-xl
shadow
">


<FaCheckCircle size={35}/>


<h2 className="
text-3xl
font-bold
mt-3
">

{stats.resolvedComplaints}

</h2>


<p>

Resolved

</p>


</div>



</div>









{/* RECENT COMPLAINTS */}



<div className="
bg-white
dark:bg-gray-800
rounded-xl
shadow
p-6
">



<div className="
flex
justify-between
items-center
mb-5
">


<h2 className="
text-2xl
font-bold
dark:text-white
">

Recent Complaints

</h2>



<Link

to="/admin/complaints"

className="
bg-blue-600
text-white
px-4
py-2
rounded-lg
"

>

View All

</Link>


</div>





<table className="
w-full
">


<thead>

<tr className="
border-b
dark:border-gray-700
">


<th className="
text-left
p-3
dark:text-white
">

Title

</th>


<th className="
text-left
p-3
dark:text-white
">

Category

</th>


<th className="
text-left
p-3
dark:text-white
">

Status

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
p-3
dark:text-white
">

{item.title}

</td>



<td className="
p-3
dark:text-white
">

{item.category}

</td>




<td className="
p-3
">


<span className="
bg-blue-100
text-blue-700
px-3
py-1
rounded-full
text-sm
">

{item.status}

</span>


</td>


</tr>


))


}



</tbody>


</table>



</div>








{/* QUICK ACTIONS */}


<div className="
grid
md:grid-cols-3
gap-5
mt-8
">


<Link

to="/admin/complaints"

className="
bg-gray-900
text-white
p-5
rounded-xl
text-center
"

>

Manage Complaints

</Link>



<Link

to="/admin/analytics"

className="
bg-gray-900
text-white
p-5
rounded-xl
text-center
"

>

View Analytics

</Link>



<Link

to="/admin/settings"

className="
bg-gray-900
text-white
p-5
rounded-xl
text-center
"

>

Settings

</Link>


</div>





</div>


</div>


</div>


);


}
export default AdminDashboard;