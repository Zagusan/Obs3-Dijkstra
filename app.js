// app.js - NO MODIFICAR
let escenarioActual = ESCENARIOS[0];
let resultadoActual = null;

const select = document.getElementById('escenario');
const btnEjecutar = document.getElementById('ejecutar');
const btnReiniciar = document.getElementById('reiniciar');
const gridEl = document.getElementById('laberinto');
const descripcionEl = document.getElementById('descripcion');
const salidaEl = document.getElementById('salida');

for (const e of ESCENARIOS) {
  const op = document.createElement('option');
  op.value = e.id;
  op.textContent = `${e.id}. ${e.nombre}`;
  select.appendChild(op);
}

select.addEventListener('change', () => {
  escenarioActual = ESCENARIOS.find(e => String(e.id) === select.value);
  resultadoActual = null;
  render();
});

btnReiniciar.addEventListener('click', () => {
  resultadoActual = null;
  salidaEl.innerHTML = '';
  render();
});

btnEjecutar.addEventListener('click', async () => {
  salidaEl.innerHTML = '<p>Ejecutando...</p>';
  try {
    const resultado = buscarRuta(escenarioActual);
    resultadoActual = resultado;
    const validacion = validarResultado(escenarioActual, resultado);
    await animar(resultado);
    mostrarSalida(escenarioActual, resultado, validacion);
  } catch (err) {
    salidaEl.innerHTML = `<p class="error">Error: ${escapar(String(err.message || err))}</p>`;
    console.error(err);
  }
});

function render() {
  const e = escenarioActual;
  descripcionEl.innerHTML = `
    <h2>${escapar(e.nombre)}</h2>
    <p>${escapar(e.descripcion)}</p>
    <p><strong>Objetivo del equipo:</strong> ${escapar(e.objetivo)}</p>
    <p class="small"><strong>Movimientos:</strong> ${escapar(e.movimientosTexto || 'arriba, abajo, izquierda y derecha')}</p>
    <p class="small"><strong>Criterio de prueba:</strong> ${escapar(e.criterio)}</p>
  `;

  gridEl.innerHTML = '';
  gridEl.style.gridTemplateColumns = `repeat(${e.matriz[0].length}, 43px)`;
  for (let f = 0; f < e.matriz.length; f++) {
    for (let c = 0; c < e.matriz[f].length; c++) {
      const valor = e.matriz[f][c];
      const div = document.createElement('div');
      div.className = 'celda';
      div.dataset.f = f;
      div.dataset.c = c;
      if (valor === '#') div.classList.add('muro');
      if (valor === 'S') div.classList.add('inicio');
      if (valor === 'G') div.classList.add('meta');
      if (valor === 'S' || valor === 'G' || valor === '#') div.textContent = valor;
      else if (typeof valor === 'number') div.textContent = valor;
      else div.textContent = '';
      gridEl.appendChild(div);
    }
  }
}

function limpiarMarcas() {
  for (const c of document.querySelectorAll('.celda')) {
    c.classList.remove('visitada', 'camino');
  }
}

async function animar(resultado) {
  limpiarMarcas();
  const visitados = Array.isArray(resultado?.visitados) ? resultado.visitados : [];
  for (const p of visitados) {
    const celda = document.querySelector(`[data-f="${p.f}"][data-c="${p.c}"]`);
    if (celda && !celda.classList.contains('inicio') && !celda.classList.contains('meta')) {
      celda.classList.add('visitada');
    }
    await esperar(60);
  }
  const camino = Array.isArray(resultado?.camino) ? resultado.camino : [];
  for (const p of camino) {
    const celda = document.querySelector(`[data-f="${p.f}"][data-c="${p.c}"]`);
    if (celda && !celda.classList.contains('inicio') && !celda.classList.contains('meta')) {
      celda.classList.add('camino');
    }
  }
}

