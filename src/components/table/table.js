import "./table.css";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useState  , useEffect} from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next';

const Table = (props) => {
  const [data, setData] = useState([]);
  
  const { t } = useTranslation();


  useEffect(() => {
    axios
    .get("/backend/api/clients")
    .then((res) => {
      let data = [];
      let newData = {
        id:0,
        fullname:"", 
        email:"",
        current_balance:"",
        funds_on_hold: "",
        withdrawable_balance: "",
        contact_information: ""
      }
        //foreach element in res.data get the id and name and email and currentBalance and put it in newData array
      res.data.forEach(element => {
        newData.id = element.id;
        newData.fullname = element.fullname;
        newData.email = element.email;
        newData.current_balance = element.current_balance;
        newData.funds_on_hold = element.funds_on_hold;
        newData.withdrawable_balance = element.withdrawable_balance;
        newData.contact_information = element.contact_information;
        //push newData to data array
        data.push(newData);
        //reset newData
        newData = {
          id:0,
          fullname:"",
          email:"",
          currentBalance:""
        }
      }); 
      setData(data);
    })
    .catch((err) => {
    });

}, []);

const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  
  {
    field: "fullname",
    headerName:   t('Client Name')      ,
    width: 230,
  },

  {
    field: "email",
    headerName: t("Client Email"),
    width: 200,
  },
  {
    field: "current_balance",
    headerName: t("Current Balance"),
    width: 200,
  },
  {
    field: "funds_on_hold",
    headerName: t("Funds On Hold"),
    width: 200,
  },
  {
    field: "withdrawable_balance",
    headerName: t("Withdrawable Balance"),
    width: 200,
  }
  ,
  {
    field: "last_login_info",
    headerName: t("Last Login Info"),
    width: 200,
  }
 
];
  
  return (
    <div className="datatable " style={{ height: 550, width: '100%' }}> 
 <div className="datatableTitle " >
 {t('Clients')}
      </div>
       
       <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns }
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Table;