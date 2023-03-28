from django.shortcuts import render
from django.http import HttpResponse
from django.http.response import JsonResponse
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
import numpy as np
import pickle

# Create your views here.
@csrf_exempt 
def index(request):
    print("Server started at http://127.0.0.1:8000/")
    return HttpResponse("Server started at http://127.0.0.1:8000/")

@csrf_exempt
@api_view(['POST'])
def theoryModel(request):
    print(request.data["marks"])
    return JsonResponse({"theory":'Pass!'})


# Function for student case - Theory Only Course Prediction

@csrf_exempt
@api_view(['POST'])
def gradePredTheory(request):
    # getting the student data with fields CAT1	CAT2 DA1	DA2	DA3	
    studentData = request.data["students"]

    studentDataList = []
    studentRecord = []

    # converting the data according to the required input for the model - list of dicts => list of lists
    for entry in studentData:
        studentRecord.append(entry["CAT1"])
        studentRecord.append(entry["CAT2"])
        studentRecord.append(entry["DA1"])
        studentRecord.append(entry["DA2"])
        studentRecord.append(entry["DA3"])
        studentDataList.append(studentRecord)
        studentRecord = []

    # importing the model for fat marks predicition
    model = open(r'C:\Users\yashs\Documents\D-Drive\Sem 6\WM\model_server\ml_server\studentModels\student-theory.pkl', 'rb')
    pickled_model = pickle.load(model)
    model.close()

    # predicting fat marks
    y_pred_fat = pickled_model.predict(studentDataList)

    # calculating the internal marks based on input data
    internal = np.empty(len(y_pred_fat), dtype=object)
    counter = 0

    for i in range(0, len(studentDataList)):
        internal[counter]=round((15/50)*studentData[i]['CAT1'],2) + round((15/50)*studentData[i]['CAT2'],2) + studentData[i]['DA1'] + studentData[i]['DA2'] + studentData[i]['DA3']
        counter += 1

    totPred = internal + (0.4)*y_pred_fat


    grade = []
    grade = np.empty(len(y_pred_fat), dtype = object)
    Mean=np.mean(totPred)
    sd=np.std(totPred)
    print("SD:", sd)
    print("Mean:", Mean)

    for i in range(0,len(totPred)):
        if internal[i] < 30 or y_pred_fat[i] < 40:
            grade[i] = 'F'
        else:
            if totPred[i]>= Mean + 1.5*sd:
                grade[i]='S'
            elif totPred[i]>=Mean + 0.5*sd and totPred[i] < Mean + 1.5*sd:
                grade[i]='A'
            elif totPred[i] >= Mean - 0.5*sd and totPred[i] < Mean + 0.5*sd:
                grade[i]='B'
            elif totPred[i]>= Mean - 1.0*sd and totPred[i] < Mean - 0.5*sd:
                grade[i]='C'
            elif totPred[i] >= Mean - 1.5*sd and totPred[i] < Mean - 1.0*sd:
                grade[i]='D'
            elif totPred[i] >= Mean - 2.0*sd and totPred[i] < Mean - 1.5*sd:
                grade[i]='E'
            elif totPred[i] < Mean - 2.0*sd:
                grade[i]='F'

    prediction = {
        "grades": grade.tolist(),
        "fatMarks": y_pred_fat.tolist(),
        "mean": Mean,
        "sd": sd
    }
    return JsonResponse(prediction)

# Function for student case - Theory + Lab Course Prediction

@csrf_exempt
@api_view(['POST'])
def gradePredTL(request):
    # getting the student data with fields CAT1	CAT2 DA1	DA2	DA3	LAB1	LAB2	LAB3	LAB4	LAB5	LAB6	
    studentData = request.data["students"]

    print(studentData)
    studentDataListTheory = []
    studentRecordTheory = []

    studentDataListLab = []
    studentRecordLab = []

    # converting the data according to the required input for the model - list of dicts => list of lists
    for entry in studentData:
        studentRecordTheory.append(entry["CAT1"])
        studentRecordTheory.append(entry["CAT2"])
        studentRecordTheory.append(entry["DA1"])
        studentRecordTheory.append(entry["DA2"])
        studentRecordTheory.append(entry["DA3"])
        studentDataListTheory.append(studentRecordTheory)

        studentRecordLab.append(entry["LAB1"])
        studentRecordLab.append(entry["LAB2"])
        studentRecordLab.append(entry["LAB3"])
        studentRecordLab.append(entry["LAB4"])
        studentRecordLab.append(entry["LAB5"])
        studentRecordLab.append(entry["LAB6"])
        studentDataListLab.append(studentRecordLab)

        studentRecordTheory = []
        studentRecordLab = []

    print("Theory", studentDataListTheory)
    print("Lab", studentDataListLab)

    # importing the model for theory fat marks predicition
    model = open(r'C:\Users\yashs\Documents\D-Drive\Sem 6\WM\model_server\ml_server\studentModels\student-theory.pkl', 'rb')
    pickled_model_theory = pickle.load(model)
    model.close()

    # predicting fat marks
    y_pred_fat = pickled_model_theory.predict(studentDataListTheory)

    # calculating the internal marks based on input data
    internal = np.empty(len(y_pred_fat), dtype=object)
    counter = 0

    for i in range(0, len(studentDataListTheory)):
        internal[counter]=round((15/50)*studentData[i]['CAT1'],2) + round((15/50)*studentData[i]['CAT2'],2) + studentData[i]['DA1'] + studentData[i]['DA2'] + studentData[i]['DA3']
        counter += 1

    totPred = internal + (0.4)*y_pred_fat

# importing the model for lab fat marks predicition
    model = open(r'C:\Users\yashs\Documents\D-Drive\Sem 6\WM\model_server\ml_server\studentModels\student-TL.pkl', 'rb')
    pickled_model_lab = pickle.load(model)
    model.close()

    # predicting fat marks
    y_pred_lab = pickled_model_lab.predict(studentDataListLab)

    # formula for theory + lab course: thetot=internal+(0.4*fat)

    # calculating the sum of labs
    labSum = []
    for record in studentDataListLab:
        labSum.append(sum(record))
    
    labtot= labSum + y_pred_lab
    tot=(0.75*totPred)+(0.25*labtot)
    Mean=np.mean(tot)
    sd=np.std(tot)
    grade = np.empty(len(y_pred_lab), dtype=object)
    for i in range(0,len(y_pred_lab)):
        if y_pred_fat[i]<40 or tot[i]<50:
            grade[i]='F'
        else:
            if tot[i]>= Mean + 1.5*sd:
                grade[i]='S'
            elif tot[i]>=Mean + 0.5*sd and tot[i] < Mean + 1.5*sd:
                grade[i]='A'
            elif tot[i] >= Mean - 0.5*sd and tot[i] < Mean + 0.5*sd:
                grade[i]='B'
            elif tot[i ]>= Mean - 1.0*sd and tot[i] < Mean - 0.5*sd:
                grade[i]='C'
            elif tot[i] >= Mean - 1.5*sd and tot[i] < Mean - 1.0*sd:
                grade[i]='D'
            elif tot[i] >= Mean - 2.0*sd and tot[i] < Mean - 1.5*sd:
                grade[i]='E'
            elif tot[i] < Mean - 2.0*sd:
                grade[i]='F'

    print(grade)

    prediction = {
        "grades": grade.tolist(),
        "fatMarks": y_pred_fat.tolist(),
        "labFatMarks": y_pred_lab.tolist(),
        "mean": Mean,
        "sd": sd
    }
    return JsonResponse(prediction)
