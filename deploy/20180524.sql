-- create new table
CREATE TABLE JPNDB2T.dbo.EJPN_USERS (
	USER_ID char(8) NOT NULL,
	LOGIN_TIME int DEFAULT ((0)) NOT NULL,
	LOGOUT_TIME int DEFAULT ((0)) NOT NULL,
	IS_LOGGED_IN tinyint DEFAULT ((0)) NOT NULL,
	PC_ID char(10),
	CONSTRAINT EJPN_USERS_PK PRIMARY KEY (USER_ID)
);
CREATE INDEX EJPN_USERS_USER_ID_IDX ON JPNDB2T.dbo.EJPN_USERS (USER_ID);

-- add index to navigation table
CREATE UNIQUE INDEX NAVIGATION_NAVI_NAME_IDX ON JPNDB2T.dbo.NAVIGATION (NAVI_NAME);

-- add new row in navigation for sistem-dalaman-utama children
DECLARE @dt VARCHAR(14) = FORMAT( SYSDATETIME(), 'yyyyMMddHHmmss' )
INSERT INTO JPNDB2T.dbo.NAVIGATION
(NAVI_NAME, NAVI_LABEL, NAVI_CODE, NAVI_AUTH, NAVI_URL, NAVI_PARENT_NAME, NAVI_VER, NAVI_URL_WAS)
VALUES
('symac', 'SYMAC', '', '', '', 'sistem-dalaman-utama', @dt, NULL)
,('sistem-esijil', 'Sistem eSijil', '', '', 'http://esijiltraining.jpn.gov.my/skd', 'sistem-dalaman-utama', @dt, NULL)
,('cuid', 'CUID', '', '', 'http://jpncuid.jpn.gov.my', 'sistem-dalaman-utama', @dt, NULL)
,('bis', 'BIS', '', '', '', 'sistem-dalaman-utama', @dt, NULL);

-- update MENU_ITEM url
DECLARE @dt VARCHAR(14) = FORMAT( SYSDATETIME(), 'yyyyMMddHHmmss' )
UPDATE JPNDB2T.dbo.NAVIGATION
set NAVI_URL = 'MENU_ITEM' , NAVI_VER = @dt
WHERE NAVI_NAME IN ('urusniaga-utama','sistem-dalaman-utama');

