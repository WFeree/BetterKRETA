from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password, check_password

# Create your models here.
class Student(models.Model):
    nev = models.CharField(max_length=255, default="Ismeretlen")
    anyjaNeve = models.CharField(max_length=255, default="Ismeretlen")
    szuletesiHely = models.CharField(max_length=100, default="Ismeretlen")
    szuletesiIdo = models.DateField(default="2000-01-01")
    iranyitoszam = models.CharField(max_length=10, default="0000")
    telepules = models.CharField(max_length=100, default="Ismeretlen")
    kozterNev = models.CharField(max_length=100, default="Ismeretlen")
    kozterJelleg = models.CharField(max_length=50, default="utca")
    hazszam = models.CharField(max_length=10, default="0")
    beiratkozasIdeje = models.DateField(default="2000-01-01")
    szak = models.CharField(max_length=100, default="Ismeretlen")
    osztaly = models.CharField(max_length=50, default="0")
    kollegista = models.BooleanField(default=False)
    kollegiumNeve = models.CharField(max_length=100, blank=True, null=True)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=128)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    subjects = models.ManyToManyField('Subject', through='Enrollment')

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    def set_pwd(self, raw_pwd):
        self.password = make_password(raw_pwd)
        
    def check_pwd(self, raw_pwd):
        return check_password(raw_pwd, self.password)
    

class Subject(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class Enrollment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('student', 'subject')

    def __str__(self):
        return f"{self.student.first_name} {self.student.last_name} - {self.subject.name}"
    
class Mark(models.Model):
    enrollment = models.ForeignKey(Enrollment, on_delete=models.CASCADE, related_name='marks')
    value = models.DecimalField(max_digits=1,decimal_places=0)
    description = models.CharField(max_length=200, null=True)
    
    def __str__(self):
        return f"{self.enrollment.student.first_name} {self.enrollment.student.last_name} ({self.enrollment.subject.name}) - {self.value}"