from django.shortcuts import render,reverse,redirect
from django.http import HttpResponse
from .forms import UploadFileForm
from django.core.files.uploadedfile import SimpleUploadedFile
from datetime import datetime
from .models import Annotation
import json
# Create your views here.
def home(request):
    return HttpResponse("Hello annotation")

def upload_file(request):    
        return render(request,'home.html') 

def handle_annotation(request):
    if request.method=="POST":
        form = UploadFileForm(request.POST,request.FILES)
        if form.is_valid():
            post = form.save(commit=False)
            new_file_name = datetime.now().strftime("%d%m%y%H%M%S.jpg")
            post.filename = new_file_name
            post.image = SimpleUploadedFile(new_file_name,post.image.read())
            post.save()
    return HttpResponse("yes")