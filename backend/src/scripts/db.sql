CREATE TABLE albums (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    grupo VARCHAR(30) NOT NULL,
    version_album VARCHAR(30) NOT NULL,
    imagen VARCHAR(200) NOT NULL,
    pais VARCHAR(15) NOT NULL,
    empresa VARCHAR(15) NOT NULL

);

CREATE TABLE photocards (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL,
    grupo VARCHAR(30) NOT NULL,
    imagen VARCHAR(200) NOT NULL,
    precio_comprada INT NOT NULL,
    album_id INT REFERENCES albums(id) ON DELETE CASCADE,
    disponible BOOLEAN DEFAULT true
);



CREATE TABLE ventas (
    id SERIAL PRIMARY KEY,
    nombre_cliente VARCHAR(40) NOT NULL,
    telefono_cliente VARCHAR(15) NOT NULL,
    precio_venta INT NOT NULL,
    medio_de_pago VARCHAR(20) NOT NULL,
    fecha_venta DATE NOT NULL,
    lugar_entrega VARCHAR(30) NOT NULL,
    fecha_entrega DATE NOT NULL,
    hora_entrega TIME NOT NULL,
    costo_entrega INT NOT NULL,
    id_photocard INT REFERENCES photocards(id) ON DELETE SET NULL
);

CREATE TABLE usuarios(
    id SERIAL PRIMARY KEY,
    usuario VARCHAR(40) NOT NULL,
    contrasena VARCHAR(40) NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    id_ventas INTEGER[] 
)



INSERT INTO albums (nombre, grupo, version_album, imagen, pais, empresa) VALUES
('Butter', 'BTS', 'Compact', 'https://akamai.sscdn.co/uploadfile/letras/albuns/8/4/f/9/1082081621605417.jpg', 'Corea', 'hybe'),
('LALISA', 'BLACKPINK', 'Photobook ver.', 'https://upload.wikimedia.org/wikipedia/en/2/22/Lisa_-_Lalisa.png', 'Corea', 'YG'),
('ATE', 'Stray Kids', 'Standard', 'https://cdn-images.dzcdn.net/images/cover/bbe508aec4360f5adc963c9829d0d529/0x1900-000000-80-0-0.jpg', 'Corea', 'JYP'),
('Lose Yourself', 'Kiss Of Life', 'Limited', 'https://i.scdn.co/image/ab67616d0000b27315175a3af8eb08dbc8c77a31', 'Corea', 'S2'),
('Whiplash', 'aespa', 'Digital ver.', 'https://i.scdn.co/image/ab67616d0000b2736eb604294f8f58c9078f58b1', 'Corea', 'SM'),
('Born Pink', 'BLACKPINK', 'Deluxe ver.', 'https://contentv2.tap-commerce.com/cover/large/602448480095_1.jpg?id_com=1156', 'Corea', 'YG'),
('Sticky', 'Kiss Of Life', 'Standard', 'https://i.scdn.co/image/ab67616d0000b2734cd7f69b85766b3d3035c27c', 'Corea', 'S2'),
('OMG', 'NewJeans', 'Weverse ver.', 'https://upload.wikimedia.org/wikipedia/en/1/10/NewJeans_OMG_cover.jpg', 'Corea', 'HYBE'),
('MAXIDENT', 'Stray Kids', 'Case ver.', 'https://i.scdn.co/image/ab67616d0000b27385bcbbac459056ad6ee9426b', 'Corea', 'JYP'),
('With YOU-th', 'TWICE', 'Platform ver.', 'https://acdn-us.mitiendanube.com/stores/005/805/001/products/twice-with-you-th-13th-mini-album-nemo-version-glowing-version_600x-7f08251825267a8a8717502594213971-1024-1024.webp', 'Corea', 'JYP'),
('Formula of Love', 'TWICE', 'Version A', 'https://http2.mlstatic.com/D_613558-MLU69642152447_052023-C.jpg', 'Corea', 'JYP'),
('Born Pink', 'BLACKPINK', 'Version Black', 'https://http2.mlstatic.com/D_NQ_NP_834996-MLA83204059508_042025-O.webp', 'Corea', 'YG'),
('The Album', 'BLACKPINK', 'Version Pink', 'https://http2.mlstatic.com/D_NQ_NP_770845-MLA43693020978_102020-O.webp', 'Corea', 'YG'),
('Sticker', 'NCT', 'Version Seoul City', 'https://cdn.dc5.ro/img-prod/1517545281-0.jpeg', 'Corea', 'SM'),
('Maxident', 'Stray Kids', 'Version Heart', 'https://http2.mlstatic.com/D_NQ_NP_919578-MLA82640350825_022025-O.webp', 'Corea', 'JYP'),
('Face the Sun', 'Seventeen', 'Compact', 'https://towerrecords.com/cdn/shop/files/4090695-2837374.jpg?v=1711763767', 'Corea', 'PLEDIS'),
('Eyes Wide Open', 'TWICE', 'Version B', 'https://lightupk.com/cdn/shop/products/2_ae77f279-fd1f-4899-9187-e0a9f4a83270.png?v=1654139247', 'Corea', 'JYP'),
('Get Up', 'New Jeans', 'Version Bunny', 'https://acdn-us.mitiendanube.com/stores/001/444/863/products/blac-6b08705ccbbfac6cf717162191891349-1024-1024.jpg', 'Corea', 'ADOR');



