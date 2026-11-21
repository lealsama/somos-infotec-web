/*
  CONTENIDO DE LA PÁGINA — Somos Infotec
  ---------------------------------------
  Aquí están TODOS los textos, integrantes y propuestas.
  Para cambiar algo de la página, editá este archivo y guardá.
  No hace falta tocar index.html ni app.js.

  Reglas:
  - Los textos van entre comillas "así".
  - Cada elemento de una lista termina con coma.
  - Si un integrante no tiene foto, dejá  foto: ""  y se mostrará un ícono.
*/

window.CONTENIDO = {
  portada: {
    etiqueta: "Directiva estudiantil · Infotecnología · UJCV Comayagua",
    titulo: ["10 estudiantes", "1 misión"],
    texto: "Una gestión cercana, inclusiva y transparente. Conocé al equipo, nuestras propuestas y cómo les daremos seguimiento.",
    imagen: "img/campus.jpg",
    imagenDescripcion: "Edificio de la UJCV Campus Comayagua con el letrero de la universidad"
  },

  lema: { parte1: "Conectamos talento.", parte2: "Creamos futuro." },

  // Cambiá a false cuando la misión y la visión estén aprobadas.
  misionVisionEnRevision: true,
  mision: "Representar e impulsar el talento estudiantil mediante iniciativas de innovación, colaboración, formación profesional y vinculación tecnológica, con una gestión cercana, inclusiva y transparente.",
  vision: "Consolidar una comunidad reconocida por su capacidad de innovar, generar soluciones reales y oportunidades de crecimiento, dejando un legado que trascienda generaciones.",

  objetivoGeneral: "Fortalecer la experiencia universitaria mediante una gestión participativa, innovadora y transparente que impulse el desarrollo académico, tecnológico, profesional y humano, con oportunidades de colaboración e impacto social.",

  objetivosEspecificos: [
    { titulo: "Desarrollo académico y profesional", texto: "Fortalecer competencias mediante mentorías, talleres, certificaciones y vinculación con profesionales del sector." },
    { titulo: "Innovación y emprendimiento", texto: "Impulsar la creatividad y el desarrollo de proyectos tecnológicos que resuelvan problemas reales." },
    { titulo: "Representación y transparencia", texto: "Establecer canales de comunicación y seguimiento que promuevan la participación y la rendición de cuentas." },
    { titulo: "Tecnología e impacto social", texto: "Aplicar los conocimientos tecnológicos al servicio de la comunidad y la inclusión digital." },
    { titulo: "Identidad, integración y legado", texto: "Fortalecer el compañerismo, el liderazgo y la continuidad de los proyectos entre generaciones." }
  ],

  fotoGrupal: {
    imagen: "img/foto-grupal.jpg",
    descripcion: "Integrantes de Somos Infotec frente al edificio de la UJCV Campus Comayagua"
  },

  // El orden de esta lista es el orden del carrusel.
  integrantes: [
    { nombre: "Tania Zepeda",     cargo: "Presidenta",     foto: "img/integrantes/tania-zepeda.jpg" },
    { nombre: "Matthew Castro",   cargo: "Vicepresidente", foto: "img/integrantes/matthew-castro.jpg" },
    { nombre: "Leonel Salinas",   cargo: "Secretario",     foto: "img/integrantes/leonel-salinas.jpg" },
    { nombre: "Samuel Flores",    cargo: "Tesorero",       foto: "img/integrantes/samuel-flores.jpg" },
    { nombre: "Diego Yanes",      cargo: "Fiscal",         foto: "img/integrantes/diego-yanes.jpg" },
    { nombre: "Jennifer Vallejo", cargo: "Vocal 1",        foto: "img/integrantes/jennifer-vallejo.jpg" },
    { nombre: "Rodrigo Corea",    cargo: "Vocal 2",        foto: "img/integrantes/rodrigo-corea.jpg" },
    { nombre: "Jarlyn Mendoza",   cargo: "Vocal 3",        foto: "img/integrantes/jarlyn-mendoza.jpg" },
    { nombre: "Mariela Mejia",    cargo: "Logística 1",    foto: "img/integrantes/mariela-mejia.jpg" },
    { nombre: "Joshua Arriaga",   cargo: "Logística 2",    foto: "img/integrantes/joshua-arriaga.jpg" }
  ],

  propuestasIntro: "Cinco líneas de trabajo, cada una con un primer paso concreto. Tocá una para ver el detalle.",

  propuestas: [
    {
      nombre: "Infotec 360", area: "Transparencia",
      descripcion: "Reunir en un solo lugar sugerencias, fechas, oportunidades e informes, para que cada estudiante sepa qué pasó con lo que pidió.",
      primerPaso: "Abrir un canal piloto donde cada estudiante pueda consultar el estado de su solicitud."
    },
    {
      nombre: "Infotec Lab", area: "Innovación",
      descripcion: "Formar equipos para desarrollar proyectos con mentoría.",
      primerPaso: "Una primera convocatoria para recoger ideas y acompañar la construcción de al menos un prototipo."
    },
    {
      nombre: "Career Connect", area: "Desarrollo profesional",
      descripcion: "Acercar al estudiantado a egresados y profesionales mediante charlas y talleres de currículo, GitHub e inglés técnico.",
      primerPaso: "Organizar un primer encuentro y compartir las oportunidades que surjan."
    },
    {
      nombre: "Infotec Mentors", area: "Integración",
      descripcion: "Organizar tutorías entre estudiantes y acompañar a quienes ingresan a la carrera.",
      primerPaso: "Una sesión piloto para identificar qué temas conviene trabajar y quiénes pueden apoyar."
    },
    {
      nombre: "Con Propósito", area: "Impacto social",
      descripcion: "Escuchar a organizaciones o emprendimientos locales, identificar con ellos una necesidad concreta y diseñar una solución digital piloto.",
      primerPaso: "Reunirnos con una organización local para identificar juntos una necesidad concreta."
    }
  ],

  muestra: {
    titulo: "Muestra de proyectos entre escuelas",
    texto: "Invitar a equipos de Infotecnología y de otras escuelas de la UJCV a mostrar sus proyectos en vivo, explicar qué problema resuelven y responder preguntas.",
    etiqueta: "Propuesta destacada"
  },

  compartir: {
    titulo: "Compartí la propuesta",
    texto: "Copiá el enlace de esta página y compartilo con tus compañeros."
  },

  pie: "Somos Infotec · Directiva estudiantil de Infotecnología · UJCV Campus Comayagua"
};
