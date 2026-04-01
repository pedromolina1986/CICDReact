pipeline {
    agent any

    environment {
        ECS_CLUSTER = "flawless-dolphin-hddo8i"
        AWS_DEFAULT_REGION = "us-east-2"
    }

    stages {
        stage('Build My Image'){
            agent{
                docker{
                    image 'amazon/aws-cli'
                    reuseNode true
                    args '-u root -v /var/run/docker.sock:/var/run/docker.sock --entrypoint=""'
                }
            }
            steps{
                sh '''
                    dnf install -y docker
                    docker build -t my-docker-image .
                    docker images
                '''
            }
        }

        stage("Deploy to ECS") {
            agent {
                docker {
                    image 'amazon/aws-cli'
                    reuseNode true
                    args '--entrypoint=""'
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
                        aws --version
                        aws ecs register-task-definition --cli-input-json file://aws/task-definition.json
                    '''
                }
            }
        }            
    }
}