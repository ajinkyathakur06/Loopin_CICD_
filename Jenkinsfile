// pipeline {
//     agent {
//         kubernetes {
//             yaml '''
// apiVersion: v1
// kind: Pod
// spec:
//   containers:
//   - name: sonar-scanner
//     image: sonarsource/sonar-scanner-cli
//     command: ["cat"]
//     tty: true

//   - name: kubectl
//     image: bitnami/kubectl:latest
//     command: ["cat"]
//     tty: true
//     securityContext:
//       runAsUser: 0
//       readOnlyRootFilesystem: false
//     env:
//     - name: KUBECONFIG
//       value: /kube/config
//     volumeMounts:
//     - name: kubeconfig-secret
//       mountPath: /kube/config
//       subPath: kubeconfig

//   - name: dind
//     image: docker:dind
//     securityContext:
//       privileged: true
//     env:
//     - name: DOCKER_TLS_CERTDIR
//       value: ""
//     volumeMounts:
//     - name: docker-config
//       mountPath: /etc/docker/daemon.json
//       subPath: daemon.json

//   volumes:
//   - name: docker-config
//     configMap:
//       name: docker-daemon-config

//   - name: kubeconfig-secret
//     secret:
//       secretName: kubeconfig-secret
// '''
//         }
//     }

//     stages {

//         stage('Build Backend Docker Image') {
//             steps {
//                 container('dind') {
//                     sh '''
//                         echo "Building backend Docker image..."
//                         sleep 10
//                         docker build -t loopin-backend:latest ./backend
//                         docker image ls
//                     '''
//                 }
//             }
//         }

//         stage('Build Frontend Docker Image') {
//             steps {
//                 container('dind') {
//                     sh '''
//                         echo "Building frontend Docker image..."
//                         docker build -t loopin-frontend:latest ./frontend
//                         docker image ls
//                     '''
//                 }
//             }
//         }

//         stage('SonarQube Analysis') {
//             steps {
//                 container('sonar-scanner') {
//                     withCredentials([string(credentialsId: '2401193_Loopin', variable: 'SONAR_TOKEN')]) {
//                         sh '''
//                             sonar-scanner \
//                                 -Dsonar.projectKey=2401193_Loopin \
//                                 -Dsonar.host.url=http://my-sonarqube-sonarqube.sonarqube.svc.cluster.local:9000 \
//                                 -Dsonar.login=$SONAR_TOKEN \
//                                 -Dsonar.sources=./ \
//                                 -Dsonar.exclusions=**/node_modules/**,**/dist/**
//                         '''
//                     }
//                 }
//             }
//         }

//         stage('Login to Docker Registry') {
//             steps {
//                 container('dind') {
//                     sh '''
//                         docker --version
//                         sleep 10
//                         docker login nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085 -u admin -p Changeme@2025
//                     '''
//                 }
//             }
//         }

//         stage('Tag & Push Images') {
//             steps {
//                 container('dind') {
//                     sh '''
//                         echo "Tagging images..."
//                         docker tag loopin-backend:latest nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/sanika-project/loopin-backend:latest
//                         docker tag loopin-frontend:latest nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/sanika-project/loopin-frontend:latest

//                         echo "Pushing images..."
//                         docker push nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/sanika-project/loopin-backend:latest
//                         docker push nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/sanika-project/loopin-frontend:latest

//                         docker image ls
//                     '''
//                 }
//             }
//         }

//         stage('Deploy MERN Application') {
//             steps {
//                 container('kubectl') {
//                     script {
//                         dir('k8s-deployment') {
//                             sh '''
//                                 echo "Applying MERN Kubernetes deployment..."
                               
//                                 kubectl apply -f loopin-all.yaml
//                             '''
//                         }
//                     }
//                 }
//             }
//         }
//     }
// }


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
                        docker build -t loopin-frontend:latest ./frontend
                        docker image ls
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
                            '''
                        }
                    }
                }
            }
        }

        /* =========================
           🔍 DEBUG STAGE FOR 503
        ========================= */
        stage('Debug 503 Error - Frontend, Backend & Ingress') {
            steps {
                container('kubectl') {
                    sh '''
                        echo "================ POD STATUS ================"
                        kubectl get pods -n 2401193 -o wide

                        echo "================ SERVICE STATUS ================"
                        kubectl get svc -n 2401193

                        echo "================ ENDPOINTS (CRITICAL) ================"
                        kubectl get endpoints -n 2401193

                        echo "================ BACKEND POD LOGS ================"
                        BACKEND_POD=$(kubectl get pods -n 2401193 -l app=mern-backend -o jsonpath="{.items[0].metadata.name}")
                        echo "Backend Pod: $BACKEND_POD"
                        kubectl logs $BACKEND_POD -n 2401193 --tail=200 || true

                        echo "================ FRONTEND POD LOGS ================"
                        FRONTEND_POD=$(kubectl get pods -n 2401193 -l app=mern-frontend -o jsonpath="{.items[0].metadata.name}")
                        echo "Frontend Pod: $FRONTEND_POD"
                        kubectl logs $FRONTEND_POD -n 2401193 --tail=200 || true

                        echo "================ BACKEND HEALTH CHECK FROM FRONTEND POD ================"
                        kubectl exec $FRONTEND_POD -n 2401193 -- \
                          sh -c "curl -v http://mern-backend-service:5002/health || true"

                        echo "================ INGRESS DETAILS ================"
                        kubectl describe ingress mern-ingress -n 2401193 || true

                        echo "================ INGRESS CONTROLLER LOGS ================"
                        kubectl logs -n kube-system -l app.kubernetes.io/name=ingress-nginx --tail=200 || true
                    '''
                }
            }
        }
    }
}
