// // import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { FaSearch, FaTrash, FaUserShield } from "react-icons/fa";

// import API from "../api/axios";

// import AdminSidebar from "../components/AdminSidebar";
// import AdminNavbar from "../components/AdminNavbar";


// function AdminUsers(){

// const [users,setUsers] = useState([]);

// const [loading,setLoading] = useState(true);

// const [search,setSearch] = useState("");

// const [sidebarOpen,setSidebarOpen] = useState(false);


// const token = localStorage.getItem("token");




// // GET USERS

// const getUsers = async()=>{

// try{

// const res = await API.get(
// "/admin/users",
// {
// headers:{
// Authorization:`Bearer ${token}`
// }
// }
// );


// setUsers(
// res.data.users || []
// );


// setLoading(false);


// }
// catch(error){

// console.log(error);

// toast.error(
// "Failed to load users"
// );

// setLoading(false);

// }

// };





// useEffect(()=>{

// getUsers();

// },[]);






// // DELETE USER

// const deleteUser = async(id)=>{


// const confirmDelete = window.confirm(
// "Delete this user?"
// );


// if(!confirmDelete)
// return;



// try{


// await API.delete(

// `/admin/users/${id}`,

// {
// headers:{
// Authorization:`Bearer ${token}`
// }
// }

// );



// toast.success(
// "User deleted"
// );



// getUsers();



// }
// catch(error){

// console.log(error);

// toast.error(
// "Delete failed"
// );


// }



// };







// const filteredUsers = users.filter((user)=>


// user.name
// ?.toLowerCase()
// .includes(
// search.toLowerCase()
// )

// ||
// user.email
// ?.toLowerCase()
// .includes(
// search.toLowerCase()
// )


// );








// if(loading){

// return(

// <div className="
// min-h-screen
// flex
// items-center
// justify-center
// text-2xl
// font-bold
// ">

// Loading Users...

// </div>

// )

// }






// return(

// <div className="
// flex
// min-h-screen
// bg-gray-100
// dark:bg-gray-900
// ">


// <AdminSidebar

// sidebarOpen={sidebarOpen}

// setSidebarOpen={setSidebarOpen}

// />



// <div className="
// flex-1
// ">


// <AdminNavbar

// sidebarOpen={sidebarOpen}

// setSidebarOpen={setSidebarOpen}

// />





// <div className="
// p-6
// ">



// <h1 className="
// text-4xl
// font-bold
// dark:text-white
// mb-6
// ">

// Users Management

// </h1>





// {/* SEARCH */}

// <div className="
// bg-white
// dark:bg-gray-800
// p-5
// rounded-xl
// shadow
// mb-6
// ">


// <div className="
// relative
// ">


// <FaSearch

// className="
// absolute
// left-4
// top-4
// text-gray-400
// "

// />


// <input


// type="text"

// placeholder="Search user..."

// value={search}


// onChange={(e)=>
// setSearch(e.target.value)
// }


// className="
// w-full
// border
// rounded-lg
// p-3
// pl-12

// dark:bg-gray-700
// dark:text-white

// outline-none
// "


// />


// </div>


// </div>






// {/* USERS TABLE */}


// <div className="
// bg-white
// dark:bg-gray-800
// rounded-xl
// shadow
// overflow-x-auto
// ">


// <table className="
// w-full
// min-w-[800px]
// ">



// <thead className="
// bg-gray-200
// dark:bg-gray-700
// ">


// <tr>


// <th className="
// p-4
// text-left
// dark:text-white
// ">

// Name

// </th>


// <th className="
// p-4
// text-left
// dark:text-white
// ">

// Email

// </th>


// <th className="
// p-4
// text-left
// dark:text-white
// ">

// Role

// </th>


// <th className="
// p-4
// text-left
// dark:text-white
// ">

// Date

// </th>


// <th className="
// p-4
// text-left
// dark:text-white
// ">

// Action

// </th>


// </tr>


// </thead>






// <tbody>


// {

// filteredUsers.map((user)=>(


// <tr

// key={user._id}

// className="
// border-b
// dark:border-gray-700
// hover:bg-gray-50
// dark:hover:bg-gray-700
// ">


// <td className="
// p-4
// dark:text-white
// font-semibold
// ">

// {user.name}

// </td>



// <td className="
// p-4
// dark:text-gray-200
// ">

// {user.email}

// </td>





// <td className="
// p-4
// ">


// <span className={`

// px-4
// py-2
// rounded-full
// text-white

// ${
// user.role==="admin"

// ?
// "bg-purple-600"

// :

// "bg-blue-600"

// }

// `}>

// <FaUserShield className="inline mr-2"/>

// {user.role}

// </span>


// </td>





// <td className="
// p-4
// dark:text-gray-200
// ">

// {
// new Date(
// user.createdAt
// )
// .toLocaleDateString()

// }

// </td>






// <td className="
// p-4
// ">


// <button


// onClick={()=>deleteUser(user._id)}


// className="
// bg-red-600
// hover:bg-red-700
// text-white
// px-4
// py-2
// rounded-lg
// flex
// items-center
// gap-2
// "


// >


// <FaTrash/>

