import React from 'react'
import "./home.css"
import Sidebar from '../components/sidebar/sidebar';
import { useState, useEffect } from 'react';
import Navbar from '../components/navbar/navbar';
import Widget from '../components/widget/widget';
import Invoicetable from '../components/table/table';
import axios from 'axios';
import authService from '../services/auth.service';
export default function HomePage(){
        const [admin, setAdmin] = useState(false);
        const [data, setData] = useState({
            fullname :"",  'email':"", 'pwd':"", 'current_balance':0, 'funds_on_hold':0, 'withdrawable_balance':0, 'date_of_birth':"", 'country':"", 'company_name':"", 'account_number':0, 'btc_wallet':"", 'bank_name':"", 'swift':0, 'iban':0, beneficiary_name:"", beneficiary_address:"", contact_information:"", bank_address:""
          });
        //useEffect to check if user is admin
        useEffect(() => {
        console.log(authService.getCurrentUser());
            checkAdmin();
            axios
            .get("/backend/api/client/"+authService.getCurrentUser().userid)
            .then((res) => {
              setData(res.data[0]);
              console.log(res.data)
            })
            .catch((err) => {
              console.log(err);
            });
        }, []);
        

        //api call to check if user is admin
        const checkAdmin = async () => {
            const response = await fetch(`/backend/api/checkadmin/${authService.getCurrentUser().userid}`);
            const data = await response.json();
            console.log(data);
            if (data.isAdmin) {
                setAdmin(true);
            } else {
                setAdmin(false);
            }
        }
      
    return(
        <div className='home'>

        <Sidebar/>
    
        {
        (!admin) ? (<> <div className="homeContainer">
                <Navbar/>

                <div className='widgets'>
                    <Widget type='CurrentBalanace'/>
                    <Widget type='FundsonHold'/>
                    <Widget type='Withdraw'/>
                </div>
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
                        <span class="tracking-wide">About</span>
                    </div>
                    <div class="text-gray-700">
                        <div class="grid md:grid-cols-2 text-sm">
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">First Name</div>
                                <div class="px-4 py-2">{data.fullname}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Last Name</div>
                                <div class="px-4 py-2">{data.email}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">country</div>
                                <div class="px-4 py-2">{data.country}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">company_name</div>
                                <div class="px-4 py-2">{data.company_name}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">account_number</div>
                                <div class="px-4 py-2">{data.account_number}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Permanant Address</div>
                                <div class="px-4 py-2">{data.bank_address}</div>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
                </div>
                </div></>):
                 (<> <div className="homeContainer">
                <Navbar/>

                <div className='widgets'>
                    <Widget type='CurrentBalanace'/>
                    <Widget type='FundsonHold'/>
                    <Widget type='Withdraw'/>
                </div>
                <div className='listContainer'>
                    <div className='listTitle'>Latest Clients</div>
                    <Invoicetable></Invoicetable>
                </div>
                </div></>)
}
           
        </div>
    )
}