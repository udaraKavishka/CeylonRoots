# 🌴 CeylonRoots - Modern Travel Agency Platform

<div align="center">

![CeylonRoots Banner](https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d784bf6a-a450-4a4f-b5f1-0894dbd89155/d4dc8884-f703-465c-bd79-11b0dcd30fde.lovableproject.com-1767817005925.png)

**A comprehensive travel booking platform for authentic Sri Lankan adventures**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.0-green.svg)](https://spring.io/projects/spring-boot)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Documentation](#-documentation) • [License](#-license)

</div>

---

## 📖 Overview

CeylonRoots is a visually elegant, full-featured travel agency platform showcasing Sri Lanka's cultural heritage. Built with modern web technologies, it offers seamless travel itinerary customization, package bookings, and comprehensive customer support.

### 🎯 Key Highlights

- **Drag-and-Drop Itinerary Builder** with real-time cost estimation
- **Interactive Destination Maps** with cultural insights
- **AI-Powered Recommendations** for personalized experiences
- **Secure Payment Processing** via Stripe/PayPal
- **Comprehensive Admin Dashboard** for content management
- **SEO-Optimized** with dynamic metadata and server-side rendering

---

## ✨ Features

### 🌐 Core Functionalities

#### For Travelers
- **Personalized Itinerary Builder**: Drag-and-drop interface to create custom trips
- **Ready-Made Packages**: Curated experiences across Sri Lanka
- **Real-Time Cost Estimator**: Live pricing updates as you build
- **User Authentication**: Save plans, view booking history, manage favorites
- **Interactive Maps**: Explore destinations with clickable markers
- **Rich Media Gallery**: Photos and videos categorized by experience type
- **Traveler Community**: Read and share authentic experiences
- **Multi-Language Support**: Available in English with more coming soon

#### For Administrators
- **Content Management System**: Full CRUD operations for all content types
- **Package Manager**: Create and edit travel packages with pricing tiers
- **Destination Database**: Manage locations, attractions, and cultural insights
- **Blog Editor**: Rich text editor with media upload capabilities
- **Review Moderation**: Approve and manage customer testimonials
- **Analytics Dashboard**: Track bookings, popular destinations, and user engagement
- **User Management**: View and manage customer accounts

---

## 🖥️ Application Structure

### Public Pages

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Hero section, featured packages, testimonials, newsletter |
| **Travel Packages** | `/packages` | Browse and filter curated travel experiences |
| **Customize Journey** | `/customize` | Build personalized itineraries with drag-and-drop |
| **Destinations** | `/destinations` | Interactive map with regional filters |
| **Blog** | `/blog` | Travel stories, tips, and cultural insights |
| **Gallery** | `/gallery` | Photo and video showcase by category |
| **Testimonials** | `/testimonials` | Customer reviews and authentic experiences |
| **FAQ** | `/faq` | Comprehensive travel information and guidelines |
| **About** | `/about` | Company story, mission, and values |
| **Contact** | `/contact` | Contact form, office info, and live chat |

### User Pages

| Page | Route | Access |
|------|-------|--------|
| **Login** | `/login` | User authentication with demo credentials |
| **Signup** | `/signup` | New account registration |
| **Checkout** | `/checkout` | Complete booking and payment |

### Protected Pages

| Page | Route | Access Level |
|------|-------|--------------|
| **Admin Dashboard** | `/admin` | Admin only - Full content management |

### Legal Pages

- **Privacy Policy** (`/privacy`) - GDPR compliant data practices
- **Terms of Service** (`/terms`) - Booking policies and user agreement
- **Cookie Policy** (`/cookie-policy`) - Cookie usage and management

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router) / React 18
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui + Radix UI primitives
- **State Management**: React Context + TanStack Query
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router DOM v6
- **Drag & Drop**: @dnd-kit for itinerary builder
- **Animations**: Tailwind CSS Animate

### Backend
- **Framework**: Spring Boot 3.0
- **Language**: Java 17
- **Database**: MySQL with Hibernate ORM
- **Authentication**: JWT (JSON Web Tokens)
- **API**: RESTful architecture
- **Security**: Spring Security + CORS configuration

### Integrations
- **Payment**: Stripe & PayPal integration
- **Maps**: Google Maps API
- **Analytics**: Google Analytics
- **Email**: SendGrid for transactional emails
- **Storage**: Cloud storage for media assets

---

## 🎨 Design Philosophy

### Visual Identity
- **Color Palette**: Inspired by Sri Lankan nature
  - Primary: Deep green (`#2C5F2D`)
  - Secondary: Ocean blue (`#1E40AF`)
  - Accent: Terracotta (`#D97706`)
  - Neutral: Warm grays and off-white

### UX Principles
- **Mobile-First**: Responsive design from 320px to 4K displays
- **Accessibility**: WCAG 2.1 AA compliant with semantic HTML
- **Performance**: Optimized images, lazy loading, code splitting
- **Cultural Motifs**: Subtle traditional patterns and iconography
- **Intuitive Navigation**: Clear hierarchy and user flow

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Java 17+
- MySQL 8.0+
- Git

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ceylonroots.git
cd ceylonroots
```

#### 2. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
# Configure environment variables
npm run dev
```

Frontend runs on `http://localhost:3000`

#### 3. Backend Setup
```bash
cd backend
./mvnw clean install
# Configure application.properties with database credentials
./mvnw spring-boot:run
```

