
import "./navbar.css";
import { InputLabel } from '@mui/material';

import { MenuItem } from '@mui/material';

import { FormControl } from '@mui/material';
import { Select } from '@mui/material';
import { useEffect } from "react";
import SaudiArabia from "../../assets/saudi-arabia.png";
import UK from "../../assets/united-kingdom.png";
import React from "react";
import { useTranslation } from 'react-i18next';

const countries = [
  {
    label: "English",
    src: UK,
    link: " ",
    value: "LTR"
  },
  {
    label: "Arabic",
    src: SaudiArabia,
    link: " ",
    value: "RTL"
  }
];

const Navbar = () => {
  const [country, setCountry] = React.useState(UK);
  const { i18n} = useTranslation();
useEffect(() => {
  if (i18n.language === "ar" ) {
    setCountry(SaudiArabia);
    document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");
  }
}, [i18n.language])
  
  const [open, setOpen] = React.useState(false);

  const handleChange = event => {
    setCountry(event.target.value);

    if (event.target.value === SaudiArabia ) {
      i18n.changeLanguage("ar");
      document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");

    }else{
      i18n.changeLanguage("en");
      document.getElementsByTagName('html')[0].setAttribute("dir", "ltr");

    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
 
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
        </div>
        <div className="items">
          <div className="item">
          <form autoComplete="off">
      <FormControl >
        <InputLabel htmlFor="open-select" />
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={country}
          name="country"
          onChange={handleChange}
          inputProps={{
            id: "open-select"
          }}
          style={{ width:"100px", height:"50px", display:"flex", alignItems:"center", justifyContent:"center"}}
        >
          {countries.map((option, key) => (
            <MenuItem value={option.src} name={option.label} key={key}>
              <img src={option.src} alt={option.label} style={{width:"30px", margin:"0 5px"}}/><h3>{option.label}</h3>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
          </div>
       
        </div>
      </div>
    </div>
  );
};

export default Navbar;