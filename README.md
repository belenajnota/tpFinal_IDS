# Trabajo Practico Final de Introducción al Desarrollo de Software 1C-2025

# K-cards

K-cards es una página web de registro de ventas y coleccion de photocards. Permite agregar photocards a tu coleccion o eliminarlas, ademas de poder venderlas y tener un registro a quien y datos de la venta.


Las entidades representadas en tablas de la base de datos son:

Photocards
- id
- nombre
- imagen
- precio_comprada
- fecha_comprada
- estado
- id_album


Ventas
- id 
- nombre_cliente 
- telefono_cliente 
- instagram_cliente
- precio_venta 
- medio_de_pago 
- fecha_venta
- lugar_entrega 
- fecha_entrega
- hora_entrega 
- costo_entrega 
- id_photocard 
- id_album 


Albums
- id 
- nombre 
- version_album 
- grupo 
- imagen 
- fecha_lanzamiento 
- precio 


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