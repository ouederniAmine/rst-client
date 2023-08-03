import "./clientsTable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import React from "react";
import { useState  , useEffect} from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next';
const ClientsTable = (props) => {
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
          last_login_info: ""

        }
          //foreach element in res.data get the id and name and email and currentBalance and put it in newData array
        res.data.map(element => {
          newData.id = element.id;
          newData.fullname = element.fullname;
          newData.email = element.email;
          newData.current_balance = element.current_balance;
          newData.funds_on_hold = element.funds_on_hold;
          newData.withdrawable_balance = element.withdrawable_balance;
          newData.last_login_info = element.last_login_info;
          //push newData to data array
          data.push(newData);
          //reset newData
          newData = {
            id:0,
            fullname:"",
            email:"",
            currentBalance:""
          }
      return newData;  }); 
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
  
  const handleDelete = (id) => {
    //delete invoice from database
    axios
      .delete("/backend/api/client/" + id)
      .then((res) => {
      })
      .catch((err) => {
      });
      
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: t("Action"),
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={"/app/clients/"+params.row.id }style={{ textDecoration: "none" }}>
              <div className="viewButton">{t("View")}</div>
            </Link>
            <Link to={"/app/clients/edit/"+params.row.id }style={{ textDecoration: "none" }}>
              <div className="viewButton">{t('Edit')}</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              {t("Delete")}
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
 <div className="datatableTitle">
         {t('Clients')}
         <div>
         <Link to={ "new"} className="link">
          {t('Add New User')}
        </Link>

        <Link to={ "csv"} className="link">
          {t('Import CSV')}
        </Link></div>
      </div>
       
       
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default ClientsTable;