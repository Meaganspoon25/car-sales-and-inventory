# Generated by Django 4.0.3 on 2024-02-06 16:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0002_alter_salesperson_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='automobilevo',
            name='sold',
            field=models.CharField(max_length=200),
        ),
    ]
