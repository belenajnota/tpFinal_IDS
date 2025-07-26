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
    id_photocards INTEGER[] 
)



INSERT INTO albums (nombre, grupo, version_album, imagen, pais, empresa) VALUES
('Butter', 'BTS', 'Compact', '../../images/albums/Butter.webp', 'Corea', 'hybe'),
('LALISA', 'BLACKPINK', 'Photobook ver.', '../../images/albums/LaLisa.webp', 'Corea', 'YG'),
('ATE', 'Stray Kids', 'Standard', '../../images/albums/AteStandard.webp', 'Corea', 'JYP'),
('Lose Yourself', 'Kiss Of Life', 'Limited', '../../images/albums/LoseYoutselfLimited.webp', 'Corea', 'S2'),
('Whiplash', 'aespa', 'Digital ver.', '../../images/albums/WhiplashDigital.webp', 'Corea', 'SM'),
('Born Pink', 'BLACKPINK', 'Deluxe ver.', '../../images/albums/BornPinkDeluxe.webp', 'Corea', 'YG'),
('Sticky', 'Kiss Of Life', 'Standard', '../../images/albums/StickyStandard.webp', 'Corea', 'S2'),
('OMG', 'NewJeans', 'Weverse ver.', '../../images/albums/OmgWeverse.webp', 'Corea', 'HYBE'),
('MAXIDENT', 'Stray Kids', 'Case ver.', '../../images/albums/MaxidentCase.webp', 'Corea', 'JYP'),
('With YOU-th', 'TWICE', 'Platform ver.', '../../images/albums/WithYou-thPlatform.webp', 'Corea', 'JYP'),
('Formula of Love', 'TWICE', 'Version A', '../../images/albums/FormulaOfLoveVersionA.webp', 'Corea', 'JYP'),
('Born Pink', 'BLACKPINK', 'Version Black', '../../images/albums/BornPinkVersionBlack.webp', 'Corea', 'YG'),
('The Album', 'BLACKPINK', 'Version Pink', '../../images/albums/TheAlbumVersionPink.webp', 'Corea', 'YG'),
('Sticker', 'NCT', 'Version Seoul City', '../../images/albums/StickerVersionSeoulCity.webp', 'Corea', 'SM'),
('Maxident', 'Stray Kids', 'Version Heart', '../../images/albums/MaxidentVersionHeart.webp', 'Corea', 'JYP'),
('Face the Sun', 'Seventeen', 'Compact', '../../images/albums/FaceTheSunCompact.webp', 'Corea', 'PLEDIS'),
('Eyes Wide Open', 'TWICE', 'Version B', '../../images/albums/EyesWideOpenVersionB.webp', 'Corea', 'JYP'),
('Get Up', 'New Jeans', 'Version Bunny', '../../images/albums/GetUpVersionBunny.webp', 'Corea', 'ADOR');



INSERT INTO photocards (nombre, grupo, imagen, precio_comprada, album_id) VALUES
('Nayeon Formula A', 'TWICE', '../../images/photocards/NayeonFormulaA.webp', 1200, 11),
('Dahyun Formula A', 'TWICE', '../../images/photocards/DahyunFormulaA.webp', 1000, 11),
('Jeongyeon Formula A', 'TWICE', '../../images/photocards/JeongyeonFormulaA.webp', 900, 11),
('Lisa Born Pink', 'BLACKPINK', '../../images/photocards/LisaBornPinkBlack.webp', 1600, 12),
('Jisoo The Album', 'BLACKPINK', '../../images/photocards/JisooTheAlbumPink.webp', 1500, 13),
('Taeyong Sticker', 'NCT 127', '../../images/photocards/TaeyongStickerSeoulCity.webp', 1100, 14),
('Hyunjin Maxident', 'Stray Kids', '../../images/photocards/HyunjinMaxidentHeart.webp', 1400, 15),
('Mingyu Face Compact', 'SEVENTEEN', '../../images/photocards/MingyuFaceCompact.webp', 1300, 16),
('Scoups Face Compact', 'SEVENTEEN', '../../images/photocards/ScoupsFaceCompact.webp', 1350, 16),
('Sana Eyes B', 'TWICE', '../../images/photocards/SanaEyesB.webp', 1100, 17),
('Tzuyu Eyes B', 'TWICE', '../../images/photocards/TzuyuEyesB.webp', 1050, 17),
('Danielle Get Up', 'NewJeans', '../../images/photocards/DanielleGetUpBunny.webp', 2000, 18),
('Hanni Get Up', 'NewJeans', '../../images/photocards/HanniGetUpBunny.webp', 1900, 18);


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

