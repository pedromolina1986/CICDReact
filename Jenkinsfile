pipeline {
    agent any

    environment {
        AWS_DOCKER_REGISTRY = '203320211287.dkr.ecr.us-east-2.amazonaws.com'
        APP_NAME = 'my-react-app'
        AWS_DEFAULT_REGION = 'us-east-2'
    }

    stages {
        stage('Build & Push Docker Image') {
            agent {
                docker {
                    image 'docker:24' // imagem com docker já instalado
                    reuseNode true
                    args '-v /var/run/docker.sock:/var/run/docker.sock --entrypoint=""'
                }
            }
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'reactAWS',
                        usernameVariable: 'AWS_ACCESS_KEY_ID',
                        passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                    )
                ]) {
                    sh '''
                        # Build Docker image
                        docker build -t $AWS_DOCKER_REGISTRY/$APP_NAME:latest .

                        # Login in ECR
                        aws ecr get-login-password --region $AWS_DEFAULT_REGION | \
                            docker login --username AWS --password-stdin $AWS_DOCKER_REGISTRY

                        # Push image to ECR
                        docker push $AWS_DOCKER_REGISTRY/$APP_NAME:latest
                    '''
                }
            }
        }
    }
}