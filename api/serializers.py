from rest_framework import serializers
from .models import Student, Subject, Enrollment, Mark

class MarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mark
        fields = ['value', 'description']

class EnrollmentSerializer(serializers.ModelSerializer):
    marks = MarkSerializer(many=True, read_only=True)
    subject = serializers.StringRelatedField()

    class Meta:
        model = Enrollment
        fields = ['subject', 'marks']

class StudentSerializer(serializers.ModelSerializer):
    enrollments = EnrollmentSerializer(source='enrollment_set', many=True, read_only=True)

    class Meta:
        model = Student
        fields = ['id', 'full_name', 'enrollments']