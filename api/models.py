from django.db import models

# Create your models here.
class Student(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    subjects = models.ManyToManyField('Subject', through='Enrollment')

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    

class Subject(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class Enrollment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)

    class Meta:
        unique_together= ('student', 'subject')

    def __str__(self):
        return f"{self.student.first_name} {self.student.last_name} - {self.subject.name}"
    
class Mark(models.Model):
    enrollment = models.ForeignKey(Enrollment, on_delete=models.CASCADE, related_name='marks')
    value = models.DecimalField(max_digits=1,decimal_places=0)
    description = models.CharField(max_length=200, null=True)
    
    def __str__(self):
        return f"{self.enrollment.student.first_name} {self.enrollment.student.last_name} ({self.enrollment.subject.name}) - {self.value}"