from __future__ import unicode_literals

from django.db import models
from django_mysql.models import JSONField, Model
from django.template.defaultfilters import slugify

##########################################################
#MEMBERS
##########################################################
#  {
#   "name": "Abhinav Bansal",
#   "post": "Collaborator",
#   "img": "/static/images/Abhinav-Bansal.jpg",
#   "contact": [
#     "twitter",
#     "github"
#   ],
#   "contact_link": [
#     "https://github.com/ab-decoded"
#   ]
# }
class Contact(models.Model):
	name=models.CharField(max_length=50)
	link=models.CharField(max_length=100)
	def __str__(self):
		return self.link+"("+self.name+")"
class Member(models.Model):
	name=models.CharField(max_length=50)
	post=models.CharField(max_length=50)
	img=models.ImageField(upload_to='mockups',null=True)
	contacts=models.ManyToManyField(Contact)
	def __str__(self):
		return self.name+"("+self.post+")"


##########################################################
#PROJECTS
##########################################################
# {
# 	"name": "DevBible",
# 	"type": "Devlopment Guide",
# 	"desc": "For the devs, by the devs.",
# 	"icon": "/static/images/DevBible.jpg",
# 	"technologies": [],
# 	"long_desc": "# DevBible \n Some Holy Sermons from The Dev Community. \n \n DevBible is a one stop shop for dev references. It aims to be an extensive documentation so that no developer is ever lost.",
# 	"contributors": {
# 					"Divjot Singh": "bogas04",
# 					"Mayank Badola": "mbad0la",
# 					"Karanbir Chahal": "karanchahal",
# 					"A. Priyadarshi": "amaneureka",
# 					"Swati Garg": "swati4star",
# 					"Abhinav Bansal": "ab-decoded"
# 	},
# 	"meta": {
# 		"updated": "20-Jul-2016",
# 		"size": "3M",
# 		"version": "1.0.0",
# 		"platform": "All"
# 	}
# }
class Technology(models.Model):
	name=models.CharField(max_length=50,primary_key=True)
	def __str__(self):
		return self.name

# class Contributor(models.Model):
# 	name=models.CharField(max_length=50)
# 	username=models.CharField(max_length=50,primary_key=True)
# 	def __str__(self):
# 		return self.name+"("+self.username+")"

class Project(models.Model):
	slug=models.CharField(max_length=100,blank=True,primary_key=True)
	name=models.CharField(max_length=50)
	type=models.CharField(max_length=50)
	desc=models.TextField()
	icon=models.ImageField(upload_to="icons",null=True)
	technologies=models.ManyToManyField(Technology)
	long_desc=models.TextField(blank=True)
	members=models.ManyToManyField(Member)
	meta=JSONField()
	def __str__(self):
		return self.name+"("+self.desc+")"
	def save(self,*args,**kwargs):
		if not self.slug:
			self.slug=slugify(self.name)
		super(Project,self).save(*args,**kwargs)
