// algorithm.js - EQUIPO 3: DIJKSTRA
// SOLO este archivo debe ser modificado por el equipo.

function buscarRuta(escenario) {
  const inicio = buscarMarcador(escenario.matriz, 'S');
  const meta = buscarMarcador(escenario.matriz, 'G');
  const vertices = listarVertices(escenario);

  const dist = new Map();
  const padres = new Map();
  const procesados = new Set();
  const ordenVisitados = [];

  // TODO 1: inicialice todas las distancias en Infinity y la de inicio en 0.

  while (procesados.size < vertices.length) {
    // TODO 2: busque, entre los vértices no procesados, el que tenga menor dist.
    let actual = null;
    let mejor = Infinity;

    // PISTA: recorra vertices y compare dist.get(clave(v)).

    if (!actual || mejor === Infinity) break;
    procesados.add(clave(actual));
    ordenVisitados.push(actual);

    if (mismaPos(actual, meta)) break;

    // TODO 3: RELAJACIÓN
    // Para cada vecino calcule:
    // nuevoCosto = dist(actual) + costo del movimiento
    // si es menor que dist(vecino), actualice distancia y padre.
  }

  // TODO 4: si meta tiene distancia finita, reconstruya y retorne la ruta.
  return { encontrado: false, visitados: ordenVisitados, camino: [], costo: Infinity };
}
