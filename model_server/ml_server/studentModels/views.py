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
    studentData = request.data["records"]

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
    studentData = request.data["records"]

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

    # predicting lab fat marks
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


# Function for student case - Theory + Lab + J Component Course Prediction

@csrf_exempt
@api_view(['POST'])
def gradePredTLJ(request):
    # getting the student data with fields CAT1	CAT2 DA1	DA2	DA3	LAB1	LAB2	LAB3	LAB4	LAB5	LAB6	REV1	REV2	REV3
    studentData = request.data["records"]

    print(studentData)
    studentDataListTheory = []
    studentRecordTheory = []

    studentDataListLab = []
    studentRecordLab = []

    studentDataListJ = []
    studentRecordJ = []

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

        studentRecordJ.append(entry["REV1"])
        studentRecordJ.append(entry["REV2"])
        studentDataListJ.append(studentRecordJ)

        studentRecordTheory = []
        studentRecordLab = []
        studentRecordJ = []

    print("Theory", studentDataListTheory)
    print("Lab", studentDataListLab)
    print("J", studentDataListJ)

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

    # predicting lab fat marks
    y_pred_lab = pickled_model_lab.predict(studentDataListLab)

    # importing the model for final review marks predicition
    model = open(r'C:\Users\yashs\Documents\D-Drive\Sem 6\WM\model_server\ml_server\studentModels\student-TLJ.pkl', 'rb')
    pickled_model_J = pickle.load(model)
    model.close()

    # predicting review 3 marks
    y_pred_J = pickled_model_J.predict(studentDataListJ)

    # formula for theory + lab + j component course: (0.5*totPred)+(0.25*labtot)+(0.25*jcomp)

    # calculating the sum of labs
    labSum = []
    for record in studentDataListLab:
        labSum.append(sum(record))
    
    # calculating the sum of review 1 and review 2
    JSum = []
    for record in studentDataListJ:
        JSum.append(sum(record))
    
    print("Lab Sum", labSum)
    print("J Sum", JSum)

    labtot= labSum + y_pred_lab
    jcomp = JSum + y_pred_J
    tot=(0.5*totPred)+(0.25*labtot)+(0.25*jcomp)
    Mean=np.mean(tot)
    sd=np.std(tot)
    grade = np.empty(len(y_pred_J), dtype=object)
    for i in range(0,len(y_pred_J)):
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
        "Rev3Marks": y_pred_J.tolist(),
        "mean": Mean,
        "sd": sd
    }
    return JsonResponse(prediction)



# Function for faculty case - SCore Generation Prediction

@csrf_exempt
@api_view(['POST'])
def facultyScore(request):
    # getting the student data with fields 'CGPA', 'Marks', 'Pass Ratio', 'Resource Materials',
    #    'Subject Knowledge', 'Audibility', 'Teaching Methods', 'Question Paper',
    #    'Syllabus Completion', 'Assignments', 'Oppurtunities', 'Presentation',
    #    'Publication', 'Guidance', 'Seminar', 'IV', 'Club Contribution',
    #    'Guest Lecture', 'Ratings'
    facultyData = request.data["records"]

    facultyDataList = []
    facultyRecord = []

    # converting the data according to the required input for the model - list of dicts => list of lists
    for entry in facultyData:
        facultyRecord.append(entry["CGPA"])
        facultyRecord.append(entry["Marks"])
        facultyRecord.append(entry["Pass Ratio"])
        facultyRecord.append(entry["Resource Materials"])
        facultyRecord.append(entry["Subject Knowledge"])
        facultyRecord.append(entry["Audibility"])
        facultyRecord.append(entry["Teaching Methods"])
        facultyRecord.append(entry["Question Paper"])
        facultyRecord.append(entry["Syllabus Completion"])
        facultyRecord.append(entry["Assignments"])
        # facultyRecord.append(entry["Oppurtunities"])
        # facultyRecord.append(entry["Presentation"])
        # facultyRecord.append(entry["Publication"])
        # facultyRecord.append(entry["Guidance"])
        # facultyRecord.append(entry["Seminar"])
        # facultyRecord.append(entry["IV"])
        # facultyRecord.append(entry["Club Contribution"])
        # facultyRecord.append(entry["Guest Lecture"])
        facultyDataList.append(facultyRecord)
        facultyRecord = []

    # importing the model for fat marks predicition
    model = open(r'C:\Users\yashs\Documents\D-Drive\Sem 6\WM\model_server\ml_server\studentModels\faculty.pkl', 'rb')
    pickled_model_fac = pickle.load(model)
    model.close()

    # scaling test data
    from sklearn.preprocessing import StandardScaler
    sc = StandardScaler()
    facultyDataList = sc.fit_transform(facultyDataList)

    print(facultyDataList[0])
    ratingPred = pickled_model_fac.predict(facultyDataList)


    prediction = {
        "ratings": ratingPred.tolist(),
    }
    return JsonResponse(prediction)