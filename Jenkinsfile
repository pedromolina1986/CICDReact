// Jenkinsfile para executar comandos AWS CLI usando Docker
pipeline {
    agent any

    environment {
        AWS_CLI_IMAGE = 'amazon/aws-cli:latest'
    }

    stages {
        stage("AWS") {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'reactAWS',
                    passwordVariable: 'AWS_SECRET_ACCESS_KEY',
                    usernameVariable: 'AWS_ACCESS_KEY_ID'
                )]) {
                    script {
                        // Puxa a imagem AWS CLI
                        sh "docker pull ${AWS_CLI_IMAGE}"

                        // Roda todos os comandos AWS CLI em uma única execução do container
                        sh """
                            docker run --rm \
                                -e AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} \
                                -e AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} \
                                ${AWS_CLI_IMAGE} sh -c "aws --version && aws s3 ls"
                        """
                    }
                }
            }
        }
    }
}