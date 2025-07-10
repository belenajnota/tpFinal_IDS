.PHONY: start-db run-backend stop-db run-frontend run-pagina

start-db:
	cd ./backend && docker compose up -d

stop-db:
	cd ./backend && docker compose down

start-backend:
	cd ./backend && npm run dev
	
run-frontend:
	cd ./frontend && http-server

run-backend: start-db start-backend 

