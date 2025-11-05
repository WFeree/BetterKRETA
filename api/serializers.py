from rest_framework import serializers
from .models import Student, Enrollment, Mark
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Student

class MarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mark
        fields = ['value', 'description']

class MarkCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mark
        fields = ['id', 'enrollment', 'value', 'description']

class EnrollmentSerializer(serializers.ModelSerializer):
    marks = MarkSerializer(many=True, read_only=True)
    subject = serializers.StringRelatedField()

    class Meta:
        model = Enrollment
        fields = ['id', 'subject', 'marks']

class StudentSerializer(serializers.ModelSerializer):
    enrollments = EnrollmentSerializer(source='enrollment_set', many=True, read_only=True)

    class Meta:
        model = Student
        fields = ['id', 'full_name', 'enrollments', 'username', 'password']


from rest_framework import serializers
from .models import Student

class NewStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = [
            'nev', 'anyjaNeve', 'szuletesiHely', 'szuletesiIdo',
            'iranyitoszam', 'telepules', 'kozterNev', 'kozterJelleg',
            'hazszam', 'beiratkozasIdeje', 'szak', 'osztaly',
            'kollegista', 'kollegiumNeve', 'username', 'password'
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        student = Student(**validated_data)
        student.set_pwd(password)
        student.save()
        return student
class AdminStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = [
            'id',
            'nev',
            'telepules',
            'kollegista',
            'szak',
            'beiratkozasIdeje'
        ]

