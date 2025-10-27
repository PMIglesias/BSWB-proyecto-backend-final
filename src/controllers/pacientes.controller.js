import Paciente from "../models/Paciente.js";
import Turno from "../models/Turno.js";

// obtener todos los pacientes
export const obtenerPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.find().lean();

    // agregar turnos de cada paciente
    const pacientesConTurnos = await Promise.all(
      pacientes.map(async (p) => {
        const turnos = await Turno.find({ paciente: p._id }).lean();
        return {
          ...p,
          id: p._id.toString(),
          turnos: turnos.map(t => t.fechaHora)
        };
      })
    );

    // si viene de navegador, renderizamos la vista
    if (req.headers.accept && req.headers.accept.includes("text/html")) {
      return res.render("pacientes", {
        titulo: "Pacientes",
        pacientes: pacientesConTurnos,
        usuario: res.locals.usuario
      });
    }

    // si es api, devolvemos json
    return res.json(pacientesConTurnos);

  } catch (error) {
    console.error(error);
    if (req.headers.accept && req.headers.accept.includes("text/html")) {
      return res.status(500).render("error", {
        message: "error al cargar los pacientes",
        usuario: res.locals.usuario
      });
    }
    return res.status(500).json({ error: "error obteniendo pacientes" });
  }
};

// get un paciente por ID
export const obtenerPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const paciente = await Paciente.findById(id).lean();
    if (!paciente) return res.status(404).json({ error: "Paciente no encontrado" });

    const turnos = await Turno.find({ paciente: paciente._id }).lean();
    paciente.turnos = turnos.map(t => t.fechaHora);
    paciente.id = paciente._id.toString();

    return res.json(paciente);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error obteniendo paciente" });
  }
};
// crear nuevo paciente
export const crearPaciente = async (req, res) => {
  try {
    const { nombre, edad, diagnostico } = req.body;
    const nuevo = new Paciente({ nombre, edad, diagnostico });
    await nuevo.save();
    return res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "error creando paciente" });
  }
};

// actualizar paciente
export const actualizarPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;
    const actualizado = await Paciente.findByIdAndUpdate(id, datos, { new: true }).lean();
    if (!actualizado) return res.status(404).json({ error: "paciente no encontrado" });
    actualizado.id = actualizado._id.toString();
    return res.json(actualizado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "error actualizando paciente" });
  }
};

// eliminar paciente
export const eliminarPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    await Turno.deleteMany({ paciente: id }); // borrar turnos asociados
    const eliminado = await Paciente.findByIdAndDelete(id);
    if (!eliminado) return res.status(404).json({ error: "paciente no encontrado" });
    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "error eliminando paciente" });
  }
};

// asignar turno a paciente
export const asignarTurno = async (req, res) => {
  try {
    const { pacienteId, fecha } = req.body;
    const paciente = await Paciente.findById(pacienteId);
    if (!paciente) return res.status(404).json({ error: "paciente no encontrado" });

    const nuevoTurno = new Turno({
      paciente: paciente._id,
      fechaHora: fecha
    });
    await nuevoTurno.save();

    if (req.headers.accept && req.headers.accept.includes("text/html")) {
      return res.redirect("/pacientes");
    }

    return res.json({ message: "turno asignado", turno: nuevoTurno });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "error asignando turno" });
  }
};
