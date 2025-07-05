create table photocards (
    id serial primary key,
    nombre_idol varchar(40) not null,
    nombre_grupo varchar(20) not null,
    nombre_album varchar(30) not null,
    imagen varchar(200) not null,
    precio int not null,
    precio_comprada int not null

);

create table photocards_vendidas (
    id serial primary key,
    tipo_entrega varchar(40) not null ,
    lugar_entrega varchar(40) not null ,
    costo_entrega int not null,
    fecha_entrega date not null,
    hora_entrega time,
    id_photocard int references photocards (id)
);


create table compradores (
    id serial primary key,
    nombre varchar(40) not null ,
    numero_telefono varchar(15) not null ,
    usuario_instagram varchar(30),
    medio_de_pago varchar(20) not null ,
    localidad varchar(50) not null ,
    id_photocard_comprada int references photocards_vendidas (id)
);


INSERT INTO photocards (nombre_idol, nombre_grupo, nombre_album, imagen, precio, precio_comprada) VALUES
('Jungkook', 'BTS', 'Butter', 'https://i.pinimg.com/736x/7c/6d/d3/7c6dd3005bddc0739a8d3aa8cc792ad7.jpg', 6000, 4200),
('Lisa', 'BLACKPINK', 'LALISA', 'https://i.ebayimg.com/images/g/KJgAAOSwBEthO5Vy/s-l1200.jpg', 3800, 3500),
('Hyunjin', 'Stray Kids', 'ATE', 'https://ndc.infludeo.com/media/photocard_blur/2024/07/24/29eb360f52a24d55bb7bebf21ae2a514.jpg?f=auto&q=75&w=640', 8300, 5100),
('Julie', 'Kiss Of Life', 'Lose Yourself', 'https://i.ebayimg.com/images/g/JnoAAOSweHVnD90a/s-l1200.jpg', 2400, 2400),
('Karina', 'aespa', 'Whiplash', 'https://i.ebayimg.com/images/g/fokAAOSwf6pnIdMC/s-l1200.jpg', 5600, 5200),
('Jennie', 'BLACKPINK', 'Born Pink', 'https://i.pinimg.com/736x/0a/77/e7/0a77e741cb1b5293e2a1e8a434caa56d.jpg', 3700, 2500),
('Natty', 'Kiss Of Life', 'Sticky', 'https://d1sut5kn3lwnf7.cloudfront.net/media/photocard_blur/2024/07/01/17303e0935a64ff480690acc49e9e1ed.jpg', 3550, 2400),
('Hyein', 'NewJeans', 'OMG', 'https://64.media.tumblr.com/b926ea22adc9d91b76ab00e3c080c4e8/2a260927b365f5eb-08/s540x810/958ec958f8b7a8cdc551a35951202dd097f759c9.jpg', 1650, 1450),
('Changbin', 'Stray Kids', 'MAXIDENT', 'https://i.pinimg.com/736x/fc/45/7c/fc457c599a93fe7d028e6b2e4f4da506.jpg', 4750, 3500),
('Nayeon', 'TWICE', 'With YOU-th', 'https://i.pinimg.com/736x/2c/07/3e/2c073eb48b786e5c85267b3f42c6c657.jpg', 8900, 7100);


INSERT INTO photocards_vendidas (tipo_entrega, lugar_entrega, costo_entrega, fecha_entrega, hora_entrega, id_photocard) VALUES
('por moto', 'Estación Constitución', 5800, '2025-07-03', '15:00:00', 1),
('por correo', 'Correo Argentino', 11700, '2025-07-02', '10:00:00', 2),
('por moto', 'Estación Constitución', 5800, '2025-07-03', '15:00:00', 3),
('punto de encuentro', 'Puerta del subte D', 0, '2025-07-04', '17:15:00', 4),
('por correo', 'Terminal Retiro', 9600, '2025-07-05', '13:30:00', 5),
('punto de encuentro', 'Galerías Pacífico', 0, '2025-07-06', '12:00:00', 6),
('por moto', 'Parque Rivadavia', 4000, '2025-07-07', '16:00:00', 7),
('punto de encuentro', 'Plaza Italia', 0, '2025-07-08', '11:00:00', 8),
('punto de encuentro', 'Abasto Shopping', 0, '2025-07-09', '18:00:00', 9),
('por correo', 'Sucursal OCA - Caballito', 15000, '2025-07-10', '13:00:00', 10);

INSERT INTO compradores (nombre, numero_telefono, usuario_instagram, medio_de_pago, localidad, id_photocard_comprada) VALUES
('Camila Rodríguez', '1123456789', 'cm.kpop', 'Mercado Pago', 'Buenos Aires', 1),
('Lucas Martínez', '1159876543', 'lucasm.art', 'Efectivo', 'Buenos Aires', 2),
('Camila Rodríguez', '1123456789', 'cm.kpop', 'Mercado Pago', 'Buenos Aires', 3),
('Martina López', '1145678901', NULL, 'Efectivo', 'Buenos Aires', 4),
('Sofia Gómez', '1167890123', 'cami.gmz', 'Mercado Pago', 'Buenos Aires', 5),
('Agustina', '1176543210', 'agus.p', 'Transferencia', 'Buenos Aires', 6),
('Valentina', '1189012345', 'valenlee', 'Mercado Pago', 'Buenos Aires', 7),
('Carla Mendoza', '1132123456', 'carla.mdz', 'Efectivo', 'Buenos Aires', 8),
('Julieta Vargas', '1198765432', 'juli.seo', 'Mercado Pago', 'Buenos Aires', 9),
('Tamara Ruiz', '1129876543', 'tami_ruiz', 'Transferencia', 'Buenos Aires', 10);