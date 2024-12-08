
User Management System

A user-friendly RBAC React application for managing a list of users. This application allows CRUD (Create, Read, Update, Delete) operations on users and integrates seamlessly with a RESTful API for data persistence.

Features

	•	Navigation Bar:
	•	Easily navigate between Home, UserList, and RoleList pages.
	•	Active link styling using NavLink from React Router.
	•	User Management:
	•	Fetch users from an API and display them in a responsive table.
	•	Add new users with a modal form.
	•	Edit user details inline with real-time validation.
	•	Delete users with a single click.
	•	State Management:
	•	Managed using React’s useState and useEffect hooks.
	•	API Integration:
	•	CRUD operations using Axios for seamless interaction with a RESTful API running on JSON Server.
	•	Reusable Components:
	•	Custom reusable buttons and input components for better modularity.
	•	Responsive Design:
	•	Built with Tailwind CSS for a clean and responsive user interface.

Tech Stack

Frontend

	•	React.js: For building the user interface.
	•	TypeScript: Ensures type safety and better developer experience.
	•	React Router: For navigation and routing between pages.
	•	Axios: For handling API requests.
	•	Tailwind CSS: For styling and responsiveness.

Backend

	•	RESTful API running on JSON Server or a custom backend to handle user data.

Getting Started

Installation

	1.	Clone this repository:

git clone https://github.com/Mayurwaghgpr/Admin-dash-board.git
cd your-repo-name


	2.	Install dependencies:

npm install



Starting the Application

	1.	Start the backend server (JSON Server):

json-server --watch db.json --port 3001

(Ensure you have a db.json file with user data or create one based on the expected schema.)

	2.	Start the React development server:

npm start



API Endpoints

	•	GET /users: Fetch all users.
	•	POST /users: Add a new user.
	•	PUT /users/:id: Update an existing user.
	•	DELETE /users/:id: Delete a user.

Folder Structure

src/
├── components/
|   ├── NaveBar.tsx  
│   ├── CommonInput.tsx       # Reusable input component
│   ├── SaveBtn.tsx           # Save button
│   ├── CancelBtn.tsx         # Cancel button
│   ├── EditBtn.tsx           # Edit button
│   ├── DeleteBtn.tsx         # Delete button
├── pages/
|   ├── Rolse/
|       ├──RolesList.tsx      #Role management page
|   ├── Users/
│   	├── UsersList.tsx     # User management page
├── App.tsx                   # Main app entry point
├── main.tsx                  # React DOM rendering
└── styles/                   # Tailwind and global CSS

Usage

	1.	Navigate to the UserList page.
	2.	View the list of users fetched from the API.
	3.	Add a new user by clicking the “Add User+” button.
	4.	Edit a user by clicking the edit icon and making inline changes.
	5.	Delete a user by clicking the delete icon.

Customizations

	•	Backend: Replace the API URL in UsersList.tsx (http://localhost:3001/users) with your custom API URL.
	•	Styling: Modify Tailwind CSS classes to match your desired theme or design.

Known Issues

	•	Currently, there is no authentication. All user management features are public.
	•	Validation for user input is minimal; additional checks can be implemented.

Future Improvements

	•	Add user authentication and authorization.
	•	Implement pagination or infinite scrolling for larger datasets.
	•	Include loading and error states for better user feedback.
	•	Enhance form validation to prevent invalid data submissions.

Contributing

Contributions are welcome! Please follow these steps:
	1.	Fork the repository.
	2.	Create a feature branch:

git checkout -b feature-name


	3.	Commit your changes:

git commit -m "Add your message"


	4.	Push to the branch:

git push origin feature-name


	5.	Submit a pull request.

License

This project is licensed under the MIT License. See the LICENSE file for details.

Contact

For any questions or feedback, feel free to reach out:
	•	Email: mayur2002wagh@gmail.com
	•	GitHub:[MayurWagh](https://github.com/Mayurwaghgpr)

