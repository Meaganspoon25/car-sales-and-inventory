# CarCar

CarCar is an application for managing the aspects of an automobile dealership. It manages the inventory, automobile sales, and automobile services.

Team:

* **Student 1** - Auto Sales
* **Student 2** - Auto Services

## Getting Started

**Make sure you have Docker, Git, and Node.js 18.2 or above**

1. Fork this repository

2. Clone the forked repository onto your local computer:
git clone <<respository.url.here>>

3. Build and run the project using Docker with these commands:
```
docker volume create beta-data
docker-compose build
docker-compose up
```
- After running these commands, make sure all of your Docker containers are running

- View the project in the browser: http://localhost:3000/

![Img](/images/CarCarWebsite.png)

## Design

CarCar is made up of 3 microservices which interact with one another.

- **Inventory**
- **Services**
- **Sales**

![Img](/images/CarCarDiagram.png)


## Integration - How we put the "team" in "team"

Our Inventory and Sales domains work together with our Service domain to make everything here at **CarCar** possible.

How this all starts is at our inventory domain. We keep a record of automobiles on our lot that are available to buy. Our sales and service microservices obtain information from the inventory domain, using a **poller**, which talks to the inventory domain to keep track of which vehicles we have in our inventory so that the service and sales team always has up-to-date information.


## Accessing Endpoints to Send and View Data: Access Through Insomnia & Your Browser

### Manufacturers:


| Action | Method | URL
| ----------- | ----------- | ----------- |
| List manufacturers | GET | http://localhost:8100/api/manufacturers/
| Create a manufacturer | POST | http://localhost:8100/api/manufacturers/ |
| Get a specific manufacturer | GET | http://localhost:8100/api/manufacturers/id/
| Update a specific manufacturer | PUT | http://localhost:8100/api/manufacturers/id/
| Delete a specific manufacturer | DELETE | http://localhost:8100/api/manufacturers/id/


JSON body to send data:

Create and Update a manufacturer (SEND THIS JSON BODY):
- You cannot make two manufacturers with the same name
```
{
  "name": "Chrysler"
}
```
The return value of creating, viewing, updating a single manufacturer:
```
{
	"href": "/api/manufacturers/2/",
	"id": 2,
	"name": "Chrysler"
}
```
Getting a list of manufacturers return value:
```
{
  "manufacturers": [
    {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  ]
}
```

### Vehicle Models:

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List vehicle models | GET | http://localhost:8100/api/models/
| Create a vehicle model | POST | http://localhost:8100/api/models/
| Get a specific vehicle model | GET | http://localhost:8100/api/models/id/
| Update a specific vehicle model | PUT | http://localhost:8100/api/models/id/
| Delete a specific vehicle model | DELETE | http://localhost:8100/api/models/id/

Create and update a vehicle model (SEND THIS JSON BODY):
```
{
  "name": "Sebring",
  "picture_url": "image.yourpictureurl.com"
  "manufacturer_id": 1
}
```

Updating a vehicle model can take the name and/or picture URL:
```
{
  "name": "Sebring",
  "picture_url": "image.yourpictureurl.com"
}
```
Return value of creating or updating a vehicle model:
- This returns the manufacturer's information as well
```
{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Sebring",
  "picture_url": "image.yourpictureurl.com",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Daimler-Chrysler"
  }
}
```
Getting a List of Vehicle Models Return Value:
```
{
  "models": [
    {
      "href": "/api/models/1/",
      "id": 1,
      "name": "Sebring",
      "picture_url": "image.yourpictureurl.com",
      "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Daimler-Chrysler"
      }
    }
  ]
}
```

### Automobiles:
- The **'vin'** at the end of the detail urls represents the VIN for the specific automobile you want to access. This is not an integer ID. This is a string value so you can use numbers and/or letters.

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List automobiles | GET | http://localhost:8100/api/automobiles/
| Create an automobile | POST | http://localhost:8100/api/automobiles/
| Get a specific automobile | GET | http://localhost:8100/api/automobiles/vin/
| Update a specific automobile | PUT | http://localhost:8100/api/automobiles/vin/
| Delete a specific automobile | DELETE | http://localhost:8100/api/automobiles/vin/


