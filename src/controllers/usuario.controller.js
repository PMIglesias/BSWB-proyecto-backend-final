import Usuario from "../models/Usuario.js";

// Crear usuario
export const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    const existeUsuario = await Usuario.findOne({ email });
    if (existeUsuario) {
      if (req.headers.accept?.includes("text/html")) {
        // redirigir con mensaje flash o query string
        return res.redirect("/usuarios?error=Usuario ya existe");
      }
      return res.status(400).json({ mensaje: "El usuario ya existe" });
    }

    const usuario = new Usuario({ nombre, email, password, rol });
    await usuario.save();

    if (req.headers.accept?.includes("text/html")) {
      return res.redirect("/usuarios");
    }

    res.status(201).json({ mensaje: "Usuario creado correctamente", usuario });
  } catch (error) {
    console.error(error);
    if (req.headers.accept?.includes("text/html")) {
      return res.status(500).render("error", { message: "Error creando usuario", usuario: res.locals.usuario });
    }
    res.status(500).json({ mensaje: error.message });
  }
};

// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select("-password").lean();

    if (req.headers.accept?.includes("text/html")) {
      return res.render("usuarios", { usuarios, usuario: res.locals.usuario });
    }

    res.json(usuarios);
  } catch (error) {
    console.error(error);
    if (req.headers.accept?.includes("text/html")) {
      return res.status(500).render("error", { message: "Error obteniendo usuarios", usuario: res.locals.usuario });
    }
    res.status(500).json({ mensaje: error.message });
  }
};

// Obtener usuario por ID
export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select("-password").lean();
    if (!usuario) {
      if (req.headers.accept?.includes("text/html")) {
        return res.redirect("/usuarios?error=Usuario no encontrado");
      }
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    if (req.headers.accept?.includes("text/html")) {
      return res.render("usuarioDetalle", { usuario, usuarioLogueado: res.locals.usuario });
    }

    res.json(usuario);
  } catch (error) {
    console.error(error);
    if (req.headers.accept?.includes("text/html")) {
      return res.status(500).render("error", { message: "Error obteniendo usuario", usuario: res.locals.usuario });
    }
    res.status(500).json({ mensaje: error.message });
  }
};

// Actualizar usuario
export const actualizarUsuario = async (req, res) => {
  try {
    const { nombre, email, rol } = req.body;

    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nombre, email, rol },
      { new: true, runValidators: true }
    ).select("-password").lean();

    if (!usuario) {
      if (req.headers.accept?.includes("text/html")) {
        return res.redirect("/usuarios?error=Usuario no encontrado");
      }
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    if (req.headers.accept?.includes("text/html")) {
      return res.redirect("/usuarios");
    }

    res.json({ mensaje: "Usuario actualizado", usuario });
  } catch (error) {
    console.error(error);
    if (req.headers.accept?.includes("text/html")) {
      return res.status(500).render("error", { message: "Error actualizando usuario", usuario: res.locals.usuario });
    }
    res.status(500).json({ mensaje: error.message });
  }
};

// Eliminar usuario
export const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      if (req.headers.accept?.includes("text/html")) {
        return res.redirect("/usuarios?error=Usuario no encontrado");
      }
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    if (req.headers.accept?.includes("text/html")) {
      return res.redirect("/usuarios");
    }

    res.json({ mensaje: "Usuario eliminado" });
  } catch (error) {
    console.error(error);
    if (req.headers.accept?.includes("text/html")) {
      return res.status(500).render("error", { message: "Error eliminando usuario", usuario: res.locals.usuario });
    }
    res.status(500).json({ mensaje: error.message });
  }
};
