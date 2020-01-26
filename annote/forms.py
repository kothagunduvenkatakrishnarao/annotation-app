from django import forms
from .models import Annotation
class UploadFileForm(forms.ModelForm):
    class Meta:
        model = Annotation
        fields = ('image','LisenceNumber','company','carmodel','colour','annotes')
