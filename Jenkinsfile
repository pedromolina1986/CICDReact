pipeline {
    agent any
    stages {
        stage("Build") {
            agent {
                docker {
                    image "node:22"
                    reuseNode true
                }
            }
            steps {
                sh '''
                    cd /my-app
                    ls -la
                    node --version
                    npm --version
                    npm install
                    npm run build
                '''
            }       
        }
    }
}