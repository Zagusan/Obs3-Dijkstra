const ESCENARIOS = [
  {
    "id": 1,
    "nombre": "Corto pero caro",
    "descripcion": "La ruta con menos celdas incluye terreno costoso. Dijkstra debe preferir menor costo total, aunque dé más pasos.",
    "objetivo": "Implementar distancias, selección del nodo con menor costo conocido y relajación.",
    "criterio": "Debe devolver la ruta con costo mínimo.",
    "matriz": [
      [
        "S",
        9,
        9,
        9,
        "G"
      ],
      [
        1,
        1,
        1,
        1,
        1
      ],
      [
        "#",
        "#",
        "#",
        "#",
        "#"
      ]
    ],
    "esperado": {
      "costo": 6
    },
    "direcciones": null,
    "movimientosTexto": "arriba, abajo, izquierda y derecha"
  },
  {
    "id": 2,
    "nombre": "Terreno mixto",
    "descripcion": "Compare zonas de costo 1, 2, 5 y 8. El algoritmo debe acumular costos antes de decidir.",
    "objetivo": "Mostrar que Dijkstra no elige solamente el vecino más barato de manera local.",
    "criterio": "Debe alcanzar el costo óptimo esperado.",
    "matriz": [
      [
        "S",
        1,
        5,
        1,
        1
      ],
      [
        2,
        "#",
        8,
        "#",
        1
      ],
      [
        2,
        2,
        2,
        2,
        1
      ],
      [
        9,
        "#",
        9,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1,
        "G"
      ]
    ],
    "esperado": {
      "costo": 12
    },
    "direcciones": null,
    "movimientosTexto": "arriba, abajo, izquierda y derecha"
  },
  {
    "id": 3,
    "nombre": "Rodear para ahorrar",
    "descripcion": "Un muro y varios pesos altos fuerzan a comparar rutas completas.",
    "objetivo": "Aplicar correctamente la relajación de distancias.",
    "criterio": "Debe hallar la ruta de costo total mínimo.",
    "matriz": [
      [
        "S",
        1,
        1,
        9,
        9,
        9
      ],
      [
        9,
        "#",
        1,
        "#",
        1,
        9
      ],
      [
        1,
        1,
        1,
        "#",
        1,
        9
      ],
      [
        1,
        "#",
        5,
        5,
        1,
        1
      ],
      [
        1,
        1,
        1,
        "#",
        "#",
        1
      ],
      [
        9,
        9,
        1,
        1,
        1,
        "G"
      ]
    ],
    "esperado": {
      "costo": 14
    },
    "direcciones": null,
    "movimientosTexto": "arriba, abajo, izquierda y derecha"
  }
];
