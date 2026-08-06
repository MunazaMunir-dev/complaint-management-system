import {
  useEffect,
  useState
} from "react";

import API from "../api/axios";
import {
  FaBell,
  FaUserCircle,
  FaSignOutAlt
} from "react-icons/fa";

import {
  useNavigate
} from "react-router-dom";

import toast from "react-hot-toast";


function AdminNavbar(){

const navigate = useNavigate();
const [notifications,setNotifications] = useState([]);

const [showNotifications,setShowNotifications] = useState(false);

useEffect(()=>{


const getNotifications = async()=>{


try{


const res = await API.get(
"/admin/notifications",
{
headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`
}
}
);


setNotifications(res.data);



}
catch(error){

console.log(error);

}


};


getNotifications();


},[]);
const logout = ()=>{


localStorage.removeItem("token");


toast.success(
"Logout Successfully"
);


navigate("/login");


};




return(


<nav

className="
h-20
bg-white
dark:bg-gray-800
shadow-md
flex
items-center
justify-between
px-4
md:px-8
transition
"

>




{/* LEFT SIDE */}


<div>


<h2

className="
text-xl
md:text-2xl
font-bold
dark:text-white
"

>

Admin Panel

</h2>



<p

className="
text-sm
text-gray-500
dark:text-gray-400
hidden
sm:block
"

>

Complaint Management System

</p>


</div>







{/* RIGHT SIDE */}



<div

className="
flex
items-center
gap-4
"

>





{/* NOTIFICATION */}

<div className="relative">


<button

onClick={()=>setShowNotifications(!showNotifications)}

className="
relative
text-gray-600
dark:text-gray-300
hover:text-blue-600
"

>

<FaBell size={25}/>


{
notifications.length > 0 &&

<span

className="
absolute
-top-2
-right-2
bg-red-500
text-white
text-xs
rounded-full
w-5
h-5
flex
items-center
justify-center
"

>

{notifications.length}

</span>

}


</button>





{
showNotifications && (


<div

className="
absolute
right-20
top-16
w-80
bg-white
dark:bg-gray-800
shadow-xl
rounded-lg
p-4
z-50
"

>


<h3 className="
font-bold
dark:text-white
mb-3
">

Notifications

</h3>




{

notifications.length===0

?

<p className="
text-gray-500
">

No Notifications

</p>


:


notifications.map((item)=>(


<div

key={item._id}

className="
border-b
py-3
dark:border-gray-700
"

>


<p className="
font-semibold
dark:text-white
">

{item.title}

</p>



<p className="
text-sm
text-gray-500
">

{item.message}

</p>


</div>


))


}



</div>


)

}


</div>







{/* ADMIN PROFILE */}



<div

className="
hidden
md:flex
items-center
gap-3
"

>


<FaUserCircle

size={40}

className="
text-blue-600
"

/>



<div>


<h3

className="
font-semibold
dark:text-white
"

>

Admin

</h3>



<p

className="
text-sm
text-gray-500
dark:text-gray-400
"

>

Administrator

</p>



</div>


</div>









{/* LOGOUT */}



<button


onClick={logout}


className="
flex
items-center
gap-2
bg-red-600
hover:bg-red-700
text-white
px-3
md:px-5
py-2
rounded-lg
transition
"


>



<FaSignOutAlt/>


<span className="
hidden
sm:block
">

Logout

</span>



</button>







</div>





</nav>



);


}


export default AdminNavbar;