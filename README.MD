## HOW TO RUN

### Frontend

- go to `frontend-technical-interviewl-aop` folder
- run `npm install` to install dependencies
- run `npm run dev` to start the development server
- open `http://localhost:3000` to view the application

frontend questions can be accessed in folder:
`/frontend-technical-interviewl-aop/answer-frontend`

### Backend

- go to `backend-technical-interview-aop` folder
- run `npm install` to install dependencies
- run `npm run dev` to start the development server
- open `http://localhost:4000` to view the application

- #### SOAL 1

`./src/soal1`

- `GET :4000/api/todos - get all todos`
- `GET :4000/api/todos/:id - get todo by id`
- `POST :4000/api/todos - create todo`
- `PUT :4000/api/todos/:id - update todo`
- `DELETE :4000/api/todos/:id - delete todo`

- #### SOAL 2

`./src/soal2`

- `POST :4000/api/auth/register - Register`
- `POST :4000/api/auth/login - Login`
- `GET :4000/api/auth/profile - get profile`

- #### SOAL 3

answer for question 3 is written in frontend project

### Mini Project Backend

- go to `koa-backend` folder
- run `npm install` to install dependencies
- make sure you have postgres installed
- By default, the database will connect to localhost:5432 with user postgres and password postgres
- can modify it by editing the .env file
- run `npm run dev` to start the development server
- open `http://localhost:4001` to view the application

- #### API

- `GET :4001/api/todos - get all todos`
- `POST :4001/api/todos - create todo`
- `PATCH :4001/api/todos/:id/toggle - toggle todo status`
- `DELETE :4001/api/todos/:id - delete todo`
