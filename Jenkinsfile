def sendTelegram(message) {
    def encodedMessage = URLEncoder.encode(message, "UTF-8")
    withCredentials([string(credentialsId: 'telegramToken', variable: 'TOKEN'),
    string(credentialsId: 'telegramChatId', variable: 'CHAT_ID')]) {
        response = httpRequest (consoleLogResponseBody: true,
                contentType: 'APPLICATION_JSON',
                httpMode: 'GET',
                url: "https://api.telegram.org/bot$TOKEN/sendMessage?text=$encodedMessage&chat_id=$CHAT_ID&parse_mode=html&disable_web_page_preview=true",
                validResponseCodes: '200')
        return response
        }
    }

pipeline{
    agent any
    stages{
        stage('git'){
            steps{
                checkout scm
            }
        }
        stage('aviso'){
            steps{
                sendTelegram("pipeline começou")
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