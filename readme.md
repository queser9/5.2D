# SIT323/737-2024-T1 Prac 7P

This repository contains the deliverables for the SIT323/737-2024-T1 Practical 7P task.

## Contents

- `Dockerfile`: Dockerfile for building the Node.js application image
- `deployment.yaml`: Kubernetes deployment configuration file
- `service.yaml`: Kubernetes service configuration file
- `package.json`: Node.js application dependencies and scripts
- `index.js`: Node.js application entry point

## Instructions

### Prerequisites

- Docker
- Kubernetes (Minikube or a Kubernetes cluster)
- kubectl

### Steps to Deploy the Application

1. **Build and Push Docker Image**

   ```bash
   docker build -t queser10/my-app .
   docker push queser10/my-app
   minikube start
   ```

2. **Deploy to Kubernetes**

   Apply the deployment and service configuration files:

   ```bash
   kubectl apply -f deployment.yaml
   kubectl apply -f service.yaml
   ```

3. **Get Minikube IP**

   ```bash
   minikube ip
   ```

4. **Access the Application**

   Combine the Minikube IP and NodePort to access the application in your browser:

   ```
   http://<Minikube-IP>:32222
   ```
- Ensure your Minikube or Kubernetes cluster is running and accessible.

- Check Pod logs for troubleshooting:

  ```bash
  kubectl logs <pod-name>
  ```
```
