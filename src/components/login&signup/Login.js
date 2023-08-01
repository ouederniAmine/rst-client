import {  useState } from 'react';
import { loginFields } from "../../constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import axios from 'axios';
import { useTranslation } from 'react-i18next';



export default function Login()
{
    const { t, i18n } = useTranslation();

    const fields=[
    {
        labelText:t("Email address"),
        labelFor:"email-address",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:t("Email address")  
    },
    {
        labelText:t("Password"),
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:t("Password")   
    }
]




let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');
    const [loginState,setLoginState]=useState(fieldsState);
    const navigate = useNavigate();

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }
    

    //Handle Login API Integration here
    const authenticateUser = () =>{
        authService.login(loginState.email, loginState.password)
  .then((e) => {
    const currentDateAndTime = new Date();
                const options = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                    timeZoneName: 'short'
                };

                const formattedDateAndTime = currentDateAndTime.toLocaleString(undefined, options);
                // post request  to backend/api/login-logs with username , date , userid in body
                const userId = authService.getCurrentUser();
                // get username from axios
                axios.get(`/backend/api/client/${userId.userid}` 
                    )   .then((res) => {
                        //check if user is admin
                        
                        axios.get(`/backend/api/checkadmin/${userId.userid}`
                        ).then((response) => {
                            if(!response.data.isAdmin){
                                axios.post(`/backend/api/login-logs/`, {
                                    username: res.data[0].fullname,
                                    date: formattedDateAndTime,
                                    userid: userId.userid,
                                }
                                ).then((res) => {
                                
                                }
                                ).catch((err) => {
                                }
                                );
                            }})
                       
                    }
                    ).catch((err) => {
                    }
                    );

                
    navigate("/app");

  })
  .catch((error) => {
    alert("Wrong email or password");
  });
    }

   
    return(<div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
        </div>
        <FormAction handleSubmit={handleSubmit} text={t("Login")}/>

       

      </form>
       <button
                
       className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600  hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 mt-10"
       onClick={()=>window.location.replace('https://recovery-advisers.net/')
       }  
   >

      {t("Back to Home")} 
   </button></div>
    )   
}