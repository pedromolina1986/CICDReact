pipeline {
    agent any

    environment {
        //S3_BUCKET = "s3-images-test"
        ECS_CLUSTER = "flawless-dolphin-hddo8i"
        AWS_DEFAULT_REGION = "us-east-2"
    }

    /*stages {

        stage("Build") {
            agent {
                docker {
                    image "node:24-alpine"
                    reuseNode true
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

        stage("Test") {
            agent {
                docker {
                    image "node:24-alpine"
                    reuseNode true
                }
            }
            steps {
                sh '''
                    test -f build/index.html
                    echo "Build OK"
                '''
            }
        }

        stage("Deploy to S3") {
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
                        aws s3 sync build/ s3://$S3_BUCKET --delete
                    '''
                }
            }
        }

        stage("Show URL") {
            steps {
                echo "App deployed to:"
                echo "http://${S3_BUCKET}.s3-website-${AWS_DEFAULT_REGION}.amazonaws.com"
            }
        }*/
        stages{
            stage("Build My Image") {
                agent{
                    docker {
                        image "amazon/aws-cli"
                        reuseNode true
                        args '-u root:root --entrypoint=""'
                    }
                }
                steps {
                    dnf install -y docker
                    docker build -y -t my-react-app .
                    docker images
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