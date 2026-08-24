import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash 
} from "react-icons/fa";

import API from "../api/axios";


function Login(){

const navigate = useNavigate();


const [formData,setFormData] = useState({

email:"",
password:""

});


const [showPassword,setShowPassword] = useState(false);


const [loading,setLoading] = useState(false);




// INPUT CHANGE

const handleChange=(e)=>{

setFormData({

...formData,

[e.target.name]:e.target.value

});

};






// LOGIN SUBMIT

const handleSubmit = async(e)=>{

e.preventDefault();


try{


setLoading(true);



const res = await API.post(

"/auth/login",

formData

);




// SAVE TOKEN

localStorage.setItem(

"token",

res.data.token

);




// SAVE USER

localStorage.setItem(

"user",

JSON.stringify(res.data.user)

);





console.log("LOGIN RESPONSE:",res.data);





// ROLE BASE REDIRECT


if(res.data.user.role === "admin"){


toast.success(
"Welcome Admin"
);


navigate("/admin");


}

else{


toast.success(
"Login Successful"
);


navigate("/user");


}



}


catch(error){


console.log(error);


toast.error(

error.response?.data?.message ||

"Login Failed"

);


}


finally{


setLoading(false);


}



};








return(


<div className="
min-h-screen
flex
items-center
justify-center
bg-gradient-to-br
from-blue-600
via-purple-600
to-indigo-800
px-4
">


<div className="
bg-white
dark:bg-gray-900
rounded-2xl
shadow-2xl
w-full
max-w-md
p-8
">





<h1 className="
text-4xl
font-bold
text-center
text-gray-800
dark:text-white
mb-2
">

Welcome Back

</h1>





<p className="
text-center
text-gray-500
dark:text-gray-400
mb-8
">

Login to Complaint Management System

</p>







<form onSubmit={handleSubmit}>





{/* EMAIL */}


<div className="
mb-5
relative
">


<FaEnvelope

className="
absolute
left-4
top-4
text-gray-400
"

/>



<input

type="email"

name="email"

placeholder="Email Address"

value={formData.email}

onChange={handleChange}

required


className="
w-full
border
rounded-xl
py-3
pl-12
pr-4
outline-none

focus:ring-4
focus:ring-blue-200

dark:bg-gray-800
dark:text-white
"

/>



</div>









{/* PASSWORD */}



<div className="
mb-6
relative
">


<FaLock

className="
absolute
left-4
top-4
text-gray-400
"

/>





<input


type={

showPassword

?

"text"

:

"password"

}


name="password"


placeholder="Password"


value={formData.password}


onChange={handleChange}


required



className="
w-full
border
rounded-xl
py-3
pl-12
pr-12
outline-none

focus:ring-4
focus:ring-blue-200

dark:bg-gray-800
dark:text-white
"

/>







<button


type="button"


onClick={()=>setShowPassword(!showPassword)}


className="
absolute
right-4
top-4
text-gray-500
"


>


{

showPassword

?

<FaEyeSlash/>

:

<FaEye/>

}


</button>



</div>









<button


disabled={loading}


className="
w-full
bg-blue-600
hover:bg-blue-700
text-white
py-3
rounded-xl
font-semibold
text-lg
transition

disabled:opacity-50
"


>


{

loading

?

"Logging in..."

:

"Login"

}



</button>







</form>







<p className="
text-center
mt-6
text-gray-600
dark:text-gray-400
">


Don't have an account?


<span


onClick={()=>navigate("/register")}


className="
text-blue-600
font-semibold
cursor-pointer
ml-1
"

>

Register

</span>



</p>







</div>


</div>



);


}


export default Login;