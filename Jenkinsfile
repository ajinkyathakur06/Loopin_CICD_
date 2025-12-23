pipeline {
    agent {
        kubernetes {
            yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: sonar-scanner
    image: sonarsource/sonar-scanner-cli
    command: ["cat"]
    tty: true

  - name: kubectl
    image: bitnami/kubectl:latest
    command: ["cat"]
    tty: true
    securityContext:
      runAsUser: 0
      readOnlyRootFilesystem: false
    env:
    - name: KUBECONFIG
      value: /kube/config
    volumeMounts:
    - name: kubeconfig-secret
      mountPath: /kube/config
      subPath: kubeconfig

  - name: dind
    image: docker:dind
    securityContext:
      privileged: true
    env:
    - name: DOCKER_TLS_CERTDIR
      value: ""
    volumeMounts:
    - name: docker-config
      mountPath: /etc/docker/daemon.json
      subPath: daemon.json

  volumes:
  - name: docker-config
    configMap:
      name: docker-daemon-config

  - name: kubeconfig-secret
    secret:
      secretName: kubeconfig-secret
'''
        }
    }

    stages {

        stage('Build Backend Docker Image') {
            steps {
                container('dind') {
                    sh '''
                        echo "Building backend Docker image..."
                        sleep 10
                        docker build -t loopin-backend:latest ./backend
                        docker image ls
                    '''
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                container('dind') {
                    sh '''
                        echo "Building frontend Docker image..."
                        docker build \
                        --build-arg VITE_API_URL=https://loopin.imcc.com/api \
                        -t loopin-frontend:latest \
                        ./frontend
                    '''
                }
            }
        }


        stage('SonarQube Analysis') {
            steps {
                container('sonar-scanner') {
                    withCredentials([string(credentialsId: '2401193_Loopin', variable: 'SONAR_TOKEN')]) {
                        sh '''
                            sonar-scanner \
                                -Dsonar.projectKey=2401193_Loopin \
                                -Dsonar.host.url=http://my-sonarqube-sonarqube.sonarqube.svc.cluster.local:9000 \
                                -Dsonar.login=$SONAR_TOKEN \
                                -Dsonar.sources=./ \
                                -Dsonar.exclusions=**/node_modules/**,**/dist/**
                        '''
                    }
                }
            }
        }

        stage('Login to Docker Registry') {
            steps {
                container('dind') {
                    sh '''
                        docker --version
                        sleep 10
                        docker login nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085 -u admin -p Changeme@2025
                    '''
                }
            }
        }

        stage('Tag & Push Images') {
            steps {
                container('dind') {
                    sh '''
                        echo "Tagging images..."
                        docker tag loopin-backend:latest nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/sanika-project/loopin-backend:latest
                        docker tag loopin-frontend:latest nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/sanika-project/loopin-frontend:latest

                        echo "Pushing images..."
                        docker push nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/sanika-project/loopin-backend:latest
                        docker push nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/sanika-project/loopin-frontend:latest

                        docker image ls
                    '''
                }
            }
        }

        stage('Deploy MERN Application') {
            steps {
                container('kubectl') {
                    script {
                        dir('k8s-deployment') {
                            sh '''
                                echo "Applying MERN Kubernetes deployment..."
                                kubectl apply -f loopin-all.yaml
                                kubectl apply -f lts_secret.yaml

                                kubectl rollout restart deployment/loopin-backend-deployment
                            '''
                        }
                    }
                }
            }
        }
    }
}
