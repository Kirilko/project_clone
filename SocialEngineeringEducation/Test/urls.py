from django.urls import re_path, include
from rest_framework import routers
from .views import (
    TeoryInfoViewSet,
    TestViewSet,
    TestAttemptViewSet
)

router = routers.DefaultRouter()

router.register(r'teory_info', TeoryInfoViewSet, basename='TeoryInfo')
router.register(r'test', TestViewSet, basename='Test')
router.register(r'test_attempt', TestAttemptViewSet, basename='TestAttempt')

urlpatterns = [
    re_path(r'^', include(router.urls)),
]