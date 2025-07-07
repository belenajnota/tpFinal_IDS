CREATE TABLE albums (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    version_album VARCHAR(30) NOT NULL,
    grupo VARCHAR(20) NOT NULL,
    imagen VARCHAR(200),
    fecha_lanzamiento DATE,
    precio INT NOT NULL
);

nombre 30, version_album 30, grupo 20, imagen 200, fecha_lanzamiento, precio
CREATE TABLE photocards (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL,
    imagen VARCHAR(200) NOT NULL,
    precio_comprada INT NOT NULL,
    fecha_comprada DATE NOT NULL,
    estado VARCHAR(15) NOT NULL,
    id_album INT REFERENCES albums(id) ON DELETE CASCADE
);
CREATE TABLE ventas (
    id SERIAL PRIMARY KEY,
    nombre_cliente VARCHAR(40) NOT NULL,
    telefono_cliente VARCHAR(15) NOT NULL,
    instagram_cliente VARCHAR(30),
    precio_venta INT NOT NULL,
    medio_de_pago VARCHAR(20) NOT NULL,
    fecha_venta DATE NOT NULL,
    lugar_entrega VARCHAR(30) NOT NULL,
    fecha_entrega DATE NOT NULL,
    hora_entrega TIME,
    costo_entrega INT NOT NULL,
    id_photocard INT REFERENCES photocards(id) ON DELETE SET NULL,
    id_album INT REFERENCES albums(id) ON DELETE SET NULL
);

    nombre_cliente 40,
    telefono_cliente 15,
    instagram_cliente 30 ?,
    precio_venta ,
    medio_de_pago 20,
    lugar_entrega 30,
    hora_entrega ?,
    costo_entrega,
    id_photocard,
    id_album



INSERT INTO albums (nombre, version_album, grupo, imagen, fecha_lanzamiento, precio) VALUES
('Butter', 'Compact', 'BTS', NULL, NULL, 4200),                
('LALISA', 'Photobook ver.', 'BLACKPINK', NULL, NULL, 3500),   
('ATE', 'Standard', 'Stray Kids', NULL, NULL, 5100),         
('Lose Yourself', 'Limited', 'Kiss Of Life', NULL, NULL, 2400),
('Whiplash', 'Digital ver.', 'aespa', NULL, NULL, 5200),      
('Born Pink', 'Deluxe ver.', 'BLACKPINK', NULL, NULL, 2500),   
('Sticky', 'Standard', 'Kiss Of Life', NULL, NULL, 2400),     
('OMG', 'Weverse ver.', 'NewJeans', NULL, NULL, 1450),       
('MAXIDENT', 'Case ver.', 'Stray Kids', NULL, NULL, 3500),    
('With YOU-th', 'Platform ver.', 'TWICE', NULL, NULL, 7100);  


INSERT INTO photocards (nombre, imagen, precio_comprada, fecha_comprada, estado, id_album) VALUES
('Jungkook', 'https://i.pinimg.com/736x/7c/6d/d3/7c6dd3005bddc0739a8d3aa8cc792ad7.jpg', 4200, '2025-07-01', 'vendida', 1),
('Lisa', 'https://i.ebayimg.com/images/g/KJgAAOSwBEthO5Vy/s-l1200.jpg', 3500, '2025-07-01', 'vendida', 2),
('Hyunjin', 'https://ndc.infludeo.com/media/photocard_blur/2024/07/24/29eb360f52a24d55bb7bebf21ae2a514.jpg?f=auto&q=75&w=640', 5100, '2025-07-01', 'vendida', 3),
('Julie', 'https://i.ebayimg.com/images/g/JnoAAOSweHVnD90a/s-l1200.jpg', 2400, '2025-07-01', 'vendida', 4),
('Karina', 'https://i.ebayimg.com/images/g/fokAAOSwf6pnIdMC/s-l1200.jpg', 5200, '2025-07-01', 'vendida', 5),
('Jennie', 'https://i.pinimg.com/736x/0a/77/e7/0a77e741cb1b5293e2a1e8a434caa56d.jpg', 2500, '2025-07-01', 'vendida', 6),
('Natty', 'https://d1sut5kn3lwnf7.cloudfront.net/media/photocard_blur/2024/07/01/17303e0935a64ff480690acc49e9e1ed.jpg', 2400, '2025-07-01', 'vendida', 7),
('Hyein', 'https://64.media.tumblr.com/b926ea22adc9d91b76ab00e3c080c4e8/2a260927b365f5eb-08/s540x810/958ec958f8b7a8cdc551a35951202dd097f759c9.jpg', 1450, '2025-07-01', 'disponible', 8),
('Changbin', 'https://i.pinimg.com/736x/fc/45/7c/fc457c599a93fe7d028e6b2e4f4da506.jpg', 3500, '2025-07-01', 'disponible', 9),
('Nayeon', 'https://i.pinimg.com/736x/2c/07/3e/2c073eb48b786e5c85267b3f42c6c657.jpg', 7100, '2025-07-01', 'disponible', 10);


INSERT INTO ventas 
(nombre_cliente, telefono_cliente, instagram_cliente, precio_venta, medio_de_pago, fecha_venta, lugar_entrega, fecha_entrega, hora_entrega, costo_entrega, id_photocard, id_album)
VALUES
('Camila Rodríguez', '1123456789', 'cm.kpop', 6000, 'Mercado Pago', '2025-07-03', 'Av. Rivadavia 4623', '2025-07-05', '15:00:00', 5800, 1, 1),
('Lucas Martínez', '1159876543', 'lucasm.art', 3800, 'Efectivo', '2025-07-04', 'Barrio Chino', '2025-07-06', '10:00:00', 0, 2, 2),
('Martina López', '1145678901', NULL, 5600, 'Efectivo', '2025-07-05', 'Puerta del subte D', '2025-07-07', '17:15:00', 0, 3, 3),
('Sofia Gómez', '1167890123', 'cami.gmz', 3700, 'Mercado Pago', '2025-07-06', 'Barrio Chino', '2025-07-08', '13:30:00', 0, 4, 4),
('Agustina Pérez', '1176543210', 'agus.p', 4750, 'Transferencia', '2025-07-07', 'Barrio Chino', '2025-07-09', '12:00:00', 0, 5, 5),
('Valentina Lee', '1189012345', 'valenlee', 3000, 'Mercado Pago', '2025-07-08', 'Av. Cabildo 65', '2025-07-10', '16:00:00', 4000, 6, 6),
('Lucas Fernández', '1198765432', NULL, 4200, 'Tarjeta', '2025-07-09', 'Estación Central', '2025-07-11', '14:00:00', 3000, 7, 7);


