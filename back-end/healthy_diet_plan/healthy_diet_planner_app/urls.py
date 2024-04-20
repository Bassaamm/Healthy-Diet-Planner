
from django.urls import path 
from . import views
urlpatterns = [
    path('', views.index ),
    path('diet_plan', views.diet_plan )
]
