# Sistema de Gestión de Turnos y Pacientes – Clínica Backend (2° Parcial)

## Introducción
Este proyecto fue desarrollado como parte del **segundo parcial de la materia Desarrollo Web Backend** de la carrera de Programación.  

Tiene como objetivo ampliar el sistema creado en la primera entrega, incorporando una base de datos **MongoDB** y mejorando la arquitectura **MVC** con **Node.js** y **Express**.

La aplicación permite gestionar pacientes y turnos médicos de una clínica, ofreciendo operaciones CRUD completas, vistas dinámicas con **Pug**, y un diseño con **modo oscuro/claro**.



## Objetivos

- Integrar **MongoDB** mediante **Mongoose** para la persistencia de datos.  
- Aplicar el patrón **Modelo-Vista-Controlador (MVC)**.  
- Utilizar **asincronía**, **promesas** y **async/await** para un flujo no bloqueante.  
- Implementar **middlewares personalizados** y **rutas dinámicas** con Express.  
- Mejorar la interfaz visual con CSS y Pug.  
- Documentar el proceso de desarrollo y uso de herramientas de apoyo como IA de forma reflexiva.



## Tecnologías Principales

| Tecnología | Uso |
|-------------|-----|
| Node.js | Entorno de ejecución backend |
| Express.js | Framework de servidor y rutas |
| MongoDB + Mongoose | Base de datos y modelado de datos |
| Pug | Motor de plantillas para vistas |
| Nodemon | Recarga automática durante desarrollo |
| dotenv | Configuración de variables de entorno |
| JavaScript (ESM) | Lógica del servidor y cliente |
| CSS modular | Estilización de las vistas |

---

## Estructura del Proyecto

Listado actual de archivos y carpetas:

```
├─ data
│  └─ pacientes.json
├─ public
│  ├─ css
│  │  └─ styles.css
│  └─ js
│     ├─ asignarTurno.js
│     ├─ pacientes.js
│     └─ theme.js
└─ src
  ├─ app.js
  ├─ config
  │  └─ db.js
  ├─ controllers
  │  ├─ auth.controller.js
  │  ├─ medico.controller.js
  │  ├─ pacientes.controller.js
  │  ├─ turnos.controller.js
  │  └─ usuario.controller.js
  ├─ middlewares
  │  ├─ auth.js
  │  ├─ logger.js
  │  └─ validarPaciente.js
  ├─ models
  │  ├─ Medico.js
  │  ├─ Paciente.js
  │  ├─ Turno.js
  │  ├─ Usuario.js
  │  └─ paciente.model.js
  ├─ routes
  │  ├─ auth.routes.js
  │  ├─ index.js
  │  ├─ medico.routes.js
  │  ├─ pacientes.routes.js
  │  ├─ turnos.routes.js
  │  └─ usuario.routes.js
  ├─ scrips
  │  └─ seed.js
  ├─ utils
  │  └─ fileManager.js
  └─ views
    ├─ asignarTurno.pug
    ├─ error.pug
    ├─ index.pug
    ├─ layout.pug
    ├─ login.pug
    └─ pacientes.pug

```

## Descripción del Sistema

El sistema permite:
- Registrar nuevos **pacientes**.  
- Listar y editar información existente.  
- Asignar **turnos** con fecha y horario.  
- Buscar pacientes dinámicamente.  
- Alternar entre **modo claro y oscuro**.  

### Flujo General
1. El usuario accede al **inicio** (`/`) donde puede elegir ver pacientes o asignar turnos.  
2. En **Ver Pacientes**, se listan los registros almacenados en MongoDB.  
3. En **Asignar Turno**, se puede buscar un paciente, seleccionar fecha y hora, y guardar el turno.  
4. Los turnos se guardan en la colección `turnos`, referenciando al paciente correspondiente.  

---

## Conexión con MongoDB

El proyecto utiliza una conexión externa o local de MongoDB mediante `Mongoose`:

```js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB:", error.message);
  }
};
```


