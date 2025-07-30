.PHONY: start-db  stop-db run-frontend run-frontend-alt logs-backend logs-frontend

start-db:
	docker compose up -d

stop-db:
	 docker compose down

run-frontend:
	xdg-open "http://localhost:8080/"

run-frontend-alt:
	open "http://localhost:8080/"

logs-backend:
	docker logs -f tpfinal_ids-backend-1


logs-frontend:
	docker logs -f tpfinal_ids-frontend-1




