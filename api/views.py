from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Student
from .serializers import StudentSerializer
# Create your views here.

@api_view(["GET"])
@permission_classes([IsAuthenticatedOrReadOnly])
def hello_world(request):
    return Response({"message": "Hello from Bmiluu!"})

@api_view(["GET"])
@permission_classes([IsAuthenticatedOrReadOnly])
def get(request):
    students = Student.objects.all()
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)