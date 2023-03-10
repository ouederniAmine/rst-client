import "./clientsTable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import React from "react";
import { useState  , useEffect} from "react";
import axios from "axios";
const ClientsTable = (props) => {
  const [data, setData] = useState([]);
  


  useEffect(() => {
      axios
      .get("http://localhost:3001/api/clients")
      .then((res) => {
        let data = [];
        let newData = {
          id:0,
          fullname:"", 
          email:"",
          current_balance:"",
          funds_on_hold: "",
          withdrawable_balance: ""
        }
          //foreach element in res.data get the id and name and email and currentBalance and put it in newData array
        res.data.map(element => {
          newData.id = element.id;
          newData.fullname = element.fullname;
          newData.email = element.email;
          newData.current_balance = element.current_balance;
          newData.funds_on_hold = element.funds_on_hold;
          newData.withdrawable_balance = element.withdrawable_balance;
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
      headerName: "Client Name",
      width: 230,
    },
  
    {
      field: "email",
      headerName: "Client Email",
      width: 200,
    },
    {
      field: "current_balance",
      headerName: "Current Balance",
      width: 200,
    },
    {
      field: "funds_on_hold",
      headerName: "Funds On Hold",
      width: 200,
    },
    {
      field: "withdrawable_balance",
      headerName: "Withdrawable Balance",
      width: 200,
    }
   
  ];
  
  const handleDelete = (id) => {
    //delete invoice from database
    axios
      .delete("http://localhost:3001/api/client/" + id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
      
    setData(data.filter((item) => item.id !== id));
  };
  console.log(window.location.href.split("/").pop()+"/new");

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={"/app/clients/"+params.row.id }style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <Link to={"/app/clients/edit/"+params.row.id }style={{ textDecoration: "none" }}>
              <div className="viewButton">Edit</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
 <div className="datatableTitle">
         Clients
         <Link to={ "new"} className="link">
          Add New
        </Link>
        
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