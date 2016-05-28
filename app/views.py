from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect,HttpResponseForbidden

def index(request):
	return render(request,'main/index.html')

def redirect(request):
	return HttpResponseRedirect('/')