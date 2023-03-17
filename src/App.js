import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import PrivateRoute from './services/PrivateRoute';
import ClientsPage from './pages/ClientsPage';
import EditUser from './pages/editUser/editUser';
import Single from './pages/single/single';
import ResetPasswordPage from './pages/resetPassword/resetPasswordPage';
import NewUser from './pages/newUser/newUser';
import ImportCsv from './pages/importCsv/importCsv';
import ClientParams from './pages/clientParams/clientParams';
export default function App() {
  return (
   
 

     <BrowserRouter>
        <Routes>
        <Route element={<PrivateRoute/>}>
            <Route path="/app" element={<HomePage />} />
            <Route
                path="app/settings/:userId"
                element={<ClientParams/>}
              />
            <Route path="/app/clients">
              
              <Route index element={<ClientsPage />} />
              <Route
                path="edit/:userId"
                element={<EditUser />}
              />
                
              <Route
                path="new"
                element={<NewUser  />}/>
                <Route
                path="csv"
                element={<ImportCsv  />}/>
              <Route path=":userId" element={<Single />} /></Route> 
          </Route>  
          <Route index path="/"   />
              <Route  path="/login" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route exact path="/reset-password/:id/:token" element={<ResetPasswordPage/>} />
        </Routes>
        
      </BrowserRouter>
 
  );
}

