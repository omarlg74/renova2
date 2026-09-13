/* ============================================================
   RENOVA2 — CATÁLOGO · ARCHIVO DE PROPIEDADES
   ============================================================
   Este es el ÚNICO archivo que necesitas editar para agregar,
   quitar o modificar propiedades del catálogo.

   CÓMO AGREGAR UNA PROPIEDAD
   --------------------------
   1. Copia un bloque completo { ... } de abajo, desde la llave
      que abre hasta la coma final.
   2. Pégalo dentro de la lista y cambia los datos.
   3. Guarda las fotos en la carpeta  catalogo/fotos/
      y escribe el nombre del archivo en "fotos".

   CAMPOS
   ------
   id            Texto único, sin espacios. Ej: "terreno-paso-ladrillo"
   tipo          "Terreno" | "Casa" | "Departamento"
   operacion     "Venta" | "Renta"
   titulo        Nombre corto que se ve grande en la ficha.
   colonia       Colonia, fraccionamiento o localidad.
   ciudad        Ciudad — alimenta el filtro de ciudad.
   referencia    Frase de ubicación. Ej: "A 20 min de Xalapa".
   precio        Número sin comas ni signos. Ej: 320000
                 (Si aún no hay precio, pon null)
   precioVisible true  = se muestra el monto
                 false = se muestra "Precio a consultar"
   moneda        "MXN" (default) — o "USD"
   periodo       Solo para renta: "mes". En venta déjalo "".
   m2            Superficie en m². Ej: 120.12
   m2Construccion  Solo casas/deptos. En terrenos pon null.
   recamaras     Número, o null si no aplica.
   banos         Número, o null si no aplica.
   estacionamiento  Número, o null.
   etiqueta      "" | "Nuevo" | "Apartado" | "Vendido" | "Rentado"
   destacada     true en LA propiedad que quieres grande arriba.
                 Solo una debe tener true.
   mapa          Enlace a Google Maps (o "" si no tienes).
   fotos         Lista de nombres de archivo dentro de catalogo/fotos/
   puntos        Lista de frases cortas: lo que vende la propiedad.
   medidas       Texto libre del desglose de medidas, o "".
   ============================================================ */

window.RENOVA2_CONTACTO = {
  telefono: "228 108 8773",
  whatsapp: "5212281088773", // formato internacional, sin + ni espacios
  mensaje: "Hola, me interesa {propiedad} ({detalle}). ¿Sigue disponible?"
};

window.RENOVA2_PROPIEDADES = [
  {
    id: "terreno-paso-ladrillo",
    tipo: "Terreno",
    operacion: "Venta",
    titulo: "Terreno en Paso Ladrillo",
    colonia: "Paso Ladrillo",
    ciudad: "Xalapa",
    referencia: "A 20 minutos de Xalapa",
    precio: 320000,
    precioVisible: false,
    moneda: "MXN",
    periodo: "",
    m2: 120.12,
    m2Construccion: null,
    recamaras: null,
    banos: null,
    estacionamiento: null,
    etiqueta: "Nuevo",
    destacada: false,
    mapa: "https://www.google.com/maps/search/Paso+Ladrillo+Veracruz",
    fotos: [
      "paso-ladrillo-01.jpg",
      "paso-ladrillo-02.jpg",
      "paso-ladrillo-03.jpg"
    ],
    puntos: [
      "Terreno plano, ideal para construcción de casa habitación",
      "Colindancias claras y definidas, documentadas",
      "Zona tranquila con crecimiento habitacional activo",
      "Calle con acceso vehicular y construcciones vecinas consolidadas"
    ],
    medidas: "7.07 m de frente × 16.68 / 17.64 m de fondo × 7.00 m de contrafrente"
  },

  {
    id: "casa-torre-vieja",
    tipo: "Casa",
    operacion: "Venta",
    titulo: "Casas en Fraccionamiento Torre Vieja",
    colonia: "Fraccionamiento Torre Vieja",
    ciudad: "Coatepec",
    referencia: "A 15 min de Xalapa y 5 min del centro de Coatepec",
    precio: 1560000,
    precioVisible: false,
    moneda: "MXN",
    periodo: "",
    m2: 105,
    m2Construccion: 84,
    recamaras: null,
    banos: null,
    estacionamiento: null,
    etiqueta: "Nuevo",
    destacada: true,
    mapa: "https://maps.app.goo.gl/m53yxuhvjTvXQaCa6",
    fotos: [
      "torre-vieja-01.jpg",
      "torre-vieja-02.jpg",
      "torre-vieja-03.jpg",
      "torre-vieja-11.jpg",
      "torre-vieja-12.jpg",
      "torre-vieja-04.jpg",
      "torre-vieja-05.jpg",
      "torre-vieja-06.jpg",
      "torre-vieja-07.jpg",
      "torre-vieja-08.jpg",
      "torre-vieja-09.jpg",
      "torre-vieja-10.jpg"
    ],
    puntos: [
      "Diseño arquitectónico único: fachadas de concreto aparente y ventanales de geometría irregular",
      "Cluster privado de pocas casas, con acceso controlado",
      "Rodeadas de naturaleza y arbolado maduro conservado",
      "Opción con roof garden preparado para terraza de uso diario",
      "Acabados en concreto pulido y microcemento; escalera de acero y concreto a la vista",
      "Patio privado en planta baja y cocina integrada a la estancia",
      "A 5 minutos del centro de Coatepec, Pueblo Mágico, y 15 de Xalapa"
    ],
    medidas: ""
  }

  /* ---- COPIA DESDE AQUÍ PARA AGREGAR OTRA PROPIEDAD ----
  ,{
    id: "casa-ejemplo",
    tipo: "Casa",
    operacion: "Venta",
    titulo: "Casa en ...",
    colonia: "",
    ciudad: "Xalapa",
    referencia: "",
    precio: null,
    precioVisible: false,
    moneda: "MXN",
    periodo: "",
    m2: null,
    m2Construccion: null,
    recamaras: 3,
    banos: 2,
    estacionamiento: 1,
    etiqueta: "",
    destacada: false,
    mapa: "",
    fotos: [],
    puntos: [],
    medidas: ""
  }
  ------------------------------------------------------- */
];
