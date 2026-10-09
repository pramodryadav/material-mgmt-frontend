# Material Management System — Frontend

A React-based web application for managing products, materials, grades, and product combinations.

## Tech Stack

- React
- Vite
- JavaScript (ES Modules)
- Material UI
- Axios
- Formik
- Yup

## Features

- Product and material management interface
- Grade management interface
- Product combination management
- API integration using Axios
- Form handling and validation using Formik and Yup
- Material UI components for the user interface

## Project Structure

```text
front-end/
├── public/
├── src/
│   ├── pages/
│   ├── apiClient.js
│   ├── config.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm
- A running instance of the Material Management backend

### Installation

Clone the repository:

```bash
git clone https://github.com/pramodryadav/material-mgmt-frontend.git
cd material-mgmt-frontend
npm install
```

### Run the Application

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

### Production Build

```bash
npm run build
```

The production build is generated in the `dist` directory.

## API Configuration

The API base URL is configured in `src/config.js`.

The default URL is:

`http://localhost:5000/api`

Update this configuration when connecting to a deployed backend.

## Backend

[Material Management Backend](https://github.com/pramodryadav/material-mgmt-backend)

## Security

Do not commit credentials, environment files, or other sensitive information.