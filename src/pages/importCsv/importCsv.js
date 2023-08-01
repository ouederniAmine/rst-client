import "./importCsv.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import axios from "axios";
import { useTranslation } from 'react-i18next';

import { useState} from "react";
import {
  useCSVReader,
  lightenDarkenColor,
  formatFileSize,
} from 'react-papaparse';
import { useNavigate } from "react-router";

const GREY = '#CCC';
const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)';
const DEFAULT_REMOVE_HOVER_COLOR = '#A01919';
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40
);
const GREY_DIM = '#686868';

const styles = {
  zone: {
    alignItems: 'center',
    border: `2px dashed ${GREY}`,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    padding: 20,
  } ,
  file: {
    background: 'linear-gradient(to bottom, #EEE, #DDD)',
    borderRadius: 20,
    display: 'flex',
    height: 120,
    width: 120,
    position: 'relative',
    zIndex: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  } ,
  info: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  } ,
  size: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    marginBottom: '0.5em',
    justifyContent: 'center',
    display: 'flex',
  } ,
  name: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    fontSize: 12,
    marginBottom: '0.5em',
  } ,
  progressBar: {
    bottom: 14,
    position: 'absolute',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  } ,
  zoneHover: {
    borderColor: GREY_DIM,
  } ,
  default: {
    borderColor: GREY,
  } ,
  remove: {
    height: 23,
    position: 'absolute',
    right: 6,
    top: 6,
    width: 23,
  },
};
const ImportCsv = ({ inputs, title }) => {
  // get data from variable api endpoint
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [removeHoverColor, setRemoveHoverColor] = useState(
    DEFAULT_REMOVE_HOVER_COLOR
  );
  const { t, i18n } = useTranslation();

    const [data, setData] = useState([[]]);
  
    const navigate = useNavigate();
    const sendData = () => {
      axios.post("/backend/api/add-csv", data)
      .then((res) => {
        navigate("/app/clients/");
      })
      .catch((err) => {

      });
    };
    


  return (
    <div className="single">
    <Sidebar />
    <div className="singleContainer">
      <Navbar />
      <div className="top">
      <div className="left">
          <div className='listContainer'>
          <h1 className="title " style={{"color":"black"}}>{t('Add Multiple Clients using CSV:')}</h1>
      <CSVReader
      config={{
        header: true,
        skipEmptyLines: true,
      }}
  onUploadAccepted={(results) => {

    setData(results.data);
    setZoneHover(false);
  }}
  onDragOver={(event) => {
    event.preventDefault();
    setZoneHover(true);
  }}
  onDragLeave={(event) => {
    event.preventDefault();
    setZoneHover(false);
  }}
  
>
  {({
    getRootProps,
    acceptedFile,
    ProgressBar,
    getRemoveFileProps,
    Remove,
  }) => (
    <>
      <div
        {...getRootProps()}
        style={Object.assign(
          {},
          styles.zone,
          zoneHover && styles.zoneHover
        )}
      >
        {acceptedFile ? (
          <>
            <div style={styles.file}>
              <div style={styles.info}>
                <span style={styles.size}>
                  {formatFileSize(acceptedFile.size)}
                </span>
                <span style={styles.name}>{acceptedFile.name}</span>
              </div>
              <div style={styles.progressBar}>
                <ProgressBar />
              </div>
              <div
                {...getRemoveFileProps()}
                style={styles.remove}
                onMouseOver={(event) => {
                  event.preventDefault();
                  setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                }}
                onMouseOut={(event) => {
                  event.preventDefault();
                  setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                }}
              >
                <Remove color={removeHoverColor} />
              </div>
            </div>
          </>
        ) : (
          t('Drop CSV file here to upload')
        )}
      </div>
    </>
  )}
</CSVReader>
<div className="flex flex-wrap -mx-3 mb-6"><button type="button" onClick={(e)=>{e.preventDefault() ; sendData()}} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{t('Send Data')}</button>
</div>
</div></div>
      </div>
  
    </div>
  </div>
  
  );
};

export default ImportCsv;