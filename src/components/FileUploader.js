"use client"
import React, { useState, CSSProperties } from 'react';
import * as xlsx from 'xlsx'
import {
  useCSVReader,
  lightenDarkenColor,
  formatFileSize,
  usePapaParse
} from 'react-papaparse';
import DragAndDrop from './TextComp';

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
      width:"25rem",
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      padding: 20,
      cursor:"pointer"
    },
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
    },
    info: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: 10,
      paddingRight: 10,
    },
    size: {
      backgroundColor: GREY_LIGHT,
      borderRadius: 3,
      marginBottom: '0.5em',
      justifyContent: 'center',
      display: 'flex',
    },
    name: {
      backgroundColor: GREY_LIGHT,
      borderRadius: 3,
      fontSize: 12,
      marginBottom: '0.5em',
    },
    progressBar: {
      bottom: 14,
      position: 'absolute',
      width: '100%',
      paddingLeft: 10,
      paddingRight: 10,
    },
    zoneHover: {
      borderColor: GREY_DIM,
    },
    default: {
      borderColor: GREY,
    },
    remove: {
      height: 23,
      position: 'absolute',
      right: 6,
      top: 6,
      width: 23,
    },
  };
  
  export default function FileUploader({setDataObject}) {
  const convertToJson=(csvArray)=>{
    console.log(csvArray)
    const headers = csvArray[0];
    const data = csvArray.slice(1);
  
    const result = data.map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });
    console.log(result)
    setDataObject(result);
  }
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [removeHoverColor, setRemoveHoverColor] = useState(
    DEFAULT_REMOVE_HOVER_COLOR
  );


  // On Excel File
  const readUploadFile=(e)=>{
    e.preventDefault();
    if (e.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = xlsx.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = xlsx.utils.sheet_to_json(worksheet);
            console.log(json)
            setDataObject(json);
        };
        reader.readAsArrayBuffer(e.target.files[0]);
    }
  }

  return (
    <>
  <input className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400' type="file" name="excelData" id="excelData" accept=".xlsx" onChange={readUploadFile} />
    {/* <CSVReader
      onUploadAccepted={(results) => {
        convertToJson(results.data)
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
              'Drop CSV file here or click to upload'
            )}
          </div>
        </>
      )}
    </CSVReader> */}
    </>
  );
}