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

                        // Roda comandos AWS CLI dentro do container
                        sh """
                            docker run --rm \
                                -e AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} \
                                -e AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} \
                                ${AWS_CLI_IMAGE} aws --version
                        """
                        sh """
                            docker run --rm \
                                -e AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} \
                                -e AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} \
                                ${AWS_CLI_IMAGE} aws s3 ls
                        """
                    }
                }
            }
        }
    }
}