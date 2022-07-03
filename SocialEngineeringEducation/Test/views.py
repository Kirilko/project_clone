from rest_framework import viewsets
from .models import (
    TestInfo,
    TeoryInfo,
    TestAttempt
)
from Test.serializers import (
    TestSerializer,
    TeoryInfoSerializer,
    TestAttemptSerializer
)


class TeoryInfoViewSet(viewsets.ModelViewSet):
    queryset = TeoryInfo.objects.all()
    serializer_class = TeoryInfoSerializer


class TestViewSet(viewsets.ModelViewSet):
    queryset = TestInfo.objects.all()
    serializer_class = TestSerializer


class TestAttemptViewSet(viewsets.ModelViewSet):
    queryset = TestAttempt.objects.all()
    serializer_class = TestAttemptSerializer
