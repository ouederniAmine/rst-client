import "./clientParams.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import BankLogo from "../../assets/bank.svg";
import { useTranslation } from 'react-i18next';

const ClientParams = ({ inputs, title }) => {
  const { t } = useTranslation();

  // get data from variable api endpoint
  const [btc, setBtc] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    fullname :"",  'email':"", 'pwd':"", 'current_balance':0, 'funds_on_hold':0, 'withdrawable_balance':0, 'date_of_birth':"", 'country':"", 'company_name':"", 'account_number':0, 'btc_wallet':"", 'bank_name':"", 'swift':0, 'iban':0, beneficiary_name:"", beneficiary_address:"", contact_information:"", bank_address:""
  });
  

  const sendData = () => {
    let clientId = window.location.pathname.split("/")[3];
    axios
      .put("/backend/api/client/" +clientId, data)
      .then((res) => {
        navigate("/app/");
      })
      .catch((err) => {
      });
  };

  const resetPassword = () => {
    const email = data.email;
    axios
    .post("/backend/auth/forget-password", {email})
    .then((res) => {
      navigate("/app/");
    }
    )}

  useEffect(() => {
    let clientId = window.location.pathname.split("/")[3];
      axios
      .get("/backend/api/client/"+clientId)
      .then((res) => {
        setData(res.data[0]);
      })
      .catch((err) => {
      });

  }, []);


  return (
    <div className="single">
    <Sidebar />
    <div className="singleContainer">
      <Navbar />
      <div className="top">
        
      <form className="w-full max-w-lg">
      <h1 className="title">{t('Edit Info:')}</h1>

  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
       {t('Full Name')}
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" value={data.fullname} onChange={ (e)=>{e.preventDefault();  setData({
        ...data, 
        fullname: e.target.value
      });
      
      }}/>
    </div>
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
{t('Email')}      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="example@mail.com" value={data.email} onChange={ (e)=>{e.preventDefault();  setData({
        ...data, 
        email: e.target.value
      });
      
      }}/>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        {t('Reset Client Password')}
      </label>
      <button type="button" onClick={(e)=>{
        e.preventDefault();
        resetPassword()

      }} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{t('Send Reset Password link')} </button>

    </div>
  </div> 
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className=" md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
      {t("Company's Name")}
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="RST LTD" value={data.company_name} onChange={ (e)=>{e.preventDefault();  setData({
        ...data, 
        company_name: e.target.value
      });
      
      }}/>
    </div>
    <div className=" md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
 {t('Country of residence')}     </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="UK" value={data.country} onChange={ (e)=>{e.preventDefault();  setData({
        ...data, 
        country: e.target.value
      });
      
      }}/>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className=" md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
       {t('Contact Information')}
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="+44 XXXXXXXXX" value={data.contact_information} onChange={ (e)=>{e.preventDefault();  setData({
        ...data, 
        contact_information: e.target.value
      });
      
      }}/>
    </div>
   
  </div> 
  
  <button type="button" onClick={(e)=>{e.preventDefault() ; sendData()}} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{t('Update Infos')}</button>

</form>

<div> <div>  <button  onClick={(e)=>{e.preventDefault();setBtc(true)}} type="button" class="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mr-2 mb-2">
  <svg class="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="bitcoin" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.1-111 248-248 248S8 392.1 8 256 119 8 256 8s248 111 248 248zm-141.7-35.33c4.937-32.1-20.19-50.74-54.55-62.57l11.15-44.7-27.21-6.781-10.85 43.52c-7.154-1.783-14.5-3.464-21.8-5.13l10.93-43.81-27.2-6.781-11.15 44.69c-5.922-1.349-11.73-2.682-17.38-4.084l.031-.14-37.53-9.37-7.239 29.06s20.19 4.627 19.76 4.913c11.02 2.751 13.01 10.04 12.68 15.82l-12.7 50.92c.76 .194 1.744 .473 2.829 .907-.907-.225-1.876-.473-2.876-.713l-17.8 71.34c-1.349 3.348-4.767 8.37-12.47 6.464 .271 .395-19.78-4.937-19.78-4.937l-13.51 31.15 35.41 8.827c6.588 1.651 13.05 3.379 19.4 5.006l-11.26 45.21 27.18 6.781 11.15-44.73a1038 1038 0 0 0 21.69 5.627l-11.11 44.52 27.21 6.781 11.26-45.13c46.4 8.781 81.3 5.239 95.99-36.73 11.84-33.79-.589-53.28-25-65.99 17.78-4.098 31.17-15.79 34.75-39.95zm-62.18 87.18c-8.41 33.79-65.31 15.52-83.75 10.94l14.94-59.9c18.45 4.603 77.6 13.72 68.81 48.96zm8.417-87.67c-7.673 30.74-55.03 15.12-70.39 11.29l13.55-54.33c15.36 3.828 64.84 10.97 56.85 43.03z"></path></svg>
  {t('Enter Bitcoin Wallet Address')}
</button><button type="button" onClick={(e)=>{e.preventDefault();setBtc(false)}} class="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 mr-2 mb-2">
<img src={BankLogo}  class="w-4 h-4 mr-2 -ml-1" alt="React Logo" />

  {t('Enter Bank Account informations')}
</button> </div>
<div>{
  btc ?(     
    <form className="w-full max-w-lg">
    <h1 className="title">{t('Change User informations:')}</h1>


<div className="flex flex-wrap -mx-3 mb-6">
  <div className="w-full px-3">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
      {t('Bitcoin Wallet Address')}
    </label>
    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="BTC Wallet"   value={data.btc_wallet} onChange={ (e)=>{e.preventDefault();  setData({
        ...data, 
        btc_wallet: e.target.value
      });
      
      }}/>
  </div>
</div>



</form>): (     
      <form className="w-full max-w-lg">
      <h1 className="title">{t('Change client informations:')}</h1>

 
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        {t('Bank Name')}
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Barclays"  value={data.bank_name} onChange={ (e)=>{e.preventDefault();  setData({
        ...data, 
        bank_name: e.target.value
      });
      
      }}/>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        {t('Bank Address')}
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Street Address"  value={data.bank_address} onChange={ (e)=>{e.preventDefault();  setData({
        ...data, 
        bank_address: e.target.value
      });
      
      }}/>
    </div>
  </div><div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        SWIFT /BIC
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="SWIFT"  value={data.swift} onChange={ (e)=>{e.preventDefault();  setData({
        ...data, 
        swift: e.target.value
      });
      
      }} />
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        IBAN
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="IBAN"  value={data.iban} onChange={ (e)=>{e.preventDefault();  setData({
        ...data, 
        iban: e.target.value
      });
      
      }} />
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        {t('Beneficiary Name')}
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Full Name"  value={data.beneficiary_name} onChange={ (e)=>{e.preventDefault();  setData({
        ...data, 
        beneficiary_name: e.target.value
      });
      
      }}/>
    </div>
  </div><div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        {t('Beneficiary Address')}
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Street Address"  value={data.beneficiary_address} onChange={ (e)=>{e.preventDefault();  setData({
        ...data, 
        beneficiary_address: e.target.value
      });
      
      }}/>
    </div>
  </div>
 

</form>)
  }</div>
</div >   
      </div>
  
    </div>
  </div>
  
  );
};

export default ClientParams;