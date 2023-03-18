
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";

import "./navbar.css";

const Navbar = () => {

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
       
        </div>
      </div>
    </div>
  );
};

export default Navbar;