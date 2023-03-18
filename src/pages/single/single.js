import "./single.css";
import Sidebar from "../../components/sidebar/sidebar"; 
import Navbar from "../../components/navbar/navbar";
import { useState ,  useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router";
const Single = () => {
  const [data, setData] = useState({
    id:0,
    email:"", 
    phone:"",
    date:"",
    pdflink:""
  });
  const navigate = useNavigate();
  
  const deleteUser =()=>{
    let clientId = window.location.pathname.split("/")[3];
    axios.delete("/backend/api/client/"+clientId)
    .then((res) => {
      console.log(res.data)
      navigate("/app/clients/");
    })
    .catch((err) => {
      console.log(err);
    });

  }

  useEffect(() => {
    let clientId = window.location.pathname.split("/")[3];
      axios
      .get("/backend/api/client/"+clientId)
      .then((res) => {
        setData(res.data[0]);
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);


  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
          <div className='listContainer'>
                <div class="bg-white p-3 shadow-sm rounded-sm">
                    <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span clas="text-green-500">
                            <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <span class="tracking-wide">File Information</span>
                    </div>
                    <div class="text-gray-700">
                        <div class="grid md:grid-cols-2 text-sm">
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Account Number</div>
                                <div class="px-4 py-2">{data.account_number}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Full Name</div>
                                <div class="px-4 py-2">{data.fullname}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Contact Info</div>
                                <div class="px-4 py-2">{data.contact_information}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Company Name</div>
                                <div class="px-4 py-2">{data.company_name}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Account Number</div>
                                <div class="px-4 py-2">{data.account_number}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold"> Country</div>
                                <div class="px-4 py-2">{data.country}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold"> Bank Name </div>
                                <div class="px-4 py-2">{data.bank_name}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold"> Swift</div>
                                <div class="px-4 py-2">{data.swift}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold"> IBAN</div>
                                <div class="px-4 py-2">{data.country}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold"> Beneficiary Name</div>
                                <div class="px-4 py-2">{data.beneficiary_name}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold"> Beneficiary Address</div>
                                <div class="px-4 py-2">{data.beneficiary_address}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold"> Bank Address</div>
                                <div class="px-4 py-2">{data.beneficiary_name}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold"> Bitcoin Wallet</div>
                                <div class="px-4 py-2">{data.btc_wallet}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Current Balance</div>
                                <div class="px-4 py-2">{data.current_balance}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold"> Funds On Hold</div>
                                <div class="px-4 py-2">{data.fund_on_hold}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold"> Withdrawable Balance</div>
                                <div class="px-4 py-2">{data.withdrawable_balance}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold"> Last Login Info</div>
                                <div class="px-4 py-2">{data.last_login_info}</div>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
                
                </div>
                <button onClick={(e)=>{
                  e.preventDefault();
                  deleteUser();

                }} type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Delete User</button>

          </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default Single;