function validarResultado(e, r) {
  const errores = [];
  if (!r || typeof r !== 'object') return { ok:false, errores:['buscarRuta debe retornar un objeto.'] };
  if (!Array.isArray(r.visitados)) errores.push('visitados debe ser un arreglo de posiciones.');
  if (!Array.isArray(r.camino)) errores.push('camino debe ser un arreglo de posiciones.');
  if (typeof r.encontrado !== 'boolean') errores.push('encontrado debe ser true o false.');

  const inicio = buscarMarcador(e.matriz, 'S');
  const meta = buscarMarcador(e.matriz, 'G');

  if (r.encontrado) {
    if (!r.camino.length) errores.push('Si encontrado=true, camino no puede estar vacío.');
    if (r.camino.length && !mismaPos(r.camino[0], inicio)) errores.push('El camino debe iniciar en S.');
    if (r.camino.length && !mismaPos(r.camino[r.camino.length-1], meta)) errores.push('El camino debe finalizar en G.');

    for (let i = 0; i < r.camino.length; i++) {
      const p = r.camino[i];
      const valor = e.matriz[p?.f]?.[p?.c];
      if (valor === undefined || valor === '#') errores.push(`El camino contiene una posición inválida: ${JSON.stringify(p)}.`);
      if (i > 0) {
        const ant = r.camino[i-1];
        const permitidos = obtenerVecinos(e, ant).some(v => mismaPos(v.pos, p));
        if (!permitidos) errores.push(`Movimiento no permitido entre ${clave(ant)} y ${clave(p)}.`);
      }
    }

    const pasos = Math.max(0, r.camino.length - 1);
    const costo = costoDelCamino(e, r.camino);
    if (Number.isFinite(e.esperado?.pasos) && pasos !== e.esperado.pasos) {
      errores.push(`La prueba espera ${e.esperado.pasos} pasos y el algoritmo devolvió ${pasos}.`);
    }
    if (Number.isFinite(e.esperado?.costo) && Math.abs(costo - e.esperado.costo) > 1e-9) {
      errores.push(`La prueba espera costo ${e.esperado.costo} y el algoritmo devolvió ${costo}.`);
    }
  } else if (e.esperado?.encontrado !== false) {
    errores.push('En este escenario sí existe una ruta hasta G.');
  }

  return { ok: errores.length === 0, errores };
}

function mostrarSalida(e, r, v) {
  const pasos = Array.isArray(r.camino) ? Math.max(0, r.camino.length - 1) : '-';
  const costo = Array.isArray(r.camino) && r.camino.length ? costoDelCamino(e, r.camino) : '-';
  const orden = Array.isArray(r.visitados) ? r.visitados.map(clave).join(' → ') : '-';
  const ruta = Array.isArray(r.camino) ? r.camino.map(clave).join(' → ') : '-';
  salidaEl.innerHTML = `
    <div class="info-grid">
      <div class="kpi"><strong>Encontrado</strong><br>${r.encontrado}</div>
      <div class="kpi"><strong>Nodos visitados</strong><br>${Array.isArray(r.visitados) ? r.visitados.length : '-'}</div>
      <div class="kpi"><strong>Pasos</strong><br>${pasos}</div>
      <div class="kpi"><strong>Costo calculado</strong><br>${costo}</div>
    </div>
    <p class="${v.ok ? 'ok' : 'error'}">${v.ok ? '✓ Prueba superada' : '✗ La prueba todavía no se supera'}</p>
    ${v.errores.length ? `<ul>${v.errores.map(x => `<li>${escapar(x)}</li>`).join('')}</ul>` : ''}
    <p><strong>Orden de visita:</strong></p><pre>${escapar(orden)}</pre>
    <p><strong>Ruta devuelta:</strong></p><pre>${escapar(ruta)}</pre>
  `;
}

function escapar(s) {
  return String(s).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[ch]));
}
function esperar(ms) { return new Promise(r => setTimeout(r, ms)); }

render();
