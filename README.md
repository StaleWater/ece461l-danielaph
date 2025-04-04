# ece461l-danielaph
Team Project for ECE 461L, section 17930

Andrew Britt, Daniela Caballero, Neha Karne, Kanaan Macias, Alfred Morales, Connor Stewart

## Setting up Python Environment
Have python and pip installed and runnable from the command line. 
If you installed Python 3.4 or later with the installer on their website, pip comes with it.

navigate to the root directory of the repo and type:
```
pip install -r requirements.txt
```
This will install all python dependencies.

## Running the Frontend
Install npm, then navigate to the frontend/ and type:
```
npm install
```

This will install necessary dependencies, including the build tool Vite.

To run the frontend in a local server, in frontend/ type:
```
npx vite
```

## Running the Frontend and Backend Together
Do the above two setup steps first.
Navigate to frontend/ and type:
```
npx vite build
```

This will build the frontend into frontend/dist/, which the backend uses to serve
the frontend pages.

Navigate to the root directory and type:
```
py start.py
```
This will run our backend server locally and serve the frontend files in frontend/dist/.


## Deploying to Heroku
Install the Heroku CLI first.
After pushing your changes to the main git branch, type:
```
git push heroku main
```
This will deploy to Heroku's cloud server. 
If this succeeds, the server should be running at https://swlab-a23f6a354f04.herokuapp.com/
