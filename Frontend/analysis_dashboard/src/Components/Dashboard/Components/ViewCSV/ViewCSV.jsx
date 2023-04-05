import React from 'react'
import "./ViewCSV.css"
import { useState, useEffect } from "react"
import BarChart from '../../../BarChart/BarChart';
import BarChartFacultyStar from '../../../BarChartFacultyStar/BarChartFacultyStar';
import PieChart from '../../../PieChart/PieChart';


function ViewCSV({csvData, setCsvData, analysisTarget, setAnalysisTarget, result, setResult, tableState, setTableState}) {
    let failCount = 0;
    if(analysisTarget === "student") {
        if(result.grades.length !== 0) {
            for(let i=0; i<result.grades.length; i++) {
                if(result.grades[i] === "F") {
                    failCount++;
                }
            }
        }
    }
  return (
    <>
        {analysisTarget === "student" ? <>
        <div className='student_btn_options'>
            <button id="T" onClick={() => {setTableState("T"); setResult({"grades": [],"ratings": [],
            "fatMarks": [],
            "mean": 0,
            "sd": 0})}}>
                Theory
            </button>
            <button id="TL" onClick={() => {setTableState("TL"); setResult({"grades": [],"ratings": [],
            "fatMarks": [],
            "mean": 0,
            "sd": 0})}}>
                Theory + Lab
            </button>
            <button id="TLJ" onClick={() => {setTableState("TLJ"); setResult({"grades": [],"ratings": [],
            "fatMarks": [],
            "mean": 0,
            "sd": 0})}}>
                Theory + Lab + J Component
            </button>
        </div>
        {result.grades.length !== 0 ? (
        <div className='predictionDetails'>
            <div id = "predMean">
                <b>Mean:</b> {result.mean.toFixed(3)}
            </div>
            <div id = "predSD">
                <b>SD:</b> {result.sd.toFixed(3)}
            </div>
            <div id = "failCount">
                <b>Fail Count:</b> {failCount}
            </div>
            <div className="plotSection">
                <BarChart plotData={result.grades}/>
                <PieChart plotData={result.grades} style={{ height: "200px" }}/>
            </div>
        </div>
        ) :
        (<span></span>)
        }
        {tableState === "T" ? <div className = "ViewCSVMain">
            <table>
                <thead>
                    <tr>
                        <th className = "tableHeaders">Register No.</th>
                        <th className = "tableHeaders">Name</th>
                        <th className = "tableHeaders">CAT1</th>
                        <th className = "tableHeaders">CAT2</th>
                        <th className = "tableHeaders">DA1</th>
                        <th className = "tableHeaders">DA2</th>
                        <th className = "tableHeaders">DA3</th>
                        <th className = "tableHeaders">Predicted FAT Marks</th>
                        <th className = "tableHeaders">Predicted Grade Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {csvData["records"].length && result.grades.length !== 0 ? (
                        csvData["records"].map((user, index) => (
                            <tr key = {index}>
                                <td>{result.regno[index]}</td>
                                <td>{result.names[index]}</td>
                                <td>{user.CAT1}</td>
                                <td>{user.CAT2}</td>
                                <td>{user.DA1}</td>
                                <td>{user.DA2}</td>
                                <td>{user.DA3}</td>
                                <td>{result.fatMarks[index].toFixed(3)}</td>
                                <td>{result.grades[index]}</td>
                            </tr>
                        ))
                    ) : (
                        <td colSpan="4">No Data found.</td>
                    )}
                </tbody>
            </table>
        </div>
        :
        tableState === "TL" ? <div className = "ViewCSVMain">
        <table>
            <thead>
                <tr>
                    <th className = "tableHeaders">Register No.</th>
                    <th className = "tableHeaders">Name</th>
                    <th className = "tableHeaders">CAT1</th>
                    <th className = "tableHeaders">CAT2</th>
                    <th className = "tableHeaders">DA1</th>
                    <th className = "tableHeaders">DA2</th>
                    <th className = "tableHeaders">DA3</th>
                    <th className = "tableHeaders">Predicted FAT Marks</th>
                    <th className = "tableHeaders">LAB1</th>
                    <th className = "tableHeaders">LAB2</th>
                    <th className = "tableHeaders">LAB3</th>
                    <th className = "tableHeaders">LAB4</th>
                    <th className = "tableHeaders">LAB5</th>
                    <th className = "tableHeaders">LAB6</th>
                    <th className = "tableHeaders">Predicted LABFAT Marks</th>
                    <th className = "tableHeaders">Predicted Grade</th>
                </tr>
            </thead>
            <tbody>
                {csvData["records"].length && result.grades.length !== 0? (
                    csvData["records"].map((user, index) => (
                        <tr key = {index}>
                            <td>{result.regno[index]}</td>
                            <td>{result.names[index]}</td>
                            <td>{user.CAT1}</td>
                            <td>{user.CAT2}</td>
                            <td>{user.DA1}</td>
                            <td>{user.DA2}</td>
                            <td>{user.DA3}</td>
                            <td>{result.fatMarks[index].toFixed(3)}</td>
                            <td>{user.LAB1}</td>
                            <td>{user.LAB2}</td>
                            <td>{user.LAB3}</td>
                            <td>{user.LAB4}</td>
                            <td>{user.LAB5}</td>
                            <td>{user.LAB6}</td>
                            <td>{result.labFatMarks[index].toFixed(3)}</td>
                            <td>{result.grades[index]}</td>
                        </tr>
                    ))
                ) : (
                    <td colSpan="4">No Data found.</td>
                )}
            </tbody>
        </table>
    </div>
        :
        tableState === "TLJ" ? <div className = "ViewCSVMain">
        <table>
            <thead>
                <tr>
                    <th className = "tableHeaders">Register No.</th>
                    <th className = "tableHeaders">Name</th>
                    <th className = "tableHeaders">CAT1</th>
                    <th className = "tableHeaders">CAT2</th>
                    <th className = "tableHeaders">DA1</th>
                    <th className = "tableHeaders">DA2</th>
                    <th className = "tableHeaders">DA3</th>
                    <th className = "tableHeaders">Predicted FAT Marks</th>
                    <th className = "tableHeaders">LAB1</th>
                    <th className = "tableHeaders">LAB2</th>
                    <th className = "tableHeaders">LAB3</th>
                    <th className = "tableHeaders">LAB4</th>
                    <th className = "tableHeaders">LAB5</th>
                    <th className = "tableHeaders">LAB6</th>
                    <th className = "tableHeaders">Predicted LABFAT Marks</th>
                    <th className = "tableHeaders">REV1</th>
                    <th className = "tableHeaders">REV2</th>
                    <th className = "tableHeaders">Predicted REV3 Marks</th>
                    <th className = "tableHeaders">Predicted Grade</th>
                </tr>
            </thead>
            <tbody>
                {csvData["records"].length && result.grades.length !== 0 ? (
                    csvData["records"].map((user, index) => (
                        <tr key = {index}>
                            <td>{result.regno[index]}</td>
                            <td>{result.names[index]}</td>
                            <td>{user.CAT1}</td>
                            <td>{user.CAT2}</td>
                            <td>{user.DA1}</td>
                            <td>{user.DA2}</td>
                            <td>{user.DA3}</td>
                            <td>{result.fatMarks[index].toFixed(3)}</td>
                            <td>{user.LAB1}</td>
                            <td>{user.LAB2}</td>
                            <td>{user.LAB3}</td>
                            <td>{user.LAB4}</td>
                            <td>{user.LAB5}</td>
                            <td>{user.LAB6}</td>
                            <td>{result.labFatMarks[index].toFixed(3)}</td>
                            <td>{user.REV1}</td>
                            <td>{user.REV2}</td>
                            <td>{result.Rev3Marks[index].toFixed(3)}</td>
                            <td>{result.grades[index]}</td>
                        </tr>
                    ))
                ) : (
                    <td colSpan="4">No Data found.</td>
                )}
            </tbody>
        </table>
        </div>
        :
        setTableState("T")}
        </>
        :
        <>
        <div className = "ViewCSVMain">
            {result.ratings.length !== 0 ? (
            <div className='predictionDetails'>
                <div className="plotSection">
                    <BarChartFacultyStar plotData={result.ratings}/>
                </div>
            </div>
            ) :
            (<span></span>)
            }
            <table id="facultyTable">
                <thead>
                    <tr>
                        <th className = "tableHeadersFaculty">Faculty ID</th>
                        <th className = "tableHeadersFaculty">Name</th>
                        <th className = "tableHeadersFaculty">Course</th>
                        <th className = "tableHeadersFaculty">Slot</th>
                        <th className = "tableHeadersFaculty">Mean CGPA</th>
                        <th className = "tableHeadersFaculty">Mean Marks</th>
                        <th className = "tableHeadersFaculty">Pass Ratio</th>
                        <th className = "tableHeadersFaculty">Resource Materials</th>
                        <th className = "tableHeadersFaculty">Subject Knowledge</th>
                        <th className = "tableHeadersFaculty">Audibility</th>
                        <th className = "tableHeadersFaculty">Teaching Methods</th>
                        <th className = "tableHeadersFaculty">Question Paper</th>
                        <th className = "tableHeadersFaculty">Syllabus Completion</th>
                        <th className = "tableHeadersFaculty">Assignments</th>
                        {/* <th className = "tableHeadersFaculty">Oppurtunities</th>
                        <th className = "tableHeadersFaculty">Presentation</th>
                        <th className = "tableHeadersFaculty">Publication</th>
                        <th className = "tableHeadersFaculty">Guidance</th>
                        <th className = "tableHeadersFaculty">Seminar</th>
                        <th className = "tableHeadersFaculty">IV</th>
                        <th className = "tableHeadersFaculty">Club Contribution</th>
                        <th className = "tableHeadersFaculty">Guest Lecture</th> */}
                        <th className = "tableHeadersFaculty">Score Compute (on 100)</th>
                        <th className = "tableHeadersFaculty">Star rating</th>
                    </tr>
                </thead>
                <tbody>
                    {csvData["records"].length && result.ratings.length !== 0 ? (
                        csvData["records"].map((user, index) => (
                            <tr key = {index}>
                                <td>{result.fid[index]}</td>
                                <td>{result.names[index]}</td>
                                <td>{result.course[index]}</td>
                                <td>{result.slot[index]}</td>
                                <td>{user.CGPA}</td>
                                <td>{user.Marks}</td>
                                <td>{user["Pass Ratio"]}</td>
                                <td>{user["Resource Materials"]}</td>
                                <td>{user["Subject Knowledge"]}</td>
                                <td>{user["Audibility"]}</td>
                                <td>{user["Teaching Methods"]}</td>
                                <td>{user["Question Paper"]}</td>
                                <td>{user["Syllabus Completion"]}</td>
                                <td>{user.Assignments}</td>
                                {/* <td>{user.Oppurtunities}</td>
                                <td>{user.Presentation}</td>
                                <td>{user.Publication}</td>
                                <td>{user.Guidance}</td>
                                <td>{user.Seminar}</td>
                                <td>{user.IV}</td> */}
                                {/* <td>{user["Club Contribution"]}</td> */}
                                {/* <td>{user["Guest Lecture"]}</td> */}
                                <td>{result.ratings[index].toFixed(3)}</td>
                                <td>{result.stars[index]}</td>
                            </tr>
                        ))
                    ) : (
                        <td colSpan="4">No Data found.</td>
                    )}
                </tbody>
            </table>
        </div>
        </>
    }
    </>
  )
}

export default ViewCSV