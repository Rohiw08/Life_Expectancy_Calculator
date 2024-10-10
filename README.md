# Life Expectancy Calculator

This is a simple **Life Expectancy Calculator** built using Firebase for authentication and Firestore as the database. The backend is powered by **Python** and **Flask**, while the frontend is built with **React** and **Shadcn**.

## Features

- **Firebase Authentication**: Secure login and registration using Firebase authentication.
- **Firestore Integration**: Stores and retrieves user information and responses to life expectancy questions.
- **Life Expectancy Calculation**: A form-based survey that calculates life expectancy based on inputs like personal information and habits.
- **Flask API**: Python backend handles the calculation logic and interacts with the frontend via RESTful API.
- **Responsive Design**: Designed for mobile and desktop using React and Shadcn.

## Screenshots

### Login Page
![Screenshot 2024-10-11 031329](https://github.com/user-attachments/assets/7a69ceee-3abe-4534-9446-45e56c8d8f85)

### Personal Information Page
![Screenshot 2024-10-11 031401](https://github.com/user-attachments/assets/d861e6d1-475b-48cb-8552-e6d94e4f045d)

### Questionnaire Page
![Screenshot 2024-10-11 031442](https://github.com/user-attachments/assets/a149a9fe-03f6-42ba-a2f0-6ac40250c8c9)

### Report Page
![Screenshot 2024-10-11 031835](https://github.com/user-attachments/assets/5217f3ff-668c-42d0-a4da-c7967d12d7c3)

### About Page
![Screenshot 2024-10-11 031518](https://github.com/user-attachments/assets/619ab2cd-38c5-4d70-9de7-0a540ec9edd5)



## Tech Stack

- **Frontend**:
  - React.js
  - Shadcn UI
  - CSS for styling

- **Backend**:
  - Python
  - Flask
  - Firebase (Firestore) for data storage

- **Authentication**:
  - Firebase Authentication (Email and Google Sign-In)

## Getting Started

### Prerequisites

- Node.js and npm installed
- Python 3.x installed
- Firebase Project set up with Authentication and Firestore

### Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/Life_Expectancy_Calculator.git
    cd Life_Expectancy_Calculator
    ```

2. **Frontend Setup**:
    - Navigate to the frontend directory:
      ```bash
      cd frontend
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Set up Firebase configuration in `src/firebaseConfig.js`:
      ```javascript
      const firebaseConfig = {
        apiKey: "your-api-key",
        authDomain: "your-app.firebaseapp.com",
        projectId: "your-project-id",
        storageBucket: "your-app.appspot.com",
        messagingSenderId: "your-sender-id",
        appId: "your-app-id",
      };
      export default firebaseConfig;
      ```
    - Run the React development server:
      ```bash
      npm run dev
      ```

3. **Backend Setup**:
    - Navigate to the backend directory:
      ```bash
      cd backend
      ```
    - Create and activate a virtual environment:
      ```bash
      python3 -m venv venv
      source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
      ```
    - Install Python dependencies:
      ```bash
      pip install -r requirements.txt
      ```
    - Run the Flask development server:
      ```bash
      python app.py
      ```

4. **Firestore Setup**:
    - Set up your Firestore rules and structure to store user responses and personal information.

### Usage

1. **Sign In/Sign Up**: 
   - Users can create an account or sign in using Google or email authentication.
  
2. **Complete the Questionnaire**:
   - Answer a series of questions related to smoking, alcohol consumption, and personal information to get a life expectancy estimate.

3. **View Results**:
   - After completing the form, the backend processes the data and returns a life expectancy result.

## Future Improvements

- Add more questions for better accuracy.
- Improve the life expectancy calculation algorithm.
- Add support for multiple languages.
- Implement a history feature for users to track their responses over time.

## License

This project is licensed under the MIT License.

## Contact

For more information, feel free to contact [Rohit Waghmode] at [LinkdIn](https://www.linkedin.com/in/rohit-waghmode-7312b3254?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app).
