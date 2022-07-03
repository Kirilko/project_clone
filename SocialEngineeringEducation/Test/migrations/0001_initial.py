# Generated by Django 4.0.4 on 2022-05-15 11:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TeoryInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=512)),
                ('info', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='TestInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1024)),
                ('max_attempts', models.PositiveIntegerField(default=1)),
                ('data', models.TextField(default='[]')),
            ],
        ),
    ]
