-- Drop table

-- DROP TABLE JPNCFG.dbo.EJPN_NAVIGATION

CREATE TABLE JPNCFG.dbo.EJPN_NAVIGATION (
	NAVI_ID int NOT NULL IDENTITY(1,1),
	NAVI_NAME varchar(500) NOT NULL,
	NAVI_LABEL varchar(500) NOT NULL,
	NAVI_CODE varchar(20),
	NAVI_AUTH varchar(500),
	NAVI_URL varchar(500),
	NAVI_PARENT_NAME varchar(500),
	NAVI_VER varchar(15) NOT NULL,
	NAVI_URL_WAS varchar(500),
	NAVI_AUTH_LEVEL varchar(50),
	CONSTRAINT NAVIGATION_PK PRIMARY KEY (NAVI_ID)
)

CREATE UNIQUE INDEX NAVIGATION_NAVI_NAME_IDX ON JPNCFG.dbo.EJPN_NAVIGATION (NAVI_NAME)

INSERT INTO JPNCFG.dbo.EJPN_NAVIGATION (NAVI_NAME,NAVI_LABEL,NAVI_CODE,NAVI_AUTH,NAVI_URL,NAVI_PARENT_NAME,NAVI_VER,NAVI_URL_WAS,NAVI_AUTH_LEVEL) VALUES 
('senarai-kerja','Senarai Kerja','','','','','20180716093933',NULL,'0')
,('urusniaga-utama','Urusniaga Utama','','','MENU_ITEM','','20180530111638',NULL,'0')
,('kelahiran','Kelahiran','','','http://10.23.191.36:8080/ROOT3/common/branch_login.jsp?pcid={{PC_ID}}','urusniaga-utama','20180714020310',NULL,'1')
,('kematian','Kematian','','','http://10.23.191.36:8080/ROOT3/common/branch_login.jsp?pcid={{PC_ID}}','urusniaga-utama','20180714020325',NULL,'2')
,('pengangkatan-ejpn','Pengangkatan JPN','','','MENU_ITEM','urusniaga-utama','20180714015804',NULL,'8')
,('pengangkatan-ejpn-pendaftaran-pengangkatan-mahkamah','Pendaftaran Pengangkatan Mahkamah','','','TEXT_MENU','pengangkatan-ejpn','20180714013615',NULL,'8')
,('penerimaan-permohonan-pengangkatan','Penerimaan Permohonan Pengangkatan','385010','11000000','/transaction/T385150','pengangkatan-ejpn-pendaftaran-pengangkatan-mahkamah','20180715102428',NULL,'8')
,('pengangkatan-ejpn-pendaftaran-pengangkatan-mahkamah-pendaftaran-pengangkatan-mahkamah','Pendaftaran Pengangkatan Mahkamah','382050','11000000','/JPN/COOP.T3861501.TC.html','pengangkatan-ejpn-pendaftaran-pengangkatan-mahkamah','20180517251818',NULL,'8')
,('pengesahan-pendaftaran-pengangkatan-mahkamah','Pengesahan Pendaftaran Pengangkatan Mahkamah','382060','00100000','','pengangkatan-ejpn-pendaftaran-pengangkatan-mahkamah','20180517161818',NULL,'8')
,('cetakan-sijil-pendaftaran-pengangkatan-mahkamah','Cetakan Sijil Pendaftaran Pengangkatan Mahkamah','382070','11000000','','pengangkatan-ejpn-pendaftaran-pengangkatan-mahkamah','20180517161818',NULL,'8')
;
INSERT INTO JPNCFG.dbo.EJPN_NAVIGATION (NAVI_NAME,NAVI_LABEL,NAVI_CODE,NAVI_AUTH,NAVI_URL,NAVI_PARENT_NAME,NAVI_VER,NAVI_URL_WAS,NAVI_AUTH_LEVEL) VALUES 
('bayaran-pendaftaran-pengangkatan-mahkamah','Bayaran Pendaftaran Pengangkatan Mahkamah','382000','01000000','','pengangkatan-ejpn-pendaftaran-pengangkatan-mahkamah','20180517161818',NULL,'8')
,('pembatalan-bayaran-pendaftaran-pengangkatan-mahkamah','Pembatalan Bayaran Pendaftaran Pengangkatan Mahkamah','382008','01000000','','pengangkatan-ejpn-pendaftaran-pengangkatan-mahkamah','20180517161818',NULL,'8')
,('serahan-daftar-individu-mykid','Serahan Daftar Individu/MyKid','384850','11000000','','pengangkatan-ejpn-pendaftaran-pengangkatan-mahkamah','20180517161818',NULL,'8')
,('permohonan-pindaan-maklumat-pengangkatan-mahkamah','Permohonan Pindaan Maklumat Pengangkatan Mahkamah','','','TEXT_MENU','pengangkatan-ejpn','20180714013409',NULL,'8')
,('penerimaan-permohonan-pindaan-maklumat-pengangkatan','Penerimaan Permohonan Pindaan Maklumat Pengangkatan','385012','11000000','','permohonan-pindaan-maklumat-pengangkatan-mahkamah','20180517161818',NULL,'8')
,('permohonan-pindaan-maklumat-pengangkatan-mahkamah-kesilapan-fakta','Permohonan Pindaan Maklumat Pengangkatan Mahkamah (Kesilapan Fakta)','383250','11000000','','permohonan-pindaan-maklumat-pengangkatan-mahkamah','20180517161818',NULL,'8')
,('pengesahan-pindaan-maklumat-pengangkatan-mahkamah-kesilapan-fakta','Pengesahan Pindaan Maklumat Pengangkatan Mahkamah (Kesilapan Fakta)','383260','00100000','','permohonan-pindaan-maklumat-pengangkatan-mahkamah','20180517161818',NULL,'8')
,('cetakan-sijil-pindaan-maklumat-pengangkatan-mahkamah','Cetakan Sijil Pindaan Maklumat Pengangkatan Mahkamah','383270','00100000','','permohonan-pindaan-maklumat-pengangkatan-mahkamah','20180517161818',NULL,'8')
,('bayaran-pindaan-maklumat-pengangkatan-mahkamah','Bayaran Pindaan Maklumat Pengangkatan Mahkamah','383000','01000000','','permohonan-pindaan-maklumat-pengangkatan-mahkamah','20180517161818',NULL,'8')
,('pembatalan-bayaran-pindaan-maklumat-pengangkatan-mahkamah','Pembatalan Bayaran Pindaan Maklumat Pengangkatan Mahkamah','383008','01000000','','permohonan-pindaan-maklumat-pengangkatan-mahkamah','20180517161818',NULL,'8')
;
INSERT INTO JPNCFG.dbo.EJPN_NAVIGATION (NAVI_NAME,NAVI_LABEL,NAVI_CODE,NAVI_AUTH,NAVI_URL,NAVI_PARENT_NAME,NAVI_VER,NAVI_URL_WAS,NAVI_AUTH_LEVEL) VALUES 
('cabutan','Cabutan','','','TEXT_MENU','pengangkatan-ejpn','20180714013750',NULL,'8')
,('permohonan-cabutan-sijil-pengangkatan','Permohonan Cabutan Sijil Pengangkatan','384050','11000000','','cabutan','20180517161818',NULL,'8')
,('pengesahan-cabutan-sijil-pengangkatan','Pengesahan Cabutan Sijil Pengangkatan','384060','00100000','','cabutan','20180517161818',NULL,'8')
,('bayaran-cabutan-sijil-pengangkatan','Bayaran Cabutan Sijil Pengangkatan','384000','01000000','','cabutan','20180517161818',NULL,'8')
,('pembatalan-bayaran-cabutan-sijil-pengangkatan','Pembatalan Bayaran Cabutan Sijil Pengangkatan','384008','01000000','','cabutan','20180517161818',NULL,'8')
,('penyelenggaraan-dan-pembatalan','Penyelenggaraan Dan Pembatalan','','','TEXT_MENU','pengangkatan-ejpn','20180714013935',NULL,'8')
,('penyelenggaraan-nombor-siri-sijil-pengangkatan','Penyelenggaraan Nombor Siri Sijil Pengangkatan','386150','00100000','/JPN/w386150.jsp','penyelenggaraan-dan-pembatalan','20180517161818',NULL,'8')
,('pembatalan-daftar-dan-cetakan-semula-sijil-pengangkatan','Pembatalan Daftar dan Cetakan Semula Sijil Pengangkatan','385150','11000000','','penyelenggaraan-dan-pembatalan','20180517161818',NULL,'8')
,('pengangkatan-ejpn-cetakan','Cetakan','','','TEXT_MENU','pengangkatan-ejpn','20180714013900',NULL,'8')
,('cetakan-semula-notis-perakuan-penerimaan-permohonan-pengangkatan','Cetakan Semula Notis Perakuan Penerimaan Permohonan Pengangkatan','385014','11000000','','pengangkatan-ejpn-cetakan','20180517161818',NULL,'8')
;
INSERT INTO JPNCFG.dbo.EJPN_NAVIGATION (NAVI_NAME,NAVI_LABEL,NAVI_CODE,NAVI_AUTH,NAVI_URL,NAVI_PARENT_NAME,NAVI_VER,NAVI_URL_WAS,NAVI_AUTH_LEVEL) VALUES 
('cetakan-semula-notis-perakuan-penerimaan-pindaan-maklumat-pengangkatan','Cetakan Semula Notis Perakuan Penerimaan Pindaan Maklumat Pengangkatan','385016','11000000','','pengangkatan-ejpn-cetakan','20180517161818',NULL,'8')
,('cetakan-semula-surat-makluman-kepada-mahkamah','Cetakan Semula Surat Makluman Kepada Mahkamah','385018','11000000','','pengangkatan-ejpn-cetakan','20180517161818',NULL,'8')
,('cetakan-semula-surat-kepada-sesiapa-berkenaan','Cetakan Semula Surat Kepada Sesiapa Berkenaan','385020','11000000','','pengangkatan-ejpn-cetakan','20180517161818',NULL,'8')
,('cetakan-semula-notis-bayaran-belum-diterima','Cetakan Semula Notis Bayaran Belum Diterima','385022','11000000','','pengangkatan-ejpn-cetakan','20180517161818',NULL,'8')
,('cetakan-semula-notis-kutipan-mykid','Cetakan Semula Notis Kutipan MyKid','385024','11000000','','pengangkatan-ejpn-cetakan','20180517161818',NULL,'8')
,('cetakan-semula-salinan-sah-daftar','Cetakan Semula Salinan Sah Daftar','385026','11000000','','pengangkatan-ejpn-cetakan','20180517161818',NULL,'8')
,('cetakan-semula-validasi-borang','Cetakan Semula Validasi Borang','385028','11000000','','pengangkatan-ejpn-cetakan','20180517161818',NULL,'8')
,('cetakan-semula-resit-bayaran','Cetakan Semula Resit Bayaran','385030','11000000','','pengangkatan-ejpn-cetakan','20180517161818',NULL,'8')
,('pengangkatan-ijpn','Pengangkatan iJPN','','','','urusniaga-utama','20180714015034',NULL,'-1')
,('pengurusan-cawangan-ejpn','Pengurusan Cawangan JPN','','','MENU_ITEM','urusniaga-utama','20180714015817',NULL,'0')
;
INSERT INTO JPNCFG.dbo.EJPN_NAVIGATION (NAVI_NAME,NAVI_LABEL,NAVI_CODE,NAVI_AUTH,NAVI_URL,NAVI_PARENT_NAME,NAVI_VER,NAVI_URL_WAS,NAVI_AUTH_LEVEL) VALUES 
('pengurusan-cawangan-ejpn-selenggara','Selenggara','','','TEXT_MENU','pengurusan-cawangan-ejpn','20180530111500',NULL,'0')
,('selenggara-tempoh-notis-kutipan-mykid','Selenggara Tempoh Notis Kutipan MyKid','415004','00100000,00100000','https://xmail-01.ximplify.com/Default.aspx','pengurusan-cawangan-ejpn-selenggara','20180716094200',NULL,'4,8')
,('selenggara-nombor-telefon-pejabat-jpn','Selenggara Nombor Telefon Pejabat JPN','415006','00100000','http://192.168.0.240:8080/JPN/COOP.T3861501.TC.html','pengurusan-cawangan-ejpn-selenggara','20180517161818',NULL,'0')
,('selenggara-id-pengguna','Selenggara ID Pengguna','415008','00100000','','pengurusan-cawangan-ejpn-selenggara','20180517161818',NULL,'0')
,('sokongan-cetakan','Sokongan/cetakan','','','TEXT_MENU','pengurusan-cawangan-ejpn','20180530111500',NULL,'0')
,('menu-utama-dan-skrin-login','Menu Utama dan Skrin Login','-','','','sokongan-cetakan','20180517161818',NULL,'0')
,('sokongan-cetakan-senarai-kerja','Senarai Kerja','-','00100000','','sokongan-cetakan','20180517161818',NULL,'0')
,('senarai-pengumpulan-borang-urusniaga','Senarai Pengumpulan Borang Urusniaga','415002','00100000','','sokongan-cetakan','20180517161818',NULL,'0')
,('senarai-cetakan-sijil-mengikut-status','Senarai Cetakan Sijil Mengikut Status','415010','00100000','','sokongan-cetakan','20180517161818',NULL,'0')
,('teknikal','Teknikal','','','TEXT_MENU','pengurusan-cawangan-ejpn','20180530111500',NULL,'0')
;
INSERT INTO JPNCFG.dbo.EJPN_NAVIGATION (NAVI_NAME,NAVI_LABEL,NAVI_CODE,NAVI_AUTH,NAVI_URL,NAVI_PARENT_NAME,NAVI_VER,NAVI_URL_WAS,NAVI_AUTH_LEVEL) VALUES 
('pertanyaan-translog','Pertanyaan Translog','-','11100000','','teknikal','20180517161818',NULL,'0')
,('pemindahan-rekod-urusniaga-luar-talian-ke-hos','Pemindahan Rekod Urusniaga Luar Talian ke Hos','-','00111111','','teknikal','20180517161818',NULL,'0')
,('offline-web-scheduler','Offline Web Scheduler','-','00111111','','teknikal','20180517161818',NULL,'0')
,('perkahwinan-dan-penceraian-ejpn','Perkahwinan dan Penceraian JPN','','','','urusniaga-utama','20180714020635',NULL,'4')
,('perkahwinan-dan-penceraian-ejpn-pendaftaran-perkahwinan','Pendaftaran Perkahwinan','','','','perkahwinan-dan-penceraian-ejpn','20180714020905',NULL,'4')
,('permohonan-perkahwinan','Permohonan Perkahwinan','341050','11000000','https://xmail-01.ximplify.com/Default.aspx','perkahwinan-dan-penceraian-ejpn-pendaftaran-perkahwinan','20180517161818',NULL,'4')
,('pengesahan-permohonan-perkahwinan','Pengesahan Permohonan Perkahwinan','341060','11000000','http://192.168.0.240:8080/JPN/COOP.T3861501.TC.html','perkahwinan-dan-penceraian-ejpn-pendaftaran-perkahwinan','20180517161818',NULL,'4')
,('bayaran-permohonan-perkahwinan','Bayaran Permohonan Perkahwinan','341100','01000000','','perkahwinan-dan-penceraian-ejpn-pendaftaran-perkahwinan','20180517161818',NULL,'4')
,('pembatalan-bayaran-permohonan-perkahwinan','Pembatalan Bayaran Permohonan Perkahwinan','341108','01000000','','perkahwinan-dan-penceraian-ejpn-pendaftaran-perkahwinan','20180517161818',NULL,'4')
,('perakuan-perkahwinan','Perakuan Perkahwinan','341450','11000000','','perkahwinan-dan-penceraian-ejpn-pendaftaran-perkahwinan','20180517161818',NULL,'4')
;
INSERT INTO JPNCFG.dbo.EJPN_NAVIGATION (NAVI_NAME,NAVI_LABEL,NAVI_CODE,NAVI_AUTH,NAVI_URL,NAVI_PARENT_NAME,NAVI_VER,NAVI_URL_WAS,NAVI_AUTH_LEVEL) VALUES 
('bayaran-perakuan-perkahwinan','Bayaran Perakuan Perkahwinan','341400','01000000','','perkahwinan-dan-penceraian-ejpn-pendaftaran-perkahwinan','20180517161818',NULL,'4')
,('pembatalan-bayaran-perakuan-perkahwinan','Pembatalan Bayaran Perakuan Perkahwinan','341408','01000000','','perkahwinan-dan-penceraian-ejpn-pendaftaran-perkahwinan','20180517161818',NULL,'4')
,('cetakan-semula-surat-perakuan-perkahwinan','Cetakan Semula Surat Perakuan Perkahwinan','347450','11000000','','perkahwinan-dan-penceraian-ejpn-pendaftaran-perkahwinan','20180517161818',NULL,'4')
,('perkahwinan-dan-penceraian-ejpn-pendaftaran-perkahwinan-pendaftaran-perkahwinan','Pendaftaran Perkahwinan','341550','11000000','','perkahwinan-dan-penceraian-ejpn-pendaftaran-perkahwinan','20180517161818',NULL,'4')
,('bayaran-pendaftaran-perkahwinan','Bayaran Pendaftaran Perkahwinan','341500','01000000','','perkahwinan-dan-penceraian-ejpn-pendaftaran-perkahwinan','20180517161818',NULL,'4')
,('pembatalan-pembayaran-perkahwinan','Pembatalan Pembayaran Perkahwinan','341508','01000000','','perkahwinan-dan-penceraian-ejpn-pendaftaran-perkahwinan','20180517161818',NULL,'4')
,('pengesahan-pendaftaran-perkahwinan','Pengesahan Pendaftaran Perkahwinan','341560','11100000','','perkahwinan-dan-penceraian-ejpn-pendaftaran-perkahwinan','20180517161818',NULL,'4')
,('pertukaran-tempat-dan-tarikh-upacara','Pertukaran Tempat Dan Tarikh Upacara','341650','11000000','','perkahwinan-dan-penceraian-ejpn-pendaftaran-perkahwinan','20180517161818',NULL,'4')
,('permohonan-bantahan-perkahwinan','Permohonan Bantahan Perkahwinan','342050','11000000','','perkahwinan-dan-penceraian-ejpn-pendaftaran-perkahwinan','20180517161818',NULL,'4')
,('bayaran-permohonan-bantahan-perkahwinan','Bayaran Permohonan Bantahan Perkahwinan','342000','01000000','','perkahwinan-dan-penceraian-ejpn-pendaftaran-perkahwinan','20180517161818',NULL,'4')
;
INSERT INTO JPNCFG.dbo.EJPN_NAVIGATION (NAVI_NAME,NAVI_LABEL,NAVI_CODE,NAVI_AUTH,NAVI_URL,NAVI_PARENT_NAME,NAVI_VER,NAVI_URL_WAS,NAVI_AUTH_LEVEL) VALUES 
('pembatalan-bayaran-permohonan-bantahan-perkahwinan','Pembatalan Bayaran Permohonan Bantahan Perkahwinan','342008','01000000','','perkahwinan-dan-penceraian-ejpn-pendaftaran-perkahwinan','20180517161818',NULL,'4')
,('kemaskini-keputusan-bantahan-perkahwinan','Kemaskini Keputusan Bantahan Perkahwinan','342150','00110000','','perkahwinan-dan-penceraian-ejpn-pendaftaran-perkahwinan','20180517161818',NULL,'4')
,('kemaskini-rekod-tangguh','Kemaskini Rekod Tangguh','343950','11000000','','perkahwinan-dan-penceraian-ejpn-pendaftaran-perkahwinan','20180517161818',NULL,'4')
,('pembatalan-perkahwinan','Pembatalan Perkahwinan','','','','perkahwinan-dan-penceraian-ejpn','20180714020830',NULL,'4')
,('pembatalan-permohonan-perkahwinan','Pembatalan Permohonan Perkahwinan','342550','11000000','','pembatalan-perkahwinan','20180517161818',NULL,'4')
,('perkahwinan-dan-penceraian-ejpn-selenggara','Selenggara','','','','perkahwinan-dan-penceraian-ejpn','20180714020841',NULL,'4')
,('penyelenggaraan-no-daftar-dan-no-siri-sijil','Penyelenggaraan No. Daftar dan No. Siri Sijil','349850','11000000','','perkahwinan-dan-penceraian-ejpn-selenggara','20180517161818',NULL,'4')
,('perkahwinan-dan-penceraian-ejpn-cetakan','Cetakan','','','','perkahwinan-dan-penceraian-ejpn','20180714020854',NULL,'4')
,('pembatalan-daftar-cabutan-perkahwinan-dan-cetakan-semula','Pembatalan Daftar/Cabutan Perkahwinan dan Cetakan Semula','347050','11000000','','perkahwinan-dan-penceraian-ejpn-cetakan','20180517161818',NULL,'4')
,('cetakan-semula-surat-temujanji','Cetakan Semula Surat Temujanji','347350','11000000','','perkahwinan-dan-penceraian-ejpn-cetakan','20180517161818',NULL,'4')
;
INSERT INTO JPNCFG.dbo.EJPN_NAVIGATION (NAVI_NAME,NAVI_LABEL,NAVI_CODE,NAVI_AUTH,NAVI_URL,NAVI_PARENT_NAME,NAVI_VER,NAVI_URL_WAS,NAVI_AUTH_LEVEL) VALUES 
('cetakan-semula-validasi-borang-permohonan','Cetakan Semula Validasi Borang Permohonan','347750','11000000','','perkahwinan-dan-penceraian-ejpn-cetakan','20180517161818',NULL,'4')
,('cetakan-semula-semakan-daftar-perkahwinan','Cetakan Semula Semakan Daftar Perkahwinan','347850','11000000','','perkahwinan-dan-penceraian-ejpn-cetakan','20180517161818',NULL,'4')
,('cetakan-semula-no-resit','Cetakan Semula No Resit','349010','01000000','','perkahwinan-dan-penceraian-ejpn-cetakan','20180517161818',NULL,'4')
,('perkahwinan-dan-penceraian-ijpn','Perkahwinan dan Penceraian iJPN','','','','urusniaga-utama','20180714015043',NULL,'-1')
,('warganegara','Warganegara','','','','urusniaga-utama','20180714014804',NULL,'-1')
,('kad-pengenalan','Kad Pengenalan','','','','urusniaga-utama','20180714014911',NULL,'-1')
,('siasatan-dan-penguatkuasaan','Siasatan dan Penguatkuasaan','','','','urusniaga-utama','20180714014921',NULL,'-1')
,('senarai-hitam','Senarai Hitam','','','','urusniaga-utama','20180714014940',NULL,'-1')
,('kutipan-hasil-ijpn','Kutipan Hasil iJPN','','','','urusniaga-utama','20180714014947',NULL,'-1')
,('pengujudan-dan-pengesahan-rekod','Pengujudan dan Pengesahan Rekod','','','','urusniaga-utama','20180714015001',NULL,'-1')
;
INSERT INTO JPNCFG.dbo.EJPN_NAVIGATION (NAVI_NAME,NAVI_LABEL,NAVI_CODE,NAVI_AUTH,NAVI_URL,NAVI_PARENT_NAME,NAVI_VER,NAVI_URL_WAS,NAVI_AUTH_LEVEL) VALUES 
('afis','AFIS','','','','urusniaga-utama','20180517161818',NULL,'0')
,('myidentity','myIDENTITY','','','','urusniaga-utama','20180517161818',NULL,'0')
,('idata','iDATA','','','http://google.com','urusniaga-utama','20180528104239',NULL,'0')
,('sistem-dalaman-utama','Sistem Dalaman Utama','','','MENU_ITEM','','20180530111638',NULL,'0')
,('integrasi','Integrasi','','','','','20180517161818',NULL,'0')
,('hebahan','Hebahan','','','','','20180517161818',NULL,'0')
,('informasi','Informasi','','','','','20180517161818',NULL,'0')
,('selenggara-id','Selenggara ID','','','','','20180517161818',NULL,'0')
,('spk','SPK','','','','','20180517161818',NULL,'0')
,('symac','SYMAC','','','','sistem-dalaman-utama','20180524092048',NULL,'0')
;
INSERT INTO JPNCFG.dbo.EJPN_NAVIGATION (NAVI_NAME,NAVI_LABEL,NAVI_CODE,NAVI_AUTH,NAVI_URL,NAVI_PARENT_NAME,NAVI_VER,NAVI_URL_WAS,NAVI_AUTH_LEVEL) VALUES 
('sistem-esijil','Sistem eSijil','','','http://esijiltraining.jpn.gov.my/skd','sistem-dalaman-utama','20180524092048',NULL,'0')
,('cuid','CUID','','','http://jpncuid.jpn.gov.my','sistem-dalaman-utama','20180524092048',NULL,'0')
,('bis','BIS','','','','sistem-dalaman-utama','20180524092048',NULL,'0')
;