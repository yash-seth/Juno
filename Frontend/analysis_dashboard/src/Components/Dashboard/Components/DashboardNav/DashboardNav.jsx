import React from 'react'
import "./DashboardNav.css"
// import {useState} from "react"
import {read, utils} from 'xlsx'
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../LogoutButton/LogoutButton';
import axios from 'axios'

function DashboardNav({csvData, setCsvData, analysisTarget, setAnalysisTarget, setResult, tableState, isLoading}) {
    const sendData = async(e) => {
        e.preventDefault();
        let endpoint = ""
        if(analysisTarget === "faculty") {
            endpoint = "http://127.0.0.1:8000/faculty"
        } else if(analysisTarget === "student") {
            if(tableState === "T") {
                endpoint = "http://127.0.0.1:8000/theory"
            } else if(tableState === "TL") {
                endpoint = "http://127.0.0.1:8000/TL"
            } else if(tableState === "TLJ") {
                endpoint = "http://127.0.0.1:8000/TLJ"
            }
        }
        axios.post(endpoint, 
        csvData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
          })
          .then(({data}) => {
            setTimeout(() => isLoading(false), 1000);
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
                    setCsvData({"records" : rows});
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
        <button className = "analysis_target_btns" onClick={() => {setAnalysisTarget("student"); setResult({"grades": [],"ratings": [],
            "fatMarks": [],
            "mean": 0,
            "sd": 0})}}>Student</button>
        <button className = "analysis_target_btns" onClick={() => {setAnalysisTarget("faculty"); setResult({"grades": [],"ratings": [],
            "fatMarks": [],
            "mean": 0,
            "sd": 0})}}>Faculty</button>
        {analysisTarget === "student" ? (<>
                <div className="category-label"><b>Select Student CSV File</b></div>
                <input type = "file" name="csvfile" className="csv-file-input" id="csv-file-input" onChange={(e) => {handleImport(e); setResult({"grades": [],"ratings": [],
            "fatMarks": [],
            "mean": 0,
            "sd": 0})}} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
            </>
        ) 
    :
    (
        <>
            <div className="category-label"><b>Select Faculty CSV File</b></div>
            <input type = "file" name="csvfile" className="csv-file-input" id="csv-file-input" onChange={(e) => {handleImport(e); setResult({"grades": [],"ratings": [],
            "fatMarks": [],
            "mean": 0,
            "sd": 0})}} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
        </>
    )}
    <button id="send-data" onClick={(e) => {isLoading(true);sendData(e);}}>Generate Insights on data</button>
    </div>
  )
}

export default DashboardNav