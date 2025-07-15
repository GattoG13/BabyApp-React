# 👶 BabyApp-React

**BabyApp** is a web application that helps parents or caregivers log and track daily baby activities such as feedings, naps, diaper changes, and walks. Built with **React JS**, **JavaScript**, and a custom **REST API**, this project focuses on usability, responsive design, and efficient data management.

---

## ✨ Key Features

🟢 **Event Logging**  
Quickly add events like feedings, walks, naps, and more with a simple interface.

🍼 **Next Bottle Reminder**  
Real-time indicator showing the time left until the next bottle feeding. Turns red when the scheduled time is exceeded.

📊 **Category Breakdown**  
Visualize activity frequency through charts grouped by category (feedings, naps, etc.).

📱 **Responsive UI**  
Mobile-first layout with intuitive navigation for quick access to all features.

🔗 **RESTful API Integration**  
The backend handles all data operations (create, read, update, delete) using a custom API.

---

## 🛠️ Technologies Used

- ⚛️ React JS  
- 💅 CSS3 & Bootstrap  
- 🧠 Redux Toolkit  
- 🌍 React Router DOM  
- 📡 REST API (fetch-based integration)  
- 📈 Chart.js for data visualization  
- ☁️ Deployment-ready for Vercel / GitHub Pages

---

## 📁 Project Structure


babyapp-react/
├── public/ # Static assets and index.html
├── src/
│ ├── components/ # Reusable components (Login, Menu, Register, etc.)
│ ├── features/ # Redux slices and logic
│ ├── imgs/ # App images/icons
│ ├── store/ # Redux store config
│ ├── App.jsx
│ ├── App.css
│ └── index.js
├── package.json
├── README.md