# Cloud Native Application Development - Assignment 9.1P

## Overview

This project involves integrating a MongoDB database into an existing containerized microservice application. The application is deployed on a Kubernetes cluster, and detailed documentation is provided to explain the steps undertaken for this task.

## Prerequisites

- Git
- Visual Studio Code
- Node.js
- Docker
- Kubernetes
- Kubectl
- MongoDB
- Docker Compose

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/queser9/sit323-737-2024-t1-prac7p
cd sit323-737-2024-t1-prac7p
```

### 2. Build and Push Docker Image
Ensure your Dockerfile and package.json are correctly set up.

Build and Push
```bash
docker build -t queser10/calculator-app:latest .
docker push queser10/calculator-app:latest
```
### 3. Deploy MongoDB on Kubernetes
MongoDB Deployment (mongodb-deployment.yaml)

Apply MongoDB Deployment and Service
```bash
kubectl apply -f mongodb-deployment.yaml
kubectl apply -f mongodb-service.yaml
```
### 4. Deploy Application on Kubernetes
Apply Application Deployment
```bash
kubectl apply -f app-deployment.yaml
```
### 5. Port Forwarding to Access Application
```bash
kubectl port-forward deployment/your-app 3000:3000
```
### 6. Testing API Endpoints
examples like these:

Add Operation
```bash
curl -X POST http://localhost:3000/api/add -H "Content-Type: application/json" -d "{\"num1\": 5, \"num2\": 3}"
```
Save Operation to MongoDB
```bash
curl -X POST http://localhost:3000/api/operation -H "Content-Type: application/json" -d "{\"operation\": \"add\", \"operands\": [5, 3], \"result\": 8}"
```
Get All Operations
```bash
curl -X GET http://localhost:3000/api/operations
```

This provides a step-by-step guide to deploying a containerized microservice application with MongoDB on a Kubernetes cluster. The provided curl commands can be used to test the API endpoints and ensure the application functions as expected.