# RAVN Task Manager

A modern task management application inspired by Trello, Kanban, and Jira. Built with React and Vite, featuring drag-and-drop functionality, advanced filtering, and persistent data storage.

![RAVN Task Manager Screenshot](https://github.com/user-attachments/assets/ef92d795-e9be-4d27-8fcb-6f69afe8cf04)

## ✨ Features

- **📋 Complete Task Management**: Create, read, update, and delete tasks with full CRUD operations
- **🔄 Drag & Drop Interface**: Intuitive status updates by dragging tasks between columns
- **🗄️ Persistent Storage**: Tasks are stored in an external database for data persistence across sessions
- **🔍 Advanced Filtering**: Search and filter tasks by status, due date, tags, and other parameters
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🏷️ Task Details**: Comprehensive task information including status, due dates, and assignable tags

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CalderonCG/RAVN-Task-Manager.git
   cd RAVN-Task-Manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the project root:
   ```env
   VITE_API_KEY="YOUR_API_KEY_HERE"
   ```
   Replace `YOUR_API_KEY_HERE` with your actual API key.

4. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173` (or the URL shown in your terminal).

## 🎯 Core Functionality

### Task Management
The application provides comprehensive task management capabilities with an intuitive interface for creating, editing, and organizing tasks.

### Database Integration
All tasks are automatically synchronized with an external database, ensuring your data persists across browser sessions and devices.

https://github.com/user-attachments/assets/068b0880-f3c3-4155-998b-f25269a99b17

### Detailed Task Information
Each task contains rich metadata including status indicators, due dates, priority levels, and customizable tags for better organization.

![Task Details](https://github.com/user-attachments/assets/eefe9345-88be-4bab-8aa3-8adc0a92cc4c)

### Drag & Drop Status Updates
Seamlessly update task statuses by dragging tasks between different status columns (To Do, In Progress, Done).

https://github.com/user-attachments/assets/9e1f10e8-84c0-4fef-b81e-95f329466702

### CRUD Operations
Full control over task lifecycle with create, update, and delete operations available through an intuitive interface.

https://github.com/user-attachments/assets/9f8da533-6920-4760-b891-f8184900040f

### Advanced Filtering System
Powerful search and filtering capabilities allow users to quickly find specific tasks based on multiple criteria including status, tags, due dates, and text content.

https://github.com/user-attachments/assets/c660be4e-31df-49e7-8dbb-bd31fc752a18

### Mobile-First Responsive Design
The application automatically adapts to different screen sizes and devices, providing an optimal user experience across all platforms.

![Mobile Interface](https://github.com/user-attachments/assets/28615233-c7a0-42f6-9b25-5d577d546493)

## 🛠️ Built With

### Core Technologies
- **React** - Frontend framework for building interactive user interfaces
- **Vite** - Fast build tool and development server with hot module replacement
- **GraphQL** - Query language for efficient API data fetching
- **Modern JavaScript (ES6+)** - Programming language with latest features

### Key Libraries & Their Purpose

- **🎨 Tailwind CSS** 
  - Accelerate development with pre-built utility classes
  - Reduce CSS file complexity and maintain consistency
  - Enable mobile-first responsive design with built-in breakpoints
  - Integrate seamlessly with headless UI components

- **🚀 Apollo Client** 
  - Simplified GraphQL integration with React
  - Built-in request debouncing for optimized performance
  - Intelligent caching and state management
  - Real-time data synchronization capabilities

- **📝 React Hook Form** 
  - Comprehensive form validation with minimal re-renders
  - Seamless integration of validation rules and error handling
  - Enhanced user experience with real-time validation feedback

- **🔄 DnD Kit** 
  - Easy implementation of task status transitions
  - Customizable drag behaviors and animations

## 📁 Project Structure

```
RAVN-Task-Manager/
├── 📁 src/
│   ├── 🧩 components/        # Reusable UI components (buttons, modals, badges)
│   ├── ⚡ features/          # Feature-specific components and logic
│   │   ├── AddTasks          # Task creation and editing components
│   │   ├── Dashboard         # Kanban board visualization components
│   │   └── TaskList          # List view visualization components
│   ├── 📄 pages/             # Top-level page components and routing
│   ├── 🔍 queries/           # GraphQL queries, mutations, and subscriptions
│   │   ├── TasksQuery        # Task-related GraphQL operations
│   │   └── UseQuery          # User-related GraphQL operations
│   └── 🛠️ utils/             # Helper functions and utilities
│       ├── ThemeHandler     # Dark and light theme toggle utilities
│       ├── AvatarGenerator  # Random avatar generation functions
│       ├── Reducer          # State management reducer functions
│       ├── TaskTypes        # Global TypeScript types and interfaces
│       └── DataMapper       # Date formatting and enum conversions
├── 📂 public/                # Static assets (images, icons, favicon)
├── 🔐 .env                   # Environment variables (API keys, endpoints)
├── ⚙️ apolloClient.ts        # Apollo Client configuration and setup
├── 🏗️ codegen.yml           # GraphQL code generation configuration
├── 📦 package.json           # Dependencies and project configuration
├── ⚡ vite.config.ts         # Vite build configuration
└── 📚 README.md              # Project documentation
```


## 👤 Author

**Christopher Calderón**


---
