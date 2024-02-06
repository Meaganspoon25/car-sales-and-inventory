from django.db import models
from django.urls import reverse

# Create your models here.
class AutomobileVO(models.Model):
    # An AutomobileVO model containing vin and sold fields.
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=200)
    sold = models.BooleanField(default=False)

class Technician(models.Model):
    # A Technician model containing first_name, last_name, and employee_id fields.
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
    # An Appointment model containing date_time, reason, status, vin, customer and technician fields.
    # The technician field should be a foreign key.
    # Your vin field should be of type CharField. (It should not be a AutomobileVO foreign key.)
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
