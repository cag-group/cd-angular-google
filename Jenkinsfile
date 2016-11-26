def configureAndDeploy(String namespace, GString imageTag, String deployTimestamp) {
    // Add namespaces in case they don't exist
    sh("kubectl apply -f namespaces.yaml")

    // Configure
    sh("sed -i.bak 's#PLACEHOLDER_IMAGE_TAG#${imageTag}#' k8s/frontend.yaml")

    // Deploy
    sh("kubectl --namespace=${namespace} apply -f k8s/")
}

def developersConsoleProject = 'google-cloud-project-name'
def projectPrefix = 'angular-google'
def stageConfigurationEnv = 'stage'
def prodConfigurationEnv = 'prod'
def stageNamespace = projectPrefix + '-' + stageConfigurationEnv
def prodNamespace = projectPrefix + '-' + prodConfigurationEnv
def imageTag = "eu.gcr.io/${developersConsoleProject}/${projectPrefix}:${env.BUILD_NUMBER}"
def deployTimestamp = '$(date -u +"%Y-%m-%dT%H:%M:%SZ")'

stage('Build') {
    node {
        stage('Check branch') {
            if (env.BRANCH_NAME != 'master') {
                print 'No pipeline action for branch ' + env.BRANCH_NAME
                return
            }
        }

        stage('Checkout SCM and build') {
            checkout scm

            // Inject version number
            sh("sed -i.bak 's#PLACEHOLDER_VERSION#${env.BUILD_NUMBER}#' app/components/version/version.js")

            // TODO: Inject build timestamp

            sh("docker build -t ${imageTag} .")
            sh("gcloud docker push ${imageTag}")
        }
    }
}

stage('Stage environment') {
    lock(resource: 'stage-env', inversePrecedence: true) {
        node {
            checkout scm
            configureAndDeploy(stageNamespace, imageTag, deployTimestamp)
        }
    }
}

stage('Promotion') {
    milestone()
    input message: 'Deploy to production?'
}

stage('Prod environment') {
    lock(resource: 'prod-env', inversePrecedence: true) {
        node {
            checkout scm
            configureAndDeploy(prodNamespace, imageTag, deployTimestamp)
        }
    }
}
