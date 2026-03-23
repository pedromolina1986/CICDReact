pipeline {
    agent any
    environment {
        NETLIFY_SITE_ID = '248c92b0-e710-4a73-8fc7-1378a7390781'
        NETLIFY_AUTH_TOKEN = credentials('myreactapp-netlify')
    }
    stages {
        stage("Build") {
            agent {
                docker {
                    image "node:24.14.0-alpine"
                    reuseNode true
                }
            }
            steps {
                sh '''                
                    ls -la
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
                    image "node:24.14.0-alpine"
                    reuseNode true
                }
            }
            steps {
                sh '''                                    
                    test -f build/index.html
                    npm test
                '''
            }       
        }
        stage("Deploy") {
            agent {
                docker {
                    image "node:22"
                    reuseNode true
                }
            }
            steps {
                sh '''
                    npx netlifycli --version
                    echo "$NETLIFY_SITE_ID"
                    npx netlify-cli deploy \
                    --site=$NETLIFY_SITE_ID \
                    --prod \
                    --dir=build
                '''
            }       
        }
    }
}