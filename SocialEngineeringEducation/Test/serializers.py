import json
from math import sqrt
from random import randint

from .models import (
    TestInfo,
    TeoryInfo,
    TestAttempt
)

from rest_framework import serializers


class TestSerializer(serializers.ModelSerializer):
    data = serializers.JSONField()

    class Meta:
        model = TestInfo
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['data'] = instance.data_value
        return data

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.context['view'].action == 'list':
            self.fields.pop('data')


class TeoryInfoSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = TeoryInfo


class TestAttemptSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = TestAttempt
