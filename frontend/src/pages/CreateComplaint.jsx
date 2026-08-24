import {
  useState
} from "react";


import {
  useNavigate
} from "react-router-dom";


import toast from "react-hot-toast";


import {
  FaUpload,
  FaArrowLeft
} from "react-icons/fa";


import API from "../api/axios";





function CreateComplaint(){

const [priority,setPriority] = useState("Medium");

const navigate = useNavigate();



const [loading,setLoading]=useState(false);



const [imagePreview,setImagePreview]=useState("");



const [form,setForm]=useState({

title:"",

category:"",

location:"",

description:"",

image:null

});









const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};









const handleImage=(e)=>{


const file=e.target.files[0];


if(file){


setForm({

...form,

image:file

});



setImagePreview(
URL.createObjectURL(file)
);


}



};










const submitComplaint=async(e)=>{


e.preventDefault();



try{


setLoading(true);



const data = new FormData();



data.append(
"title",
form.title
);


data.append(
"category",
form.category
);


data.append(
"location",
form.location
);


data.append(
  "priority",
  priority
);
data.append(
"description",
form.description
);



if(form.image){

data.append(
"image",
form.image
);

}





const token = localStorage.getItem("token");





await API.post(

"/complaints",

data,

{

headers:{

Authorization:
`Bearer ${token}`,

"Content-Type":
"multipart/form-data"

}

}

);





toast.success(
"Complaint Submitted Successfully"
);



navigate("/user/complaints");





}

catch(error){


console.log(error);


toast.error(
"Complaint submission failed"
);


}

finally{


setLoading(false);


}



};









return(



<div className="
min-h-screen

bg-gray-100

dark:bg-gray-900

p-5

">








<div className="
max-w-3xl

mx-auto

bg-white

dark:bg-gray-800

rounded-2xl

shadow-xl

p-8

">






<button

onClick={()=>navigate(-1)}

className="
flex

items-center

gap-2

text-blue-600

mb-6

font-semibold

"

>

<FaArrowLeft/>

Back


</button>









<h1 className="
text-3xl

font-bold

dark:text-white

mb-2

">

Create Complaint

</h1>





<p className="
text-gray-500

dark:text-gray-400

mb-8

">

Submit your problem and track status

</p>









<form

onSubmit={submitComplaint}

className="
space-y-5

"

>



<select

value={priority}

onChange={(e)=>setPriority(e.target.value)}

className="
border
p-3
rounded-lg
w-full
"

>

<option value="Low">
Low
</option>

<option value="Medium">
Medium
</option>

<option value="High">
High
</option>

</select>



{/* TITLE */}



<div>


<label className="
font-semibold

dark:text-white

">

Complaint Title

</label>



<input


type="text"

name="title"


value={form.title}


onChange={handleChange}



placeholder="Enter complaint title"



className="
w-full

mt-2

border

rounded-xl

p-3

dark:bg-gray-700

dark:text-white

outline-none

focus:ring-4

focus:ring-blue-200

"


required


/>



</div>









{/* CATEGORY */}



<div>


<label className="
font-semibold

dark:text-white

">

Category

</label>




<select

name="category"

value={form.category}


onChange={handleChange}



className="
w-full

mt-2

border

rounded-xl

p-3

dark:bg-gray-700

dark:text-white

"

required

>


<option value="">

Select Category

</option>


<option>

Water

</option>


<option>

Road

</option>


<option>

Electricity

</option>


<option>

Gas

</option>


<option>

Other

</option>


</select>



</div>









{/* LOCATION */}



<div>


<label className="
font-semibold

dark:text-white

">

Location

</label>



<input


type="text"

name="location"


value={form.location}


onChange={handleChange}



placeholder="Enter location"



className="
w-full

mt-2

border

rounded-xl

p-3

dark:bg-gray-700

dark:text-white

"

required


/>



</div>









{/* DESCRIPTION */}



<div>


<label className="
font-semibold

dark:text-white

">

Description

</label>



<textarea


name="description"


rows="5"


value={form.description}


onChange={handleChange}



placeholder="Explain your problem"



className="
w-full

mt-2

border

rounded-xl

p-3

dark:bg-gray-700

dark:text-white

"

required


/>




</div>









{/* IMAGE */}



<div>


<label className="
font-semibold

dark:text-white

">

Upload Image

</label>



<div className="
mt-2

border-2

border-dashed

rounded-xl

p-5

text-center

">


<input

type="file"

accept="image/*"

onChange={handleImage}

className="
hidden
"

id="image"

/>


<label

htmlFor="image"

className="
cursor-pointer

text-blue-600

font-semibold

flex

justify-center

items-center

gap-2

"


>


<FaUpload/>

Choose Image


</label>





{

imagePreview &&

<img

src={imagePreview}

className="
mt-5

w-40

h-40

object-cover

rounded-xl

mx-auto

"

/>


}



</div>



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

font-bold

text-lg

"


>


{

loading

?

"Submitting..."

:

"Submit Complaint"

}



</button>






</form>







</div>






</div>



);


}



export default CreateComplaint;