// Delete


// </button>


// </td>




// </tr>


// ))


// }



// </tbody>



// </table>


// </div>





// </div>


// </div>


// </div>


// );


// }


// export default AdminUsers;

import { 
  useEffect,
  useState
} from "react"; 



import toast from "react-hot-toast";

import {
  FaSearch,
  FaTrash,
  FaUserShield,
  FaUsers
} from "react-icons/fa";

import API from "../api/axios";



function AdminUsers(){


const [users,setUsers] = useState([]);

const [loading,setLoading] = useState(true);

const [search,setSearch] = useState("");


const token = localStorage.getItem("token");





// =====================
// GET ALL USERS
// =====================

const getUsers = async()=>{

try{


const res = await API.get(

"/admin/users",

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


console.log(
"USERS:",
res.data
);



setUsers(
res.data.users || []
);



setLoading(false);



}

catch(error){

console.log(error);


toast.error(
"Users loading failed"
);


setLoading(false);


}


};





useEffect(()=>{


getUsers();


},[]);









// =====================
// DELETE USER
// =====================


const deleteUser = async(id)=>{


const confirmDelete = window.confirm(
"Delete this user?"
);


if(!confirmDelete)
return;



try{


await API.delete(

`/admin/users/${id}`,

{

headers:{
Authorization:`Bearer ${token}`
}

}

);



toast.success(
"User Deleted"
);



getUsers();



}
catch(error){


console.log(error);


toast.error(
"Delete failed"
);


}



};









// =====================
// SEARCH
// =====================


const filteredUsers = users.filter((user)=>{


return (

user?.name
?.toLowerCase()
.includes(
search.toLowerCase()
)

||

user?.email
?.toLowerCase()
.includes(
search.toLowerCase()
)

);


});









if(loading){


return(

<div className="
min-h-screen
flex
items-center
justify-center
text-2xl
font-bold
">


Loading Users...


</div>

);


}










return(


<div className="
min-h-screen
bg-gray-100
dark:bg-gray-900
p-6
">







<h1 className="
text-3xl
font-bold
dark:text-white
">

Admin Users

</h1>



<p className="
text-gray-500
dark:text-gray-400
mt-2
mb-8
">

Manage registered users

</p>









{/* CARDS */}


<div className="
grid
md:grid-cols-3
gap-5
mb-8
">






<div className="
bg-blue-600
text-white
rounded-xl
p-6
shadow
">


<FaUsers size={35}/>


<h2 className="
text-3xl
font-bold
mt-3
">

{users.length}

</h2>


<p>

Total Users

</p>


</div>









<div className="
bg-purple-600
text-white
rounded-xl
p-6
shadow
">


<FaUserShield size={35}/>


<h2 className="
text-3xl
font-bold
mt-3
">


{
users.filter(
(user)=>
user?.role==="admin"
).length
}


</h2>


<p>

Admins

</p>


</div>









<div className="
bg-green-600
text-white
rounded-xl
p-6
shadow
">


<h2 className="
text-3xl
font-bold
">

{
users.filter(
(user)=>
user?.role==="user"
).length
}

</h2>


<p>

Normal Users

</p>


</div>





</div>









{/* SEARCH */}


<div className="
bg-white
dark:bg-gray-800
rounded-xl
shadow
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


type="text"


placeholder="Search user..."


value={search}



onChange={(e)=>

setSearch(
e.target.value
)

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


</div>









{/* USERS TABLE */}



<div className="
bg-white
dark:bg-gray-800
rounded-xl
shadow
overflow-x-auto
">



<table className="
w-full
min-w-[800px]
">





<thead className="
bg-gray-100
dark:bg-gray-700
">


<tr>


<th className="
p-4
text-left
dark:text-white
">

Name

</th>



<th className="
p-4
text-left
dark:text-white
">

Email

</th>



<th className="
p-4
text-left
dark:text-white
">

Role

</th>



<th className="
p-4
text-left
dark:text-white
">

Joined

</th>



<th className="
p-4
text-left
dark:text-white
">

Action

</th>



</tr>


</thead>






<tbody>



{

filteredUsers.length === 0 ? (


<tr>

<td

colSpan="5"

className="
text-center
p-10
dark:text-white
"

>

No Users Found

</td>


</tr>



)

:



filteredUsers.map((user)=>(


<tr

key={user._id}

className="
border-b
dark:border-gray-700
"



>


<td className="
p-4
dark:text-white
">

{user?.name || "Unknown"}

</td>




<td className="
p-4
dark:text-white
">

{user?.email}

</td>





<td className="
p-4
">


<span className="
bg-blue-100
text-blue-700
px-3
py-1
rounded-full
">


{user?.role || "user"}


</span>


</td>






<td className="
p-4
dark:text-white
">


{

user?.createdAt

?

new Date(
user.createdAt
)
.toLocaleDateString()

:

"Unknown"

}


</td>







<td className="
p-4
">


<button


onClick={()=>deleteUser(user._id)}



className="
bg-red-600
text-white
px-4
py-2
rounded-lg
flex
items-center
gap-2
"



>


<FaTrash/>

Delete


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


export default AdminUsers;