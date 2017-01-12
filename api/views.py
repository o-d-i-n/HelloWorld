from django.shortcuts import render
from .models import Project,Member,Contact,Technology,Contributor
from .serializers import MemberSerializer,ProjectSerializer
from django.http import HttpResponse,Http404


import requests
import json


from constants import GITHUB_API_URL, ORG_NAME


def projects(request):
    if request.method == "GET":
        projects = ProjectSerializer(instance=Project.objects.all(),many=True)
        return HttpResponse(json.dumps(projects.data))
    else:
        return HttpResponseForbidden('allowed only via GET')

def project_details(request,project_slug):
    if request.method == "GET":
        try:
            project = Project.objects.get(slug=project_slug)
            project_serialized = ProjectSerializer(instance=project)
            
            return HttpResponse(json.dumps(project_serialized.data))
        except Project.DoesNotExist:
            error_message = "No project matches the given query"
            error_response = {
                "error" : error_message,
            }

            return HttpResponse(json.dumps(error_response));
    else:
        return HttpResponseForbidden('allowed only via GET')

def members(request):
    if request.method == "GET":
        members = MemberSerializer(instance=Member.objects.order_by('name'), many=True)
        return HttpResponse(json.dumps(members.data))
    else:
        return HttpResponseForbidden('allowed only via GET')

def issues(request):
    if request.method == "GET":
        url = "{0}users/{1}/repos".format(GITHUB_API_URL, ORG_NAME)
        response = requests.get(url)

        if response.ok:
            json_response = response.json()
            
            issues_resp = []
            for repo in json_response:
                repo_url = "{0}/issues".format(repo["url"])
                repo_issues_response = requests.get(repo_url)
                issues_resp.extend(repo_issues_response.json())

            return HttpResponse(json.dumps(issues_resp), content_type="application/json")
        else:
            return HttpResponseForbidden('GitHub API maximum tries exceeded.')

    else:
        return HttpResponseForbidden('allowed only via GET')
    