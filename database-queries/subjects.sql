INSERT INTO "Subjects"("Name","Classroom","Credits","Slots","Program_Id") VALUES
	('Algoritmos y Programación','AA_108',4,20, 1),
	('Cálculo I','AA_312',4,40, 1),
	('Cátedra Universidad y Entorno','BINF_5',3,40, 1),
	('Competencias Comunicativas','BINF_8',4,40, 1),
	('Socio Humanística I','AA_201',3,40, 1),
	
	('Álgebra Lineal','BINF_2',3,40, 1),
	('Cálculo II','AA_318',3,40, 1),
	('Ética y Política','AA_310',4,40, 1),
	('Física I','AA_302',4,40, 1),
	('Programación I','BINF_1',4,20, 1),
	
	('Cálculo III','AA_305',3,40, 1),
	('Economía','AA_316',4,40, 1),
	('Expresión Gráfica y Geometría Descriptiva','BINF_3',3,20, 1),
	('Física II','BINF_9',4,40, 1),
	('Programación II','AA_319',4,20, 1),
	
	('Socio Humanística II','AA_309',3,40, 1),
	('Cálculo IV','AA_308',3,40, 1),
	('Física III','BINF_4',4,40, 1),
	('Metodología de la Investigación y Diseño Experimental','AA_304',3,40, 1),
	('Probabilidad y Estadística','BINF_10',3,40, 1),
	
	('Programación III','AA_303',4,20, 1),
	('Bases de Datos I','BINF_7',4,20, 1),
	('Electrónica General','AA_306',4,20, 1),
	('Ingeniería de Requisitos','BINF_6',4,20, 1),
	('Métodos Numéricos','AA_311',3,40, 1),
	
	('Teoría General de Sistemas','AA_320',3,20, 1),
	('Bases de Datos II','AA_314',4,20, 1),
	('Comunicaciones','AA_315',4,20, 1),
	('Ingeniería del Software I','AA_317',4,20, 1),
	('Investigación de Operaciones','AA_313',4,20, 1),
	
	('Matemáticas Discretas','AA_321',3,20, 1),
	('Ingeniería del Software II','AA_307',4,20, 1),
	('Lenguajes Formales','AA_301',4,20, 1),
	('Sistemas Distribuidos','AA_308',3,20, 1),
	('Sistemas Operativos','BINF_1',4,20, 1),
	
	('Transmisión de Datos','BINF_2',4,20, 1),
	('Administración','AA_309',3,40, 1),
	('Arquitectura de Computadores','AA_310',3,20, 1),
	('Inteligencia Computacional','BINF_3',4,20, 1),
	('Redes de Datos','AA_311',4,20, 1),
	
	('Trabajo de Campo','BINF_4',4,20, 1),
	('Auditoría de Sistemas','AA_312',3,20, 1),
	('Electiva I','AA_313',3,20, 1),
	('Electiva II','AA_314',3,20, 1),
	('Gerencia Informática','BINF_5',3,40, 1),
	
	('Seminario de Trabajo de Grado','AA_315',3,20, 1),
	('Simulación por Computador','AA_316',4,20, 1),
	('Electiva III','BINF_6',3,20, 1),
	('Electiva IV','AA_317',3,20, 1);



-- students.sql

INSERT INTO "Students"("Name","Birthdate","Document_Type","Document_Number","Program_Id") VALUES
('Mickey Mouse', '2002-01-30', 'CC', '1232744981', 1),
('Donald Duck', '2001-02-15', 'TI', '2235678912', 1),
('Minnie Mouse', '2000-03-10', 'CC', '3234567890', 1),
('Goofy Goof', '1999-04-25', 'TI', '4234567891', 1),
('Daisy Duck', '1998-05-05', 'CC', '5234567892', 1),
('Pluto Dog', '2002-06-15', 'TI', '6234567893', 1),
('Max Goof', '2001-07-20', 'CC', '7234567894', 1),
('Clarabelle Cow', '2000-08-30', 'TI', '8234567895', 1),
('Horace Horsecollar', '1999-09-12', 'CC', '9234567896', 1),
('Scrooge McDuck', '1998-10-01', 'TI', '1023456789', 1),
('Huey Duck', '2002-11-23', 'CC', '1123456780', 1),
('Dewey Duck', '2001-12-31', 'TI', '1223456781', 1),
('Louie Duck', '2000-01-22', 'CC', '1323456782', 1),
('Chip', '1999-02-14', 'TI', '1423456783', 1),
('Dale', '1998-03-05', 'CC', '1523456784', 1),
('Launchpad McQuack', '2002-04-18', 'TI', '1623456785', 1),
('Gadget Hackwrench', '2001-05-25', 'CC', '1723456786', 1),
('Monterey Jack', '2000-06-14', 'TI', '1823456787', 1),
('Zipper', '1999-07-29', 'CC', '1923456788', 1),
('Darkwing Duck', '1998-08-17', 'TI', '2023456789', 1),
('Gosalyn Mallard', '2002-09-28', 'CC', '2123456790', 1),
('Launchpad McQuack', '2001-10-06', 'TI', '2223456791', 1),
('Fenton Crackshell', '2000-11-19', 'CC', '2323456792', 1),
('Gyro Gearloose', '1999-12-09', 'TI', '2423456793', 1),
('Ludwig Von Drake', '1998-01-07', 'CC', '2523456794', 1),
('Webby Vanderquack', '2002-02-03', 'TI', '2623456795', 1),
('Duckworth', '2001-03-11', 'CC', '2723456796', 1),
('Bentina Beakley', '2000-04-22', 'TI', '2823456797', 1),
('Ma Beagle', '1999-05-13', 'CC', '2923456798', 1),
('Flintheart Glomgold', '1998-06-21', 'TI', '3023456799', 1);
