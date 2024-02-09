from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Technician, AutomobileVO, Appointment


class AutomobileVOListEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "vin",
        "sold",
    ]

class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]

class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]

class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date_time",
        "reason",
        "status",
        "customer",
        "vin",
    ]
    def get_extra_data(self, o):
        return {"technician": o.technician.employee_id}

class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date_time",
        "reason",
        "status",
        "customer",
        "vin",
        "technician",
    ]
    encoders = {
        "technician": TechnicianDetailEncoder(),
    }

@require_http_methods(["GET"])
def api_list_testpoller(request):
    if request.method == "GET":
        automobilevos = AutomobileVO.objects.all()
        return JsonResponse(
            {"automobilevos": automobilevos},
            encoder=AutomobileVOListEncoder,
        )

@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder,
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianListEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_technician(request, pk):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(pk=pk)
            return JsonResponse(
                technician,
                encoder=TechnicianListEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            technician = Technician.objects.get(pk=pk)
            technician.delete()
            return JsonResponse(
                technician,
                encoder=TechnicianDetailEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.get(pk=pk)

            props = ["first_name", "last_name", "employee_id"]
            for prop in props:
                if prop in content:
                    setattr(technician, prop, content[prop])
            technician.save()
            return JsonResponse(
                technician,
                encoder=TechnicianDetailEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response

@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:

            technician = Technician.objects.get(id=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician id"},
                status=400,
            )
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_appointment(request, pk):
    if request.method == "GET":
        appointment = Appointment.objects.get(id=pk)
        return JsonResponse(
            {"appointments": appointment},
            encoder=AppointmentDetailEncoder,
        )
    elif request.method == "DELETE":
        count, _ = Appointment.objects.filter(pk=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        try:
            content = json.loads(request.body)
            appointment = Appointment.objects.get(pk=pk)

            if 'status' in content and content['status'] in ['cancelled', 'finished']:
                appointment.status = content['status']
                appointment.save()
                return JsonResponse(
                    appointment,
                    encoder=AppointmentDetailEncoder,
                    safe=False,
                )
            else:
                return JsonResponse({"message": "Invalid status. Only 'cancelled' or 'finished' are acceptable."}, status=400)
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Appointment not found"}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({"message": "Invalid request body"}, status=400)
