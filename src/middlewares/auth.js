// mw para verificar que el usuario este logueado
export const authMiddleware = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ mensaje: "No autorizado" });
  }
  next();
};

// mw para verificar roles
export const rolMiddleware = (rolesPermitidos) => {
  return (req, res, next) => {
    const userRol = req.session.rol;
    if (!userRol || !rolesPermitidos.includes(userRol)) {
      return res.status(403).json({ mensaje: "Acceso denegado" });
    }
    next();
  };
};