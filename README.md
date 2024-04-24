\documentclass{article}
\usepackage[utf8]{inputenc}

\begin{document}

\section*{Frontend Setup}

In order to generate the environment needed to run the frontend code, we would need to install node modules in the frontend directory itself.

\begin{enumerate}
    \item Navigate to the frontend folder:
    \begin{verbatim}
    cd Frontend
    \end{verbatim}
    
    \item Run the following command to install required packages:
    \begin{verbatim}
    npm install
    \end{verbatim}
\end{enumerate}

This will install all the packages required to run our React app.

Generate an environment file in the frontend folder and add this environment variable:

\begin{verbatim}
REACT_APP_BACKEND=http://localhost:5000/api
\end{verbatim}

\section*{Backend (Node) Setup}

In order to generate the environment needed to run the backend code (Node), we would need to install node modules in the backend directory itself.

\begin{enumerate}
    \item Navigate to the backend folder:
    \begin{verbatim}
    cd ../Backend
    \end{verbatim}
    
    \item Run the following command to install required packages:
    \begin{verbatim}
    npm install
    \end{verbatim}
\end{enumerate}

This will install all the packages required to run our Node backend.

Generate an environment file in the backend folder and add these environment variables:

\begin{verbatim}
MONGO_URI='YOUR_MONGO_URI'
PORT=5000
JWT_SECRET='YOUR_JWT_SECRET'
\end{verbatim}

Replace `'YOUR_MONGO_URI'` and `'YOUR_JWT_SECRET'` with actual values.

\section*{Backend (Flask) Setup}

In order to generate the environment needed to run the backend code (Flask), we would need to install packages in Python in the Flask directory itself.

\begin{enumerate}
    \item Navigate to the Flask folder:
    \begin{verbatim}
    cd ../Flask
    \end{verbatim}
    
    \item Run the following command to install required packages:
    \begin{verbatim}
    pip install -r requirements.txt
    \end{verbatim}
\end{enumerate}

This will install all the packages required to run our Flask backend.

\end{document}
