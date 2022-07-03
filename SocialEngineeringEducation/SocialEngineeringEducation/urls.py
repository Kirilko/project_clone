from django.contrib import admin
from django.urls import path, include
from Test import urls as base_api


urlpatterns = [
    path('admin/', admin.site.urls),
    path('rest_api/', include(
        base_api.urlpatterns
    )),
]