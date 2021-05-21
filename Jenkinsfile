pipeline{
    agent any
    stages{
        stage('git'){
            steps{
                checkout scm
            }
        }
        stage('stage 1'){
            steps{
                echo 'hello world'
            }
        }
    }
}