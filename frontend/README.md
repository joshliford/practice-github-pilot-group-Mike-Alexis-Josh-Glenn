# Class Manager - React Frontend with Vite

A retro Nintendo Game Boy themed React application for managing teachers and students.

## Quick Start

### Prerequisites
- Node.js 16+ installed
- Backend API running on http://localhost:8080

### Installation & Running

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

## Features

- **Game Boy Aesthetic**: Authentic 1990s green monochrome styling
- **Teachers Module**: Full CRUD operations with card and table views
- **Students Module**: Complete management interface
- **Responsive Layout**: Works on desktop and mobile
- **Card View**: Display records as interactive cards
- **Table View**: Traditional tabular format
- **Real-time Updates**: Instant feedback on actions

## File Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Teachers.jsx      # Teachers management component
│   │   └── Students.jsx      # Students management component
│   ├── App.jsx               # Main application component
│   ├── api.js                # API integration with axios
│   ├── main.jsx              # React entry point
│   └── index.css             # Game Boy styling
├── index.html                # HTML template
├── vite.config.js            # Vite configuration
├── package.json              # Dependencies
└── STARTUP.md                # Setup guide
```

## Component Structure

### Teachers Component
- List all teachers in card or table view
- Create new teacher with form
- Edit existing teacher details
- Delete teacher record
- Real-time validation and feedback

### Students Component
- List all students in card or table view
- Create new student with form
- Edit existing student details
- Delete student record
- Real-time validation and feedback

## Styling

The application uses a custom Game Boy theme with:
- Green monochrome color scheme (#a8d084, #9cc576)
- Courier New monospace font
- Thick black borders and shadows
- Retro button styling
- Authentic game cartridge appearance

## API Integration

The frontend communicates with the backend API using axios:

- Base URL: `http://localhost:8080`
- Teachers endpoints: `/teachers`
- Students endpoints: `/students`

All CRUD operations (Create, Read, Update, Delete) are implemented.

## Building for Production

```bash
npm run build
```

Creates an optimized production build in the `dist` folder.

## Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing.

## Troubleshooting

### API Connection Issues
- Ensure backend is running on http://localhost:8080
- Check browser console for error messages
- Verify CORS is enabled in backend

### Form Submission Errors
- Email must be unique
- All required fields must be filled
- Check for duplicate email addresses

### Styling Issues
- Clear browser cache
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check CSS file loaded correctly

## Development

The app uses:
- React 18.2 with hooks
- Vite for fast development and building
- Axios for HTTP requests
- CSS3 for Game Boy styling

No external UI libraries - pure React and CSS for that authentic retro feel!

## License

Educational project - Free to use and modify.

