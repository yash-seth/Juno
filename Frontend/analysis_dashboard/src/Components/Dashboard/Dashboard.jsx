import React from 'react'
import "./Dashboard.css"
import DashboardNav from "./Components/DashboardNav/DashboardNav"
import ViewCSV from './Components/ViewCSV/ViewCSV'
import {useState} from 'react'
import { useAuth0 } from "@auth0/auth0-react";

function Dashboard() {
    const [analysisTarget, setAnalysisTarget] = useState("student");
    const { isAuthenticated } = useAuth0();
    const [csvData, setCsvData] = useState([]);
    if (isAuthenticated) return (
    <div className='DashboardMain'>
        <DashboardNav csvData={csvData} setCsvData={setCsvData} analysisTarget={analysisTarget} setAnalysisTarget={setAnalysisTarget}/>
        <ViewCSV csvData={csvData} setCsvData={setCsvData} analysisTarget={analysisTarget} setAnalysisTarget={setAnalysisTarget}/>
    </div>
  )
}

export default Dashboard