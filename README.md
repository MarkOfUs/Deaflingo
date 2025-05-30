# Deaflingo Local Setup

Welcome to Deaflingo! This guide will walk you through the steps to set up and run the Deaflingo web application locally on your machine.

## Demo

For a demonstration of Deaflingo in action, watch our video on YouTube:

[![Deaflingo Demo Video](https://img.youtube.com/vi/7jd46k0xQxo/0.jpg)](https://youtu.be/7jd46k0xQxo)

## Prerequisites

- Python 3.11.x installed on your system. You can download it from [python.org](https://www.python.org/downloads/).
  
- Git LFS installed. Follow the steps below to install Git LFS:
  - Install [Git LFS](https://git-lfs.com/).
  - Set up Git LFS for your user account by running: `git lfs install`.

## Setup Instructions

1. Clone or download this repository to your local machine.

2. Navigate to the project directory using the command line.

3. Install the required dependencies by running the following command:

    ```bash
    pip install -r requirements.txt
    ```

    If you're on a macOS system, use the following command instead:

    ```bash
    pip install -r requirements-mac.txt
    ```

    This command will recursively install all the dependencies required for the Deaflingo web app.

    **Note:** Ensure that "pip" corresponds to your Python 3.11.x installation.

## Running the Application

1. Once all the dependencies are installed, you can start the Deaflingo web app by running the following command:

    **Note:** Ensure that "python" corresponds to your Python 3.11.x installation.

    ```bash
    python app.py
    ```

2. After executing the above command, the Flask development server will start running. You should see output similar to the following:

    ```bash
    * Running on http://127.0.0.1:8001/ (Press CTRL+C to quit)
    ```

3. Open your web browser and navigate to [http://127.0.0.1:8001/](http://127.0.0.1:8001/).

4. You should now see the home page of the Deaflingo web app, where you can interact with its features.

## Stopping the Application

To stop the Flask development server, press `CTRL+C` in the command line where the server is running. This will stop the server and free up the port.

## Additional Notes

- Make sure no other application is using port 8001 on your system to avoid conflicts with the Flask development server.

- It's recommended to use a virtual environment for Python projects to manage dependencies and avoid conflicts with system-wide packages. You can create and activate a virtual environment using `venv` or `virtualenv` as per your preference.

- If you encounter any issues during setup or running the application, feel free to reach out for assistance.
