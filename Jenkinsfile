pipeline {
  agent any

  environment {
    PIPELINE_USER_CREDENTIAL_ID = 'AWS-JENKINS-USER'
    FUNCTION_DIR = 'src' 
    SAM_TEMPLATE = 'template.yaml'
    SAM_CONFIG = 'samconfig.toml'
    MAIN_BRANCH = 'main'
    TESTING_STACK_NAME = 'sfdcPlatform-posidex'
    TESTING_PIPELINE_EXECUTION_ROLE = 'arn:aws:iam::813997507867:role/jenkins-aws-sam-execution-role'
    TESTING_CLOUDFORMATION_EXECUTION_ROLE = 'arn:aws:iam::813997507867:user/restrictive-readOnly'
    TESTING_ARTIFACTS_BUCKET = 'samclibucketz12'
    TESTING_REGION = 'ap-south-1'
    PROD_STACK_NAME = 'sfdcPlatform-posidex'
    PROD_PIPELINE_EXECUTION_ROLE = 'arn:aws:iam::813997507867:user/restrictive-readOnly'
    PROD_CLOUDFORMATION_EXECUTION_ROLE = 'arn:aws:iam::813997507867:user/restrictive-readOnly'
    PROD_ARTIFACTS_BUCKET = 'samclibucketz12'
    PROD_REGION = 'ap-south-1'
  }
  stages {
    // uncomment and modify the following step for running the unit-tests
    stage('test') {
      steps {
        sh '''
          echo testing
        '''
      }
    }

    stage('build-and-package') {
      when {
        branch env.MAIN_BRANCH
      }
      
      steps {

        sh '''
        echo Version check
        node --version
        npm --version
        sam --version
        '''
        sh 'sam build -t ${SAM_TEMPLATE} '
        // sh 'sam build --template ${SAM_TEMPLATE} --use-container'
        sh 'ls -la .aws-sam'

        // archiveArtifacts artifacts: 'packaged-testing.yaml'
        // archiveArtifacts artifacts: 'packaged-prod.yaml'
      }
    }

    stage('deploy') {
      when {
        branch env.MAIN_BRANCH
      }
      steps {
        withAWS(
            credentials: env.PIPELINE_USER_CREDENTIAL_ID,
            region: env.TESTING_REGION,
            role: env.TESTING_PIPELINE_EXECUTION_ROLE,
            roleSessionName: 'testing-packaging') {
          sh '''
          ls -la .aws-sam
          sam deploy --config-env dev --config-file ${SAM_CONFIG}
          '''
        }

      }
    }
  }
}
