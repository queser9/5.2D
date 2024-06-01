# SIT323/SIT737 - Cloud Native Application Development

## Assignment 5.2D: Dockerization - Publishing the microservice into the cloud

### Overview

This assignment involves publishing a microservice to a private container registry hosted in the cloud. The steps include creating a Dockerfile, building and running a Docker container, and pushing the image to Google Cloud Artifact Registry.

### Prerequisites

- Git
- Visual Studio Code
- Node.js
- Docker
- Google Cloud account with Artifact Registry API enabled

### Steps

1. **Clone the repository:**
```bash
   git clone https://github.com/username/sit323-737-2024-t1-prac5d.git
   cd sit323-737-2024-t1-prac5d
```
### Run Docker Compose
```bash
docker-compose up -d
```
### Push Docker image to Google Cloud Artifact Registry
```bash
gcloud auth login
gcloud config set project my-project-2-425118
gcloud auth configure-docker
docker build -t us-west2-docker.pkg.dev/my-project-2-425118/my-microservice:tag .
docker push us-west2-docker.pkg.dev/my-project-2-425118/my-microservice:tag
```
### Run the image from the registry
```bash
docker run -d -p 3000:3000 us-west2-docker.pkg.dev/my-project-2-425118/my-microservice:tag
```
### Verify the application:
Open your browser and visit http://localhost:3000