Create an automobile (SEND THIS JSON BODY):
- You cannot make two automobiles with the same vin
```
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
```
Return Value of Creating an Automobile:
```
{
	"href": "/api/automobiles/1C3CC5FB2AN120174/",
	"id": 1,
	"color": "red",
	"year": 2012,
	"vin": "777",
	"model": {
		"href": "/api/models/1/",
		"id": 1,
		"name": "R8",
		"picture_url": "image.yourpictureurl.com",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Audi"
		}
	}
}
```
To get the details of a specific automobile, you can query by its VIN:
example url: http://localhost:8100/api/automobiles/1C3CC5FB2AN120174/

Return Value:
```
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "green",
  "year": 2011,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Sebring",
    "picture_url": "image.yourpictureurl.com",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  }
}
```
You can update the color and/or year of an automobile (SEND THIS JSON BODY):
```
{
  "color": "red",
  "year": 2012
}
```
Getting a list of Automobile Return Value:
```
{
  "autos": [
    {
      "href": "/api/automobiles/1C3CC5FB2AN120174/",
      "id": 1,
      "color": "yellow",
      "year": 2013,
      "vin": "1C3CC5FB2AN120174",
      "model": {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Sebring",
        "picture_url": "image.yourpictureurl.com",
        "manufacturer": {
          "href": "/api/manufacturers/1/",
          "id": 1,
          "name": "Daimler-Chrysler"
        }
      }
    }
  ]
}
```
# Sales Microservice

On the backend, the sales microservice has 4 models: AutomobileVO, Customer, SalesPerson, and SalesRecord. SalesRecord is the model that interacts with the other three models. This model gets data from the three other models.

The AutomobileVO is a value object that gets data about the automobiles in the inventory using a poller. The sales poller automotically polls the inventory microservice for data, so the sales microservice is constantly getting the updated data.

The reason for integration between these two microservices is that when recording a new sale, you'll need to choose which car is being sold and that information lives inside of the inventory microservice.


## Accessing Endpoints to Send and View Data - Access through Insomnia:

### Customers:


| Action | Method | URL
| ----------- | ----------- | ----------- |
| List customers | GET | http://localhost:8090/api/customers/
| Create a customer | POST | http://localhost:8090/api/customers/
| Show a specific customer | GET | http://localhost:8090/api/customers/id/

To create a Customer (SEND THIS JSON BODY):
```
{
	"name": "John Johns",
	"address": "1212 Ocean Street",
	"phone_number": 9804357878
}
```
Return Value of Creating a Customer:
```
{
	"id: "1",
	"name": "John Johns",
	"address": "1212 Ocean Street",
	"phone_number": 9804357878
}
```
Return value of Listing all Customers:
```
{
	"customers": [
		{
			"id",
			"name": "Martha Stewart",
			"address": "1313 Baker Street",
			"phone_number": "980720890"
		},
		{
			"id",
			"name": "John Johns",
			"address": "1212 Ocean Street",
			"phone_number": "9804357878"
		}
	]
}
```
### Salespeople:
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List salespeople | GET | http://localhost:8090/api/salespeople/
| Salesperson details | GET | http://localhost:8090/api/salesperson/id/
| Create a salesperson | POST | http://localhost:8090/api/salespeople/
| Delete a salesperson | DELETE | http://localhost:8090/api/salesperson/id/


