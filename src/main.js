import './style.css'

const pages = {
  '/': home,
  '/chi-sono': about,
  '/corsi': courses,
}

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')

function iconInstagram() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1"></circle></svg>`
}

function layout(content) {
  return `<a class="skip-link" href="#content">Vai al contenuto</a>
    <header class="header">
      <a class="logo" href="/" data-link>LAVY</a>
      <nav id="menu" aria-label="Navigazione"><a href="/" data-link>Home</a><a href="/chi-sono" data-link>Chi sono</a><a href="/corsi" data-link>Corsi</a><a href="#contatti">Contatti</a></nav>
      <a class="instagram-icon" href="https://instagram.com/lavyogastudio" target="_blank" rel="noreferrer" aria-label="Instagram Lavy Yoga Studio">${iconInstagram()}</a>
      <button class="menu-button" type="button" aria-expanded="false" aria-controls="menu" aria-label="Apri menu"><i></i><i></i></button>
    </header>
    <main id="content">${content}</main>
    <section id="contatti" class="contact">
      <p class="kicker">Contatti</p>
      <div class="contact-main"><h2>Parliamone.</h2><p>Per informazioni sui corsi e le lezioni private.</p><a class="email" href="tel:+393275835006">+39 327 583 5006</a></div>
      <div class="contact-side"><a class="instagram" href="https://instagram.com/lavyogastudio" target="_blank" rel="noreferrer">${iconInstagram()} @lavyogastudio</a><p>Resta con il tuo respiro</p></div>
    </section>
    <footer><a class="logo" href="/" data-link>LAVY</a><span>Yoga studio</span><span>© ${new Date().getFullYear()}</span></footer>`
}

function home() {
  return layout(`<section class="home-hero"><div class="hero-text"><p class="kicker">Yoga studio</p><h1>Lo yoga,<br>con calma.</h1><p>Movimento, respiro e tempo per te.</p><a class="arrow-link" href="/corsi" data-link>Vedi i corsi <b>→</b></a></div><div class="hero-photo" role="img" aria-label="Pratica di yoga in una stanza luminosa"></div></section><section class="welcome"><p class="kicker">Benvenutə</p><h2>Uno spazio semplice<br>per stare bene.</h2><p>Lezioni di yoga per ritrovare presenza nel corpo e leggerezza nelle giornate.</p><a class="arrow-link" href="/chi-sono" data-link>Scopri Lavy <b>→</b></a></section><section class="image-grid" aria-label="Momenti di pratica yoga"><div class="image-grid-one" role="img" aria-label="Persona in una posa yoga"></div><div class="image-grid-two" role="img" aria-label="Dettaglio di una pratica di yoga"></div><div class="image-grid-three" role="img" aria-label="Spazio luminoso per yoga"></div></section><section class="practice"><p class="kicker">La pratica</p><div><h2>Muoviti al tuo ritmo.</h2><p>Ogni lezione lascia spazio a quello che senti, senza fretta e senza performance.</p></div></section><section class="wide-photo" role="img" aria-label="Lezione di yoga di gruppo"></section>`)
}

function about() {
  return layout(`<section class="page-intro"><p class="kicker">Chi sono</p><h1>Ciao,<br>sono Lavy.</h1><p>Insegno yoga con cura, semplicità e attenzione.</p></section><section class="about-content"><div class="about-photo" role="img" aria-label="Insegnante di yoga all'aperto"></div><div><h2>Praticare è tornare al corpo.</h2><p>Lo yoga è entrato nella mia vita come un luogo quieto. Oggi lo insegno così: con lezioni accessibili, dirette e senza aspettative da raggiungere.</p><p>Ci troviamo sul tappetino, partendo da dove sei.</p></div></section><section class="about-gallery" aria-label="Momenti dello studio"><div role="img" aria-label="Mani in posizione meditativa"></div><div role="img" aria-label="Tappetino da yoga"></div></section>`)
}

function courses() {
  return layout(`<section class="page-intro"><p class="kicker">Corsi</p><h1>Pratica<br>con Lavy.</h1><p>Resta con il tuo respiro, oltre le posture.</p></section><section class="course-list"><article><span>01</span><h2>Yoga oltre le posture</h2><p>Una pratica completa di movimento, ascolto e respiro.</p><small>In studio e online</small></article><article><span>02</span><h2>Yoga in gravidanza</h2><p>Uno spazio gentile per accompagnare il corpo durante la gravidanza.</p><small>Su appuntamento</small></article><article><span>03</span><h2>FibroYoga</h2><p>Pratiche lente e adattabili per ritrovare benessere e fiducia nel corpo.</p><small>In studio e online</small></article><article><span>04</span><h2>Breathwork</h2><p>Incontri guidati per esplorare il respiro e ritrovare presenza.</p><small>Su appuntamento</small></article></section><section class="course-images" aria-label="Immagini dalle lezioni"><div role="img" aria-label="Pratica di yoga al tramonto"></div><div role="img" aria-label="Posa yoga in studio"></div></section>`)
}

function notFound() {
  return layout(`<section class="missing"><p class="kicker">Errore 404</p><h1>Questa pagina<br>non c'è.</h1><p>Forse si è presa un momento per respirare.</p><a class="arrow-link" href="/" data-link>Torna alla home <b>→</b></a></section>`)
}

function render() {
  const path = window.location.pathname.replace(basePath, '').replace(/\/$/, '') || '/'
  document.querySelector('#app').innerHTML = (pages[path] || notFound)()
  document.querySelectorAll('[data-link]').forEach((link) => {
    const destination = link.getAttribute('href')
    if (destination.startsWith('/')) link.href = `${basePath}${destination}`
    link.addEventListener('click', (event) => {
    event.preventDefault()
    history.pushState({}, '', link.href)
    render()
    scrollTo({ top: 0, behavior: 'instant' })
    })
  })
  const button = document.querySelector('.menu-button')
  const menu = document.querySelector('#menu')
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') === 'true'
    button.setAttribute('aria-expanded', String(!open))
    button.setAttribute('aria-label', open ? 'Apri menu' : 'Chiudi menu')
    menu.classList.toggle('open', !open)
  })
}

addEventListener('popstate', render)
render()
