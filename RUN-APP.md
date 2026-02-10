# 🚀 RUN THE APPLICATION - COPY & PASTE COMMANDS

## SETUP (One-time only)

### 1. Create Database
```bash
mysql -u root -p < database-setup.sql
```
Enter your MySQL password when prompted.

### 2. Install Frontend Dependencies (First time only)
```bash
cd frontend
npm install
cd ..
```

---

## RUNNING THE APPLICATION

### Open 2 Terminal Windows

**Terminal 1: Backend API**
```bash
mvn spring-boot:run
```
Wait for message: "Started CopilotApplication in X seconds"

**Terminal 2: Frontend UI**
```bash
cd frontend
npm run dev
```
Wait for message: "Local: http://localhost:5173"

---

## OPEN IN BROWSER

```
http://localhost:5173
```

Enjoy the Game Boy interface! 🎮

---

## OTHER USEFUL COMMANDS

### Build Frontend for Production
```bash
cd frontend
npm run build
```

### Preview Production Build
```bash
cd frontend
npm run preview
```

### Stop Backend (Terminal 1)
```
Press: Ctrl+C
```

### Stop Frontend (Terminal 2)
```
Press: Ctrl+C
```

### Clean and Rebuild Backend
```bash
mvn clean install
mvn spring-boot:run
```

### Reset Frontend
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## TROUBLESHOOTING

### If Backend Won't Start
1. Check MySQL is running: `mysql -u root -p -e "SELECT 1;"`
2. Check database exists: `mysql -u root -p -e "SHOW DATABASES;"`
3. If not, run: `mysql -u root -p < database-setup.sql`

### If Frontend Won't Start
1. Make sure you're in frontend directory: `cd frontend`
2. Check Node.js installed: `node --version`
3. Reinstall: `rm -rf node_modules && npm install`

### If Port is Already in Use
1. Backend (8080): Change in `application.properties`
2. Frontend (5173): Change in `frontend/vite.config.js`

### If API Connection Fails
1. Make sure backend is running
2. Check URL in `frontend/src/api.js` is `http://localhost:8080`
3. Check browser console for errors

---

## QUICK TEST SEQUENCE

After app loads at http://localhost:5173:

1. Click **TEACHERS** tab (should load list)
2. Click **NEW TEACHER** button
3. Fill form with test data
4. Click **SAVE**
5. See success message
6. Click **TABLE** to see table view
7. Click **CARDS** to see card view
8. Repeat for **STUDENTS** tab

If all works = Everything is running correctly! ✅

---

## THAT'S IT!

You now have a complete full-stack application with:
- Spring Boot REST API ✅
- React + Vite Frontend ✅
- MySQL Database ✅
- Game Boy Theme ✅
- Full Documentation ✅

Enjoy! 🎮