INSERT INTO photocards (nombre, grupo, imagen, precio_comprada, album_id) VALUES
('Nayeon Formula A', 'TWICE', 'https://i.pinimg.com/736x/b4/63/75/b4637547a80b6659f379a345da8f2bf1.jpg', 1200, 11),
('Dahyun Formula A', 'TWICE', 'https://i.pinimg.com/736x/69/d3/98/69d3982ac864cb083cc7152649fd9e45.jpg', 1000, 11),
('Jeongyeon Formula A', 'TWICE', 'https://i.pinimg.com/736x/d1/fa/f7/d1faf719e5a16f3b075cefb5649c47f1.jpg', 900, 11),
('Lisa Born Pink', 'BLACKPINK', 'https://pbs.twimg.com/media/FpgWIxhaMAUOq4Q.jpg:large', 1600, 12),
('Jisoo The Album', 'BLACKPINK', 'https://i.pinimg.com/736x/8e/30/f7/8e30f7198f3d5ec978eac1b45b3de846.jpg', 1500, 13),
('Taeyong Sticker', 'NCT 127', 'https://i.pinimg.com/736x/13/fb/24/13fb24ff7767dec846bd3da6c38f7e7a.jpg', 1100, 14),
('Hyunjin Maxident', 'Stray Kids', 'https://i.pinimg.com/736x/b4/5a/dc/b45adc4ea1cf4f9e55dcb68e8332680b.jpg', 1400, 15),
('Mingyu Face Compact', 'SEVENTEEN', 'https://www.suruga-ya.jp/database/pics_light/game/gl459199.jpg', 1300, 16),
('Scoups Face Compact', 'SEVENTEEN', 'https://i.ebayimg.com/images/g/UD0AAOSwIS1nkZ~g/s-l1200.jpg', 1350, 16),
('Sana Eyes B', 'TWICE', 'https://i.pinimg.com/736x/6b/a8/b9/6ba8b9057aa1efc629a3e20ddef6f5d4.jpg', 1100, 17),
('Tzuyu Eyes B', 'TWICE', 'https://i.pinimg.com/736x/8f/a3/1c/8fa31c6bd4f1b4a93d9b78060bb3ca68.jpg', 1050, 17),
('Danielle Get Up', 'NewJeans', 'https://i.pinimg.com/736x/4f/fc/fd/4ffcfd7c33263ab76393877be42e8f18.jpg', 2000, 18),
('Hanni Get Up', 'NewJeans', 'https://i.pinimg.com/736x/ad/92/a8/ad92a8a6ac100aebec21e18630325346.jpg', 1900, 18);


INSERT INTO ventas (nombre_cliente, telefono_cliente, precio_venta, medio_de_pago, fecha_venta, lugar_entrega, fecha_entrega, hora_entrega, costo_entrega, id_photocard) VALUES
('Martina López', '1167894321', 1300, 'Efectivo', '2024-04-15', 'Recoleta', '2024-04-16', '14:00', 200, 6),
('Sofía Kim', '1176543210', 2300, 'Transferencia', '2024-07-03', 'Belgrano', '2024-07-04', '15:00', 400, 13),
('Agustina Ramírez', '1143218765', 1200, 'Efectivo', '2024-05-16', 'Palermo', '2024-05-18', '13:00', 250, 3),
('Lautaro Pérez', '1198765432', 1600, 'MercadoPago', '2024-06-20', 'Almagro', '2024-06-21', '17:30', 300, 10),
('Milagros Gómez', '1161111222', 1100, 'Efectivo', '2024-06-28', 'Villa Crespo', '2024-06-29', '15:00', 200, 2),
('Camila Díaz', '1144445566', 1150, 'MercadoPago', '2024-07-03', 'San Cristóbal', '2024-07-04', '17:00', 300, 2),
('Josefina Vera', '1133334444', 2200, 'Transferencia', '2024-07-05', 'Villa Devoto', '2024-07-06', '18:00', 300, 12),
('Bianca Suárez', '1155556677', 2150, 'Efectivo', '2024-07-06', 'Caballito', '2024-07-07', '13:30', 250, 12),
('Bruno Molina', '1122334455', 1400, 'Transferencia', '2024-07-02', 'Chacarita', '2024-07-03', '19:00', 350, 9),
('Valeria Núñez', '1166677788', 1380, 'MercadoPago', '2024-07-03', 'Villa Urquiza', '2024-07-05', '12:00', 300, 9);

