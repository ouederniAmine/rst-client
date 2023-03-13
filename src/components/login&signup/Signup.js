import { useState } from 'react';
import { signupFields } from "../../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);
  const navigate = useNavigate();

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    createAccount()
  }

  //handle Signup API Integration here
  const  createAccount = async ()=>{
    console.log(signupState)
  axios.post('/backend/api/new-user', signupState)
  .then((response) => {
    console.log(response)
    navigate('/login')
  }, (error) => {
    console.log(error);
  });
  }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
                  
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
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
          <FormAction handleSubmit={handleSubmit} text="Click Here to get your money back ! " />
        </div>

         

      </form>
    )
}

export default Signup;