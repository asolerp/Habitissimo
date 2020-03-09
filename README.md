# Habitissimo Challenge

El stack utilizado para desarrollar el challenge ha sido el siguiente. 

* Front - ReactJS
* Back - NodeJS Express
* BBDD - PostgreSQL


### Prerequisitos

El proyecto esta comprimido en un contenedor de docker por lo que para correrlo hará falta tener instalado docker en el sistema.


### Instalación

Dentro de la carpeta raiz del proyecto correr el siguiente comando:

```
docker-compose up --build -d (opcional para correrlo en segundo plano)
```

Una vez este el proyecto activo, ejecutar los siguiente comandos para ejectura la migraciones dentro del contenedor de docker

```
docker-compose run api-app bash
```

```
npm run migrate up
```


## Test - Back

Para ejecutar los test del back ejectar el siguiente comando dentro del contenedor:

```
npm run test
```


## Autor

* **Alberto Soler** 

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.
