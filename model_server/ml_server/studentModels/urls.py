from django.urls import path
from django.urls import re_path 

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    re_path(r'^theory$', views.gradePredTheory),
    re_path(r'^TL$', views.gradePredTL),
    re_path(r'^TLJ$', views.gradePredTLJ),
    re_path(r'^faculty$', views.facultyScore),
] 
