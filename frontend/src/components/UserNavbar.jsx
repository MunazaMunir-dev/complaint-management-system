import {
  useState
} from "react";


import {
  FaBars,
  FaBell,
  FaMoon,
  FaSun,
  FaSignOutAlt
} from "react-icons/fa";


import {
  useNavigate
} from "react-router-dom";





function UserNavbar({

sidebarOpen,
setSidebarOpen,
darkMode,
setDarkMode

}){


const navigate = useNavigate();



const [showNotifications,setShowNotifications] = useState(false);



const notifications = [

{
id:1,
message:"Your complaint has been submitted",
time:"Just now"
},

{
id:2,
message:"Admin reviewed your complaint",
time:"2 minutes ago"
}

];





const user = JSON.parse(
localStorage.getItem("user")
) || {};








// LOGOUT

const logout=()=>{


localStorage.removeItem("token");

localStorage.removeItem("user");

localStorage.removeItem("name");


navigate("/login");


};










return(


<header

className={`

fixed

top-0

right-0

h-20

z-50


backdrop-blur-xl

bg-white/80

dark:bg-gray-900/80


border-b

dark:border-gray-800


shadow-lg


flex

items-center

justify-between


px-6


transition-all

duration-300



${sidebarOpen ? "left-72":"left-20"}

`}

>







{/* LEFT SIDE */}



<div

className="
flex
items-center
gap-5
"

>




<button

onClick={()=>setSidebarOpen(!sidebarOpen)}

className="

w-11

h-11

rounded-xl


bg-gray-100

dark:bg-gray-800


dark:text-white


flex

items-center

justify-center


hover:scale-110

transition

"

>


<FaBars size={20}/>


</button>







<div>


<h2

className="

text-2xl

font-bold

dark:text-white

"

>

Dashboard

</h2>



<p

className="

text-xs

text-gray-500

dark:text-gray-400

"

>

Complaint Management System

</p>



</div>



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

w-11

h-11


rounded-xl


bg-gray-100

dark:bg-gray-800


dark:text-white


flex

items-center

justify-center


hover:scale-110


transition

"

>


<FaBell size={20}/>



<span

className="

absolute

-top-1

-right-1


bg-red-600


text-white


text-xs


w-5

h-5


rounded-full


flex

items-center

justify-center

"

>

{notifications.length}

</span>



</button>









{/* DROPDOWN */}



{

showNotifications && (


<div

className="

absolute

right-0

top-14


w-80


bg-white

dark:bg-gray-800


rounded-xl


shadow-2xl


border


dark:border-gray-700


p-4


"

>


<h3

className="

font-bold

text-lg

dark:text-white

mb-3

"

>

Notifications

</h3>






{

notifications.map((item)=>(


<div

key={item.id}

className="

py-3

border-b

dark:border-gray-700

"

>


<p

className="

text-sm

dark:text-gray-200

"

>

{item.message}

</p>


<span

className="

text-xs

text-gray-500

"

>

{item.time}

</span>


</div>



))


}





</div>


)

}



</div>












{/* DARK MODE */}



<button


onClick={()=>setDarkMode(!darkMode)}


className="

w-11

h-11


rounded-xl


bg-gray-100


dark:bg-gray-800


dark:text-white


flex

items-center

justify-center


hover:scale-110


transition

"

>


{

darkMode

?

<FaSun className="text-yellow-400"/>

:

<FaMoon/>

}



</button>














{/* USER PROFILE */}



<div

className="

flex

items-center

gap-3

"

>




<div

className="

w-12

h-12


rounded-full


bg-gradient-to-br

from-blue-600

to-purple-600


text-white


flex


items-center


justify-center


font-bold


text-xl


shadow-lg

"

>


{

user.name

?

user.name.charAt(0).toUpperCase()

:

"U"

}



</div>









<div className="hidden lg:block">


<h3

className="

font-bold

dark:text-white

"

>

{

user.name || "User"

}


</h3>



<p

className="

text-sm

text-gray-500

dark:text-gray-400

"

>

Citizen

</p>



</div>





</div>














{/* LOGOUT */}



<button


onClick={logout}


className="


bg-gradient-to-r

from-red-500

to-red-700


hover:scale-105


transition


text-white


px-5


py-3


rounded-xl


flex


items-center


gap-2


font-semibold


shadow-lg


"

>


<FaSignOutAlt/>


<span className="hidden sm:block">

Logout

</span>


</button>







</div>







</header>


);


}



export default UserNavbar;