import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
FaUser,
FaEnvelope,
FaLock,
FaEye,
FaEyeSlash
} from "react-icons/fa";

import API from "../api/axios";



function Register(){


const navigate = useNavigate();



const [formData,setFormData] = useState({

name:"",
email:"",
password:"",
confirmPassword:""

});



const [showPassword,setShowPassword] = useState(false);

const [showConfirm,setShowConfirm] = useState(false);


const [loading,setLoading] = useState(false);





// Input Handle

const handleChange=(e)=>{


setFormData({

...formData,

[e.target.name]:e.target.value

});


};







// Register

const handleSubmit = async(e)=>{


e.preventDefault();



if(formData.password !== formData.confirmPassword){


toast.error(
"Passwords do not match"
);


return;


}



try{


setLoading(true);



const res = await API.post(

"/auth/register",

{

name:formData.name,

email:formData.email,

password:formData.password

}

);




toast.success(

"Account Created Successfully"

);




setTimeout(()=>{


navigate("/login");


},1000);



}


catch(error){


console.log(error);



toast.error(

error.response?.data?.message ||

"Registration Failed"

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
from-purple-600
via-blue-600
to-indigo-800

px-4
">





<div className="
bg-white
dark:bg-gray-900

w-full
max-w-md

rounded-2xl

shadow-2xl

p-8

">





<h1 className="
text-4xl
font-bold
text-center

dark:text-white

mb-2
">


Create Account


</h1>




<p className="
text-center
text-gray-500
dark:text-gray-400

mb-8
">


Join Complaint Management System


</p>







<form onSubmit={handleSubmit}>






{/* NAME */}


<div className="
relative
mb-5
">


<FaUser

className="
absolute
left-4
top-4
text-gray-400
"

/>



<input


type="text"


name="name"


placeholder="Full Name"


value={formData.name}


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







{/* EMAIL */}


<div className="
relative
mb-5
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
relative
mb-5
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








{/* CONFIRM PASSWORD */}



<div className="
relative
mb-6
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

showConfirm

?

"text"

:

"password"

}




name="confirmPassword"



placeholder="Confirm Password"



value={formData.confirmPassword}



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


onClick={()=>setShowConfirm(!showConfirm)}



className="
absolute
right-4
top-4
text-gray-500
"

>


{

showConfirm

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

"Creating Account..."

:

"Register"


}



</button>







</form>







<p className="
text-center
mt-6

text-gray-600

dark:text-gray-400

">


Already have an account?


<span


onClick={()=>navigate("/login")}


className="
text-blue-600

font-semibold

cursor-pointer

ml-1

"

>

Login

</span>



</p>








</div>



</div>



);


}



export default Register;