
function esPrecioValido(valor) {
    const numero = parseInt(valor, 10);
    return Number.isInteger(numero) && numero >= 0;
}


function esIDValido(id) {
  return Number.isInteger(id) && id > 0;
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







module.exports = {
  esPrecioValido,
  validarHora,
  esIDValido,
  extraerCamposPermitidos
};