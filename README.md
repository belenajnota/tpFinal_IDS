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

Usuarios

- id
- usuario
- contrasena
- telefono
- id_photocards

Se puede encontrar la estructura de la base de datos en el archivo

```
./backend/src/scripts/db.sql
```

Para levantar la base de datos y ver la Página correr:

```
make start-page
```

Si esta en macOS y el primer comando no funciona, pruebe para levantar la base de datos y ver la Página:

```
make  start-page-alt
```

Si desea ver los logs del frontend:

```
make logs-frontend
```

Si solo se quiere levantar la base de datos:

```
make start-db
```

Si quiere cerrar la base de datos:

```
make stop-db
```

# Consideraciones Importantes al Usar la Página

## Pautas para Completar Formularios

- En los campos solo se pueden poner letras o numeros.
- Un carácter no puede aparecer más de dos veces consecutivas.
- Para cargar las imagenes, se deben colocar en /frontend/Pagina-de-Administrador/k-card-inicio/images , en la carpeta que corresponda
- En el campo de la imagen se debe poner el nombre del archivo junto al formato . webp, si es correcto el nombre en la card se verá la imagen.

## Advertencia

Los contenedores de docker se ejecutan en los puertos : 3000, 5432 y 8080.

# Grupo

Los emuladores

# Integrantes

Ian Albornoz y Mayra Belen Ajnota Alarcon
