from django.db import models
from django.urls import reverse

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=200)
    sold = models.CharField(max_length=200, default='created')

class Salesperson(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=100)

    def __str__(self):
        return self.employee_id

    def get_api_url(self):
        return reverse("api_show_salesperson", kwargs={"pk": self.pk})

    class Meta:
        ordering = ["employee_id"]

class Customer(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=20)

class Sale(models.Model):
    price = models.DecimalField(max_digits=10, decimal_places=2)

    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.CASCADE,
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="sales",
        on_delete=models.CASCADE,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return str(self.price)
