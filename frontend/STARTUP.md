# Running the React Frontend

## Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

### 3. Make Sure Backend is Running
The React app expects the Spring Boot API to be running on `http://localhost:8080`

Start the backend:
```bash
mvn spring-boot:run
```

## Features

- **Nintendo Game Boy Theme**: Authentic 90s green screen styling
- **Teachers Management**: Create, read, update, and delete teachers
- **Students Management**: Create, read, update, and delete students
- **Dual Views**: Switch between card view and table view
- **Form Validation**: Simple form handling with error messages
- **Responsive Design**: Works on mobile and desktop

## File Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Teachers.jsx
│   │   └── Students.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── api.js
├── index.html
├── vite.config.js
└── package.json
```

## API Integration

The frontend communicates with the backend API at `http://localhost:8080`. All endpoints are configured in `src/api.js`.

## Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist` folder.

