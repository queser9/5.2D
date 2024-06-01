# 6.2c instructions
### Instructions

#### Step 1: Verify the Application is Running

1. Open your terminal and navigate to the directory containing your Kubernetes configuration files.
2. Run the following command to verify that the pods and services are running:

```bash
kubectl get pods
kubectl get services
```
You should see output indicating that your pods and services are running.
### Step 2: Use kubectl port-forward
Choose a local port that you will use to forward traffic to the Kubernetes service. For example, you can use port 8080.
Run the following command to forward traffic from the local port to the Kubernetes service:
```bash
kubectl port-forward service/your-service-name 8080:80
```
Replace your-service-name with the name of your Kubernetes service. The above command forwards local port 3000 to port 80 on the Kubernetes service.
### Step 3: Access the Application
Open your web browser.
Navigate to http://localhost:3000 (or the port you chose in the previous step).
You should see your application running in the web browser.
