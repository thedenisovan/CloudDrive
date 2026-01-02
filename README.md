# SilverCloud

Backend-focused learning project built to practice and demonstrate skills in server-side web development using **TypeScript**, **Express**, **Prisma**, **Passport.js**, and **Supabase Storage**.

## Preview the Web App

You can live preview the website here: [SilverCloud Application](https://clouddrive-2iib.onrender.com))  
_(If inactive for more than 15 minutes, it may take a moment to wake up.)_

❗ **Note:** _(Using Supabase free storage—files won’t show after a week of inactivity until I reset it.)_

## Overview

A simplified personal cloud storage application where users can register, log in, create folders, upload files, and manage their personal data. Each user has **20MB of personal storage**, and the project also includes a **shared account with 100MB of storage** accessible to everyone. The project is built with a responsive design to work smoothly on all devices.

## Features

- **User Registration & Login**  
  Session-based authentication using Passport.js and Prisma session store.

- **Folder & File Management**  
  Create, read, update, and delete folders. Upload files to specific folders.

- **File Details & Downloads**  
  View file metadata including name, size, and upload time. Download files securely.

- **Cloud Storage Integration**  
  Files are stored using Supabase Storage and tracked in a Neon database.

- **Shared Account**  
  A publicly accessible shared account with 100MB storage for demonstration purposes.

- **Server-Rendered Views**  
  EJS templates for all frontend pages.

- **Responsive Design**  
  Works well on desktop, tablet, and mobile screens.

## Tech Stack

- **Node.js + Express**
- **TypeScript**
- **Prisma (Database & Session Management)**
- **Passport.js (Authentication)**
- **EJS (Server-side rendering)**
- **Supabase Storage**
- **Neon Database**
- **Deployment** (Render)

## Project Goals

- Strengthen knowledge of authentication, session handling, and secure file access  
- Practice building real-world backend applications with file management  
- Improve understanding of cloud storage and shared account functionality  
- Build a full-featured, personal cloud storage system with responsive design
