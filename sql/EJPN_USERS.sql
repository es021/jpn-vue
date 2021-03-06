-- Drop table

-- DROP TABLE JPNCFG.dbo.EJPN_USERS

CREATE TABLE JPNCFG.dbo.EJPN_USERS (
	USER_ID char(8) NOT NULL,
	LOGIN_TIME int DEFAULT ((0)) NOT NULL,
	LOGOUT_TIME int DEFAULT ((0)) NOT NULL,
	IS_LOGGED_IN tinyint DEFAULT ((0)) NOT NULL,
	PC_ID char(10),
	CONSTRAINT EJPN_USERS_PK PRIMARY KEY (USER_ID)
) go
CREATE INDEX EJPN_USERS_USER_ID_IDX ON JPNCFG.dbo.EJPN_USERS (USER_ID) go
