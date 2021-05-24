pipeline{
    agent any
    stages{
        stage('git'){
            steps{
                checkout scm
            }
        }
        stage('UnitTest'){
            steps{
                sh 'npm i'
                sh 'npm run UniTest:ci'
                junit checksName: 'Unit Test', testResults: 'test-results.xml'
            }
        }
        stage('IntegrationTest'){
            steps{
                sh 'npm run IntegratedTest:ci'
                junit checksName: 'Integration Test', testResults: 'test-results.xml'
            }
        }
    }
    post{
        failure{
            sh 'echo terminou em erro'
        }
        success{
            sh 'echo terminou em sucesso'
        }
    }
}