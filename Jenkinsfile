pipeline {
    agent any    
    /*stages {
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
                    image "node:24.14.0-alpine"
                    reuseNode true
                }
            }
            steps {
                sh 'npx netlify-cli --version'
                sh 'npx netlify-cli deploy --dir=build --prod --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID'
            }
            
        }
    }*/
    stages{
        stage("AWS"){
            agent{
                docker{
                    image 'amazon/aws-cli'
                    reuseNode true
                    args '--entrypoint=""'
                }
            }
            steps{
                withCredentials([usernamePassword(credentialsId: 'reactAWS2', passwordVariable: 'AWS_SECRECT_ACCESS_KEY', usernameVariable: 'AWS_ACCESS_KEY_ID')]) {
                    sh'''
                        aws --version
                        aws s3 ls
                    '''
                }                
            }
        }       
    }
}