import React from 'react'
import "./Dashboard.css"
import DashboardNav from "./Components/DashboardNav/DashboardNav"
import ViewCSV from './Components/ViewCSV/ViewCSV'
import {useState} from 'react'
import { useAuth0 } from "@auth0/auth0-react";

function Dashboard() {
    const [analysisTarget, setAnalysisTarget] = useState("student");
    const [result, setResult] = useState({"grades": [], "ratings": [],
    "fatMarks": [],
    "mean": 0,
    "sd": 0})
    const [tableState, setTableState] = useState("T");
    const { isAuthenticated } = useAuth0();
    const [csvData, setCsvData] = useState({"records": []});
    if (isAuthenticated) return (
    <div className='DashboardMain'>
        <DashboardNav csvData={csvData} setCsvData={setCsvData} analysisTarget={analysisTarget} setAnalysisTarget={setAnalysisTarget} setResult={setResult} tableState={tableState}/>
        <ViewCSV csvData={csvData} analysisTarget={analysisTarget} result = {result} setResult={setResult} tableState={tableState} setTableState={setTableState}/>
    </div>
  )
}

export default Dashboard