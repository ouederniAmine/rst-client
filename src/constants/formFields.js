// this file will hold all the input fields related constants (placeholder, value, name)

const loginFields=[
    {
        labelText:"Email address",
        labelFor:"email-address",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password"   
    }
]
const resetPwdFields=[
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


const signupFields=[
    {
        labelText:"Full Name",
        labelFor:"fullname",
        id:"fullname",
        name:"fullname",
        type:"text",
        autoComplete:"name",
        isRequired:true,
        placeholder:"Full Name"   
    },
    {
        labelText:"Email address",
        labelFor:"email-address",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"   
    },
    {
        labelText:"Phone Number",
        labelFor:"phone_number",
        id:"phone_number",
        name:"phone_number",
        type:"tel",
        autoComplete:"phone_number",
        isRequired:true,
        placeholder:"Phone Number"   
    },
    {
        labelText:"Country",
        labelFor:"country",
        id:"country",
        name:"country",
        type:"text",
        autoComplete:"country",
        isRequired:true,
        placeholder:"Country"   
    },
    {
        labelText:"Name of Company that scammed you",
        labelFor:"company_name",
        id:"company_name",
        name:"company_name",
        type:"text",
        autoComplete:"company_name",
        isRequired:true,
        placeholder:"Company Name"   
    },
    {
        labelText:"Description",
        labelFor:"description",
        id:"description",
        name:"description",
        type:"text",
        autoComplete:"description",
        isRequired:true,
        placeholder:"Description"   
    },
    {
        labelText:"Amount Lost",
        labelFor:"amount_lost",
        id:"amount_lost",
        name:"amount_lost",
        type:"text",
        autoComplete:"amount_lost",
        isRequired:true,
        placeholder:"Amount Lost"   
    }
]

export {loginFields,signupFields , resetPwdFields}