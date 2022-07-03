import json
from django.db import models
from django.contrib.auth.models import AbstractUser


class TestInfo(models.Model):
    name = models.CharField(max_length=1024)
    max_attempts = models.PositiveIntegerField(default=1)
    data = models.TextField(default='[]')

    @property
    def data_value(self):
        if isinstance(self.data, list):
            return self.data
        try:
            return json.loads(self.data)
        except:
            return []

    def save(self, *args, **kwargs):
        self.data = json.dumps(self.data_value)
        super().save(*args, **kwargs)


class TeoryInfo(models.Model):
    name = models.CharField(max_length=512)
    info = models.TextField()

class TestAttempt(models.Model):
    test = models.ForeignKey(TestInfo, on_delete=models.PROTECT)
    dttm_start = models.DateTimeField(auto_now_add=True)
    dttm_end = models.DateTimeField(null=True, blank=True)
    answers = models.TextField(default='[]')