pipeline {
    agent any
    environment {
        NETLIFY_SITE_ID = '248c92b0-e710-4a73-8fc7-1378a7390781'
        myReactAppToken = credentials('myreactapp-netlify')
    }
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
                    image "node:22"
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
                npm install -g netlify-cli
                node_modules/.bin/netlify --version
                echo "$NETLIFY_SITE_ID"
                node_modules/.bin/netlify status
                node_modules/.bin/netlify deploy --site=$NETLIFY_SITE_ID --prod --dir=build
                '''
            }       
        }
    }
}