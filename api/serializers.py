from .models import Project,Member,Contact,Technology,Contributor
from rest_framework import serializers

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('name', 'link')

class MemberSerializer(serializers.ModelSerializer):
    contacts = ContactSerializer(many=True)

    class Meta:
        model = Member
        fields = ('name', 'post', 'img', 'contacts')

class ContributorSerializer(serializers.ModelSerializer):

	class Meta:
		model=Contributor
		fields = ('name','github')

class ProjectSerializer(serializers.ModelSerializer):
	contributors=ContributorSerializer(many=True)

	class Meta:
		model = Project
		fields = ('slug','name','type','desc','icon','technologies','long_desc','contributors','meta') 