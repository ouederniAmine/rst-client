import "./newAdmin.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useTranslation } from 'react-i18next';


const NewAdmin = ({ inputs, title }) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [data, setData] = useState({
    password:"", email:""
  });

  const sendData = () => {

    axios
      .post("/backend/api/add-admin", data)
      .then((res) => {
        navigate("/app/clients");

      })
      .catch((err) => {

      });
  };

 

  return (
    <div className="single">
    <Sidebar />
    <div className="singleContainer">
      <Navbar />
      <div className="top">
        
      <form className="w-full max-w-lg">
      <h1 className="title"> { t('Add New Admin:')}</h1>

  <div className="flex flex-wrap -mx-3 mb-6">
   
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
  { t('Email')}    </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="example@mail.com" value={data.email} onChange={ (e)=>{e.preventDefault();  setData({
        ...data, 
        email: e.target.value
      });
      
      }}/>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
       { t('Admin  Password')} 
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="************"  onChange={ (e)=>{e.preventDefault();  setData({
        ...data, 
        password: e.target.value
      });
      
      }}  />
    </div>
    
   
    
  </div>
  

  <div className="flex flex-wrap -mx-3 mb-6">
 
   
<br></br>
    <button type="button" onClick={(e)=>{e.preventDefault() ; sendData()}} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{t("Add Admin")}</button>
  </div> 

</form>


      </div>
  
    </div>
  </div>
  
  );
};

export default NewAdmin;