import Sidebar from "../components/sidebar/sidebar"; 
import "./clientsPage.css"
import Navbar from "../components/navbar/navbar";
import ClientsTable from "../components/clientsTable/clientsTable";
const ClientsPage = () => {
  




  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="singleTitleContainer">
        <ClientsTable></ClientsTable>    </div>
     
      </div>
    </div>
  );
};

export default ClientsPage;