from django.conf.urls import url, include
from django.urls import path
from . import views

urlpatterns = [
    path('preprocessor_save/', views.PreprocessorSave.as_view()),
    path('preprocessor_delete/', views.PreprocessorDelete.as_view()),
    ]
