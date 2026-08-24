import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

import {
  useEffect,
  useState
} from "react";

import API from "../api/axios";


function AdminAnalytics(){


const [stats,setStats] = useState({

pendingComplaints:0,
inProgressComplaints:0,
resolvedComplaints:0,

highPriority:0,
mediumPriority:0,
lowPriority:0

});


const token = localStorage.getItem("token");



useEffect(()=>{

getAnalytics();

},[]);




const getAnalytics = async()=>{


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

}


};





const statusData=[


{
name:"Pending",
value:stats.pendingComplaints
},


{
name:"Progress",
value:stats.inProgressComplaints
},


{
name:"Resolved",
value:stats.resolvedComplaints
}


];





const priorityData=[


{
name:"High",
value:stats.highPriority
},


{
name:"Medium",
value:stats.mediumPriority
},


{
name:"Low",
value:stats.lowPriority
}


];





const COLORS=[

"#dc2626",
"#eab308",
"#16a34a"

];





return(


<div className="
min-h-screen
bg-gray-100
dark:bg-gray-900
p-6
">



<h1 className="
text-4xl
font-bold
dark:text-white
mb-8
">

Complaint Analytics

</h1>





{/* STATUS CARDS */}


<div className="
grid
md:grid-cols-3
gap-6
mb-10
">


<div className="
bg-yellow-500
text-white
p-6
rounded-xl
">

<h2 className="text-3xl font-bold">

{stats.pendingComplaints}

</h2>

<p>
Pending
</p>

</div>




<div className="
bg-blue-600
text-white
p-6
rounded-xl
">

<h2 className="text-3xl font-bold">

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
">

<h2 className="text-3xl font-bold">

{stats.resolvedComplaints}

</h2>

<p>
Resolved
</p>

</div>


</div>







{/* PRIORITY CARDS */}



<div className="
grid
md:grid-cols-3
gap-6
mb-10
">


<div className="
bg-red-600
text-white
p-6
rounded-xl
">

<h2 className="text-3xl font-bold">

{stats.highPriority}

</h2>

<p>
High Priority
</p>

</div>




<div className="
bg-yellow-500
text-white
p-6
rounded-xl
">

<h2 className="text-3xl font-bold">

{stats.mediumPriority}

</h2>

<p>
Medium Priority
</p>

</div>





<div className="
bg-green-600
text-white
p-6
rounded-xl
">

<h2 className="text-3xl font-bold">

{stats.lowPriority}

</h2>

<p>
Low Priority
</p>

</div>



</div>








{/* STATUS BAR CHART */}



<div className="
bg-white
dark:bg-gray-800
rounded-xl
p-6
shadow
">


<h2 className="
text-2xl
font-bold
dark:text-white
mb-5
">

Complaint Status Report

</h2>




<ResponsiveContainer

width="100%"

height={350}

>


<BarChart data={statusData}>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis dataKey="name"/>


<YAxis/>


<Tooltip/>


<Bar

dataKey="value"

fill="#2563eb"

/>


</BarChart>


</ResponsiveContainer>



</div>









{/* PRIORITY PIE CHART */}



<div className="
bg-white
dark:bg-gray-800
rounded-xl
p-6
shadow
mt-8
">


<h2 className="
text-2xl
font-bold
dark:text-white
mb-5
">

Priority Distribution

</h2>




<ResponsiveContainer

width="100%"

height={350}

>


<PieChart>


<Pie

data={priorityData}

dataKey="value"

outerRadius={120}

label

>


{

priorityData.map((item,index)=>(


<Cell

key={index}

fill={COLORS[index]}

/>


))


}



</Pie>


<Tooltip/>


</PieChart>


</ResponsiveContainer>



</div>







</div>


);


}


export default AdminAnalytics;