from django.shortcuts import render
from .models import Project,Member,Contact
from django.http import HttpResponse,Http404
import json
from django.core import serializers

# API wale endpoints
def projects(request):
	if request.method=="GET":
		projects = serializers.serialize('json', Project.objects.all(),fields=("name","type","desc","icon","technologies"))
		return HttpResponse(projects)
	else:
		return HttpResponseForbidden('allowed only via GET')

def project_details(request,project_slug):
	if request.method=="GET":
		project = serializers.serialize('json',Project.objects.filter(slug=project_slug))
		return HttpResponse(project)
	else:
		return HttpResponseForbidden('allowed only via GET')


def members(request):
	if request.method=="GET":
		members = serializers.serialize('json', Member.objects.all())
		return HttpResponse(members)
	else:
		return HttpResponseForbidden('allowed only via GET')