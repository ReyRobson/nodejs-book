pipeline{
    agent any
    stages{
        stage('git'){
            steps{
                checkout scm
            }
        }
        stage('Push Notification') {
            steps {
                    sh "curl -X POST      -H 'Content-Type: application/json'    -d '{'chat_id': '-544511860', 'text': 'pipeline has started', 'disable_notification': true}'    https://api.telegram.org/bot1727699220:AAHs8HH1OaBcI1wzj3oVTRi6JMoBH5UOPtY/sendMessage"
                }
            }
        stage('code analysis'){
            steps{
                script{
                    def scannerHome = tool 'sonar_dir'
                    withSonarQubeEnv("sonar-server"){
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=nodejs-book -Dsonar.sources=."
                    }
                }
            }
        }
        stage('UnitTest'){
            steps{
                sh 'npm i'
                sh 'npm run UniTest:ci'
                junit checksName: 'Unit Test', testResults: 'Test-results.xml'
            }
        }
        stage('IntegrationTest'){
            steps{
                sh 'npm run IntegratedTest:ci'
                junit checksName: 'Integration Test', testResults: 'Test-results.xml'
            }
        }
        stage('AcceptanceTest'){
            steps{
                sh 'docker-compose -f selenium/docker-compose.yml up -d'
                sh 'npm run AcceptanceTest:ci'
                sh 'docker-compose down -f selenium/docker-compose.yml'
                junit checksName: 'Acceptance Test', testResults: 'Test-results.xml'
            }
        }
        stage('PerformanceTest'){
            steps{
                sh './apache-jmeter-5.3/bin/jmeter -Jjmeter.save.saveservice.output_format=xml -n -t /jmeter/JMeter.jmx -l JMeter.jtl'
            }
        }
    }
    post{
        failure{
            sendTelegram("pipeline ${env.JOB_NAME} [${env.BUILD_NUMBER}] terminou em erro. Favor verificar")
            sh 'docker-compose down -f selenium/docker-compose.yml'
        }   
        success{
            sendTelegram("pipeline ${env.JOB_NAME} [${env.BUILD_NUMBER}] terminou com sucesso")
        }
    }
}