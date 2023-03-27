import React from 'react'
import "./DashboardNav.css"
import {useState} from "react"
import {read, utils} from 'xlsx'
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../LogoutButton/LogoutButton';
import axios from 'axios'

function DashboardNav({csvData, setCsvData, analysisTarget, setAnalysisTarget}) {
    const [result, setResult] = useState({})
    const sendData = async(e) => {
        e.preventDefault();
        // let formData = new FormData();
        // formData.append("answer",answer)
        axios.post("http://127.0.0.1:8000/theory", {
            "marks" : "93"
        }, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
          })
          .then(({data}) => {
            console.log(data);
            setResult(data)
        });
      }

    const { user } = useAuth0();
    const handleImport = $event => {
        const files = $event.target.files;
        if(files.length) {
            const csvFile = files[0]
            const reader = new FileReader();
            reader.onload = event => {
                const csv = read(event.target.result);
                const csvSheet = csv.SheetNames;

                if(csvSheet.length) {
                    const rows = utils.sheet_to_json(csv.Sheets[csvSheet[0]]);
                    setCsvData(rows);
                }
            };
            reader.readAsArrayBuffer(csvFile)
        }
    }

    return (
    <div className = "DashboardNavMain">
        <div className='DashboardHeader'>
            <div id="welcome-msg">Welcome {user.name}!</div>
            <LogoutButton />
        </div>
        <button className = "analysis_target_btns" onClick={() => {setAnalysisTarget("student"); setCsvData([])}}>Student</button>
        <button className = "analysis_target_btns" onClick={() => {setAnalysisTarget("faculty"); setCsvData([])}}>Faculty</button>
        {analysisTarget === "student" ? (<>
                <div><b>Select Student CSV File</b></div>
                <input type = "file" name="csvfile" className="csv-file-input" id="csv-file-input" onChange={handleImport} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
            </>
        ) 
    :
    (
        <>
            <div><b>Select Faculty CSV File</b></div>
            <input type = "file" name="csvfile" className="csv-file-input" id="csv-file-input" onChange={handleImport} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
        </>
    )}
    <button id="send-data" onClick={(e) => {sendData(e);}}>Generate Insights on data</button>
    {result.theory}
    </div>
  )
}

export default DashboardNav