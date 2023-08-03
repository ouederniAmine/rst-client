import { useState } from 'react';
import FormAction from "./FormAction";
import Input from "./Input";
import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';


function Signup(){
  const { t } = useTranslation();
  const fields=[
    {
        labelText:"Full Name",
        labelFor:"fullname",
        id:"fullname",
        name:"fullname",
        type:"text",
        autoComplete:"name",
        isRequired:true,
        placeholder:t("Full Name")   
    },
    {
        labelText:"Email address",
        labelFor:"email-address",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:t("Email address")   
    },
    {
        labelText:"Phone Number",
        labelFor:"phone_number",
        id:"phone_number",
        name:"phone_number",
        type:"tel",
        autoComplete:"phone_number",
        isRequired:true,
        placeholder:t("Phone Number")   
    },
    {
        labelText:"Country",
        labelFor:"country",
        id:"country",
        name:"country",
        type:"text",
        autoComplete:"country",
        isRequired:true,
        placeholder:t("Country")   
    },
    {
        labelText:"Name of Company that scammed you",
        labelFor:"company_name",
        id:"company_name",
        name:"company_name",
        type:"text",
        autoComplete:"company_name",
        isRequired:true,
        placeholder:t("Company Name")   
    },
    {
        labelText:"Description",
        labelFor:"description",
        id:"description",
        name:"description",
        type:"text",
        autoComplete:"description",
        isRequired:true,
        placeholder:t("Description")   
    },
    {
        labelText:"Amount Lost",
        labelFor:"amount_lost",
        id:"amount_lost",
        name:"amount_lost",
        type:"text",
        autoComplete:"amount_lost",
        isRequired:true,
        placeholder:t("Amount Lost")   
    }
]
;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');
  const [signupState,setSignupState]=useState(fieldsState);
  const navigate = useNavigate();

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    createAccount()
  }

  //handle Signup API Integration here
  const  createAccount = async ()=>{
  axios.post('/backend/api/new-user', signupState)
  .then((response) => {
    navigate('/login')
  }, (error) => {

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
          <FormAction handleSubmit={handleSubmit} text={t("Click Here to get your money back !")} />
        </div>

         

      </form>
    )
}

export default Signup;