pipeline {
    agent any

    environment {
        AWS_DOCKER_REGISTRY = '203320211287.dkr.ecr.us-east-2.amazonaws.com'
        APP_NAME            = 'my-react-app'
        AWS_DEFAULT_REGION  = 'us-east-2'
        ECS_CLUSTER         = 'flawless-dolphin-hddo8i'
        ECS_SERVICE         = 'my-react-service'
        ECS_TASK_DEFINITION = 'my-react-task-definition-json'
    }

    stages {

        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Build React App') {
            agent {
                docker {
                    image 'node:24-alpine'
                    args '-u root'
                }
            }
            steps {
                sh '''
                    node --version
                    npm --version
                    npm install
                    npm run build
                '''
            }
        }

        stage('Build & Push Docker Image') {
            agent {
                docker {
                    image 'amazonlinux:2023'
                    args '-v /var/run/docker.sock:/var/run/docker.sock -u root'
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
                        # Instala dependências
                        dnf install -y tar gzip unzip docker curl

                        # Instala AWS CLI v2
                        curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
                        unzip awscliv2.zip
                        ./aws/install

                        # Configure Docker config local
                        export DOCKER_CONFIG=$WORKSPACE/.docker

                        echo "Docker version:"
                        docker version
                        echo "AWS CLI version:"
                        aws --version

                        # Build Docker image
                        docker build -t $AWS_DOCKER_REGISTRY/$APP_NAME:latest .

                        # Login ECR
                        aws ecr get-login-password --region $AWS_DEFAULT_REGION | \
                            docker login --username AWS --password-stdin $AWS_DOCKER_REGISTRY

                        # Push image
                        docker push $AWS_DOCKER_REGISTRY/$APP_NAME:latest
                    '''
                }
            }
        }

        stage('Deploy to ECS') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'reactAWS',
                        usernameVariable: 'AWS_ACCESS_KEY_ID',
                        passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                    )
                ]) {
                    sh '''
                        NEW_TASK_DEF_ARN=$(aws ecs register-task-definition \
                            --cli-input-json file://aws/task-definition.json \
                            --query 'taskDefinition.taskDefinitionArn' \
                            --output text)
                        aws ecs update-service \
                            --cluster $ECS_CLUSTER \
                            --service $ECS_SERVICE \
                            --task-definition $NEW_TASK_DEF_ARN
                    '''
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                echo "Deployment finished. Check your ECS service or load balancer."
            }
        }
    }
}