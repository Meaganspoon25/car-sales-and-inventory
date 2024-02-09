import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()


from service_rest.models import AutomobileVO

def get_automobiles():
    response = requests.get("http://project-beta-inventory-api-1:8000/api/automobiles/")
    if response.status_code == 200:
        content = json.loads(response.content)
        for automobile in content["autos"]:
            AutomobileVO.objects.update_or_create(
                import_href=automobile["href"],
                defaults={
                    "vin": automobile["vin"],
                    "sold": automobile["sold"],
                    },
            )
        print("Service Poller retrieved the data.")
    else:
        print(f"Failed to fetch automobiles: {response.status_code}")

def poll():
    while True:
        print('Service poller polling for data')
        try:
            get_automobiles()

        except Exception as e:
            print(e, file=sys.stderr)
            print("Service Poller has received an error.")
        time.sleep(60)


if __name__ == "__main__":
    poll()
