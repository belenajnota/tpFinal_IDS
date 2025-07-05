# Trabajo Practico Final de Introducción al Desarrollo de Software 1C-2025

# K-cards

K-cards es una página web de registro de ventas y coleccion de photocards. Permite agregar photocards a tu coleccion o eliminarlas, ademas de poder venderlas y tener un registro a quien y datos de la venta.


Las entidades representadas en tablas de la base de datos son:

Photocards
- id
- nombre_idol
- grupo
- nombre_album
- imagen
- precio
- precio_comprada


Photocards_vendidas
- id
- tipo_entrega
- lugar_entrega
- costo_entrega
- fecha_entrega
- hora_entrega
- id_photocard FK photocards(id)


Compradores
- id 
- nombre_comprador
- numero_telefono_comprador
- usuario_instagram_comprador
- medio_de_pago
- localidad
- id_photocard_comprada FK photocards_vendidas(id)


Se puede encontrar la estructura de la base de datos en el archivo
```
./backend/scripts/db.sql
```

Para levantar el proyecto correr:
```
make run-backend
```

Para levantar el backend correr:
```
make run-backend
```

Si solo se quiere levantar la base de datos:
```
make start-db
```