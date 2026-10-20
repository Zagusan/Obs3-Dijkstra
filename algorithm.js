// algorithm.js - EQUIPO 3: DIJKSTRA
// SOLO este archivo debe ser modificado por el equipo.

function buscarRuta(escenario) {
  const inicio = buscarMarcador(escenario.matriz, 'S');
  const meta = buscarMarcador(escenario.matriz, 'G');
  const vertices = listarVertices(escenario);

  const lon_x = escenario.matriz[0].length;
  const lon_y = escenario.matriz.length

  // "f" es y
  // "c" es x
  
  const direcciones = [{f: 1, c: 0}, // Abajo
    {f: 0, c: 1}, // Derecha
    {f: -1, c: 0}, // Arriba
    {f: 0, c: -1} // Izquierda
  ]

  // TODO 1: inicialice todas las distancias en Infinity y la de inicio en 0.
  const costos = new Array();
  for (let i = 0; i < lon_y; i++)
  {
    costos.push(new Array(lon_x).fill(Infinity));
  }

  costos[inicio.f][inicio.c] = 0;
  
  const procesados = new Array();
  for (let i = 0; i < lon_y; i++)
  {
    procesados.push(new Array(lon_x).fill(false));
  }

  const sinVisitar = [];
  let offsetSinVisitar = 0;

  procesados[inicio.f][inicio.c] = true;
  sinVisitar.push(inicio);

  while (offsetSinVisitar < sinVisitar.length) {
    const actual = sinVisitar[offsetSinVisitar++];
    const costo_actual = costos[actual.f][actual.c];

    
    // TODO 3: RELAJACIÓN
    // Para cada vecino calcule:
    // nuevoCosto = dist(actual) + costo del movimiento
    // si es menor que dist(vecino), actualice distancia y padre.
    for (const dir of direcciones)
    {
      const nuevo = {f: actual.f + dir.f, c: actual.c + dir.c};

      if (nuevo.f < 0 || nuevo.f >= lon_y || nuevo.c < 0 || nuevo.c >= lon_x)
      {
        continue;
      }

      let costo_adicional = escenario.matriz[nuevo.f][nuevo.c];
      if (costo_adicional === "S")
      {
        costo_adicional = 0;
      }
      else if (costo_adicional === "G")
      {
        costo_adicional = 1
      }
      else if (costo_adicional === "#")
      {
        continue;
      }
      const costo_nuevo = costos[actual.f][actual.c] + costo_adicional;

      costos[nuevo.f][nuevo.c] = Math.min(costos[nuevo.f][nuevo.c], costo_nuevo);

      if (!procesados[nuevo.f][nuevo.c])
      {
        let indice = sinVisitar.findIndex((val) => costos[val.f][val.c] > costo_nuevo);
        if (indice === -1)
        {
          sinVisitar.push(nuevo);
        }
        else
        {
          sinVisitar.splice(indice, 0, nuevo);
        }

        procesados[nuevo.f][nuevo.c] = true;
      }
    }
  }

  // TODO 4: si meta tiene distancia finita, reconstruya y retorne la ruta.
  return { encontrado: costos[meta.f][meta.c] != Infinity, visitados: sinVisitar, camino: [], costo: costos[meta.f][meta.c]};
}
