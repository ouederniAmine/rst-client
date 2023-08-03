import {  useState } from 'react';
import FormAction from "./FormAction";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';

export default function ResetPassword(){



let fieldsState = {};

    const fields=[
        {
            labelText:"New Password",
            labelFor:"new-Password",
            id:"newPassword",
            name:"password",
            type:"password",
            autoComplete:"password",
            isRequired:true,
            placeholder:"Password"   
        },
        {
            labelText:"Confirm Password",
            labelFor:"confirm-password",
            id:"confirm-password",
            name:"password",
            type:"password",
            autoComplete:"confirm-password",
            isRequired:true,
            placeholder:"Confirm Password"   
        }
    ]
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
      let email = window.location.pathname.split("/")[2];
        authService.resetPassword(email ,  window.location.pathname.split("/")[3] ,loginState.newPassword)
  .then((e) => {
    navigate("/app");
    }

  )}   
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
        <FormAction handleSubmit={handleSubmit} text="Reset" />

       

      </form>
       </div>
    )   
}