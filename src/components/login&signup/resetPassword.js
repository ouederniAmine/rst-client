import {  useState } from 'react';
import { resetPwdFields } from "../../constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';

const fields=resetPwdFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function ResetPassword(){
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
        console.log(loginState.newPassword);
        authService.resetPassword(email ,  window.location.pathname.split("/")[3] ,loginState.newPassword)
  .then((e) => {
    console.log("change success", e);
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