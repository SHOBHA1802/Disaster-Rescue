### Frontend Setup

To generate the environment needed to run the frontend code, follow these steps:

1. Navigate to the frontend folder:
    ```bash
    cd Frontend
    ```

2. Run the following command to install all the required packages:
    ```bash
    npm install
    ```

3. Generate an environment file in the frontend folder and add the following environment variable:
    ```plaintext
    REACT_APP_BACKEND=http://localhost:5000/api
    ```

### Backend (Node.js) Setup

To generate the environment needed to run the backend code (Node.js), follow these steps:

1. Navigate to the backend folder:
    ```bash
    cd ../Backend
    ```

2. Run the following command to install all the required packages:
    ```bash
    npm install
    ```

3. Generate an environment file in the backend folder and add the following environment variables:
    ```plaintext
    MONGO_URI='your_mongo_uri'
    PORT=5000
    JWT_SECRET='your_jwt_secret'
    ```

Replace `'your_mongo_uri'` and `'your_jwt_secret'` with actual values.

### Backend (Flask) Setup

To generate the environment needed to run the backend code (Flask), follow these steps:

1. Navigate to the Flask folder:
    ```bash
    cd ../Flask
    ```

2. Run the following command to install all the required Python packages:
    ```bash
    pip install -r requirements.txt
    ```

Download the weights from https://drive.google.com/file/d/1jv7zF_kje34Ukt3slp0PX_DfYWGKlMDU/view?usp=sharing 
Download the json file of model from https://drive.google.com/file/d/1WCkE5IQ9cvlprYbUBVsjEJ_9WDmdaW3t/view?usp=sharing