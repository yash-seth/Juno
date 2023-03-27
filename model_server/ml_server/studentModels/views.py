from django.shortcuts import render
from django.http import HttpResponse
from django.http.response import JsonResponse
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt

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