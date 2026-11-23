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
    etiqueta: "Planilla estudiantil · Infotecnología · UJCV Comayagua",
    titulo: ["10 estudiantes", "1 misión"],
    texto: "Una gestión cercana, inclusiva y transparente. Conocé al equipo, nuestras propuestas y cómo les daremos seguimiento.",
    imagen: "img/campus.jpg",
    imagenDescripcion: "Edificio de la UJCV Campus Comayagua con el letrero de la universidad"
  },

  lema: { parte1: "Conectamos talento.", parte2: "Creamos futuro." },

  mision: "Representar e impulsar el talento estudiantil mediante iniciativas de innovación, colaboración, formación profesional y vinculación tecnológica, con una gestión cercana, inclusiva y transparente.",
  vision: "Consolidar una comunidad reconocida por su capacidad de innovar, generar soluciones reales y oportunidades de crecimiento, dejando un legado que trascienda generaciones.",

  objetivoGeneral: "Mejorar la experiencia de estudiar Infotecnología en Comayagua: escuchar al estudiantado, abrir espacios de práctica y rendir cuentas de lo que hagamos.",

  objetivosEspecificos: [
    { titulo: "Desarrollo académico y profesional", texto: "Fortalecer competencias mediante mentorías, talleres, certificaciones y vinculación con profesionales del sector." },
    { titulo: "Innovación y emprendimiento", texto: "Impulsar la creatividad y el desarrollo de proyectos tecnológicos que resuelvan problemas reales." },
    { titulo: "Representación y transparencia", texto: "Establecer canales de comunicación y seguimiento que promuevan la participación y la rendición de cuentas." },
    { titulo: "Tecnología e impacto social", texto: "Aplicar los conocimientos tecnológicos al servicio de la comunidad y la inclusión digital." },
    { titulo: "Identidad, integración y legado", texto: "Dejar a la próxima directiva un manual con los proyectos en marcha, sus responsables y lo aprendido para que pueda darles continuidad." }
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

  propuestasIntro: "Proponemos cinco líneas de trabajo. Una encuesta al estudiantado nos ayudará a elegir las tres primeras según sus necesidades y horarios. Tocá una para conocer su primer paso.",

  propuestas: [
    {
      nombre: "Infotec 360", area: "Transparencia",
      descripcion: "Queremos que, cuando presentés una solicitud, podás saber quién la atiende, en qué estado está y qué respuesta recibió.",
      primerPaso: "Probar un canal de solicitudes con seguimiento y publicar un resumen mensual de avances y gestiones sin resolver."
    },
    {
      nombre: "Infotec Lab", area: "Innovación",
      descripcion: "Acompañar a equipos que quieran convertir una idea de clase en un prototipo que puedan mostrar y documentar en su portafolio.",
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
      primerPaso: "Elegir con los estudiantes un tema difícil y organizar una tutoría antes del parcial. Al cierre, preguntar qué ejercicio ya pueden resolver por su cuenta."
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
