/*
un album puede tener como 2 photocards
*/

CREATE TABLE albums (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    grupo VARCHAR(30) NOT NULL,
    version_album VARCHAR(30) NOT NULL,
    imagen VARCHAR(200) NOT NULL,
    pais VARCHAR(15),
    empresa VARCHAR(15)
);
<<<<<<< Updated upstream


=======
nombre, version_album, imagen, pais, empresa
>>>>>>> Stashed changes
CREATE TABLE photocards (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL,
    imagen VARCHAR(200) NOT NULL,
    precio_comprada INT NOT NULL,
<<<<<<< Updated upstream
    fecha_comprada DATE NOT NULL,
    estado VARCHAR(15) NOT NULL,
    id_album INT REFERENCES albums(id) ON DELETE CASCADE
=======
    album_id INT REFERENCES albums(id) ON DELETE CASCADE,
    disponible BOOLEAN DEFAULT true
>>>>>>> Stashed changes
);

nombre, grupo, imagen, precio_comprada, album_id, disponible

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

<<<<<<< Updated upstream


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
=======
INSERT INTO albums (nombre, grupo, version_album, imagen, pais, empresa) VALUES
('Formula of Love', 'TWICE', 'Version A', 'https://http2.mlstatic.com/D_613558-MLU69642152447_052023-C.jpg', 'Corea', 'JYP'),
('Born Pink', 'BLACKPINK', 'Version Black', 'https://http2.mlstatic.com/D_NQ_NP_834996-MLA83204059508_042025-O.webp', 'Corea', 'YG'),
('The Album', 'BLACKPINK', 'Version Pink', 'https://http2.mlstatic.com/D_NQ_NP_770845-MLA43693020978_102020-O.webp', 'Corea', 'YG'),
('Sticker','NCT', 'Version Seoul City', 'https://cdn.dc5.ro/img-prod/1517545281-0.jpeg', 'Corea', 'SM'),
('Maxident', 'Stray Kids', 'Version Heart', 'https://http2.mlstatic.com/D_NQ_NP_919578-MLA82640350825_022025-O.webp', 'Corea', 'JYP'),
('Face the Sun', 'Seventeen', 'Compact', 'https://towerrecords.com/cdn/shop/files/4090695-2837374.jpg?v=1711763767', 'Corea', 'PLEDIS'),
('Eyes Wide Open', 'TWICE','Version B', 'https://lightupk.com/cdn/shop/products/2_ae77f279-fd1f-4899-9187-e0a9f4a83270.png?v=1654139247', 'Corea', 'JYP'),
('Get Up', 'New Jeans', 'Version Bunny', 'https://acdn-us.mitiendanube.com/stores/001/444/863/products/blac-6b08705ccbbfac6cf717162191891349-1024-1024.jpg', 'Corea', 'ADOR');
>>>>>>> Stashed changes

