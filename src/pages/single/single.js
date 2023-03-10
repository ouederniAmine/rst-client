import "./single.css";
import Sidebar from "../../components/sidebar/sidebar"; 
import Navbar from "../../components/navbar/navbar";
import { useState ,  useEffect} from "react";
import axios from "axios";
const Single = () => {
  const [data, setData] = useState({
    id:0,
    email:"", 
    phone:"",
    date:"",
    pdflink:""
  });

  useEffect(() => {
    let clientId = window.location.pathname.split("/")[3];
      axios
      .get("/backend/api/client/"+clientId)
      .then((res) => {
        setData(res.data[0]);
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);


  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Client Informations</h1>
            <div className="item">
              
              <div className="details">
              <div className="detailItem">
                  <span className="itemKey">Client Name:</span>
                  <span className="itemValue">{data.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Date:</span>
                  <span className="itemValue"></span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue"></span>
                </div>
             
                <button className="linkbu">Delete User</button>
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default Single;