pipeline {
    agent any
    
    stages{
        stage("AWS"){
            agent {
                docker {
                    image 'amazon/aws-cli'
                    args '-u root:root'
                }
            }
            steps{
                withCredentials([usernamePassword(
                    credentialsId: 'reactAWS2',
                    passwordVariable: 'AWS_SECRET_ACCESS_KEY',
                    usernameVariable: 'AWS_ACCESS_KEY_ID'
                )]) {
                    sh '''
                        aws --version
                        aws s3 ls
                    '''
                }                
            }
        }       
    }
}