from django.conf.urls import url,handler404
from django.conf import settings
from . import views

# handler404 = 'views.handler404'

urlpatterns=[
	url(r'^$',views.index,name='index'),
	url(r'^(?!api$|admin$).*$',views.index,name='redirect')
]
