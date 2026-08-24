import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaCalendar
} from "react-icons/fa";


import API from "../api/axios";



function UserProfile(){


const [user,setUser] = useState(null);

const [loading,setLoading] = useState(true);


const token = localStorage.getItem("token");







const getProfile = async()=>{


try{


const res = await API.get(

"/auth/profile",

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);



setUser(res.data);


setLoading(false);



}

catch(error){


console.log(error);


toast.error(
"Profile load failed"
);


setLoading(false);



}



};








useEffect(()=>{


getProfile();


},[]);









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

Loading Profile...

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
max-w-3xl
mx-auto

bg-white

dark:bg-gray-800

rounded-xl

shadow-lg

p-8

">





<div className="
flex
flex-col
items-center
mb-8
">





<FaUserCircle

size={100}

className="
text-blue-600
"

/>





<h1 className="
text-3xl
font-bold
dark:text-white
mt-4
">

{

user?.name

}

</h1>




<p className="
text-gray-500
dark:text-gray-400
">

User Profile

</p>




</div>









<div className="
space-y-5
">








<div className="
flex
items-center
gap-4

bg-gray-100

dark:bg-gray-700

p-4

rounded-lg

">


<FaUserCircle

className="
text-blue-600
"

/>


<div>


<p className="
text-sm
text-gray-500
">

Name

</p>


<h3 className="
font-semibold
dark:text-white
">

{
user?.name
}

</h3>


</div>


</div>









<div className="
flex
items-center
gap-4

bg-gray-100

dark:bg-gray-700

p-4

rounded-lg

">


<FaEnvelope

className="
text-green-600
"

/>


<div>


<p className="
text-sm
text-gray-500
">

Email

</p>


<h3 className="
font-semibold
dark:text-white
">

{
user?.email
}

</h3>


</div>


</div>









<div className="
flex
items-center
gap-4

bg-gray-100

dark:bg-gray-700

p-4

rounded-lg

">


<FaPhone

className="
text-purple-600
"

/>


<div>


<p className="
text-sm
text-gray-500
">

Role

</p>


<h3 className="
font-semibold
dark:text-white
">

{
user?.role || "User"
}

</h3>


</div>


</div>









<div className="
flex
items-center
gap-4

bg-gray-100

dark:bg-gray-700

p-4

rounded-lg

">


<FaCalendar

className="
text-red-600
"

/>


<div>


<p className="
text-sm
text-gray-500
">

Joined Date

</p>


<h3 className="
font-semibold
dark:text-white
">

{

new Date(
user?.createdAt
)
.toLocaleDateString()

}

</h3>


</div>


</div>









</div>







</div>






</div>


);



}



export default UserProfile;