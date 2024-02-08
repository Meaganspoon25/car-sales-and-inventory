from django.urls import path
from .views import api_list_salespersons, api_show_salesperson, api_list_customer, api_show_customer, api_list_sales, api_show_sales


urlpatterns = [
    path("salespeople/", api_list_salespersons, name="api_list_salespersons"),
    path("salespeople/<int:pk>/", api_show_salesperson, name="api_show_salesperson"),
    path("customers/", api_list_customer, name="api_list_customer"),
    path("customers/<int:pk>/", api_show_customer, name="api_show_customer"),
    path("sales/", api_list_sales, name="api_list_sales"),
    path("sales/<int:pk>/", api_show_sales, name="api_show_sales"),

]
