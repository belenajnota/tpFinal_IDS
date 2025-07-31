.PHONY: start-db  stop-db run-frontend run-frontend-alt start-page start-page-alt logs-backend logs-frontend run-backend

start-db:
	docker compose up --build -d
	@echo "Esperando que PostgreSQL acepte conexiones..."
	@until docker exec tpfinal_ids-postgres-1 psql -U postgres -c '\q' > /dev/null 2>&1; do \
		sleep 1; \
	done
	@echo "Base de datos conectada. Insertando datos..."
	docker exec -i tpfinal_ids-postgres-1 psql -U postgres -d k-cards < ./backend/src/scripts/db.sql



stop-db:
	 docker compose down -v


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

run-backend:
	cd ./backend && npm run dev



