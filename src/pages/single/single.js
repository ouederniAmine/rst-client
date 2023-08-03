import "./single.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next';

import { useNavigate } from "react-router";
const Single = () => {
  const { t } = useTranslation();

  const [data, setData] = useState({
    id: 0,
    email: "",
    phone: "",
    date: "",
    pdflink: ""
  });
  const navigate = useNavigate();

  const deleteUser = () => {
    let clientId = window.location.pathname.split("/")[3];
    axios.delete("/backend/api/client/" + clientId)
      .then((res) => {

        navigate("/app/clients/");
      })
      .catch((err) => {

      });

  }

  useEffect(() => {
    let clientId = window.location.pathname.split("/")[3];
    axios
      .get("/backend/api/client/" + clientId)
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
          <div className="left">
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
                  <div id="section1" >
                    <div className='center'>  <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>{t("Full Name")}</h2>   <div style={{ fontSize: "22px" }} class="px-4 py-2">{data.fullname}</div>  </div>
                    <div className='center'>  <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>{t("Last Login Info")}</h2>   <div class="px-4 py-2">{data.last_login_info}</div>  </div>
                  </div>

                  <div id="section2">
                    <div className='padding' >
                      <div >            <h2 style={{ fontSize: "23px", fontWeight: "bold" }}>{t("Official Info")}</h2>
                      </div>
                      <br></br>
                      <div id="offical"  >
                       <div>     <h1 style={{ fontSize: "17px", fontWeight: "bold" }}>{t("Account Number")}</h1>                                 <div class="px-4 py-2">{data.account_number}</div>
                        </div>
                         <div >    <h1 style={{ fontSize: "17px", fontWeight: "bold" }}>{t("Email")}</h1>                                <div class="px-4 py-2">{data.email}</div>
                        </div>


                        

                        <div>     <h1 style={{ fontSize: "17px", fontWeight: "bold" }}>{t("Contact Information")}</h1>                                 <div class="px-4 py-2">{data.contact_information}</div>
                        </div>


                        

                      </div>
                    </div>
                    <div class="line"></div>

                    <div className='padding'>
                      <div>            <h2 style={{ fontSize: "23px", fontWeight: "bold" }}>{t("Personal Information")}</h2>
                      </div><br></br>
                      <div id="personal">
                        <div> <p style={{ fontSize: "17px", fontWeight: "bold" }}>{t("Beneficiary Name")}</p><div class="px-4 py-2">{data.beneficiary_name}</div> </div>


                        <div><h1 style={{ fontSize: "17px", fontWeight: "bold" }}> {t("Beneficiary Address")}</h1>                                 <div class="px-4 py-2">{data.beneficiary_address}</div>
                        </div>
                       

                        
                        <div><h1 style={{ fontSize: "17px", fontWeight: "bold" }}> {t("Country")}</h1>                                 <div class="px-4 py-2">{data.country}</div>
                        </div>


                      </div>
                    </div><div class="line"></div>

                    <div className='padding'>
                      <div>            <h2 style={{ fontSize: "23px", fontWeight: "bold" }}>{t("Financial Information")}</h2>
                      </div><br></br>
                      <div id="personal">

                        <div><h1 style={{ fontSize: "17px", fontWeight: "bold" }}> {t("Bitcoin Wallet")}</h1>                                 <div class="px-4 py-2">{data.btc_wallet}</div>
                        </div>
                        <div><h1 style={{ fontSize: "17px", fontWeight: "bold" }}> {t("Funds On Hold")}</h1>                                 <div class="px-4 py-2">{data.funds_on_hold}</div>
                        </div>
                        <div><h1 style={{ fontSize: "17px", fontWeight: "bold" }}> {t("Current Balance")}</h1>                                 <div class="px-4 py-2">{data.current_balance}</div>
                        </div>

                        <div><h1 style={{ fontSize: "17px", fontWeight: "bold" }}> {t("Withdrawable Balance")}</h1>                                 <div class="px-4 py-2">{data.withdrawable_balance}</div>
                        </div>



                      </div>
                    </div>
                    <div class="line"></div>

                    <div className='padding'>
                      <div>            <h2 style={{ fontSize: "23px", fontWeight: "bold" }}>{t("Banking Information")}</h2>
                      </div><br></br>
                      <div id="personal">
                        <div> <p style={{ fontSize: "17px", fontWeight: "bold" }}>{t("Bank Name")}</p><div class="px-4 py-2">{data.bank_name}</div> </div>


                        <div><h1 style={{ fontSize: "17px", fontWeight: "bold" }}> {t("Bank Address")}</h1>                                 <div class="px-4 py-2">{data.bank_address}</div>
                        </div>
                        <div><h1 style={{ fontSize: "17px", fontWeight: "bold" }}> {t("Swift")}</h1>                                 <div class="px-4 py-2">{data.swift}</div>
                        </div>

                        <div><h1 style={{ fontSize: "17px", fontWeight: "bold" }}> {t("IBAN")}</h1>                                 <div class="px-4 py-2">{data.iban}</div>
                        </div>
                      


                      </div>
                    </div></div>
                </div>
          


            <button onClick={(e) => {
              e.preventDefault();
              deleteUser();

            }} type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{t("Delete User")}</button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Single;