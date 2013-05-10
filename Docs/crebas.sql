/*==============================================================*/
/* Database name:  History                                      */
/* DBMS name:      Microsoft SQL Server 2005                    */
/* Created on:     2010/5/2 18:29:25                            */
/*==============================================================*/


use History
go

use History
go

/*==============================================================*/
/* Table: Country                                               */
/*==============================================================*/
create table Country (
   Id                   binary(16)           not null,
   Name                 varchar£¨100£©         null,
   FullName             varchar(100)         null,
   constraint PK_COUNTRY primary key (Id)
)
go

