.PHONY: start-db  stop-db run-frontend run-frontend-alt start-page start-page-alt logs-backend logs-frontend

start-db:
	docker compose up -d

stop-db:
	 docker compose down

run-frontend:
	xdg-open "http://localhost:8080/"

start-page: start-db run-frontend
	
run-frontend-alt:
	open "http://localhost:8080/"

start-page-alt: star-db run-frontend-alt

logs-backend:
	docker logs -f tpfinal_ids-backend-1


logs-frontend:
	docker logs -f tpfinal_ids-frontend-1