To create a salesperson (SEND THIS JSON BODY):
```
{
	"name": "Jane Doe",
	"employee_number": 1
}
```
Return Value of creating a salesperson:
```
{
	"id": 1,
	"name": "Liz",
	"employee_number": 1
}
```
List all salespeople Return Value:
```
{
	"salespeople": [
		{
			"id": 1,
			"name": "Jane Doe",
			"employee_number": 1
		}
	]
}
```
### Salesrecords:
- the id value to show a salesperson's salesrecord is the **"id" value tied to a salesperson.**

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List all salesrecords | GET | http://localhost:8090/api/salesrecords/
| Create a new sale | POST | http://localhost:8090/api/salesrecords/
| Show salesperson's salesrecords | GET | http://localhost:8090/api/salesrecords/id/
List all Salesrecords Return Value:
```
{
	"sales": [
		{
			"id": 1,
			"price": 111000,
			"vin": {
				"vin": "111"
			},
			"salesperson": {
				"id": 1,
				"name": "Liz",
				"employee_number": 1
			},
			"customer": {
				"name": "Martha Stewart",
				"address": "1313 Baker Street",
				"phone_number": "980720890"
			}
		}
	]
}
```
Create a New Sale (SEND THIS JSON BODY):
```
{
	"salesperson": "Liz",
	"customer": "John Johns",
	"vin": "888",
	"price": 40000
}
```
Return Value of Creating a New Sale:
```
{
	"id": 4,
	"price": 40000,
	"vin": {
		"vin": "888"
	},
	"salesperson": {
		"id": 1,
		"name": "Liz",
		"employee_number": 1
	},
	"customer": {
		"id",
		"name": "John Johns",
		"address": "1212 Ocean Street",
		"phone_number": "9804357878"
	}
}
```
Show a Salesperson's Salesrecord Return Value:
```
{
	"id": 1,
	"price": 111000,
	"vin": {
		"vin": "111"
	},
	"salesperson": {
		"id": 1,
		"name": "Liz",
		"employee_number": 1
	},
	"customer": {
		"id",
		"name": "Martha Stewart",
		"address": "1313 Baker Street",
		"phone_number": "980720890"
	}
}
```
# Service microservice

Hello and welcome to the wonderful world of service!!
As explained above, the service microservice is an extension of the dealership that looks to provide service repairs for your vehicle.

As automobiles are purchased, we keep track of the vin number of each automobile and you are able to receive the special perks of being a VIP!
As a VIP, you will receive free oil changes for life, complimentary neck massages while in our waiting room, and free car washes whenever you would like!

This area is going to be broken down into the various API endpoints (Fancy way of saying your web address url) for service along with the format needed to send data to each component.
The basics of service are as follows:
1. Our friendly technician staff
2. Service Appointments


