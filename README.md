# calculator_react_frontend
Implementation of the front end part in react of the calculator challenge.

## Tools used
- React 18.2.0 
- typescript 4.9.5
- compiled with nodejs 20+
- it uses axios, bootstrap and react-router

## Environment
It has two environment files
- .env -> for local tests
- .env.production -> for production deployment


# How to run the application locally

## Debugging locally
The front end assumes in .env that the server is running in http://localhost:8080

1- Once requirements have been installed ( node and npm)
2- Go to the source directory and run :

    $ npm install
    
    $ npm run start

## Running the build locally
A good prerequisite to run locally is to use "http-server", so install it with:

    $ npm install -g http-server

Once installed

1- Go to the source directory and run :

    $ npm run build
    
2. Go to the build subdirectory and execute the website with http-server

    $ cd build 

    
    $ http-server -p 80



This will run the website in 80 port.

## Known issues

### Not keeping session between logins
The project was originally using Cookies with httpOnly option set to hold the JWT token. But since we are not using the same domain name for the backed, we added CORS to the backend, and CORS is not well received by browsers, which don't send Cookies to CORS allowing servers.
So for this matter, we changed the Cookie management to simple HTTP Headers.
This change from Cookies to Headers, left without implementation saving the Token locally in the browser, by either using a cookie or a browser repository.

### Logout not logging out
Dute to problems mentioned before.

### Not using https
No time to set everything with certificates.

