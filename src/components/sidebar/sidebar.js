import "./sidebar.css";
import { Modal } from 'flowbite';
import axios from "axios";
import authService from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import img from "../../assets/Bedaya.png";
import { useState ,useEffect } from "react";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LogoutIcon from '@mui/icons-material/Logout';
const Sidebar = () => {
    const navigate = useNavigate();
    const $targetEl = document.getElementById('small-modal');
    const modal = new Modal($targetEl);
    const [admin, setAdmin] = useState(false);
    const[loading,setLoading]=useState(true);
    //useEffect to check if user is admin
    useEffect(() => {
      console.log(authService.getCurrentUser());
        checkAdmin();
    }, []);
    const requestCallback = () => {
        axios.post('/backend/api/send-callback', {
            id : authService.getCurrentUser().userid
        })
        .then(function (response) {
            console.log(response);  })
        .catch(function (error) {

            console.log(error);
        });
    }
    const requestWithdraw = () => {
        axios.post('/backend/api/send-withdrawal', {
            id : authService.getCurrentUser().userid
        })
        .then(function (response) {
            console.log(response);  })
        .catch(function (error) { 
            console.log(error);
        });
    }



        

    //api call to check if user is admin
    const checkAdmin = async () => {
        const response = await fetch(`/backend/api/checkadmin/${authService.getCurrentUser().userid}`);
        const data = await response.json();
        console.log(data);
        if (data.isAdmin) {
            setAdmin(true);
            setLoading(false);
        } else {
            setAdmin(false);
            setLoading(false);
        }
    }
    const signOutUser = () => {authService.logout()
        navigate("/login");
    }
    const [open, setOpen] = useState(true);
  
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        
        if (window.innerWidth < 768) {
          setOpen(false);
        }
        if (window.innerWidth > 768) {
          setOpen(true);
        }
      }
      // Add event listener
      window.addEventListener("resize", handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []);
 
  return ( <div className="flex">
  <div
    className={` ${
      open ? "w-72" : "w-20 "
    } bg h-screen p-5  pt-8 relative duration-300`}
  >   <img
  src="https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/control.png"
  className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
   border-2 rounded-full  ${!open && "rotate-180"}`}
  onClick={() => setOpen(!open)} alt="logo"
/>
<div className="flex gap-x-4 items-center">
      <img
        src={img}
        className={`logo cursor-pointer duration-500 ${
          open && "rotate-[360deg]" 
        }`}
        onClick={() => window.location.replace(
          "https://recoveryst.net"
        )}
        style={{ width: "50%" }} alt="logo"
      />
      
      
    </div>{!loading  ? ( <> {admin ? (<>
 
  
  <ul className="pt-6 flex flex-col space-y-4">
    
      <li
        key={0}
        onClick={() => navigate("/app")}
        className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
        my-8"
          "bg-light-white"
         `}
      >
        <img src={`https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/User.png`} alt="logo"/>
        <span className={`${!open && "hidden"} text-white origin-left duration-200`}>
          Dashboard
        </span>
      </li> 
      <li
   onClick={() => navigate("/app/clients")}
        key={1}
        className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
        my-8"
          "bg-light-white"
         `}
      >
        <img src={`https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/Folder.png`}  alt="logo"/>
        <span   className={`${!open && "hidden"} text-white origin-left duration-200`}>
          Clients 
        </span>
      </li> 
      

   
      <li 
        key={4}
        className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
       my-8"
          "bg-light-white"
         `}
         style={{alignSelf:"baseline"}}
         onClick={signOutUser} 
      >
    <LogoutIcon/>
        <span className={`${!open && "hidden"} text-white origin-left duration-200`}>
          Sign Out
        </span>
      </li> 
    
  </ul></>) : (<> <div id="small-modal" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
    <div class="relative w-full h-full max-w-md md:h-auto">

        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        
            <div class="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                    Request Successfully Submitted
                </h3>
                <button onClick={()=>modal.hide()} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="small-modal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>

            <div class="p-6 space-y-6">
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Your request has been successfully submitted. A representative will call you as soon as possible.
                </p>
               
            </div>
      
            <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button onClick={()=>modal.hide()} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
          
            </div>
        </div>
    </div>
</div>
    
    
    <div id="small-modal"  class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
  <div class="relative w-full h-full max-w-md md:h-auto">

      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
      
          <div class="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-medium text-gray-900 dark:text-white">
              Request Successfully Submitted
              </h3>
              <button onClick={()=>modal.hide()} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="small-modal">
                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  <span class="sr-only">Close modal</span>
              </button>
          </div>

          <div class="p-6 space-y-6">
              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Your withdrawal request is now under review. You will contacted for a vocal confirmation shortly.
              </p>
             
          </div>
    
          <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button onClick={()=>modal.hide()} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
        
          </div>
      </div>
  </div>
</div>
    <ul className="pt-6 flex flex-col space-y-4">
      
        <li
          key={0}
          onClick={() => navigate("/app")}
          className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
          my-8"
            "bg-light-white"
           `}
        >
          <img src={`https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/User.png`} alt="logo" />
          <span className={`${!open && "hidden"} text-white origin-left duration-200`}>
            Dashboard
          </span>
        </li> 
        <li
    onClick={() => {modal.show()  ; requestWithdraw()}  }
          key={1}
          className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
          my-8"
            "bg-light-white"
           `}
        >
         <AttachMoneyIcon/>
          <span   className={`${!open && "hidden"} text-white origin-left duration-200`}>
            Request a withdrawal
          </span>
        </li> 
        <li
    onClick={() => {modal.show() ; requestCallback()}  }
          key={2}
          className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
          my-8"
            "bg-light-white"
           `}
        >
          <LocalPhoneIcon/>
          <span   className={`${!open && "hidden"} text-white origin-left duration-200`}>
            Request a Callback
          </span>
        </li> 
        <li 
          key={3}
          className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
         my-8"
            "bg-light-white"
           `}
           style={{alignSelf:"baseline"}}
           onClick={() => navigate("/app/settings/" +JSON.parse( localStorage.getItem("user")).userid)} 
        >
          <img src={`https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/Setting.png`} alt="logo" />
          <span className={`${!open && "hidden"} text-white origin-left duration-200`}>
            Edit Info
          </span>
        </li>
     
        <li 
          key={4}
          className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
         my-8"
            "bg-light-white"
           `}
           style={{alignSelf:"baseline"}}
           onClick={signOutUser} 
        >
              <LogoutIcon/>
          <span className={`${!open && "hidden"} text-white origin-left duration-200`}>
            Sign Out
          </span>
        </li> 
      
    </ul></>)}
   </>):(<></>)}
  </div>
</div>
);
};

export default Sidebar;