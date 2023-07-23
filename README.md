# Varonis Assessment

## 1. Use Instructions
You will need the following installed on your system:

1. Node.js (v.18.17 or higher recommended)
2. Postgres (v13 or higher recommended)

Once you have cloned the repository, use the terminal to reach root/backend and run ```npm install```.
Then, do the same in root/frontend.
Once the dependencies are installed, create a .env file in both the frontend and backend directory.
For the backend, the required enviornmental variabes are DB_USER, DB_PASSWORD, and DB_NAME, which correspond to the databbase user, password, and database name
on your local Postgres instance. You can also define the PORT variable. The default port is 3005.
For the frontend, you can use REACT_APP_BE_PORT to define the backend server port - the default is 3005. The React App, by default, starts at port 3000.

## 2. Backend Design
Throughout the design process, I wanted to build something which was scalable, flexible, and could be integrated easily with other services, but at the time, 
I did not want to over-engineer this application. The trade-off was between sticking to the recommended time allotment (~5hrs), and utilizing the time fully to 
make as many things as flexible as I could. 

I chose to construct the backend in Node.js and Express.js. 
Ultimately, for a production-ready product, we would like to use Nest.js (TypeScript + More Opinionated). 

For the database, I opted for an SQL database, and as I already had Postgres installed on my system, that is what I chose to go with. 
I also opted to use an object-relation mapping library (Sequelize). 
For a simple CPU inventory system, this is not necessary, but in the future, if we choose to expand our application to track multiple other items, 
an ORM makes things much easier. It handles protections against SQL injections, and you do not need to write SQL queries yourself. 
The trade-off is less flexibility regarding the queries, which means you sometimes lack the means to optimize performance where you could.

The API for the CPU inventory system follows RESTful conventions:

```GET/api/cpus``` -> returns a list of all CPUs.

```GET/api/cpus/:id``` -> returns the details regarding a single CPU (I do not have a seperate relation implemented right now with details for a singular
item, so I am just retrieving the targetted item from the CPU relation.

```POST/api/cpus``` -> create a new item

```PUT/api/cpus/:id``` -> Edit an item

```DELETE/api/cpus/:id``` -> Delete an item


In the future, as the number of entries grows, I suggest implementing filters and/or pagination to avoid having to retrieve everything at once. This would
look something like:

```GET/api/cpus?page=1&pageSize=20``` 

```GET/api/cpus?manufacturer=Intel&minCoreCount=4``` 

## 2. Frontend Design
The frontend is constructed using React.js. I opted not to use a global state management library, and for consuming the API, I chose Axios. 
As the scale of the application grows, we should utilize a global state management tool for caching purposes.

The ```<InventoryTable/>``` component is generic and reusable. I made it so as to give an idea of how we should also make the other components generic in 
the future if we expand our inventory to include items other than CPUs. Right now, I hardcoded the labels and input fields for these forms for CPUs only.

The CPUInventory component at ```/cpus``` makes a GET request to ```/api/cpus``` once upon rendering. When we create, edit, or delete objects, 
we update the state variable containing all the items being rendered rather than making a new GET request to reflect these changes on ```/cpus```. 
This requires “props drilling” to a small extent. For a more complex application, we should implement a cache rather than passing state down 
multiple child components.
