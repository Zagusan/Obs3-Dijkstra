// helpers.js - NO MODIFICAR
// Utilidades compartidas por el proyecto base.

function clave(pos) {
  return `${pos.f},${pos.c}`;
}

function mismaPos(a, b) {
  return a.f === b.f && a.c === b.c;
}

function buscarMarcador(matriz, marcador) {
  for (let f = 0; f < matriz.length; f++) {
    for (let c = 0; c < matriz[f].length; c++) {
      if (matriz[f][c] === marcador) return { f, c };
    }
  }
  throw new Error(`No se encontró el marcador ${marcador}`);
}

function esTransitable(valor) {
  return valor !== '#';
}

function costoEntrada(valor) {
  if (typeof valor === 'number') return valor;
  return 1; // S, G y . cuestan 1 al entrar (S no se cobra al iniciar)
}

function obtenerVecinos(escenario, pos) {
  const dirs = escenario.direcciones || [
    { df: -1, dc: 0, nombre: 'arriba' },
    { df: 1, dc: 0, nombre: 'abajo' },
    { df: 0, dc: -1, nombre: 'izquierda' },
    { df: 0, dc: 1, nombre: 'derecha' },
  ];

  const vecinos = [];
  for (const d of dirs) {
    const nf = pos.f + d.df;
    const nc = pos.c + d.dc;
    if (nf < 0 || nc < 0 || nf >= escenario.matriz.length || nc >= escenario.matriz[0].length) continue;
    const valor = escenario.matriz[nf][nc];
    if (!esTransitable(valor)) continue;
    vecinos.push({ pos: { f: nf, c: nc }, costo: costoEntrada(valor), movimiento: d.nombre });
  }
  return vecinos;
}

function reconstruirCamino(padres, inicio, meta) {
  const camino = [];
  let actual = meta;
  const limite = 10000;
  let pasos = 0;

  while (!mismaPos(actual, inicio)) {
    camino.push(actual);
    const padre = padres.get(clave(actual));
    if (!padre) return [];
    actual = padre;
    pasos++;
    if (pasos > limite) throw new Error('Posible ciclo al reconstruir el camino');
  }
  camino.push(inicio);
  return camino.reverse();
}

function costoDelCamino(escenario, camino) {
  if (!Array.isArray(camino) || camino.length === 0) return Infinity;
  let total = 0;
  for (let i = 1; i < camino.length; i++) {
    total += costoEntrada(escenario.matriz[camino[i].f][camino[i].c]);
  }
  return total;
}

function heuristicaManhattan(a, b) {
  return Math.abs(a.f - b.f) + Math.abs(a.c - b.c);
}

function listarVertices(escenario) {
  const vertices = [];
  for (let f = 0; f < escenario.matriz.length; f++) {
    for (let c = 0; c < escenario.matriz[f].length; c++) {
      if (esTransitable(escenario.matriz[f][c])) vertices.push({ f, c });
    }
  }
  return vertices;
}

function crearAristas(escenario) {
  const aristas = [];
  for (const u of listarVertices(escenario)) {
    for (const v of obtenerVecinos(escenario, u)) {
      aristas.push({ desde: u, hasta: v.pos, costo: v.costo });
    }
  }
  return aristas;
}
