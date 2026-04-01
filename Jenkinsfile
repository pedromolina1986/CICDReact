pipeline {
    agent any

    environment {

            AWS_DOCKER_REGISTRY = '203320211287.dkr.ecr.us-east-2.amazonaws.com'
            // your ECR repository name
            APP_NAME = 'my-react-app'
            AWS_DEFAULT_REGION = 'us-east-2'
        }
        stages {

            stage('Build My Docker Image'){

                agent{
                    docker{
                        image 'amazon/aws-cli'
                        reuseNode true
                        args '-u root -v /var/run/docker.sock:/var/run/docker.sock --entrypoint=""'
                    }
                }
                steps{
                    withCredentials([
                    usernamePassword(
                        credentialsId: 'reactAWS',
                        usernameVariable: 'AWS_ACCESS_KEY_ID',
                        passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                    )
                ]) {
                        
                        sh '''
                            amazon-linux-extras install docker
                            docker build -t $AWS_DOCKER_REGISTRY/$APP_NAME .

                            # access ECR, username is AWS, get temporary password
                            aws ecr get-login-password | docker login --username AWS --password-stdin $AWS_DOCKER_REGISTRY
                            docker push $AWS_DOCKER_REGISTRY/$APP_NAME:latest
                        '''
                    }
                }
            }
        }
}