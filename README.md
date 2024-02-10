# CarCar

CarCar is an application for managing the aspects of an automobile dealership. It manages the inventory, automobile sales, and automobile services.

Team:

* **Meagan Weatherspoon** - Auto Sales
* **Damien Camel** - Auto Services

## Getting Started

**Make sure you have Docker, Git, and Node.js 18.2 or above**

1. Fork this repository

2. Clone the forked repository onto your local computer:
git clone <https://gitlab.com/dcamel/project-beta.git>

3. Build and run the project using Docker with these commands:
```
docker volume create beta-data
docker-compose build
docker-compose up
```
- After running these commands, make sure all of your Docker containers are running

- View the project in the browser: http://localhost:3000/

![Mainpage screenshot](<CarCarWebsite.png>)

## Design

CarCar is made up of 3 microservices which interact with one another.

- **Inventory**
- **Services**
- **Sales**

![Diagram Img](<CarCarDiagram.png>)

## Integration - How we put the "team" in "team"

Our Inventory and Sales domains work together with our Service domain to make everything here at **CarCar** possible.

How this all starts is at our inventory domain. We keep a record of automobiles on our lot that are available to buy. Our sales and service microservices obtain information from the inventory domain, using two **pollers**, which talks to the inventory domain to keep track of which vehicles we have in our inventory so that the service and sales team always has up-to-date information.

Each poller is nestled under the Sales and Service apps.  While they retrieve the same information, they can be used however you would like.  In our current front-end, both the Sale and Service poller information remains unused.  The SalesForm to register a new Sale and the AppointmentForm to register a new Appointment fetch data from the Inventory API's Automobile Model.

The pollers retrieve information every 60 seconds, and you are able to configure each to your own desires. The information that can be retrieved from it (the automobileVO) is currently formatted as:

Getting a list of automobileVOs return value:
```
{
	"automobilevos": [
		{
			"import_href": "/api/automobiles/VIN001/",
			"vin": "VIN001",
			"sold": false
		},
	]
}
```

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

