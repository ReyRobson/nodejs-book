pipeline{
    agent any
    stages{
        stage('git'){
            steps{
                checkout scm
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
                sh 'docker-compose up -f selenium/docker-compose.yml -d'
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
            sh 'echo terminou em erro'
        }
        success{
            sh 'echo terminou em sucesso'
        }
    }
}