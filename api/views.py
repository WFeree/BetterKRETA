from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from .models import Student, Subject, Enrollment, Mark
from .serializers import StudentSerializer, MarkCreateSerializer, NewStudentSerializer
from django.db.models import Avg
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

@api_view(["POST"])
@permission_classes([AllowAny])
def student_login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response({"error": "Username and password are required"},
                        status=status.HTTP_400_BAD_REQUEST)
    
    try:
        student = Student.objects.get(username=username)
    except Student.DoesNotExist:
        return Response({"error": "Invalid credentials."},
                        status=status.HTTP_401_UNAUTHORIZED)

    if not student.check_password(password):
        return Response({"error": "Invalid credentials."},
                        status=status.HTTP_401_UNAUTHORIZED)

    serializer = StudentSerializer(student)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["POST"])
@permission_classes([AllowAny])
def add_mark(request):
    serializer = MarkCreateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([IsAuthenticatedOrReadOnly])
def subject_averages(request):
    subjects = Subject.objects.all()
    data = []

    for subject in subjects:
        enrollments = Enrollment.objects.filter(subject=subject)
        marks = Mark.objects.filter(enrollment__in=enrollments)
        avg_value = marks.aggregate(avg=Avg('value'))['avg']

        data.append({
            "subject":subject.name,
            "average": round(avg_value, 2) if avg_value is not None else None
        })

    return Response(data)


@api_view(["GET"])
@permission_classes([IsAuthenticatedOrReadOnly])
def student_averages(request):
    students = Student.objects.all()
    data = []

    for student in students:
        enrollments = Enrollment.objects.filter(student=student)
        marks = Mark.objects.filter(enrollment__in=enrollments)
        avg_value = marks.aggregate(avg=Avg('value'))['avg']

        data.append({
            "student":student.full_name,
            "average": round(avg_value, 2) if avg_value is not None else None
        })

    return Response(data)


@api_view(['POST'])
@permission_classes([AllowAny])
def create_student(request):
    serializer = NewStudentSerializer(data=request.data)
    if serializer.is_valid():
        student = serializer.save()
        response_data = {field: getattr(student, field) for field in [
            'nev', 'anyjaNeve', 'szuletesiHely', 'szuletesiIdo',
            'iranyitoszam', 'telepules', 'kozterNev', 'kozterJelleg',
            'hazszam', 'beiratkozasIdeje', 'szak', 'osztaly',
            'kollegista', 'kollegiumNeve', 'username'
        ]}
        return Response({"message": "Student created", "student": response_data},
                        status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

