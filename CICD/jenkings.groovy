pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/your-repo/synthetiq-framework.git'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Docker Build') {
            steps {
                sh 'docker build -t your-repo/synthetiq-backend ./backend'
                sh 'docker build -t your-repo/synthetiq-frontend ./frontend'
            }
        }
        stage('Deploy') {
            steps {
                sh 'kubectl apply -f k8s/deployment.yaml'
            }
        }
    }
}
