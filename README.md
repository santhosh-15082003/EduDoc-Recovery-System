# EduDoc Recovery System

## OverView
- Document Recovery Hub is a full-stack web application developed to help users apply for recovery of lost, damaged, or stolen documents such as educational certificates and official records.
- The system provides a secure and efficient platform for users to submit document requests and track their status, while administrators can verify, approve, or reject requests through a dedicated dashboard.

## 🚀 Features

### 👤 User Module
- User Registration and Login (Authentication)
- Submit Document Recovery Request
- Submit Missing Document Report (Theft/Loss)
- Upload Supporting Documents (FIR, ID Proof)
- Track Request Status
- Manage Personal Details

### 🛠️ Admin Module
- View and Manage User Requests
- Approve / Reject / Under Verification Status
- View Issuer Reports and Missing Reports
- Dashboard with Request Analytics
- Download/View Uploaded Documents

### 🔐 Security
- Spring Security Authentication (Basic Auth)
- Protected APIs
- Role-based access (User/Admin)

### 📧 Additional Features
- Email Notifications
- QR Code Verification (for document authenticity)

## 🧰 Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS

### Backend
- Spring Boot
- Spring Security
- Hibernate (JPA)

### Database
- MySQL

### Tools
- Postman
- Git & GitHub
- VS Code

## ⚙️ Project Structure

PGProject/
│
├── backend/       # Spring Boot Backend
├── frontend/      # React Frontend
├── Documents/     # Project Documents (PDF, PPT)
└── images/        # Project Images

## ▶️ How to Run the Project

### 🔹 Backend
1. Navigate to backend folder
2. Run Spring Boot application
3. Server starts at: http://localhost:8080

### 🔹 Frontend
1. Navigate to frontend folder
2. Install dependencies:
   npm install
3. Start project:
   npm run dev
4. Open: http://localhost:5173

## 📊 Modules

### 📄 Document Applying
Used to recover damaged or official documents by submitting request forms and uploading supporting files.

### ❗ Document Missing
Used for reporting lost or stolen documents with detailed information and proof documents.

### 📂 Your Requests
Users can track the status of submitted requests (Approved / Rejected / Under Verification).

### 🧑‍💼 Admin Dashboard
Admin can manage requests, verify documents, and update status which reflects on user side.

## 🔮 Future Enhancements

- QR Code Verification for documents
- Cloud Storage Integration
- AI-Based Document Validation
- Integration with Government Systems

## 👨‍🎓 Author

- Developed by: SanThosh
- Course: PG ( Msc CS )
