import Sidebar from "../../components/sidebar/sidebar"; 
import "./LogsPage.css"
import Navbar from "../../components/navbar/navbar";
import LogsTable from "../../components/logsTable/logsTable";
const LogsPage = () => {
  




  return (
    <div className="single">
      
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="singleTitleContainer">
        <LogsTable></LogsTable>    </div>
     
      </div>
    </div>
  );
};

export default LogsPage;