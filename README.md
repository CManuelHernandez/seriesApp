# Configuración de Seguridad de la Aplicación

## Descripción General

Este proyecto implementa un sistema básico de encriptación de contraseñas utilizando SHA-256 con salt para propósitos de demostración y pruebas.

## ⚠️ Advertencia de Seguridad

Este es un proyecto de prueba/demostración y **NO** debe utilizarse en producción sin las siguientes modificaciones:

- Implementar un sistema de hashing más robusto (como bcrypt o Argon2)
- Mover la lógica de encriptación al backend
- Utilizar variables de entorno para las claves secretas
- Implementar JWT u otro sistema de tokens para la autenticación

## Configuración del Desarrollo

### Pre-requisitos

- Node.js (v14 o superior)
- npm o yarn
- Angular CLI

### Instalación

1. Clonar el repositorio
2. Instalar dependencias:

```bash
npm install
```

### Ejecución

1. Iniciar el backend (base de datos JSON):

```bash
npm run backend
```

2. En una nueva terminal, iniciar la aplicación Angular:

```bash
npm start
```

## Descripción de la Aplicación

SeriesApp es una aplicación para gestionar y valorar series. Cuenta con las siguientes características:
Autenticación

Sistema de registro y login de usuarios
⚠️ Los usuarios precargados utilizan la contraseña "1234" (encriptada en BD) - Solo en entorno de pruebas
⚠️ La variable de encriptado de contraseñas se encuentra en enviroments solo al ser una demostración como se indicaba en las Advertencias de Seguridad

## Características Principales

### Listado Series:

- Visualización alfabética de todas las series disponibles
- Votación de series:

- Añadir nuevas votaciones
- Modificar votaciones previas mediante formulario de edicción

### Añadir Series:

- Formulario para la creación de nuevas series
- Top Series: Visualización de series ordenadas por puntuación media

### Navegación

- Sidebar para acceso a todas las secciones
- Funcionalidad de logout
- Navegación entre secciones
