"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from api.views import student_statistics, delete_student, get_students, get, student_login, add_mark, subject_averages, student_averages, create_student

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/hello/", get_students),
    path("api/students/", get, name='student-list'),
    path('api/login/', student_login, name='student-login'),
    path('api/add-mark/', add_mark, name='add-mark'),
    path('api/subject-averages/', subject_averages, name='subject-averages'),
    path('api/student-averages/', student_averages, name='student-averages'),
    path('api/students/create/', create_student, name='create-student'),
    path('api/students/statistics/', student_statistics, name='student-statistics'),
    path('api/students/delete/<int:student_id>/', delete_student, name='delete-student'),
]