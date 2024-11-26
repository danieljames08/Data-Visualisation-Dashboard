# Data Visualization Dashboard

This is a Data Visualization Dashboard built using React, Redux, and WebSockets for real-time data updates. The dashboard includes various components like charts and tables, all of which are dynamically populated using data fetched via APIs. The application is designed to manage state using Redux stores and reducers, ensuring smooth and scalable state management.

## Features

- **Real-Time Data Updates**: Data is fetched via WebSockets, allowing updates without page reloads.
- **Dynamic Charts & Tables**: Displays sales performance, product data, and system health metrics in real-time.
- **State Management with Redux**: Efficiently manages the state of various components like charts and tables.
- **Custom Styling**: The design is implemented using Tailwind CSS, Bootstrap, and Material UI for modern, responsive styling.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **Redux**: For state management across components.
- **WebSockets**: For real-time updates, implemented using the `ws` npm package.
- **Tailwind CSS**: Utility-first CSS framework for responsive design.
- **Bootstrap**: A popular CSS framework for responsive and mobile-first web design.
- **Material UI**: A React component library for implementing Material Design.
- **JSONBin**: API for data storage and retrieval.

## Features & Components

- **Sales Performance Charts**: Bar charts displaying sales data with filters.
- **Top Products**: Scatter plot showing product sales in real-time.
- **Table Data**: A table displaying tasks completed and average time by different teams.
- **System Health Metrics**: Displays metrics like server load and uptime.

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

Ensure you have the following installed:

- **Node.js** (version 12 or higher)
- **npm** (Node Package Manager)

### Steps to Clone and Run the Application

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/data-visualization-dashboard.git

2. **Navigate to the Project Directory**:

   ```bash
   cd data-visualization-dashboard

3. **Install Dependencies**:

   ```bash
   npm install
   cd server
   npm install
   cd ..

4. **Start the Application**:

   ```bash
   npm start

  This will start the React app on http://localhost:3000 and the WebSocket server on http://localhost:8080.

5. **Test Real-Time Updates**:
he data in the dashboard will update in real-time whenever there's a change in the data from the **JSONBin API**. Use **Postman** to modify the data using the PUT request and watch the updates reflect on the dashboard.

