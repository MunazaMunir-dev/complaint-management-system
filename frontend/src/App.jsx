import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";


import {
  Toaster
} from "react-hot-toast";


// Pages

import Login from "./pages/Login";
import Register from "./pages/Register";
import ComplaintTracking from "./pages/ComplaintTracking";

// User

import UserDashboard from "./pages/UserDashboard";
import CreateComplaint from "./pages/CreateComplaint";
import MyComplaints from "./pages/MyComplaints";
import UserProfile from "./pages/UserProfile";
import ComplaintDetails from "./pages/ComplaintDetails";


// Admin

import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminComplaints from "./pages/AdminComplaints";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminSettings from "./pages/AdminSettings";


// Edit

import EditComplaint from "./pages/EditComplaint";





function App(){


const [
darkMode,
setDarkMode
]=useState(

localStorage.getItem("theme")==="dark"

);





useEffect(()=>{


if(darkMode){


document.documentElement.classList.add(
"dark"
);


localStorage.setItem(
"theme",
"dark"
);


}

else{


document.documentElement.classList.remove(
"dark"
);


localStorage.setItem(
"theme",
"light"
);


}


},[darkMode]);








return(


<BrowserRouter>


<Toaster
position="top-right"
/>





<Routes>





{/* =================
AUTH
================= */}


<Route

path="/"

element={<Login/>}

/>


<Route

path="/login"

element={<Login/>}

/>


<Route

path="/register"

element={<Register/>}

/>








{/* =================
USER PANEL
================= */}



<Route

path="/user"

element={<UserDashboard/>}

/>




<Route

path="/dashboard"

element={<UserDashboard/>}

/>





<Route

path="/user/create-complaint"

element={<CreateComplaint/>}

/>


<Route
 path="/track"
 element={<ComplaintTracking />}
/>



<Route

path="/user/complaints"

element={<MyComplaints/>}

/>






{/* USER COMPLAINT DETAILS */}

<Route

path="/user/complaints/:id"

element={<ComplaintDetails/>}

/>






<Route

path="/user/profile"

element={<UserProfile/>}

/>






<Route

path="/edit/:id"

element={<EditComplaint/>}

/>









{/* =================
ADMIN PANEL
================= */}



<Route

path="/admin"

element={
<AdminDashboard

darkMode={darkMode}

setDarkMode={setDarkMode}

/>
}

/>







<Route

path="/admin/users"

element={<AdminUsers/>}

/>







<Route

path="/admin/complaints"

element={<AdminComplaints/>}

/>







<Route

path="/admin/analytics"

element={<AdminAnalytics/>}

/>







<Route

path="/admin/settings"

element={<AdminSettings/>}

/>








{/* ADMIN COMPLAINT DETAILS */}

<Route

path="/admin/complaint/:id"

element={<ComplaintDetails/>}

/>







</Routes>



</BrowserRouter>


)


}



export default App;