import {
  NavLink,
  useNavigate
} from "react-router-dom";
import { Link } from "react-router-dom";

import {
  FaHome,
  FaPlusCircle,
  FaClipboardList,
  FaUser,
  FaTimes,
  FaSignOutAlt,
  FaChevronLeft
} from "react-icons/fa";




function UserSidebar({

sidebarOpen,
setSidebarOpen

}){


const navigate = useNavigate();



const logout=()=>{

localStorage.removeItem("token");
localStorage.removeItem("name");
localStorage.removeItem("user");

navigate("/login");

};





const links=[


{
name:"Dashboard",
path:"/dashboard",
icon:<FaHome/>
},


{
name:"Create Complaint",
path:"/user/create-complaint",
icon:<FaPlusCircle/>
},


{
name:"My Complaints",
path:"/user/complaints",
icon:<FaClipboardList/>
},


{
name:"Profile",
path:"/user/profile",
icon:<FaUser/>
},
{
name:"Track Complaint",
path:"/track",
icon:<FaClipboardList/>
},

];







return(

<>


{/* MOBILE OVERLAY */}

{

sidebarOpen &&

<div

onClick={()=>setSidebarOpen(false)}

className="
fixed
inset-0
bg-black/40
backdrop-blur-sm
z-40
md:hidden
"

/>

}






<aside

className={`

fixed

top-0

left-0

h-screen

z-50

transition-all

duration-300

bg-white

dark:bg-gray-900

shadow-2xl

border-r

dark:border-gray-800


${sidebarOpen ? "w-72":"w-20"}

`}

>





{/* LOGO */}


<div className="
h-20
flex
items-center
justify-between
px-5
border-b
dark:border-gray-800
">


{

sidebarOpen &&

<div>

<h1 className="
text-2xl
font-extrabold
bg-gradient-to-r
from-blue-600
to-purple-600
bg-clip-text
text-transparent
">

ComplainX

</h1>

<p className="
text-xs
text-gray-500
">

Citizen Portal

</p>

</div>

}



<button

onClick={()=>setSidebarOpen(!sidebarOpen)}

className="
w-10
h-10
rounded-xl
bg-gray-100
dark:bg-gray-800
flex
items-center
justify-center
dark:text-white
hover:scale-110
transition
"

>


{

sidebarOpen

?

<FaChevronLeft/>

:

<FaTimes/>

}


</button>



</div>








{/* USER PROFILE */}



<div className="
p-5
">


<div className="
bg-gradient-to-br
from-blue-600
to-purple-600
rounded-2xl
p-4
text-white
text-center
">


<div className="
w-14
h-14
mx-auto
rounded-full
bg-white
text-blue-600
flex
items-center
justify-center
font-bold
text-2xl
">

{

localStorage.getItem("name")
?.charAt(0)
||
"U"

}

</div>



{

sidebarOpen &&

<>

<h3 className="
mt-3
font-bold
">

{

localStorage.getItem("name")

}

</h3>


<p className="
text-sm
opacity-80
">

Citizen

</p>


</>

}


</div>


</div>








{/* MENU */}



<div className="
px-3
space-y-3
">


{

links.map(item=>(


<NavLink

key={item.path}

to={item.path}

className={({isActive})=>`

flex
items-center

${sidebarOpen 
?
"px-4 justify-start"
:
"justify-center"}

gap-4

h-12

rounded-xl

transition-all

duration-300


${
isActive

?

"bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"

:

"text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"

}

`}

>


<span className="
text-xl
">

{item.icon}

</span>


{

sidebarOpen &&

<span className="
font-semibold
">

{item.name}

</span>

}



</NavLink>


))


}


</div>









{/* LOGOUT */}



<div className="
absolute
bottom-5
left-0
w-full
px-3
">


<button

onClick={logout}

className="

w-full

h-12

rounded-xl

bg-red-600

hover:bg-red-700

text-white

flex

items-center

justify-center

gap-3

transition

shadow-lg

"


>


<FaSignOutAlt/>


{

sidebarOpen &&

<span className="font-semibold">

Logout

</span>

}


</button>



</div>






</aside>


</>

);


}


export default UserSidebar;