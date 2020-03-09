# Habitissimo Challenge

El stack utilizado para desarrollar el challenge ha sido el siguiente: 

* Front - ReactJS
* Back - NodeJS Express
* BBDD - PostgreSQL


### Pre-requisitos

El proyecto esta comprimido en un contenedor docker por lo que para correrlo hará falta tener instalado docker en el sistema. Se puede descargar el archivo json de postman para probar los endpoints del back.


### Instalación

Dentro de la carpeta raiz del proyecto correr el siguiente comando:

```
docker-compose up --build -d (opcional para correrlo en segundo plano)
```

Una vez esté el proyecto activo, correr los siguientes comandos para ejecutar las migraciones dentro del contenedor

```
docker-compose run api-app bash
```

```
npm run migrate up
```


## Test - Back

Para ejecutar los test del back ejecutar el siguiente comando dentro del contenedor. Haber hecho las migraciones para que funcionen correctamente.

```
npm run test
```


## Autor

* **Alberto Soler** 
