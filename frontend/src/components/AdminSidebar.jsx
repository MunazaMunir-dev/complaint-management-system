import {
  FaHome,
  FaClipboardList,
  FaUsers,
  FaChartBar,
  FaCog,
  FaTimes
} from "react-icons/fa";

import { NavLink } from "react-router-dom";


function AdminSidebar({
  sidebarOpen,
  setSidebarOpen
}) {


const links = [

{
name:"Dashboard",
path:"/admin",
icon:<FaHome/>
},

{
name:"Complaints",
path:"/admin/complaints",
icon:<FaClipboardList/>
},

{
name:"Users",
path:"/admin/users",
icon:<FaUsers/>
},

{
name:"Analytics",
path:"/admin/analytics",
icon:<FaChartBar/>
},

{
name:"Settings",
path:"/admin/settings",
icon:<FaCog/>
}

];




return (

<>

{/* MOBILE OVERLAY */}

{
sidebarOpen && (

<div

onClick={()=>setSidebarOpen(false)}

className="
fixed
inset-0
bg-black
bg-opacity-50
z-40
md:hidden
"

/>

)

}





{/* SIDEBAR */}

<aside

className={`
fixed
top-0
left-0
z-50
w-64
h-screen
bg-gray-900
text-white
shadow-xl
flex
flex-col
transition-transform
duration-300

${
sidebarOpen
?
"translate-x-0"
:
"-translate-x-full"
}

md:translate-x-0
md:static
`}

>




{/* LOGO */}

<div

className="
p-6
border-b
border-gray-700
flex
justify-between
items-center
"

>


<div>


<h1

className="
text-2xl
font-bold
"

>

CMS Admin

</h1>



<p

className="
text-gray-400
text-sm
mt-1
"

>

Management Panel

</p>


</div>






{/* CLOSE BUTTON */}

<button

onClick={()=>setSidebarOpen(false)}

className="
md:hidden
text-xl
hover:text-red-400
"

>

<FaTimes/>

</button>


</div>







{/* MENU */}

<div

className="
flex-1
p-4
"

>


{

links.map((link,index)=>(


<NavLink


key={index}


to={link.path}



onClick={()=>setSidebarOpen(false)}



className={({isActive})=>

`

flex
items-center
gap-3

px-4
py-3

mb-2

rounded-lg

transition
duration-300


${
isActive

?

"bg-blue-600 text-white shadow-lg"

:

"text-gray-300 hover:bg-gray-800 hover:text-white"

}

`

}



>


<span className="text-xl">

{link.icon}

</span>



<span>

{link.name}

</span>



</NavLink>


))


}



</div>








{/* FOOTER */}

<div

className="
p-4
border-t
border-gray-700
text-sm
text-gray-400
"

>


<p>

© 2026 CMS

</p>


<p>

Admin Panel

</p>


</div>





</aside>



</>

);

}


export default AdminSidebar;