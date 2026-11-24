/*
  Somos Infotec — lógica de la página
  -----------------------------------
  1. Llena cada sección con los datos de contenido.js
  2. Carrusel de integrantes (flechas, teclado y deslizar)
  3. Pestañas de propuestas
  4. Menú en celular y sección activa del menú
  5. Botón para copiar o compartir el enlace
*/
(function () {
  "use strict";

  const datos = window.CONTENIDO;
  const $ = (id) => document.getElementById(id);
  const moverSuave = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

  // Crea un elemento con texto. Se usa textContent (no innerHTML) para que
  // cualquier texto de contenido.js se muestre tal cual y nunca se ejecute como código.
  function crear(etiqueta, clase, texto) {
    const el = document.createElement(etiqueta);
    if (clase) el.className = clase;
    if (texto !== undefined) el.textContent = texto;
    return el;
  }

  /* ---------- 1. Textos ---------- */
  function llenarTextos() {
    $("portada-etiqueta").textContent = datos.portada.etiqueta;
    const h1 = $("portada-titulo");
    datos.portada.titulo.forEach((linea) => h1.appendChild(crear("span", "", linea)));
    $("portada-texto").textContent = datos.portada.texto;
    $("portada-img").src = datos.portada.imagen;
    $("portada-img").alt = datos.portada.imagenDescripcion;

    $("lema-1").textContent = datos.lema.parte1;
    $("lema-2").textContent = datos.lema.parte2;

    $("mision").textContent = datos.mision;
    $("vision").textContent = datos.vision;

    $("objetivo-general").textContent = datos.objetivoGeneral;
    iniciarObjetivos();

    $("foto-grupal").src = datos.fotoGrupal.imagen;
    $("foto-grupal").alt = datos.fotoGrupal.descripcion;

    $("propuestas-intro").textContent = datos.propuestasIntro;
    $("muestra-titulo").textContent = datos.muestra.titulo;
    $("muestra-texto").textContent = datos.muestra.texto;
    $("muestra-etiqueta").textContent = datos.muestra.etiqueta;

    $("comp-titulo").textContent = datos.compartir.titulo;
    $("comp-texto").textContent = datos.compartir.texto;
    $("pie").textContent = datos.pie;
  }

  /* ---------- 1b. Objetivos específicos ----------
     En computadora: lista completa (título y texto).
     En celular: acordeón; se ven los 5 títulos y se toca uno para leerlo. */
  function iniciarObjetivos() {
    const dl = $("objetivos");
    const celular = window.matchMedia("(max-width: 720px)");

    function dibujar() {
      dl.textContent = "";
      dl.classList.toggle("acordeon", celular.matches);
      datos.objetivosEspecificos.forEach((o, i) => {
        const fila = crear("div", "objetivo-item");
        const dt = crear("dt");
        const dd = crear("dd", "", o.texto);
        dd.id = "objetivo-texto-" + i;
        if (celular.matches) {
          const b = crear("button", "objetivo-item__boton");
          b.type = "button";
          b.append(crear("span", "", o.titulo), crear("span", "objetivo-item__signo"));
          b.setAttribute("aria-controls", dd.id);
          b.addEventListener("click", () => abrir(i));
          dt.appendChild(b);
        } else {
          dt.textContent = o.titulo;
        }
        fila.append(dt, dd);
        dl.appendChild(fila);
      });
      if (celular.matches) abrir(-1);
    }

    // Abre uno y cierra los demás (así la pantalla siempre entra completa)
    function abrir(i) {
      Array.from(dl.children).forEach((fila, j) => {
        const abierto = i === j && !fila.classList.contains("abierto");
        fila.classList.toggle("abierto", abierto);
        const b = fila.querySelector("button");
        if (b) b.setAttribute("aria-expanded", String(abierto));
      });
    }

    dibujar();
    celular.addEventListener("change", dibujar);
  }

  /* ---------- 2. Carrusel de integrantes ---------- */
  const SILUETA = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4.2"/><path d="M3.5 21a8.5 7.5 0 0 1 17 0z"/></svg>';

  function iniciarCarrusel() {
    const pista = $("pista");
    const total = datos.integrantes.length;
    $("total").textContent = total;

    datos.integrantes.forEach((p) => {
      const li = crear("li", "integrante");
      const marco = crear("div", "integrante__foto");
      if (p.foto) {
        const img = crear("img");
        img.src = p.foto;
        img.alt = "Foto de " + p.nombre;
        img.loading = "lazy";
        img.width = 560; img.height = 700;
        marco.appendChild(img);
      } else {
        marco.innerHTML = SILUETA; // ícono fijo, no viene de los datos
        marco.setAttribute("role", "img");
        marco.setAttribute("aria-label", "Perfil de " + p.nombre);
      }
      li.append(marco, crear("h3", "", p.nombre), crear("p", "", p.cargo));
      pista.appendChild(li);
    });

    const anterior = $("anterior");
    const siguiente = $("siguiente");

    // Distancia de una ficha a la siguiente (ancho + espacio entre fichas)
    function paso() {
      const primera = pista.children[0];
      if (!primera || pista.children.length < 2) return primera ? primera.offsetWidth : 1;
      return pista.children[1].offsetLeft - primera.offsetLeft;
    }
    // Cuántas fichas entran completas en pantalla
    function visibles() {
      const gap = paso() - pista.children[0].offsetWidth;
      return Math.max(1, Math.floor((pista.clientWidth + gap + 2) / paso()));
    }

    function actualizar() {
      const max = pista.scrollWidth - pista.clientWidth;
      const alFinal = pista.scrollLeft >= max - 4;
      const v = visibles();
      let primero = Math.round(pista.scrollLeft / paso()) + 1;
      let ultimo = Math.min(total, primero + v - 1);
      if (alFinal) { ultimo = total; primero = Math.max(1, total - v + 1); }
      $("contador").textContent = primero === ultimo ? String(primero) : primero + "–" + ultimo;
      anterior.disabled = pista.scrollLeft <= 4;
      siguiente.disabled = alFinal;
      pista.classList.toggle("al-final", alFinal);
    }

    function irA(posicion) {
      pista.scrollTo({ left: posicion, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    }
    function mover(cantidadFichas) {
      irA(pista.scrollLeft + cantidadFichas * paso());
    }

    anterior.addEventListener("click", () => mover(-visibles()));
    siguiente.addEventListener("click", () => mover(visibles()));

    // Teclado: con el carrusel enfocado, ← y → mueven una ficha
    pista.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); mover(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); mover(-1); }
      if (e.key === "Home") { e.preventDefault(); irA(0); }
      if (e.key === "End") { e.preventDefault(); irA(pista.scrollWidth); }
    });

    let espera;
    pista.addEventListener("scroll", () => { cancelAnimationFrame(espera); espera = requestAnimationFrame(actualizar); }, { passive: true });
    new ResizeObserver(actualizar).observe(pista);
    actualizar();
  }

  /* ---------- 3. Pestañas de propuestas ---------- */
  function iniciarPestanas() {
    const lista = $("pestanas");
    const botones = datos.propuestas.map((p, i) => {
      const b = crear("button", "pestana");
      b.type = "button";
      b.id = "pestana-" + i;
      b.setAttribute("role", "tab");
      b.setAttribute("aria-controls", "detalle");
      b.append(
        crear("span", "pestana__num", String(i + 1).padStart(2, "0")),
        crear("span", "pestana__nombre", p.nombre),
        crear("span", "pestana__area", p.area)
      );
      b.addEventListener("click", () => elegir(i));
      lista.appendChild(b);
      return b;
    });

    let seleccion = 0;
    function elegir(i, enfocar = false, revelar = enfocar) {
      seleccion = i;
      botones.forEach((b, j) => {
        const activo = i === j;
        b.setAttribute("aria-selected", String(activo));
        b.tabIndex = activo ? 0 : -1;
      });
      const p = datos.propuestas[i];
      $("detalle-nombre").textContent = p.nombre;
      $("detalle-texto").textContent = p.descripcion;
      $("detalle-paso").textContent = p.primerPaso;
      $("detalle").setAttribute("aria-labelledby", botones[i].id);
      if (enfocar) botones[i].focus({ preventScroll: true });
      if (revelar) {
        const diferencia = botones[i].getBoundingClientRect().left - lista.getBoundingClientRect().left;
        lista.scrollBy({ left: diferencia, behavior: moverSuave });
      }
    }

    // Teclado dentro de las pestañas: ← → Inicio Fin
    lista.addEventListener("keydown", (e) => {
      const actual = botones.findIndex((b) => b.getAttribute("aria-selected") === "true");
      let nuevo = null;
      if (e.key === "ArrowRight") nuevo = (actual + 1) % botones.length;
      if (e.key === "ArrowLeft") nuevo = (actual - 1 + botones.length) % botones.length;
      if (e.key === "Home") nuevo = 0;
      if (e.key === "End") nuevo = botones.length - 1;
      if (nuevo !== null) { e.preventDefault(); elegir(nuevo, true); }
    });

    $("propuesta-anterior").addEventListener("click", () => elegir((seleccion - 1 + botones.length) % botones.length, false, true));
    $("propuesta-siguiente").addEventListener("click", () => elegir((seleccion + 1) % botones.length, false, true));
    elegir(0);
  }

  /* ---------- 4. Menú ---------- */
  function iniciarMenu() {
    const boton = document.querySelector(".menu-boton");
    const menu = $("menu");
    const enlaces = Array.from(menu.querySelectorAll("a"));

    function cerrar() {
      menu.classList.remove("abierto");
      boton.setAttribute("aria-expanded", "false");
      boton.querySelector(".sr").textContent = "Abrir menú";
    }
    boton.addEventListener("click", () => {
      const abierto = menu.classList.toggle("abierto");
      boton.setAttribute("aria-expanded", String(abierto));
      boton.querySelector(".sr").textContent = abierto ? "Cerrar menú" : "Abrir menú";
    });
    enlaces.forEach((a) => a.addEventListener("click", cerrar));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") cerrar(); });

    // Marca en el menú la opción de la pantalla donde está la persona.
    // Cada pantalla dice a qué opción pertenece con data-menu
    // (por ejemplo, misión, visión y objetivos pertenecen a "proposito").
    const pantallas = Array.from(document.querySelectorAll("[data-menu]"));
    const barra = document.querySelector(".barra");
    let pendiente = false;

    function marcar() {
      pendiente = false;
      const arriba = barra.offsetHeight;
      const centro = arriba + (window.innerHeight - arriba) / 2;
      let actual = pantallas[0];
      pantallas.forEach((p) => { if (p.getBoundingClientRect().top <= centro) actual = p; });
      // Al llegar al final de la página, la última opción
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) actual = pantallas[pantallas.length - 1];
      const destino = "#" + actual.dataset.menu;
      enlaces.forEach((a) => {
        const activo = a.getAttribute("href") === destino;
        a.classList.toggle("activo", activo);
        if (activo) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
      });
    }
    window.addEventListener("scroll", () => {
      if (!pendiente) { pendiente = true; requestAnimationFrame(marcar); }
    }, { passive: true });
    window.addEventListener("resize", marcar);
    marcar();
  }

  /* ---------- 5. Copiar / compartir enlace ---------- */
  function iniciarCompartir() {
    const estado = $("estado");
    const enlace = () => location.href.split("#")[0];

    $("copiar").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(enlace());
        estado.textContent = "Enlace copiado. Ya podés pegarlo donde quieras.";
      } catch (err) {
        estado.textContent = "No se pudo copiar automáticamente. Copiá este enlace: " + enlace();
      }
    });

    if (navigator.share) {
      const b = $("compartir");
      b.hidden = false;
      b.addEventListener("click", () => {
        navigator.share({ title: document.title, url: enlace() }).catch(() => {});
      });
    }
  }

  /* ---------- 6. Modo presentación (desplazamiento por pantallas) ----------
     Los gestos verticales controlan el avance. El observador activa el efecto de entrada. */
  function iniciarPantallas() {
    const raiz = document.documentElement;
    const main = $("contenido");
    const originales = Array.from(main.children);
    const celular = window.matchMedia("(max-width: 720px)");
    const identidad = $("proposito");
    const objetivo = main.querySelector(".objetivo");
    objetivo.append(main.querySelector(".especificos"));
    $("equipo").append(main.querySelector(".fichas-equipo"));
    let pantallas;
    function agrupar() {
      if (celular.matches) identidad.after(objetivo);
      else identidad.append(objetivo);
      pantallas = Array.from(main.children);
      originales.forEach(p => p.classList.toggle("pantalla", p.parentElement === main));
    }
    agrupar();
    const barra = document.querySelector(".barra");
    const pie = document.querySelector(".pie");

    function medir() {
      raiz.style.setProperty("--alto-barra", barra.offsetHeight + "px");
      raiz.style.setProperty("--alto-pie", pie.offsetHeight + "px");
    }
    raiz.classList.add("presentacion");
    medir();
    if ("ResizeObserver" in window) {
      const medidas = new ResizeObserver(medir);
      medidas.observe(barra);
      medidas.observe(pie);

    }



    // Rueda del mouse / touchpad en computadora: cada gesto = una pantalla.
    // Se recuerda la pantalla de destino, así un gesto nuevo durante la
    // animación continúa desde ahí en lugar de quedar bloqueado.
    const escritorio = window.matchMedia("(min-width: 721px) and (min-height: 560px)");
    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)");
    let destino = null;   // índice de la pantalla hacia la que se está yendo
    let yDestino = 0;
    let yInicio = 0;
    let ultimaRueda = 0;
    let sentidoAnterior = 0;
    let soltar;
    let impulso = 0;
    let consumido = false;

    function inicioDe(p) { return p.getBoundingClientRect().top + window.scrollY - barra.offsetHeight; }
    function pantallaActual() {
      const y = window.scrollY + 4;
      let actual = 0;
      pantallas.forEach((p, i) => { if (inicioDe(p) <= y) actual = i; });
      return actual;
    }

    function indiceParaGesto() {
      // Si la animación ya llegó, se vuelve a medir desde la posición real
      // (o si la página se movió por otra vía, como un enlace del menú).
      if (destino !== null) {
        const recorrido = yDestino - yInicio;
        const avance = window.scrollY - yInicio;
        const enCamino = avance * recorrido >= -3 && Math.abs(avance) <= Math.abs(recorrido) + 3;
        if (!enCamino || Math.abs(window.scrollY - yDestino) < 3) destino = null;
      }
      return destino !== null ? destino : pantallaActual();
    }
    function deslizar(siguiente, posicion) {
      const maximo = document.documentElement.scrollHeight - window.innerHeight;
      const y = Math.max(0, Math.min(maximo, posicion));
      destino = siguiente;
      yInicio = window.scrollY;
      yDestino = y;
      window.scrollTo({ top: y, behavior: reducir.matches ? "auto" : "smooth" });
      clearTimeout(soltar);
      soltar = setTimeout(() => { destino = null; }, 1200);
    }
    const vista = window.visualViewport;
    if (vista) {
      let gesto = null;
      function ajustarZoom() {
        raiz.classList.toggle("con-zoom", vista.scale > 1.02);
        if (vista.scale <= 1.02) gesto = null;
      }
      vista.addEventListener("resize", ajustarZoom);
      ajustarZoom();

      // Trabajar en coordenadas de la ventana visible, que al ampliar es menor
      // que la ventana de diseño. El límite se fija al comenzar cada gesto.
      window.addEventListener("touchstart", e => {
        gesto = null;
        if (vista.scale <= 1.02 || e.touches.length !== 1) return;
        const superior = vista.pageTop + Math.max(0, barra.offsetHeight - vista.offsetTop);
        const centro = (superior + vista.pageTop + vista.height) / 2;
        const paneles = [...pantallas, pie];
        const bordes = paneles.map(p => p.getBoundingClientRect().top + window.scrollY);
        const i = Math.max(0, bordes.findLastIndex(y => y <= centro));
        const margen = superior - vista.pageTop;
        const inicio = Math.max(0, bordes[i] - margen);
        const fin = Math.max(inicio, bordes[i] + paneles[i].offsetHeight - vista.height);
        const dedo = e.touches[0];
        // La coordenada de pantalla no cambia al desplazar la ventana ampliada.
        gesto = { x: dedo.screenX, y: dedo.screenY, escala: vista.scale, origen: vista.pageTop, inicio, fin,
          abajo: i < paneles.length - 1 && vista.pageTop >= fin - 3 ? bordes[i + 1] - margen : null,
          arriba: i > 0 && vista.pageTop <= inicio + 3 ? Math.max(bordes[i - 1] - margen, bordes[i] - vista.height) : null,
          eje: null, cambio: false };
      }, { passive: true });
      window.addEventListener("touchmove", e => {
        if (!gesto || !e.cancelable || e.touches.length !== 1) return;
        const dx = (gesto.x - e.touches[0].screenX) / gesto.escala;
        const dy = (gesto.y - e.touches[0].screenY) / gesto.escala;
        if (!gesto.eje && Math.max(Math.abs(dx), Math.abs(dy)) < 3) return;
        if (!gesto.eje) gesto.eje = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (gesto.eje === "x") return;
        e.preventDefault();
        if (gesto.cambio) return;
        const salto = dy > 18 ? gesto.abajo : dy < -18 ? gesto.arriba : null;
        gesto.cambio = salto !== null;
        const y = gesto.cambio ? salto : Math.max(gesto.inicio, Math.min(gesto.fin, gesto.origen + dy));
        // scrollBy conserva el desplazamiento horizontal al leer con zoom.
        window.scrollBy({ top: y - vista.pageTop, behavior: gesto.cambio && !reducir.matches ? "smooth" : "instant" });
      }, { passive: false });
      window.addEventListener("touchend", () => { gesto = null; }, { passive: true });
      window.addEventListener("touchcancel", () => { gesto = null; }, { passive: true });
    }

    // Un deslizamiento vertical desde el borde avanza exactamente una sección.
    // Dentro de secciones altas, carruseles o al ampliar, se respeta el gesto propio.
    let toque = null;
    window.addEventListener("touchstart", e => {
      toque = null;
      if (e.touches.length !== 1 || (vista && vista.scale > 1.02)) return;
      const indice = indiceParaGesto();
      const rect = pantallas[indice].getBoundingClientRect();
      const dedo = e.touches[0];
      toque = { x: dedo.clientX, y: dedo.clientY, indice,
        puedeBajar: destino !== null || rect.bottom <= window.innerHeight + 3,
        puedeSubir: destino !== null || rect.top >= barra.offsetHeight - 3, tomado: false };
    }, { passive: true });
    window.addEventListener("touchmove", e => {
      if (!toque || e.touches.length !== 1 || !e.cancelable || (vista && vista.scale > 1.02)) return;
      if (toque.tomado) { e.preventDefault(); return; }
      const dy = toque.y - e.touches[0].clientY;
      const dx = toque.x - e.touches[0].clientX;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 4) return;
      if (Math.abs(dx) >= Math.abs(dy) || !(dy > 0 ? toque.puedeBajar : toque.puedeSubir)) {
        toque = null;
        return;
      }
      const siguiente = pantallas[toque.indice + Math.sign(dy)];
      if (!siguiente) return;
      e.preventDefault();
      if (Math.abs(dy) < 32) return;
      toque.tomado = true;
      const top = dy > 0 ? inicioDe(siguiente) : Math.max(inicioDe(siguiente),
        siguiente.getBoundingClientRect().bottom + window.scrollY - window.innerHeight);
      deslizar(toque.indice + Math.sign(dy), top);
    }, { passive: false });
    window.addEventListener("wheel", (e) => {
      if (!escritorio.matches || vista?.scale > 1.02 || e.ctrlKey || !e.deltaY || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const sentido = Math.sign(e.deltaY);
      const ahora = performance.now();
      if (ahora - ultimaRueda > 220 || sentido !== sentidoAnterior) {
        impulso = 0;
        consumido = false;
      }
      ultimaRueda = ahora;
      sentidoAnterior = sentido;
      if (consumido) { e.preventDefault(); return; }
      const unidad = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? innerHeight : 1;
      impulso += Math.abs(e.deltaY) * unidad;
      if (impulso < 32) { e.preventDefault(); return; }
      const i = indiceParaGesto();
      const p = pantallas[i];
      const alto = window.innerHeight - barra.offsetHeight;

      // Desde la última pantalla, bajar deja ver el pie de página.
      if (sentido > 0 && i === pantallas.length - 1 && destino === null) return;

      e.preventDefault();
      consumido = true;
      let siguiente = i;
      let y;
      const r = p.getBoundingClientRect();
      if (destino === null && sentido > 0 && r.bottom > window.innerHeight + 2) {
        // Pantalla más alta que la ventana: primero se muestra el resto
        y = window.scrollY + Math.min(r.bottom - window.innerHeight, alto * 0.85);
      } else if (destino === null && sentido < 0 && r.top < barra.offsetHeight - 2) {
        y = window.scrollY - Math.min(barra.offsetHeight - r.top, alto * 0.85);
      } else {
        siguiente = Math.min(pantallas.length - 1, Math.max(0, i + sentido));
        if (siguiente === i) return;
        const q = pantallas[siguiente];
        // Al subir a una pantalla alta, se llega a su parte final
        y = sentido < 0 && q.offsetHeight > alto + 2 ? inicioDe(q) + q.offsetHeight - alto : inicioDe(q);
      }
      deslizar(siguiente, y);
    }, { passive: false });

    // Cada vez que entra una pantalla, su contenido llega difuminado:
    //  - si se baja, sube desde abajo;
    //  - si se sube, baja desde arriba.
    // Una pantalla se "reinicia" apenas sale de la vista, así la animación
    // se repite siempre, también al ir y volver entre dos pantallas.
    let ultimaY = window.scrollY;
    let sentidoScroll = 1;   // 1 = bajando, -1 = subiendo
    const observador = new IntersectionObserver(entradas => {
      const y = window.scrollY;
      if (y !== ultimaY) sentidoScroll = y > ultimaY ? 1 : -1;
      ultimaY = y;
      for (const entrada of entradas) {
        const panel = entrada.target;
        if (entrada.isIntersecting) panel.dataset.desde = sentidoScroll > 0 ? "abajo" : "arriba";
        panel.classList.toggle("visible", entrada.isIntersecting);
      }
    });
    function revisarPantallas() {
      observador.disconnect();
      pantallas.forEach(panel => observador.observe(panel));
    }
    celular.addEventListener("change", () => {
      destino = null;
      agrupar();
      medir();
      revisarPantallas();
    });
    revisarPantallas();
  }

  llenarTextos();
  iniciarCarrusel();
  iniciarPestanas();
  iniciarMenu();
  iniciarCompartir();
  iniciarPantallas();
})();
