
function esPrecioValido(valor) {
  if (typeof valor !== 'number') {
    return false;
  }
  return Number.isInteger(valor) &&  valor >= 0;
}


function validarHora(hora) {
  const formatoHora = /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/;
  if (hora && !formatoHora.test(hora)) {
    throw new Error('La hora de entrega no es válida. Debe tener formato HH:MM o HH:MM:SS');
  }
}


function extraerCamposPermitidos(body, camposPermitidos) {
  const datos = {};
  for (const campo of camposPermitidos) {
    if (body[campo] !== undefined) {
        datos[campo] = body[campo];
    }
  }
  return datos;
}


function esFechaValida(fecha) {
    return /^\d{4}-\d{2}-\d{2}$/.test(fecha) && !isNaN(new Date(fecha).getTime());
}




module.exports = {
  esPrecioValido,
  validarHora,
  extraerCamposPermitidos,
  esFechaValida
};