### Technicians - The heart of what we do here at CarCar
(We are considering renaming, don't worry)

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List technicians | GET | http://localhost:8080/api/technicians/
| Technician detail | GET | http://localhost:8080/api/technicians/<int:pk>/
| Create a technician | POST | http://localhost:8080/api/technicians/
| Delete a technician | DELETE | http://localhost:8080/api/technicians/<int:pk>/


LIST TECHNICIANS: Following this endpoint will give you a list of all technicians that are currently employed.
Since this is a GET request, you do not need to provide any data.
```
Example:
{
	"technicians": [
		{
			"name": "Donald",
			"employee_number": 1,
			"id": 1
		},
```

TECHNICIAN DETAIL: This is a GET request as well, so no data needs to be provided here either. When you list technicians, you will
see that they are assigned a value of "id". This is the value that will replace "<int:pk>. For example, if you wanted to see the technician
details related to our technician "Donald", you would input the following address: http://localhost:8080/api/technicians/1/
This would then lead to this:

```
{
	"name": "Donald",
	"employee_number": 1,
	"id": 1
}
```
This how our technician detail is displayed. If you want to change the technician, just change the value at the end to match the "id" of the technician you want to display.

CREATE TECHNICIAN - What if we hired a new technician (In this economy even)? To create a technician, you would use the following format to input the data and you would just submit this as a POST request.
```
{
	"name": "Liz",
	"employee_number": 2
}
```
As you can see, the data has the same format. In this example, we just changed the "name" field from "Donald" to "Liz". We also assigned her the "employee_number" value of "2" instead of "1".
Once we have the data into your request, we just hit "Send" and it will create the technician "Liz". To verify that it worked, just select follow the "LIST TECHNICIAN" step from above to show all technicians.
With any luck, both Donald and Liz will be there.
Here is what you should see if you select "LIST TECHNICIAN" after you "CREATE TECHNICIAN" with Liz added in:
```
{
	"technicians": [
		{
			"name": "Donald",
			"employee_number": 1,
			"id": 1
		},
		{
			"name": "Liz",
			"employee_number": 1,
			"id": 2
		},
```

DELETE TECHNICIAN - If we decide to "go another direction" as my first boss told me, then we need to remove the technician from the system. To do this, you just need to change the request type to "DELETE" instead of "POST". You also need to pull the "id" value just like you did in "TECHNICIAN DETAIL" to make sure you delete the correct one. Once they are "promoted to customer" they will no longer be in our page that lists
all technicians.


And that's it! You can view all technicians, look at the details of each technician, and create technicians.
Remember, the "id" field is AUTOMATICALLY generated by the program. So you don't have to input that information. Just follow the steps in CREATE TECHNICIAN and the "id" field will be populated for you.
If you get an error, make sure your server is running and that you are feeding it in the data that it is requesting.
If you feed in the following:
```
{
	"name": "Liz",
	"employee_number": 3,
	"favorite_food": "Tacos"
}

You will get an error because the system doesn't know what what to do with "Tacos" because we aren't ever asking for that data. We can only send in data that Json is expecting or else it will get angry at us.

```


### Service Appointments: We'll keep you on the road and out of our waiting room

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List service appointments | GET | http://localhost:8080/api/serviceappointment/
| Service appointment detail | GET | http://localhost:8080/api/serviceappointment/<int:id>
| Service appointment history | GET | http://localhost:8080/api/servicehistory/<int:vin (OPTIONAL)>
| Create service appointment | POST | http://localhost:8080/api/serviceappointment/
| Delete service appointment | DELETE | http://localhost:8080/api/serviceappointment/<int:id>


LIST SERVICE APPOINTMENT: This will return a list of all current service appointment.
This is the format that will be displayed.
Spoiler alert! Remember, the way that it is returned to you is the way that the data needs to be accepted. Remember, the "id" is automatically generated, so you don't need to input that.
Also, the "date" and "time" fields HAVE TO BE IN THIS FORMAT
```
{
	"service_appointment": [
		{
			"id": 1,
			"vin": "1222",
			"customer_name": "Barry",
			"time": "12:30:00",
			"date": "2021-07-14",
			"reason": "mah tires",
			"vip_status": false,
			"technician": "Liz"
		},
```
SERVICE APPOINTMENT DETAIL: This will return the detail of each specific service appointment.
```
{
	"id": 1,
	"vin": "1222",
	"customer_name": "Barry",
	"time": "12:30:00",
	"date": "2021-07-14",
	"reason": "mah tires",
	"vip_status": false,
	"technician": "Liz"
}
```
SERVICE APPOINTMENT HISTORY: This will show the detail based on the "VIN" that is input. You will see ALL service appointments for the vehicle associated with the "vin" that you input.
At the end of the URL, tack on the vin associated with the vehicle that you wish to view. If you leave this field blank, it will show all service history for all vehicles.
```
{
	"service_history": [
		{
			"id": 1,
			"vin": "1222",
			"customer_name": "Barry",
			"time": "12:30:00",
			"date": "2021-07-14",
			"reason": "mah tires",
			"vip_status": false,
			"technician": "Liz"
		},
		{
			"id": 6,
			"vin": "1222",
			"customer_name": "Gary",
			"time": "12:30:00",
			"date": "2021-07-11",
			"reason": "new car",
			"vip_status": false,
			"technician": "Caleb"
		}
	]
}
```
If we add "1222" to the request (eg. http://localhost:8080/api/servicehistory/1222), then it will show the above. If you put a vin that does not exist in the system, it will return a blank list.


CREATE SERVICE APPOINTMENT - This will create a service appointment with the data input. It must follow the format. Remember, the "id" is automatically generated, so don't fill that in. To verify
that it was added, just look at your service appointment list after creating a service appointment and it should be there.
```
		{
			"id": 6,
			"vin": "1222",
			"customer_name": "Gary",
			"time": "12:30:00",
			"date": "2021-07-11",
			"reason": "new car",
			"vip_status": false,
			"technician": "Caleb"
		}

```
DELETE SERVICE APPOINTMENT - Just input the "id" of the service appointment that you want to delete at the end of the url. For example, if we wanted to delete the above service history appointment for Barry
because we accidently input his name as "Gary", we would just enter 'http://localhost:8080/api/serviceappointment/6' into the field and send the request. We will receive a confirmation message saying that
the service appointment was deleted.
