import "./logsTable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import React from "react";
import { useState  , useEffect} from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next';
const LogsTable = (props) => {
  const [data, setData] = useState([]);
  

  const { t, i18n } = useTranslation();

  useEffect(() => {
      axios
      .get("/backend/api/login-logs")
      .then((res) => {
        let data = [];
        let newData = {
          id:0,
          username:"", 
          userid:0,
          time:""

        }
          //foreach element in res.data get the id and name and email and currentBalance and put it in newData array
        res.data.map(element => {
          newData.id = element.id;
          newData.username = element.username;
          newData.userid = element.userid;
          newData.time = element.time;
       
          data.push(newData);
          //reset newData
          newData = { 
            id:0,
            username:"",
            userid:0,
            time:""
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
      field: "username",
      headerName:   t('Client Name')      ,
      width: 230,
    },
  
    
    {
      field: "userid",
      headerName: t("User ID"),
      width: 200,
    },
    {
      field: "time",
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
            <Link to={"/app/clients/"+params.row.userid }style={{ textDecoration: "none" }}>
              <div className="viewButton">{t("View Client")}</div>
            </Link>
            
           
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
 <div className="datatableTitle">
         {t('Login Log')}
  
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

export default LogsTable;