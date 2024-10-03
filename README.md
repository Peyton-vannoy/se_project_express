# WTWR (What to Wear?)

## Overview

WTWR (What to Wear?) is a dynamic application designed to help users choose their outfits based on various factors like weather, occasion, and personal style. This back-end server, built with Express.js and Mongoose, seamlessly interacts with a MongoDB database to manage clothing items and user preferences.

## Table of Contents

- [Project Details](#project-details)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Project Details

The server handles HTTP requests and responses, providing functionalities such as:

- Retrieving all clothing items from the database
- Creating new clothing items
- Deleting specific items

## Technologies Used

- **Express.js**: Web framework for Node.js
- **Mongoose**: ODM for MongoDB
- **Node.js**: JavaScript runtime
- **MongoDB**: NoSQL database

## Features

- **CRUD Operations**: Create, Read, Update, and Delete clothing items.
- **User Authentication**: Secure user accounts and preferences.
- **Responsive Design**: Optimized for various devices.

## Installation

To get started with the WTWR back end, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/wtwr-backend.git
   cd wtwr-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your MongoDB database and update the connection string in the `.env` file.

4. Start the server:

   ```bash
   npm run start
   ```

5. For development with hot reload:
   ```bash
   npm run dev
   ```

## Usage

Once the server is running, you can interact with the API using tools like Postman or cURL. Here are some example endpoints:

- **Get all clothing items**: `GET /api/clothing`
- **Create a new clothing item**: `POST /api/clothing`
- **Delete a clothing item**: `DELETE /api/clothing/:id`

## Contact

For questions or feedback, reach out to:

- **Peyton Vannoy**: [vannoypeyton819@gmail.com](mailto:vannoypeyton819@gmail.com)
- **GitHub**: [Peyton-vannoy](https://github.com/Peyton-vannoy)

---

Thank you for checking out WTWR! I hope you find it useful and enjoyable!
