# Respuestas del equipo

**Algoritmo:** Dijkstra - Camino de menor costo

**Integrantes:** Julián Sánchez, Ricardo Corredor, Santiago Piña

## A. Antes de programar

1. ¿Qué estructura de datos principal utiliza su algoritmo?
   Utiliza una lista de preoridades, y mas en el fondo, un motor binario
2. ¿Qué criterio utiliza para decidir cuál nodo/celda procesar después?
   Basa su criterio en la cola de preoridad, dependiendo de como este configurada, puede ir por los de mayor costo o por los de menor costo
3. Escriba en 5-8 pasos cómo debería funcionar el algoritmo antes de mirar el código.
   1. Se establede el inicio y el final.
   2. Se empieza a recorrer los caminos mas cercanos basado en la lista de preoridad.
   3. Recorre cada combinacion de caminos desde el nodo de inicio a todos los otros nodos.
   4. Cuando se hacaben las combinaciones, elige la de menor o mayor costo.
   5. Al final cuando llega al final, muestra el costo total de llegar a todos los nodos.

## B. Evidencias por escenario

### Escenario 1

- ¿Encontró la meta?
  Si, encontró la meta
- Cantidad de nodos visitados:
  Visito 10 nodos
- Pasos de la ruta:
  0,0 → 1,0 → 1,1 → 1,2 → 1,3 → 1,4 → 0,4 → 0,1 → 0,2 → 0,3
- Costo total:
  Asumiendo que la meta vale 1, el costo total seria de 6
- ¿Qué observó?
  Como Dijkstra se hiba por el camino de menor costo

### Escenario 2

- ¿Encontró la meta?
  Si, encontro la meta
- Cantidad de nodos visitados:
  25
- Pasos de la ruta:
  0,0 → 0,1 → 1,0 → 2,0 → 0,2 → 2,1 → 0,3 → 2,2 → 0,4 → 1,4 → 2,3 → 2,4 → 3,3 → 3,4 → 4,3 → 4,4 → 3,0 → 4,2 → 1,2 → 4,0 → 4,1 → 3,2
- Costo total:
  10
- ¿Qué observó?
  Que Dijkstra siempre revisa hasta el ultimo nodo

### Escenario 3

- ¿Encontró la meta?
  Si, encontro la meta
- Cantidad de nodos visitados:
  36
- Pasos de la ruta:
  0,0 → 0,1 → 0,2 → 1,2 → 2,2 → 2,1 → 2,0 → 3,0 → 4,0 → 1,0 → 3,2 → 4,1 → 4,2 → 0,3 → 5,2 → 5,3 → 5,4 → 3,3 → 5,5 → 3,4 → 4,5 → 3,5 → 2,4 → 5,0 → 1,4 → 5,1 → 0,4 → 2,5 → 1,5 → 0,5
- Costo total:
  13
- ¿Qué observó?

## C. Análisis

1. ¿Qué parte del código representa mejor la idea principal del algoritmo? Copie únicamente las líneas necesarias y explíquelas.

2. ¿En cuál escenario funcionó mejor y en cuál tuvo más dificultad? Justifique usando datos del programa.

3. ¿Qué ocurriría si se elimina el control de nodos visitados/procesados?
   Vuelve a visitar nodos ya visitados para calcular un costo ya calculado
4. Compare su algoritmo con uno de los presentados por otro equipo. ¿Qué diferencia de comportamiento espera?

5. Escriba una duda concreta o descubrimiento que quiera discutir con el docente cuando se retome la clase.
   Estamos sensibles?
