from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=200)
    sold = models.BooleanField(default=False)

class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200)

    def __str__(self):
        return self.employee_id

    def get_api_url(self):
        return reverse("api_show_technician", kwargs={"pk": self.pk})

    class Meta:
        ordering = ["employee_id"]

class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    status = models.CharField(max_length=200, default='created')
    customer = models.CharField(max_length=200)
    vin = models.CharField(max_length=200)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.SET_NULL,
        null=True
    )
    def __str__(self):
        return self.reason
    def get_api_url(self):
        return reverse("api_show_appointment", kwargs={"pk": self.pk})
    class Meta:
        ordering = ["date_time"]