Backend runs on `http://localhost:8080`

#### 4. Database Setup
```sql
CREATE DATABASE ceylonroots;
-- Run migration scripts from /backend/src/main/resources/db/migration
```

### Environment Variables

#### Frontend `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_STRIPE_KEY=your_stripe_public_key
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_google_maps_key
```

#### Backend `application.properties`
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ceylonroots
spring.datasource.username=your_username
spring.datasource.password=your_password
jwt.secret=your_jwt_secret
stripe.secret.key=your_stripe_secret_key
```

### Demo Credentials

**User Account**
- Email: `demo@ceylonroots.com`
- Password: `password123`

**Admin Account**
- Email: `admin@ceylonroots.com`
- Password: `admin123`

---

## 📸 Screenshots

### Home Page
![Home](https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d784bf6a-a450-4a4f-b5f1-0894dbd89155/d4dc8884-f703-465c-bd79-11b0dcd30fde.lovableproject.com-1767817005925.png)

### Travel Packages
![Packages](https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/53473ac6-be1c-44a5-8a01-d75ccd3d1558/d4dc8884-f703-465c-bd79-11b0dcd30fde.lovableproject.com-1767817015858.png)

### Customize Journey
![Customize](https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2e7b102a-5a0b-4199-961c-cf72e39070de/d4dc8884-f703-465c-bd79-11b0dcd30fde.lovableproject.com-1767817025750.png)

### Interactive Destinations
![Destinations](https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e4c31ebc-207e-4082-a43c-8836caa03c58/d4dc8884-f703-465c-bd79-11b0dcd30fde.lovableproject.com-1767817037195.png)

### Travel Blog
![Blog](https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9dcfe3c2-4d2b-496d-912b-35d40e3a27ab/d4dc8884-f703-465c-bd79-11b0dcd30fde.lovableproject.com-1767817047650.png)

### Contact Page
![Contact](https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1c289587-2870-45bd-85ff-ba36227c0605/d4dc8884-f703-465c-bd79-11b0dcd30fde.lovableproject.com-1767817057542.png)

### About Us
![About](https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2b9b4b25-7bec-411c-91e1-1301b878048c/d4dc8884-f703-465c-bd79-11b0dcd30fde.lovableproject.com-1767817073874.png)

### Photo Gallery
![Gallery](https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7c1975c5-042e-4a63-aebb-b2d188f11c03/d4dc8884-f703-465c-bd79-11b0dcd30fde.lovableproject.com-1767817085388.png)

### Customer Testimonials
![Testimonials](https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9a24688f-d2ba-4be0-95a2-17b3fe380dcc/d4dc8884-f703-465c-bd79-11b0dcd30fde.lovableproject.com-1767817095125.png)

### FAQ Section
![FAQ](https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/89f8965c-f1dc-4cca-bd43-35d30b03e3ef/d4dc8884-f703-465c-bd79-11b0dcd30fde.lovableproject.com-1767817106570.png)

### Checkout Process
![Checkout](https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3c7c20c3-fefe-4bce-b6ec-75099ed67b14/d4dc8884-f703-465c-bd79-11b0dcd30fde.lovableproject.com-1767817119667.png)

### User Login
![Login](https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c6a8b6e3-7dcb-4c2f-b541-0189465b913c/d4dc8884-f703-465c-bd79-11b0dcd30fde.lovableproject.com-1767817201607.png)

### User Signup
![Signup](https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/dc45ae37-ff04-4917-b2dc-5f38a9bae3eb/d4dc8884-f703-465c-bd79-11b0dcd30fde.lovableproject.com-1767817211784.png)

### Admin Dashboard
![Admin Panel](https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1090abd6-77f7-463e-8e00-a257c544d48d/d4dc8884-f703-465c-bd79-11b0dcd30fde.lovableproject.com-1767817221723.png)

---

## 📚 Documentation

For detailed documentation about each page and feature, see:
- [Full Documentation](./DOCUMENTATION.md) - Complete page-by-page breakdown
- [API Documentation](./docs/API.md) - Backend endpoints and schemas
- [Component Library](./docs/COMPONENTS.md) - Reusable UI components
- [Deployment Guide](./docs/DEPLOYMENT.md) - Production setup instructions

---

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm run test
npm run test:e2e

# Backend tests
cd backend
./mvnw test
```

---

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist folder to your hosting platform
```

### Backend (AWS/Railway/Heroku)
```bash
./mvnw clean package
# Deploy the generated JAR file
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

## 👥 Team

- **Project Lead**: [Your Name](https://github.com/yourusername)
- **Frontend Developer**: [Name](https://github.com/username)
- **Backend Developer**: [Name](https://github.com/username)
- **UI/UX Designer**: [Name](https://github.com/username)

---

## 📧 Contact

**CeylonRoots Travel Agency**
- Website: [https://ceylonroots.com](https://ceylonroots.com)
- Email: info@ceylonroots.com
- Phone: +94 11 234 5678
- Location: Colombo, Sri Lanka

---

## 🙏 Acknowledgments

- Sri Lanka Tourism Development Authority
- All travelers who shared their experiences
- Open source community for amazing tools and libraries

---

<div align="center">

**Made with ❤️ for travelers exploring Sri Lanka**

[⬆ back to top](#-ceylonroots---modern-travel-agency-platform)

</div>