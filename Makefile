.PHONY: all build-backend build-frontend docker-build docker-up start-frontend docs

BACKEND_DIR=./backend
FRONTEND_DIR=./frontend
DOCKER_COMPOSE_FILE=./docker-compose.yml
DOCS_DIR=$(BACKEND_DIR)/docs

docs:
	@docker run --rm -p 8080:8080 -v $(PWD)/$(DOCS_DIR)/api:/usr/share/nginx/html/swagger -e SWAGGER_JSON=/usr/share/nginx/html/swagger/spec.yml swaggerapi/swagger-ui

run-server: build-backend docker-build docker-up

build-backend:
	cd $(BACKEND_DIR) && npm run build

docker-build:
	cd $(BACKEND_DIR) && docker build -t task-manager-app-backend .

docker-up:
	docker-compose -f $(DOCKER_COMPOSE_FILE) up --build -d

run-frontend:
	cd $(FRONTEND_DIR) && npm install && ng build && ng serve

clean:
	docker-compose -f $(DOCKER_COMPOSE_FILE) down --volumes
