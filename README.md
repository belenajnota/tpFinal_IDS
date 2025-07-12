# Trabajo Practico Final de Introducción al Desarrollo de Software 1C-2025

# KpopCardz

KpopCardz es una página web de registro de ventas y coleccion de photocards. Permite agregar photocards a tu coleccion o eliminarlas, ademas de poder venderlas y tener un registro a quien y datos de la venta.


Las entidades representadas en tablas de la base de datos son:

Albums
- id
- nombre
- grupo
- version_album
- imagen
- pais
- empresa

Ventas
- id 
- nombre_cliente 
- telefono_cliente 
- precio_venta 
- medio_de_pago 
- fecha_venta
- lugar_entrega 
- fecha_entrega
- hora_entrega 
- costo_entrega 
- id_photocard 

Photocards
- id 
- nombre 
- grupo 
- imagen 
- precio_comprada 
- album_id
- disponible 


Se puede encontrar la estructura de la base de datos en el archivo
```
./backend/scripts/db.sql
```

Para levantar el backend correr:
```
make run-backend
```

Si solo se quiere levantar la base de datos:
```
make start-db
```

# Grupo 
Los emuladores
# Integrantes 
Ian Albornoz y Mayra Belen Ajnota Alarcon 