Create and update a vehicle model (SEND THIS JSON BODY).
Note: you may leave the picture_url field blank if you do not have an image link.
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
    "color": "blue",
    "year": 2014,
    "vin": "VIN004",
    "model_id": 4
}
```
Return Value of Creating an Automobile:
```
{
	"href": "/api/automobiles/VIN004/",
	"id": 4,
	"color": "blue",
	"year": 2014,
	"vin": "VIN004",
	"model": {
		"href": "/api/models/4/",
		"id": 4,
		"name": "Model 04",
		"picture_url": "",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Manufacturer 01a"
		}
	},
	"sold": false
}
```
To get the details of a specific automobile, you can query by its VIN:
example url: http://localhost:8100/api/automobiles/VIN001/

Return Value:
```
{
	"href": "/api/automobiles/VIN001/",
	"id": 1,
	"color": "red",
	"year": 2012,
	"vin": "VIN001",
	"model": {
		"href": "/api/models/1/",
		"id": 1,
		"name": "Model01a",
		"picture_url": "image.google.com",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Manufacturer 01a"
		}
	},
	"sold": false
}
```
You can update the color and/or year of an automobile (SEND THIS JSON BODY):
```
{
    "color": "blue",
    "year": 2012
}
```
Getting a list of Automobile Return Value:
```
{
	"autos": [
		{
			"href": "/api/automobiles/VIN001/",
			"id": 1,
			"color": "blue",
			"year": 2012,
			"vin": "VIN001",
			"model": {
				"href": "/api/models/1/",
				"id": 1,
				"name": "Model01a",
				"picture_url": "image.google.com",
				"manufacturer": {
					"href": "/api/manufacturers/1/",
					"id": 1,
					"name": "Manufacturer 01a"
				}
			},
			"sold": true
		},
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
	"first_name": "Test004",
	"last_name": "Last004",
	"address": "444 Jose Drive Dallas, TX 75001",
	"phone_number": "444-444-4444"
}
```
Return Value of Creating a Customer:
```
{
	"first_name": "Test004",
	"last_name": "Last004",
	"address": "444 Jose Drive Dallas, TX 75001",
	"phone_number": "444-444-4444",
	"id": 4
}
```
Return value of Listing all Customers:
```
{
	"customers": [
		{
			"first_name": "Test002",
			"last_name": "Last002",
			"address": "222 Jose Drive Dallas, TX 75001",
			"phone_number": "222-222-2222",
			"id": 2
		},
		{
			"first_name": "Test003",
			"last_name": "Last003",
			"address": "333 Jose Drive Dallas, TX 75001",
			"phone_number": "333-333-3333",
			"id": 3
		}
	]
}
```
### Salespeople:
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List salespeople | GET | http://localhost:8090/api/salespeople/
| Salesperson details | GET | http://localhost:8090/api/salespeople/id/
| Create a salesperson | POST | http://localhost:8090/api/salespeople/
| Delete a salesperson | DELETE | http://localhost:8090/api/salespeople/id/


To create a salesperson (SEND THIS JSON BODY):
```
{
	"first_name": "Sales004",
	"last_name": "LastSales004",
	"employee_id": "Sale004"
}
```
Return Value of creating a salesperson:
```
{
	"href": "/api/salespeople/4/",
	"first_name": "Sales004",
	"last_name": "LastSales004",
	"employee_id": "Sale004",
	"id": 4
}
```
List all salespeople Return Value:
```
{
	"salespeople": [
		{
            "first_name": "Sales004",
            "last_name": "LastSales004",
            "employee_id": "Sale004",
			"id": 4
		},
	]
}
```
### Salesrecords:
- the id value to show a salesperson's salesrecord is the **"id" value tied to a salesperson.**

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List all salesrecords | GET | http://localhost:8090/api/sales/
| Create a new sale | POST | http://localhost:8090/api/sales/
| Show salesperson's salesrecords | GET | http://localhost:8090/api/sales/id/

List all Salesrecords Return Value:
```
{
	"sales": [
		{
			"price": "100.00",
			"automobile": {
				"import_href": "/api/automobiles/NewTestVIN%20001/",
				"vin": "NewTestVIN 001",
				"sold": false,
				"id": 6
			},
			"salesperson": {
				"href": "/api/salespeople/1/",
				"first_name": "Sales001a",
				"last_name": "LastSales001",
				"employee_id": "Sale001",
				"id": 1
			},
			"customer": {
				"first_name": "Test002",
				"last_name": "Last002",
				"address": "222 Jose Drive Dallas, TX 75001",
				"phone_number": "222-222-2222",
				"id": 2
			},
			"id": 1
		},
    ]
}
```
Create a New Sale (SEND THIS JSON BODY):
```
{
	"customer": 2,
	"automobile": 3,
	"salesperson": 2,
	"price": 210000.00
}
```
Return Value of Creating a New Sale:
```
{
	"sale": {
		"price": "100.00",
		"automobile": {
			"import_href": "/api/automobiles/NewTestVIN%20001/",
			"vin": "NewTestVIN 001",
			"sold": false,
			"id": 6
		},
		"salesperson": {
			"href": "/api/salespeople/1/",
			"first_name": "Sales001a",
			"last_name": "LastSales001",
			"employee_id": "Sale001",
			"id": 1
		},
		"customer": {
			"first_name": "Test002",
			"last_name": "Last002",
			"address": "222 Jose Drive Dallas, TX 75001",
			"phone_number": "222-222-2222",
			"id": 2
		},
		"id": 1
	}
}
```

# Service microservice

Hello and welcome to the wonderful world of service!!
As explained above, the service microservice is an extension of the dealership that looks to provide service repairs for your vehicle.

As automobiles are purchased, we keep track of the vin number of each automobile and you are able to receive the special perks of being a VIP!
As a VIP, you will receive free oil changes for life, complimentary neck massages while in our waiting room, and free car washes whenever you would like!

The AutomobileVO is a value object receives Inventory API automobile infromation from the included sales poller. The poller attempts to pull every 60 seconds and can be configured.  Note that a AutomobileVO List API exists and can be GET requested for the entries.  If you do not wish to implement future featurse that utilize this, please feel free to remove.

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
			"href": "/api/technicians/1/",
			"id": 1,
			"first_name": "Larry",
			"last_name": "DarrylDarryl",
			"employee_id": "E001"
		},
    ]
}
```

TECHNICIAN DETAIL: This is a GET request as well, so no data needs to be provided here either. When you list technicians, you will
see that they are assigned a value of "id". This is the value that will replace "<int:pk>. For example, if you wanted to see the technician
details related to our technician "Donald", you would input the following address: http://localhost:8080/api/technicians/1/
This would then lead to this:

```
{
	"href": "/api/technicians/1/",
	"id": 1,
	"first_name": "Larry",
	"last_name": "DarrylDarryl",
	"employee_id": "E001"
},
```
This how our technician detail is displayed. If you want to change the technician, just change the value at the end to match the "id" of the technician you want to display.

CREATE TECHNICIAN - What if we hired a new technician (In this economy even)? To create a technician, you would use the following format to input the data and you would just submit this as a POST request.
```
{
	"first_name": "Stephanie",
	"last_name": "Vanderkellen",
	"employee_id": "E002"
}
```
As you can see, the data has the same format. In this example, we just changed the "name" field from "Larry" to "Stephanie". We also assigned her the "employee_number" value of "E002" instead of "E001".
Once we have the data into your request, we just hit "Send" and it will create the technician "Stephanie". To verify that it worked, just select follow the "LIST TECHNICIAN" step from above to show all technicians.
With any luck, both Larry and Stephanie will be there.
Here is what you should see if you select "LIST TECHNICIAN" after you "CREATE TECHNICIAN" with Stephanie added in:
```
{
	"technicians": [
		{
			"href": "/api/technicians/1/",
			"id": 1,
			"first_name": "Larry",
			"last_name": "DarrylDarryl",
			"employee_id": "E001"
		},
		{
			"href": "/api/technicians/2/",
			"id": 2,
			"first_name": "Stephanie",
			"last_name": "Vanderkellen",
			"employee_id": "E002"
		},
    ]
}
```

DELETE TECHNICIAN - If we decide to "go another direction" as my first boss told me, then we need to remove the technician from the system. To do this, you just need to change the request type to "DELETE" instead of "POST". You also need to pull the "id" value just like you did in "TECHNICIAN DETAIL" to make sure you delete the correct one. Once they are "promoted to customer" they will no longer be in our page that lists
all technicians.


And that's it! You can view all technicians, look at the details of each technician, and create technicians.
Remember, the "id" field is AUTOMATICALLY generated by the program. So you don't have to input that information. Just follow the steps in CREATE TECHNICIAN and the "id" field will be populated for you.
If you get an error, make sure your server is running and that you are feeding it in the data that it is requesting.
If you feed in the following:
```
{
	"first_name": "Stephanie",
	"last_name": "Vanderkellen",
	"employee_id": "E002"
	"favorite_food": "Tacos"
}

You will get an error because the system doesn't know what what to do with "Tacos" because we aren't ever asking for that data. We can only send in data that Json is expecting or else it will get angry at us.

```


### Service Appointments: We'll keep you on the road and out of our waiting room

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List service appointments | GET | http://localhost:8080/api/appointments/
| Service appointment detail | GET | http://localhost:8080/api/appointments/<int:id>
| Create service appointment | POST | http://localhost:8080/api/appointments/
| Delete service appointment | DELETE | http://localhost:8080/api/appointments/<int:id>


LIST SERVICE APPOINTMENT: This will return a list of all current service appointment.
This is the format that will be displayed.
Spoiler alert! Remember, the way that it is returned to you is the way that the data needs to be accepted. Remember, the "id" is automatically generated, so you don't need to input that.
Also, the "date" and "time" fields HAVE TO BE IN THIS FORMAT
```
{
	"service_appointment": [
		{
			"href": "/api/appointments/1/",
			"id": 1,
			"date_time": "2024-02-06T15:31:59+00:00",
			"reason": "mah tires",
			"status": false,
			"customer": "Barry",
			"vin": "1222",
			"technician": "E001"
		},
    ]
}
```
SERVICE APPOINTMENT DETAIL: This will return the detail of each specific service appointment.
```
{
	"href": "/api/appointments/1/",
	"id": 1,
	"date_time": "2024-02-06T15:31:59+00:00",
	"reason": "mah tires",
	"status": false,
	"customer": "Barry",
	"vin": "1222",
	"technician": "E001"
}
```
CREATE SERVICE APPOINTMENT - This will create a service appointment with the data input. It must follow the format. Remember, the "id" is automatically generated, so don't fill that in. To verify
that it was added, just look at your service appointment list after creating a service appointment and it should be there.
```
{
    "date_time": "2024-04-07T15:31:59+00:00",
    "reason": "mah tires",
    "status": "created",
    "customer": "Barry",
    "vin": "1222",
    "technician": "E001"
}

```
DELETE SERVICE APPOINTMENT - Just input the "id" of the service appointment that you want to delete at the end of the url. For example, if we wanted to delete the above service history appointment for Barry
because we accidently input his name as "Gary", we would just enter 'http://localhost:8080/api/appointments/6' into the field and send the request. We will receive a confirmation message saying that
the service appointment was deleted.

SERVICE APPOINTMENT HISTORY: This is calculated on the front-end through React.  If you wish to configure your poller to obtain this information, you are free to do so.

Please see the React Components section for the Service Domain Features to see how it has been done.


## React Compents
Here we will explain how our React front-end components function.  We break this down into four categories:

### React Basic Features:
<!-- mainpage / index / index.css / app.js / nav.js -->
The mainpage for CarCar is fairly basic, but you may customize it to your hearts content.  Overarching styling can be added in index.css.  The App.js file serves as the root component that directs the displayed content to the user and renders the Nav component.  The Nav.js holds the links for the navigation header.

### Inventory Domain Features:
<!-- manufacturers / models / automobiles  -->
The Inventory domain focuses on the management of CarCar's inventory stock.  On the front end, we have the following .js files for you to manage the physical automobile stock and information (manufacturer and models).

#### Manufacturers Form
The Manufacturer Form allows the creation of new manufacturer data files.  The form is straightforward; requiring the new manufacturer's name (name).  The handleSubmit function prevents the default submission to allow for a new data object to be created.  The API call is defined to be a POST request, which will be directed to http://localhost:8100/api/manufacturers/ .

As the user is inputting information into the input fields, the handleSubmit functions are updating the component's states with the current value.

When the user has finished and submits the form, the asynchronous fetch call is made.  The handleSubmit function will wait until the fetch request is completed.  If the response from the Inventory API indicates a status of OK, meaning the manufacturer entry was successfully created, the handleSubmit function resets the variables to empty strings and "hasCreated" is set to true.

The conditional rendering of the form will create a success message when the state change of "hasCreated" becomes true.  The page will re-render, alerting the user and displaying the customizable success-message text.

#### Manufacturers List
The Manufacturer List displays all entries of the manufacturer database.  The getData function engages an asynchronous fetch of this data by sending a GET request to http://localhost:8100/api/manufacturers/ . If the Inventory API returns a successful response of response.ok being true, the data is extracted from the response and re-rendered to be displayed in the page's table.

The useEffect hook receives an empty array at the initial page load.  Upon getData's successful fetch, useEffect updates the manufacturers state with the retrieved data, causing the component to rerender with the list of manufacturers.

#### Models Form
The Models Form allows the creation of new model data files.  The form is straightforward; requiring the new model's name (name), picture URL (picture_url), and manufacturer (manufacturer).

The manufacturer information is fetched from http://localhost:8100/api/manufacturers/  This information is stored in the manufacturers state, making the list of manufacturers available for selection in the form.  The useEffect hook ensures this infomration is present before the user interacts with the form.

The handleSubmit function prevents the default submission to allow for a new data object to be created.  The API call is defined to be a POST request, which will be directed to http://localhost:8100/api/models/ .

As the user is inputting information into the input fields, the handleSubmit functions are updating the component's states with the current value.

When the user has finished and submits the form, the asynchronous fetch call is made.  The handleSubmit function will wait until the fetch request is completed.  If the response from the Inventory API indicates a status of OK, meaning the model entry was successfully created, the handleSubmit function resets the variables to empty strings and "hasCreated" is set to true.

The conditional rendering of the form will create a success message when the state change of "hasCreated" becomes true.  The page will re-render, alerting the user and displaying the customizable success-message text.

#### Models List
The Models List displays all entries of the models database.  The getData function engages an asynchronous fetch of this data by sending a GET request to http://localhost:8100/api/models/ . If the Inventory API returns a successful response of response.ok being true, the data is extracted from the response and re-rendered to be displayed in the page's table.

The useEffect hook receives an empty array at the initial page load.  Upon getData's successful fetch, useEffect updates the models state with the retrieved data, causing the component to rerender with the list of models.

Regarding the Picture URL field:  In the back-end, the picture_url field is allowed to be blank.  Here in the Models List form, the form checks if the string is empty or contains information.  If information is found, it handles the URL and generates an image for display.  If the string is blank, a message indicating "No URL provided" is displayed with the color red.

#### Automobiles Form
The Automobiles Form allows the creation of new automobile data files.  The form requires the new automobile's VIN (vin), color (color), year(year), and model (model).  By default, a newly created automobile's sold status is set to No.

The model information is fetched from http://localhost:8100/api/models/  This information is stored in the models state, making the list of models available for selection in the form.  The useEffect hook ensures this infomration is present before the user interacts with the form

The handleSubmit function prevents the default submission to allow for a new data object to be created.  The API call is defined to be a POST request, which will be directed to http://localhost:8100/api/automobiles/ .

As the user is inputting information into the input fields, the handleSubmit functions are updating the component's states with the current value.

When the user has finished and submits the form, the asynchronous fetch call is made.  The handleSubmit function will wait until the fetch request is completed.  If the response from the Inventory API indicates a status of OK, meaning the automobile entry was successfully created, the handleSubmit function resets the variables to empty strings and "hasCreated" is set to true.

The conditional rendering of the form will create a success message when the state change of "hasCreated" becomes true.  The page will re-render, alerting the user and displaying the customizable success-message text.

#### Automobiles List
The Automobile List displays all entries of the automobile database.  The getData function engages an asynchronous fetch of this data by sending a GET request to http://localhost:8100/api/automobiles/ . If the Inventory API returns a successful response of response.ok being true, the data is extracted from the response and re-rendered to be displayed in the page's table.

The useEffect hook receives an empty array at the initial page load.  Upon getData's successful fetch, useEffect updates the models state with the retrieved data, causing the component to rerender with the list of models.

Note regarding the Sold field:  The SalesForm described later will be submitting a PUT request to update when an automobile is sold.

### Sales Domain Features:
<!-- Customers, Salespeople, and Sales -->
The Sales domain focuses on the management of CarCar's appointment registration.  On the front end, we have the following .js files for you to manage customers, sales team members, and sale recordds.

### Customers Form
I created a React component named "CustomersForm" that creates a form to add customer information. It utilizes React Hooks like useState and useEffect to manage form data and submission state. The form handles input changes, form submission, and displays a success message upon successful submission. Additionally, it fetches data when the component mounts. The code follows a typical React pattern of handling state changes and user interactions to create a dynamic and interactive form component.

### Customers List
My code defines a React component called "CustomerList" that fetches customer data from an API endpoint upon mounting. It utilizes React hooks like useState and useEffect to manage state and perform side effects. The fetched data is stored in the components state and rendered in a table format. displaying attributes such as first name, last name, address, and phone number.

### Salesperson Form
I created a React component named "SalespersonForm" that creates a form to add a salesperson information. It utilizes React Hooks like useState and useEffect to manage form data and submission state. The form handles input changes, form submission, and displays a success message upon successful submission. Additionally, it fetches data when the component mounts. The code follows a typical React pattern of handling state changes and user interactions to create a dynamic and interactive form component.

### Salespeople List
My code defines a React component called "SalespeopleList" that fetches customer data from an API endpoint upon mounting. It utilizes React hooks like useState and useEffect to manage state and perform side effects. The fetched data is stored in the components state and rendered in a table format. displaying attributes such as first name, last name, and employee_id.

### Sales Form
I defined a React component named SalesForm, designed to facilitate the recording of sales data. This component leverages React's functional component syntax, importing essential features such as the useState and useEffect hooks from the react package. These hooks are pivotal for managing state and handling side effects within the component.
Upon initialization, the component sets up several state variables using the useState hook. These variables include formData, which captures data related to the sale such as automobile details, salesperson information, customer data, and the sale price. Additionally, it tracks whether the form has been submitted through the isSubmitted state variable.

To populate dropdowns with data fetched from external sources, the component utilizes the useEffect hook. This hook triggers the execution of the fetchData function when the component mounts. The fetchData function, an asynchronous operation, retrieves automobile, salesperson, and customer data from corresponding API endpoints using the Fetch API. Upon successful retrieval, it updates the state variables associated with each data type.
The handleSubmit function handles form submission events, preventing the default form behavior and preparing the form data for submission to the server. It constructs a POST request with the form data and sends it to the appropriate API endpoint. In case of success, it resets the form data and sets the isSubmitted state to true. Conversely, any errors encountered during the submission process are logged to the console.
Changes to form input fields are managed by the handleInputChange function, which updates the formData state based on user input. This ensures that the form data remains synchronized with user interactions.

The updateAutomobileSoldStatus feature will send a PUT request to Inventory API at http://localhost:8100/api/automobiles/${vin}/ using the specific automobile VIN.  The PUT request will change the entry's "sold" status from "false" (default) to "true" (meaning the automobile was sold).  This will be important later on for the Appointment History form to display VIP status.

Finally, the component returns JSX code representing the structure of the sales form. This includes input fields for selecting automobile VIN, salesperson, and customer, as well as an input field for specifying the sale price. Additionally, it renders a success message upon successful submission of the form. The SalesForm component is exported as the default export, making it available for use in other parts of the application.

### Sales List
My code defines a React component called "SalespeopleList" that fetches customer data from an API endpoint upon mounting. It utilizes React hooks like useState and useEffect to manage state and perform side effects. The fetched data is stored in the components state and rendered in a table format. displaying attributes such as employee id, salesperson first/last name, customers first/last name, VIN, and price.

### SalesHistory
I defined a React functional component called "SalespersonsHistory". Its purpose is to display the sales history of individual salespersons. At the beginning of the component, it imports React along with the useState and useEffect hooks from the react package. These hooks are crucial for managing state and handling side effects within the component.
The component initializes several state variables using the useState hook. These include salespersons, which stores the list of salespersons fetched from the server; selectedSalesperson, which keeps track of the currently selected salesperson; filteredSales, which stores sales data filtered based on the selected salesperson; and allSales, which holds all sales data fetched from the server.
Two asynchronous functions, fetchSalespersons and fetchSalesData, are defined to retrieve salesperson and sales data from respective API endpoints using the Fetch API. Upon successful retrieval, these functions update the corresponding state variables using the setSalespersons and setAllSales functions.
The useEffect hook is utilized to execute the fetchSalespersons and fetchSalesData functions when the component mounts. This ensures that the data fetching operations are performed once after the initial render.
A handleSalespersonChange function is implemented to respond to changes in the selected salesperson in the dropdown menu. This function updates the selectedSalesperson state and filters the allSales array to only include sales associated with the selected salesperson. The filtered sales data is then stored in the filteredSales state variable.
The JSX returned by the component represents the visual structure of the sales history display. It includes a heading, a dropdown menu for selecting salespersons, and a table for displaying sales data filtered by the selected salesperson. The dropdown menu is populated dynamically with options generated from the salespersons state variable.

### Services Domain Features:
<!-- Appointments, and Technicians -->
The Services domain focuses on the management of CarCar's appointment registration.  On the front end, we have the following .js files for you to manage appointments and technician staff.

#### Technician Form
The Technician Form allows the creation of new technician data files.  The form is straightforward; requiring the new technician's employee ID (employee_id), first name (first_name), and last name (last_name).  The handleSubmit function prevents the default submission to allow for a new data object to be created.  The API call is defined to be a POST request, which will be directed to http://localhost:8080/api/technicians/ .

As the user is inputting information into the input fields, the handleSubmit functions are updating the component's states with the current value.

When the user has finished and submits the form, the asynchronous fetch call is made.  The handleSubmit function will wait until the fetch request is completed.  If the response from the Service API indicates a status of OK, meaning the technician entry was successfully created, the handleSubmit function resets the variables to empty strings and "hasCreated" is set to true.

The conditional rendering of the form will create a success message when the state change of "hasCreated" becomes true.  The page will re-render, alerting the user and displaying the customizable success-message text.

#### Technician List
The Technician List displays all entries of the technician database.  The getData function engages an asynchronous fetch of this data by sending a GET request to http://localhost:8080/api/technicians/ . If the Service API returns a successful response of response.ok being true, the data is extracted from the response and re-rendered to be displayed in the page's table.

The useEffect hook receives an empty array at the initial page load.  Upon getData's successful fetch, useEffect updates the technicians state with the retrieved data, causing the component to rerender with the list of technicians.

#### Appointment Form
The Appointment Form allows the creation of new appointment data files.  The form requires the specific automobile's VIN (vin), customer name (customer), date and time (date_time), requested technician (technician), and reason for service (reason).

The technician information is fetched from http://localhost:8080/api/technicians/  This information is stored in the technicians state, making the list of technicians available for selection in the form.  The useEffect hook ensures this infomration is present before the user interacts with the form.

The handleSubmit function prevents the default submission to allow for a new data object to be created.  The API call is defined to be a POST request, which will be directed to http://localhost:8080/api/appointments/ .

Note:  notice the combinedDateTime variable.  The date and time inputs are combined into a single date-time string following ISO 8601 format.

As the user is inputting information into the input fields, the handleSubmit functions are updating the component's states with the current value.

When the user has finished and submits the form, the asynchronous fetch call is made.  The handleSubmit function will wait until the fetch request is completed.  If the response from the Service API indicates a status of OK, meaning the appointment entry was successfully created, the handleSubmit function resets the variables to empty strings and "hasCreated" is set to true.

The conditional rendering of the form will create a success message when the state change of "hasCreated" becomes true.  The page will re-render, alerting the user and displaying the customizable success-message text.

#### Appointment List
The Appointment List displays all appointment database entries marked with a status of "created".  The getData function engages an asynchronous fetch of this data by sending a GET request to http://localhost:8080/api/appointments/ . If the Service API returns a successful response of response.ok being true, the data is extracted from the response and filtered for only "created" status entries.  The result is re-rendered to be displayed in the page's table, which is sorted by date-time.

Note the VIP column:  This is using the fetchVipVins function, which fetches the current automobile list through the Inventory API by sending a GET request to http://localhost:8100/api/automobiles/ .  A new array is created containing only the VINs of each automobile, which is then passed to create a new "set" object, stripping away duplicate VINs.  Now we have the state vipVins which holds the filtered information.

In the JSX, the mapping generates a row for each iteration of the filtered (created status) appointment list.  It checks the vipVins list if it "has" the current row's vin.  If it does, "Yes ⭐" is displayed.  If not, a simple "No".  We hope the emoji is useful for catching the staff's eyes.

Note the Date and Ttime columns:  Admittedly a bit tricky to set up, the date-time field is split into two columns for viewer ease.  The initial date-time value is formed by creating a date object, then manipulating the object to display the specific information.  The formattedDate has is currently configured to ignore a 0 infront of the month and day number display.

Note the Cancel and Finish buttons:  We have an updateAppointmentStatus function to send a PUT request to a specific appointment through http://localhost:8080/api/appointments/${appointmentId}/ .  The PUT is designed to send the update request containing only the specific appointment's status of "cancelled" or "finished" depending on which button is selected.  As the buttons are clicked and the status receipt is confirmed, the list is updated.  As these appointments are no longer under the status of "created", they will not be included in this filtered list page.

The useEffect hook receives an empty array at the initial page load.  Upon getData's successful fetch, useEffect updates the appointments state with the retrieved data, causing the component to rerender with the list of filtered appointments.

#### Appointment History
The Appointment History initially displays all appointment database entries.  The getData function engages an asynchronous fetch of this data by sending a GET request to http://localhost:8080/api/appointments/ . If the Service API returns a successful response of response.ok being true, the data is extracted from the response.  The result is re-rendered to be displayed in the page's table, which is sorted by date-time.

Note the VIP column:  Same functionality as the Appointment list.

Note the Date and Time columns:  They function the same as the Appointment List mentioned above.

Note the Search by VIN feature: the handleFilterVinChange function uses an event that triggers the function call.  When the user inputs text ("onChange"), the setFilterVinValue is called which updates after each new field change is done by the user.  This goes to filteredAppointments which filters the appointment list based off the inputted VIN entry.  We have specifically set this to not be case-sensitive, so a user doesn't have to worry about the capitlization of letters.  With each paste or keystroke, the user's list will refresh with matching entries of that VIN.
