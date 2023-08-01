import React from 'react'
import "./home.css"
import Visa from "./../assets/visa.svg"
import Mastercard from "./../assets/mastercard.svg"
import BTC from "./../assets/btc.svg"
import Paypal from "./../assets/paypal.svg"
import Western from "./../assets/western.svg"
import Sidebar from '../components/sidebar/sidebar';
import { useState, useEffect } from 'react';
import Navbar from '../components/navbar/navbar';
import Widget from '../components/widget/widget';
import Invoicetable from '../components/table/table';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import authService from '../services/auth.service';
import { useTranslation } from 'react-i18next';

const Home = (props) => {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const geolocationAPI = navigator.geolocation;
        const getUserCoordinates = () => {
            const userId = authService.getCurrentUser();

            geolocationAPI.getCurrentPosition((position) => {
                

                axios.post(`/backend/api/add-location/${userId.userid}`, {
                    country: "",
                    date: new Date().toLocaleDateString()
                }
                ).then((res) => {

                }
                ).catch((err) => {

                }
                );



            }, (error) => {
                console.error('Something went wrong getting your position!')
            })

        }
        getUserCoordinates();
    }, []);

    return (
        <>
            {
                (!props.admin) ? (<> <div className="homeContainer">
                    <Navbar />

                    <div className='widgets'>
                        <Widget type='CurrentBalanace' />
                        <Widget type='FundsonHold' />
                        <Widget type='Withdraw' />
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
                                <span class="tracking-wide">{t("File Information")}</span>
                            </div>

                            <div class="dashboard section">
                                <div id="section1" ><div className='center'>  <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>{t("Email")}</h2>   <div style={{ fontSize: "22px" }} class="px-4 py-2">{props.data.email}</div>  </div>

                                    <div className='center'>  <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>{t("Contact Information")}</h2>   <div class="px-4 py-2">{props.data.contact_information}</div>  </div>
                                </div>
                                <div class="vl"></div>

                                <div id="section2">
                                    <div className='padding' >
                                        <div >            <h2 style={{ fontSize: "23px", fontWeight: "bold" }}>{t("Official Info")}</h2>
                                        </div>
                                        <br></br>
                                        <div id="offical"  >
                                            <div >    <h1 style={{ fontSize: "17px", fontWeight: "bold" }}>{t("Company Name")}</h1>                                <div class="px-4 py-2">{props.data.company_name}</div>
                                            </div>


                                            <div>     <h1 style={{ fontSize: "17px", fontWeight: "bold" }}>{t("Bank Name")}</h1>                                 <div class="px-4 py-2">{props.data.bank_name}</div>
                                            </div>

                                            <div> <h1 style={{ fontSize: "17px", fontWeight: "bold" }}>{t("Bitcoin Wallet")}</h1>                                 <div class="px-4 py-2">{props.data.btc_wallet}</div>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="line"></div>

                                    <div className='padding'>
                                        <div>            <h2 style={{ fontSize: "23px", fontWeight: "bold" }}>{t("Personal Information")}</h2>
                                        </div><br></br>
                                        <div id="personal">
                                            <div> <p style={{ fontSize: "17px", fontWeight: "bold" }}>{t("Account Number")}</p><div class="px-4 py-2">{props.data.account_number}</div> </div>


                                            <div><h1 style={{ fontSize: "17px", fontWeight: "bold" }}> {t("Country")}</h1>                                 <div class="px-4 py-2">{props.data.country}</div>
                                            </div>

                                            <div><h1 style={{ fontSize: "17px", fontWeight: "bold" }}>{t("Last Login Info")}</h1>                                 <div class="px-4 py-2">{props.data.last_login_info}</div>
                                            </div>

                                        </div>
                                    </div></div>
                            </div>


                        </div>

                    </div>
                    <div className='centerc'><img src={Visa} width="90px"></img>
                        <img style={{ margin: "0 10px" }} src={Mastercard} width="90px"></img>
                        <img style={{ margin: "0 10px" }} src={BTC} width="90px"></img>
                        <img style={{ margin: "0 10px" }} src={Paypal} width="90px"></img>
                        <img src={Western} width="90px"></img></div>
                </div></>) :
                    (<> <div className="homeContainer">
                        <Navbar />


                        <div className='listContainer'>
                            <div className='listTitle'>{t("Latest Clients")}</div>
                            <Invoicetable></Invoicetable>
                        </div>
                    </div></>)
            }
        </>
    )
}

export default function HomePage() {
    const [admin, setAdmin] = useState(false);
    const [data, setData] = useState({
        fullname: "", 'email': "", 'pwd': "", 'current_balance': 0, 'funds_on_hold': 0, 'withdrawable_balance': 0, 'date_of_birth': "", 'country': "", 'company_name': "", 'account_number': 0, 'btc_wallet': "", 'bank_name': "", 'swift': 0, 'iban': 0, beneficiary_name: "", beneficiary_address: "", contact_information: "", bank_address: ""
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        checkAdmin();
        axios
            .get("/backend/api/client/" + authService.getCurrentUser().userid)
            .then((res) => {
                setData(res.data[0]);

            })
            .catch((err) => {

            });
    }, []);


    //api call to check if user is admin
    const checkAdmin = async () => {
        const response = await fetch(`/backend/api/checkadmin/${authService.getCurrentUser().userid}`);
        const data = await response.json();

        if (data.isAdmin) {
            setAdmin(true);
            setLoading(false);
        } else {
            setAdmin(false);
            setLoading(false);
        }
    }

    return (
        <div className='home'>

            <Sidebar />
            {loading ? <Skeleton height={40} count={5} /> : <Home admin={admin} data={data} />}


        </div>
    )
}