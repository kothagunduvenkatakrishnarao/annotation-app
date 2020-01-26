# Generated by Django 3.0.2 on 2020-01-18 13:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Annotation',
            fields=[
                ('image', models.ImageField(upload_to='media/')),
                ('filename', models.CharField(max_length=50, null=True)),
                ('LisenceNumber', models.CharField(max_length=30, primary_key=True, serialize=False)),
                ('company', models.CharField(max_length=50, null=True)),
                ('carmodel', models.CharField(max_length=50, null=True)),
                ('colour', models.CharField(max_length=50, null=True)),
                ('annotes', models.CharField(max_length=50, null=True)),
            ],
        ),
    ]
