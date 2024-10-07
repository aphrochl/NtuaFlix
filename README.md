# Simply Solved

<p align="center">
  <img src="https://github.com/ntua/saas2024-55/blob/main/frontend/src/logo.png?raw=true" alt="Logo" width="200">
</p>

---

## Team Members 

**Takis Stamatopoulos [el20096@mail.ntua.gr](https://github.com/ntua-el20096)**  
**Afroditi Marianthi Chlapani [el20889@mail.ntua.gr](https://github.com/ntua-el20889)**  
**Kyriaki Karatzouni [el20634@mail.ntua.gr](https://github.com/ntua-el20634)**  

---

## Project Overview

This project implements **Simply Solved**, a microservices-based platform designed to manage user-submitted problems, automatically solve them, and handle payments and statistics. The application follows a full-stack implementation with separate services for core functionalities, communication through REST APIs, and Docker-based orchestration.

Key features:
- **Backend microservices**: Several microservices, including user management, problem handling, solution generation, payments, and statistics, each running as an independent service. 
- **API Gateway**: A reverse proxy that routes requests from the frontend to the appropriate backend microservices.
- **Problem submission and solving**: Users can submit problems, which are automatically processed and solved by the system.
- **Payment handling**: The platform manages transactions related to user credits and balances.
- **Statistics and analytics**: Extraction of detailed usage metrics and performance statistics based on user-submitted problems and solutions.
- **Dockerized architecture**: The system is fully containerized, making it easy to deploy and scale.
- **Version control and project management**: GitHub is used for source code management, version control, and project tracking.

---

## Our Project Consists of

### [Backend](https://github.com/ntua-el20889/SolveMyProblem/tree/main/backend)
### [CLI Client](https://github.com/ntua-el20889/SolveMyProblem/tree/main/cli-client)
### [Frontend](https://github.com/ntua-el20889/SolveMyProblem/tree/main/frontend)
### [Documentation](https://github.com/ntua-el20889/SolveMyProblem/tree/main/documentation)
### [AI-Log](https://github.com/ntua-el20889/SolveMyProblem/tree/main/ai-log)

---

## Installation

### Requirements

Ensure you have the following installed:
- **PgAdmin4**
- **JMeter**
- **Node.js** and **npm** (for JavaScript dependencies)
- **Python** (for OR tools and other functionalities)
- **Docker**

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ntua-el20889/SolveMyProblem.git
   ```
