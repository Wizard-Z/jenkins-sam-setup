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
    // If there are functions with "Image" PackageType in your template,
    // uncomment the line below and add "--image-repository ${TESTING_IMAGE_REPOSITORY}" to
    // testing "sam package" and "sam deploy" commands.
    // TESTING_IMAGE_REPOSITORY = '0123456789.dkr.ecr.region.amazonaws.com/repository-name'
    TESTING_REGION = 'ap-south-1'
    PROD_STACK_NAME = 'sfdcPlatform-posidex'
    PROD_PIPELINE_EXECUTION_ROLE = 'arn:aws:iam::813997507867:user/restrictive-readOnly'
    PROD_CLOUDFORMATION_EXECUTION_ROLE = 'arn:aws:iam::813997507867:user/restrictive-readOnly'
    PROD_ARTIFACTS_BUCKET = 'samclibucketz12'
    // If there are functions with "Image" PackageType in your template,
    // uncomment the line below and add "--image-repository ${PROD_IMAGE_REPOSITORY}" to
    // prod "sam package" and "sam deploy" commands.
    // PROD_IMAGE_REPOSITORY = '0123456789.dkr.ecr.region.amazonaws.com/repository-name'
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

    // stage('build-and-deploy-feature') {
    //   // this stage is triggered only for feature branches (feature*),
    //   // which will build the stack and deploy to a stack named with branch name.
    //   when {
    //     branch 'feature*'
    //   }
    //   agent {
    //     docker {
    //       // If you only use a single runtime, replace with a proper image from 
    //       // https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-image-repositories.html
    //       // And remove --use-container option in sam build command below
    //       image 'public.ecr.aws/sam/build-provided'
    //       args '--user 0:0 -v /var/run/docker.sock:/var/run/docker.sock'
    //     }
    //   }
    //   steps {
    //     sh 'sam --version'
    //     sh 'sam build --template ${SAM_TEMPLATE} --use-container'
    //     sh 'ls -la .aws-sam'
    //     withAWS(
    //         credentials: env.PIPELINE_USER_CREDENTIAL_ID,
    //         region: env.TESTING_REGION,
    //         role: env.TESTING_PIPELINE_EXECUTION_ROLE,
    //         roleSessionName: 'deploying-feature') {
    //       sh '''
    //         ls -la .aws-sam
    //         sam deploy --stack-name $(echo ${BRANCH_NAME} | tr -cd '[a-zA-Z0-9-]') \
    //           --capabilities CAPABILITY_IAM \
    //           --region ${TESTING_REGION} \
    //           --s3-bucket ${TESTING_ARTIFACTS_BUCKET} \
    //           --no-fail-on-empty-changeset \
    //           --role-arn ${TESTING_CLOUDFORMATION_EXECUTION_ROLE}
    //       '''
    //     }
    //   }
    // }

    stage('build-and-package') {
      when {
        branch env.MAIN_BRANCH
      }
      // agent {
      //   docker {
      //     // If you only use a single runtime, replace with a proper image from 
      //     // https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-image-repositories.html
      //     // And remove --use-container option in sam build command below
      //     image 'public.ecr.aws/sam/build-provided'
      //     args '--user 0:0 -v /var/run/docker.sock:/var/run/docker.sock'
      //   }
      // }
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



    // uncomment and modify the following step for running the integration-tests
    // stage('integration-test') {
    //   when {
    //     branch env.MAIN_BRANCH
    //   }
    //   steps {
    //     sh '''
    //       # trigger the integration tests here
    //     '''
    //   }
    // }

    // stage('deploy-prod') {
    //   when {
    //     branch env.MAIN_BRANCH
    //   }
    //   agent {
    //     docker {
    //       // If you only use a single runtime, replace with a proper image from 
    //       // https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-image-repositories.html
    //       image 'public.ecr.aws/sam/build-provided'
    //     }
    //   }
    //   steps {
    //     // uncomment this to have a manual approval step before deployment to production
    //     // timeout(time: 24, unit: 'HOURS') {
    //     //   input 'Please confirm before starting production deployment'
    //     // }
    //     withAWS(
    //         credentials: env.PIPELINE_USER_CREDENTIAL_ID,
    //         region: env.PROD_REGION,
    //         role: env.PROD_PIPELINE_EXECUTION_ROLE,
    //         roleSessionName: 'prod-deployment') {
    //       sh '''
    //         sam deploy --stack-name ${PROD_STACK_NAME} \
    //           --template packaged-prod.yaml \
    //           --capabilities CAPABILITY_IAM \
    //           --region ${PROD_REGION} \
    //           --s3-bucket ${PROD_ARTIFACTS_BUCKET} \
    //           --no-fail-on-empty-changeset \
    //           --role-arn ${PROD_CLOUDFORMATION_EXECUTION_ROLE}
    //       '''
    //     }
    //   }
    // }
  }
}
