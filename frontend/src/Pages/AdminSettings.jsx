import {
  useState
} from "react";

import toast from "react-hot-toast";

import API from "../api/axios";


function AdminSettings(){


const [password,setPassword] = useState("");



const logout = ()=>{


localStorage.removeItem("token");

toast.success("Logged out");


window.location.href="/login";


};





const changePassword = async()=>{


try{


await API.put(

"/admin/change-password",

{
password
},

{

headers:{

Authorization:

`Bearer ${localStorage.getItem("token")}`

}

}

);



toast.success(
"Password Updated"
);


setPassword("");



}

catch(error){


console.log(error);

toast.error(
"Password update failed"
);


}



};





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

Admin Settings

</h1>






<div className="
grid
md:grid-cols-2
gap-6
">






{/* PROFILE */}


<div className="
bg-white
dark:bg-gray-800
rounded-xl
shadow
p-6
">


<h2 className="
text-2xl
font-bold
dark:text-white
mb-5
">

Admin Profile

</h2>


<p className="
dark:text-gray-300
">

Role: Administrator

</p>


<p className="
dark:text-gray-300
mt-2
">

Access: Full Control

</p>



</div>









{/* PASSWORD */}


<div className="
bg-white
dark:bg-gray-800
rounded-xl
shadow
p-6
">


<h2 className="
text-2xl
font-bold
dark:text-white
mb-5
">

Change Password

</h2>




<input


type="password"


placeholder="New Password"


value={password}


onChange={(e)=>

setPassword(e.target.value)

}


className="
w-full
border
rounded-lg
p-3
mb-4
dark:bg-gray-700
dark:text-white
"



/>





<button

onClick={changePassword}

className="
bg-blue-600
text-white
px-5
py-3
rounded-lg
"

>

Update Password

</button>



</div>







</div>










{/* SYSTEM INFO */}


<div className="
bg-white
dark:bg-gray-800
rounded-xl
shadow
p-6
mt-8
">


<h2 className="
text-2xl
font-bold
dark:text-white
mb-4
">

System Information

</h2>



<ul className="
dark:text-gray-300
space-y-2
">


<li>
Frontend: React + Tailwind CSS
</li>


<li>
Backend: Node.js + Express
</li>


<li>
Database: MongoDB
</li>


<li>
Authentication: JWT
</li>


</ul>



</div>









<button

onClick={logout}

className="
mt-8
bg-red-600
text-white
px-6
py-3
rounded-lg
"

>

Logout Admin

</button>





</div>


);


}


export default AdminSettings;