# Dijkstra - Camino de menor costo

## Propósito
Encontrar la ruta de menor costo acumulado en un laberinto ponderado con costos no negativos.

## Archivos
- `index.html`: interfaz del laboratorio.
- `styles.css`: estilos. **No modificar.**
- `helpers.js`: funciones auxiliares. **No modificar.**
- `scenarios.js`: tres escenarios de prueba. **No modificar.**
- `app.js`: visualizador y pruebas automáticas. **No modificar.**
- `algorithm.js`: **archivo que debe programar el equipo.**
- `RESPUESTAS.md`: análisis que debe completar el equipo.

## Cómo trabajar
1. Abra `index.html` en Chrome/Edge/Firefox. También puede usar Live Server de VS Code.
2. Lea los comentarios y TODO de `algorithm.js`.
3. Antes de programar, describa en `RESPUESTAS.md` qué estructura de datos y criterio de selección utiliza su algoritmo.
4. Implemente progresivamente `buscarRuta(escenario)`.
5. Pruebe primero el escenario 1. Cuando aparezca **Prueba superada**, continúe con 2 y 3.
6. No modifique `scenarios.js`, `helpers.js` ni las validaciones para hacer que una prueba pase.
7. Guarde evidencia de los tres escenarios.
8. Prepárese para explicar el código al docente y modificar una condición del laberinto cuando se revise en clase.

## Contrato de retorno
`buscarRuta(escenario)` debe devolver un objeto con esta forma:
```js
{
  encontrado: true,
  visitados: [{f:0,c:0}, ...],
  camino: [{f:0,c:0}, ...],
  costo: 10
}
```

### Importante
El visualizador verifica por sí mismo que el camino no atraviese muros, que use movimientos permitidos y, cuando corresponde, que tenga el número de pasos o costo óptimo esperado.
