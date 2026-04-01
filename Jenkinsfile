pipeline {
    agent any

    environment {
        AWS_DOCKER_REGISTRY = '203320211287.dkr.ecr.us-east-2.amazonaws.com'
        APP_NAME            = 'my-react-app'
        AWS_DEFAULT_REGION  = 'us-east-2'
        ECS_CLUSTER         = 'flawless-dolphin-hddo8i'
        ECS_SERVICE         = 'my-react-service'   // coloque seu ECS Service
        ECS_TASK_DEFINITION = 'my-react-task-definition-json'
    }

    stages {

        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'reactAWS',
                        usernameVariable: 'AWS_ACCESS_KEY_ID',
                        passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                    )
                ]) {
                    sh '''
                        # Define local Docker config para evitar problemas de permissão
                        export DOCKER_CONFIG=$WORKSPACE/.docker

                        echo "Docker version:"
                        docker version

                        # Build da imagem
                        docker build -t $AWS_DOCKER_REGISTRY/$APP_NAME:latest .

                        # Login no ECR
                        aws ecr get-login-password --region $AWS_DEFAULT_REGION | \
                            docker login --username AWS --password-stdin $AWS_DOCKER_REGISTRY

                        # Push da imagem
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
                        # Atualiza a task definition com a nova imagem
                        # Assumindo que você já tenha a task definition registrada no ECS
                        NEW_TASK_DEF_ARN=$(aws ecs register-task-definition \
                            --cli-input-json file://aws/task-definition.json \
                            --query 'taskDefinition.taskDefinitionArn' \
                            --output text)

                        echo "New task definition ARN: $NEW_TASK_DEF_ARN"

                        # Atualiza o service para usar a nova task definition
                        aws ecs update-service \
                            --cluster $ECS_CLUSTER \
                            --service $ECS_SERVICE \
                            --task-definition $NEW_TASK_DEF_ARN

                        echo "ECS Service updated!"
                    '''
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                echo "Deployment finished. Verify the URL in your browser:"
                echo "http://${APP_NAME}.s3-website-${AWS_DEFAULT_REGION}.amazonaws.com"
            }
        }
    }
}