INSERT INTO photocards (nombre, grupo, imagen, precio_comprada, album_id) VALUES
('Nayeon Formula A', 'TWICE', 'https://i.pinimg.com/736x/b4/63/75/b4637547a80b6659f379a345da8f2bf1.jpg', 1200, 1),
('Dahyun Formula A', 'TWICE', 'https://i.pinimg.com/736x/69/d3/98/69d3982ac864cb083cc7152649fd9e45.jpg', 1000, 1),
('Jeongyeon Formula A', 'TWICE', 'https://i.pinimg.com/736x/d1/fa/f7/d1faf719e5a16f3b075cefb5649c47f1.jpg', 900, 1),
('Lisa Born Pink', 'BLACKPINK', 'https://pbs.twimg.com/media/FpgWIxhaMAUOq4Q.jpg:large', 1600, 2),
('Jisoo The Album', 'BLACKPINK', 'https://i.pinimg.com/736x/8e/30/f7/8e30f7198f3d5ec978eac1b45b3de846.jpg', 1500, 3),
('Taeyong Sticker', 'NCT 127', 'https://i.pinimg.com/736x/13/fb/24/13fb24ff7767dec846bd3da6c38f7e7a.jpg', 1100, 4),
('Hyunjin Maxident', 'Stray Kids', 'https://i.pinimg.com/736x/b4/5a/dc/b45adc4ea1cf4f9e55dcb68e8332680b.jpg', 1400, 5),
('Mingyu Face Compact', 'SEVENTEEN', 'https://www.suruga-ya.jp/database/pics_light/game/gl459199.jpg', 1300, 6),
('Scoups Face Compact', 'SEVENTEEN', 'https://i.ebayimg.com/images/g/UD0AAOSwIS1nkZ~g/s-l1200.jpg', 1350, 6),
('Sana Eyes B', 'TWICE', 'https://i.pinimg.com/736x/6b/a8/b9/6ba8b9057aa1efc629a3e20ddef6f5d4.jpg', 1100, 7),
('Tzuyu Eyes B', 'TWICE', 'https://i.pinimg.com/736x/8f/a3/1c/8fa31c6bd4f1b4a93d9b78060bb3ca68.jpg', 1050, 7),
('Danielle Get Up', 'NewJeans', 'https://i.pinimg.com/736x/4f/fc/fd/4ffcfd7c33263ab76393877be42e8f18.jpg', 2000, 8),
('Hanni Get Up', 'NewJeans', 'https://i.pinimg.com/736x/ad/92/a8/ad92a8a6ac100aebec21e18630325346.jpg', 1900, 8);

INSERT INTO ventas (nombre_cliente, telefono_cliente, instagram_cliente, precio_venta, medio_de_pago, fecha_venta, lugar_entrega, fecha_entrega, hora_entrega, costo_entrega, id_photocard) VALUES
('Lucía Fernández', '1134567890', '@lucia_kpop', 1800, 'MercadoPago', '2024-06-22', 'Caballito', '2024-06-24', '16:30', 300, 4),
('Martina López', '1167894321', '@marti_blink', 1300, 'Efectivo', '2024-04-15', 'Recoleta', '2024-04-16', '14:00', 200, 6),
('Sofía Kim', '1176543210', '@sofi_newjeans', 2300, 'Transferencia', '2024-07-03', 'Belgrano', '2024-07-04', '15:00', 400, 13),
('Agustina Ramírez', '1143218765', '@agus_twice', 1200, 'Efectivo', '2024-05-16', 'Palermo', '2024-05-18', '13:00', 250, 3),
('Lautaro Pérez', '1198765432', '@lau_svtn', 1600, 'MercadoPago', '2024-06-20', 'Almagro', '2024-06-21', '17:30', 300, 10),
('Milagros Gómez', '1161111222', '@mila_twice', 1100, 'Efectivo', '2024-06-28', 'Villa Crespo', '2024-06-29', '15:00', 200, 2),
('Camila Díaz', '1144445566', '@camidiaz_tw', 1150, 'MercadoPago', '2024-07-03', 'San Cristóbal', '2024-07-04', '17:00', 300, 2),
('Josefina Vera', '1133334444', '@jose.newjeans', 2200, 'Transferencia', '2024-07-05', 'Villa Devoto', '2024-07-06', '18:00', 300, 12),
('Bianca Suárez', '1155556677', '@bianca_dani', 2150, 'Efectivo', '2024-07-06', 'Caballito', '2024-07-07', '13:30', 250, 12),
('Bruno Molina', '1122334455', '@bruno_svt', 1400, 'Transferencia', '2024-07-02', 'Chacarita', '2024-07-03', '19:00', 350, 9),
('Valeria Núñez', '1166677788', '@valen_sco', 1380, 'MercadoPago', '2024-07-03', 'Villa Urquiza', '2024-07-05', '12:00', 300, 9);

<<<<<<< Updated upstream

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


=======
>>>>>>> Stashed changes
