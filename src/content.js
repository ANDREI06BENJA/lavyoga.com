const endpoint = 'https://u1p339zb.api.sanity.io/v2026-08-31/data/query/production'
const query = encodeURIComponent(`*[_type == "siteSettings"][0]{
  ...,
  "heroImageUrl": heroImage.asset->url,
  "aboutImageUrl": aboutImage.asset->url
}`)

const applyText = (selector, value) => {
  if (!value) return
  const element = document.querySelector(selector)
  if (element) element.textContent = value
}

const applyMultilineText = (selector, value) => {
  if (!value) return
  const element = document.querySelector(selector)
  if (element) element.innerHTML = value.split('\n').join('<br>')
}

const applyImage = (selector, url) => {
  if (!url) return
  const element = document.querySelector(selector)
  if (element) element.style.backgroundImage = `url("${url}")`
}

const applyCourses = (courses) => {
  if (!Array.isArray(courses) || !courses.length) return

  document.querySelectorAll('.course-list article').forEach((article, index) => {
    const course = courses[index]
    if (!course) return
    applyText(`.course-list article:nth-child(${index + 1}) h2`, course.title)
    applyText(`.course-list article:nth-child(${index + 1}) p`, course.description)
    applyText(`.course-list article:nth-child(${index + 1}) small`, course.availability)
  })
}

async function loadContent() {
  try {
    const response = await fetch(`${endpoint}?query=${query}`)
    if (!response.ok) return

    const { result } = await response.json()
    if (!result) return

    applyMultilineText('.home-hero h1', result.heroTitle)
    applyText('.home-hero .hero-text > p:not(.kicker)', result.heroText)
    applyText('.welcome h2', result.welcomeTitle)
    applyText('.welcome > p:not(.kicker)', result.welcomeText)
    applyText('.practice h2', result.practiceTitle)
    applyText('.practice p:not(.kicker)', result.practiceText)
    applyMultilineText('.page-intro h1', result.aboutTitle)
    applyText('.page-intro > p:not(.kicker)', result.aboutIntro)
    applyText('.about-content h2', result.aboutHeading)
    applyMultilineText('.about-content > div:last-child p:first-of-type', result.aboutText)
    applyCourses(result.courses)
    applyText('.contact h2', result.contactTitle)
    applyText('.contact-main > p', result.contactText)

    if (result.phone) {
      const phone = document.querySelector('.email')
      if (phone) {
        phone.textContent = result.phone
        phone.href = `tel:${result.phone.replace(/\s/g, '')}`
      }
    }

    if (result.instagramUrl) {
      const instagram = document.querySelector('.instagram')
      if (instagram) instagram.href = result.instagramUrl
    }

    applyImage('.hero-photo', result.heroImageUrl)
    applyImage('.about-photo', result.aboutImageUrl)
  } catch {
    // Keep the static copy visible while Sanity is unavailable.
  }
}

loadContent()