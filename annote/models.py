from django.db import models

# Create your models here.
class Annotation(models.Model):
    image = models.ImageField(upload_to="media/")
    filename = models.CharField(max_length=50,null=True)
    LisenceNumber = models.CharField(max_length=30,primary_key=True)
    company = models.CharField(max_length=50,null=True)
    carmodel = models.CharField(max_length=50,null=True)
    colour = models.CharField(max_length=50,null=True)
    annotes = models.CharField(max_length=50,null=True)

