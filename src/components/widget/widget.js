import "./widget.css";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import axios from "axios";
import { useEffect, useState } from "react";
import authService from "../../services/auth.service";
import { useTranslation } from 'react-i18next';

const Widget = ({ type }) => {
  let data = {} ;
  const { t, i18n } = useTranslation();

  
  
  const [apidata, setApiData] = useState({
    fullname :"",  'email':"", 'pwd':"", 'current_balance':0, 'funds_on_hold':0, 'withdrawable_balance':0, 'date_of_birth':"", 'country':"", 'company_name':"", 'account_number':0, 'btc_wallet':"", 'bank_name':"", 'swift':0, 'iban':0, beneficiary_name:"", beneficiary_address:"", contact_information:"", bank_address:""
  });
  useEffect(() => {
        axios
        .get("/backend/api/client/"+authService.getCurrentUser().userid)
        .then((res) => {
          setApiData(res.data[0]);
        })
        .catch((err) => {
        });
    }, []);


  switch (type) {
    case "CurrentBalanace":
      data = {
        title:
        t('Current Balanace'),
        isMoney: false,
        
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "FundsonHold":
      data = {
        title: t("Funds on Holds"),
        isMoney: false,
        link: "View all invoices",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "Withdraw":
      data = {
        title: t("Withdrawable Balance"),
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
  
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter" style={{fontWeight:"bold"}}>
          {data.title === "Current Balanace" ? apidata.current_balance : data.title === "Funds on Hold" ? apidata.funds_on_hold : apidata.withdrawable_balance}.00
        </span>
      </div>
      <div className="right">
        
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;