# Makefile
.PHONY: docs

docs:
	@docker run --rm -p 8080:8080 -v $(PWD)/docs:/usr/share/nginx/html/swagger -e SWAGGER_JSON=/usr/share/nginx/html/swagger/spec.yml swaggerapi/swagger-ui
