# Running ByteBooks Setup Instructions

Follow these simple steps to get started with ByteBooks.

## Prerequisites

Before you begin, ensure you have Docker installed on your machine. If you do not have Docker installed, you can download it from [Docker's official website](https://www.docker.com/get-started).


## Installation Steps

### 1. Clone the Repository

Start by cloning the project repository to your local machine. Open a terminal and run the following command.

```bash
git clone git@csgit.ucalgary.ca:ryan.huynh/seng513-202401-group-15.git
```

And enter the project's repository

```bash
cd seng513-202401-group-15
```
### 2. Set up environment variables
Create a .env file and paste the following contents into it. 
```bash
MYSQL_ROOT_PASSWORD=secret
MYSQL_DATABASE=app_db
MYSQL_USER=user
MYSQL_PASSWORD=secret
```
### 3. Run the docker to view the app

```bash
docker-compose up --build
```
When the containers are done building, the app will be available on [http://localhost:8888](http://localhost:8888) on your browser. 