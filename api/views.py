from django.shortcuts import render
from .models import Project,Member,Contact,Technology,Contributor
from .serializers import MemberSerializer,ProjectSerializer
from django.http import HttpResponse,Http404
import json

# API wale endpoints
def projects(request):
	if request.method=="GET":
		projects = ProjectSerializer(instance=Project.objects.all(),many=True)
		return HttpResponse(json.dumps(projects.data))
	else:
		return HttpResponseForbidden('allowed only via GET')

def project_details(request,project_slug):
	if request.method=="GET":
		try:
			project=Project.objects.get(slug=project_slug)
			project_serialized = ProjectSerializer(instance=project)
			return HttpResponse(json.dumps(project_serialized.data))
		except Project.DoesNotExist:
			return HttpResponse(json.dumps({'error':'No project matches the given query'}));
	else:
		return HttpResponseForbidden('allowed only via GET')

def members(request):
	if request.method=="GET":
		members = MemberSerializer(instance = Member.objects.all(),many=True)
		return 	HttpResponse(json.dumps(members.data))
	else:
		return HttpResponseForbidden('allowed only via GET')
