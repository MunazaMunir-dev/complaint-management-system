import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";


import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaSearch
} from "react-icons/fa";


import UserNavbar from "../components/UserNavbar";
import UserSidebar from "../components/UserSidebar";

import API from "../api/axios";




function UserDashboard(){


const navigate = useNavigate();

const token = localStorage.getItem("token");



const [complaints,setComplaints]=useState([]);

const [loading,setLoading]=useState(true);


const [sidebarOpen,setSidebarOpen]=useState(false);


const [darkMode,setDarkMode]=useState(
localStorage.getItem("theme")==="dark"
);



const [search,setSearch]=useState("");



const [stats,setStats]=useState({

total:0,
pending:0,
progress:0,
resolved:0

});





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






// GET COMPLAINTS

const getComplaints=async()=>{


try{


const res=await API.get(

"/complaints/my",

{

headers:{
Authorization:`Bearer ${token}`
}

}

);


const data=res.data.complaints || [];


setComplaints(data);



setStats({

total:data.length,


pending:data.filter(
x=>x.status==="Pending"
).length,


progress:data.filter(
x=>x.status==="In Progress"
).length,


resolved:data.filter(
x=>x.status==="Resolved"
).length


});



}

catch(error){

toast.error(
"Failed to load complaints"
);


}

finally{

setLoading(false);

}


};






useEffect(()=>{

getComplaints();

},[]);







const deleteComplaint=async(id)=>{


if(!window.confirm("Delete Complaint?"))
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

toast.error(
"Delete Failed"
);

}


};






const filtered = complaints.filter(item=>

item.title
?.toLowerCase()
.includes(
search.toLowerCase()
)

);






const chartData=[

{
name:"Pending",
value:stats.pending
},

{
name:"Progress",
value:stats.progress
},

{
name:"Resolved",
value:stats.resolved
}

];



const colors=[

"#facc15",
"#6366f1",
"#22c55e"

];





if(loading){

return(

<div className="
min-h-screen
flex
items-center
justify-center
font-bold
text-xl
">

Loading Dashboard...

</div>

)

}





return(


<div className="
min-h-screen
bg-gray-100
dark:bg-gray-950
flex
">


<UserSidebar

sidebarOpen={sidebarOpen}

setSidebarOpen={setSidebarOpen}

/>




<UserNavbar

sidebarOpen={sidebarOpen}

setSidebarOpen={setSidebarOpen}

darkMode={darkMode}

setDarkMode={setDarkMode}

/>





<div className={`

flex-1

pt-20

p-6

transition-all

duration-300


${sidebarOpen ? "ml-72":"ml-20"}

`}>





{/* HERO */}

<div className="
bg-gradient-to-r
from-blue-600
to-purple-700
rounded-3xl
p-8
text-white
mb-8
shadow-xl
flex
justify-between
items-center
">


<div>


<h1 className="
text-4xl
font-bold
">

Welcome {JSON.parse(localStorage.getItem("user"))?.name} 👋

</h1>


<p className="
mt-3
opacity-90
">

Manage your complaints and track progress easily.

</p>


</div>



<button

onClick={()=>navigate("/user/create-complaint")}

className="
bg-white
text-blue-600
px-6
py-3
rounded-xl
font-bold
flex
items-center
gap-2
hover:scale-105
transition
"

>


<FaPlus/>

Create Complaint


</button>



</div>
{/* STATS CARDS */}

<div className="
grid
sm:grid-cols-2
xl:grid-cols-4
gap-6
mb-8
">


<Card

title="Total Complaints"

value={stats.total}

icon={<FaClipboardList/>}

gradient="from-blue-500 to-blue-700"

/>



<Card

title="Pending"

value={stats.pending}

icon={<FaClock/>}

gradient="from-yellow-400 to-orange-500"

/>



<Card

title="In Progress"

value={stats.progress}

icon={<FaClock/>}

gradient="from-purple-500 to-indigo-700"

/>



<Card

title="Resolved"

value={stats.resolved}

icon={<FaCheckCircle/>}

gradient="from-green-400 to-green-700"

/>


</div>








{/* CHART */}

<div className="
bg-white
dark:bg-gray-900
rounded-3xl
shadow-xl
p-6
mb-8
">


<h2 className="
text-2xl
font-bold
dark:text-white
mb-5
">

Complaint Analytics

</h2>



<div className="h-[320px]">


<ResponsiveContainer
width="100%"
height="100%"
>


<PieChart>


<Pie

data={chartData}

dataKey="value"

outerRadius={110}

label

>


{

chartData.map(
(item,index)=>(

<Cell

key={index}

fill={colors[index]}

/>

)

)

}


</Pie>


<Tooltip/>


</PieChart>


</ResponsiveContainer>


</div>



</div>










{/* SEARCH */}


<div className="
bg-white
dark:bg-gray-900
rounded-2xl
shadow-lg
p-5
mb-8
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

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="Search complaints..."

className="
w-full
pl-12
p-3
rounded-xl
border
dark:bg-gray-800
dark:text-white
outline-none
focus:ring-2
focus:ring-blue-500
"

/>


</div>



</div>











{/* COMPLAINT CARDS */}



<h2 className="
text-3xl
font-bold
dark:text-white
mb-6
">

Recent Complaints

</h2>




{

filtered.length===0 ?


<div className="
bg-white
dark:bg-gray-900
rounded-3xl
p-10
text-center
shadow-xl
">


<h2 className="
text-2xl
font-bold
dark:text-white
">

No Complaints Found

</h2>


<p className="
text-gray-500
mt-3
">

Create your first complaint.

</p>


</div>



:


<div className="
grid
md:grid-cols-2
xl:grid-cols-3
gap-6
">


{

filtered.map(item=>(


<div

key={item._id}

className="
bg-white
dark:bg-gray-900
rounded-3xl
shadow-xl
p-6
hover:-translate-y-2
transition
duration-300
border
dark:border-gray-800
"

>



<h3 className="
text-xl
font-bold
dark:text-white
">

{item.title}

</h3>



<p className="
text-gray-500
dark:text-gray-400
mt-3
line-clamp-3
">

{item.description}

</p>



<div className="
mt-5
space-y-2
dark:text-gray-300
">


<p>

<b>Category:</b> {item.category}

</p>


<p>

<b>Location:</b> {item.location}

</p>


</div>





<span

className={`

inline-block

mt-5

px-4

py-2

rounded-full

text-white

text-sm


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








<div className="
flex
gap-3
mt-6
">


<Link

to={`/edit/${item._id}`}

className="
flex-1
bg-blue-600
text-white
py-2
rounded-xl
flex
justify-center
items-center
"

>

<FaEdit/>


</Link>





<button

onClick={()=>deleteComplaint(item._id)}

className="
flex-1
bg-red-600
text-white
py-2
rounded-xl
flex
justify-center
items-center
"

>


<FaTrash/>


</button>



</div>




</div>


))


}


</div>


}








</div>


</div>


)

}










// CARD COMPONENT


function Card({

title,

value,

icon,

gradient

}){


return(


<div

className={`

bg-gradient-to-br

${gradient}

text-white

rounded-3xl

p-6

shadow-xl

hover:scale-105

transition

duration-300

`}

>


<div className="
flex
justify-between
items-center
">


<div>


<p className="
text-sm
opacity-80
uppercase
">

{title}

</p>


<h2 className="
text-4xl
font-bold
mt-2
">

{value}

</h2>


</div>



<div className="
text-4xl
opacity-80
">

{icon}

</div>


</div>



</div>


)

}




export default UserDashboard;