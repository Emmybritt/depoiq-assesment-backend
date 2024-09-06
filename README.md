# Depoiq Assessment - Backend

This is the backend for the Depoiq assessment, developed using Node.js and Express. It includes RESTful API endpoints to manage the data and integrates with a database for persistence. The project was designed following best practices for modularity, scalability, and security.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Known Issues](#known-issues)

## Features

- CRUD operations for managing topics.
- Validation and error handling.
- Logging and monitoring of API requests.
- Database interactions using an ORM (mongoose).

## Tech Stack

- **Node.js** - JavaScript runtime for building scalable server-side applications.
- **Express.js** - Web framework for Node.js.
- **mongoose** - ORM for handling database operations.
- **mongodb** - Relational database for persistent storage.

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) - v14+
- [PostgreSQL](https://www.postgresql.org/) - v12+

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Emmybritt/depoiq-assesment-backend.git
   cd depoiq-assesment-backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up the mongodb database and configure environment variables (see below).


4. Start the server:

   ```bash
   npm run dev
   ```

5. For development mode:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the root directory and include the following variables:

```plaintext
MONGODB_URL=mongodburl
DATABASE_NAME=yourdatabasename
SENTRY_DSN=yoursentrydsn
```

## Scalability Techniques

- **Compress Api Response using compression** - The compression package in Node.js is used to compress HTTP responses sent from a server to a client, typically in a web application. It helps reduce the size of the response body, allowing for faster transmission over the network, which can improve the overall performance of your web application, especially for clients with slower internet connections.

# Key Benefits:

1. Reduces Response Size: It compresses responses using algorithms like Gzip or Brotli, which reduces the payload size, leading to faster data transmission.
   Improves Performance: Since less data is sent over the network, it decreases load times and enhances user experience, especially for large files such as JSON data, HTML, or CSS.
   Supports Various Content Types: It can compress various types of files such as JSON, HTML, CSS, JS, and more.

2. Improves Performance: Since less data is sent over the network, it decreases load times and enhances user experience, especially for large files such as JSON data, HTML, or CSS.

3. Supports Various Content Types: It can compress various types of files such as JSON, HTML, CSS, JS, and more.

- **Monitoring and Logging with sentry**: Sentry is an error monitoring and performance tracking tool for applications, including those built with Node.js, Express, and GraphQL. It helps developers track and fix issues in real-time by providing detailed information about errors, exceptions, and performance bottlenecks.

# Key Benefits of Using Sentry:

1. Error Monitoring: Automatically captures errors and exceptions in your application, including stack traces, user context, and environment details.
2. Performance Tracking: Monitors performance bottlenecks like slow API requests, GraphQL resolver delays, and long-running database queries.
3. Real-Time Alerts: Sends real-time alerts for critical errors, allowing you to address issues quickly.
4. Debugging: Provides detailed error logs, breadcrumbs, and additional context, making it easier to debug.
5. Team Collaboration: Enables team members to view, track, and resolve issues collaboratively.

# Other alternative logging tools

1. Winston for structured logging.
2. Morgan for HTTP request logging.
3. Datadog for full application monitoring.
4. Prometheus & Grafana for real-time metrics and performance monitoring.
