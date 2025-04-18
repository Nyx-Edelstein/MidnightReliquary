// Progress tracking functionality

// Save reading progress for a work
function saveReadingProgress(slug, chapterOrder) {
  try {
    localStorage.setItem(`reading-progress-${slug}`, chapterOrder)
    console.log(`Saved progress for ${slug}: chapter ${chapterOrder}`)
  } catch (e) {
    console.error("Failed to save reading progress:", e)
  }
}

// Get reading progress for a work
function getReadingProgress(slug) {
  try {
    return localStorage.getItem(`reading-progress-${slug}`)
  } catch (e) {
    console.error("Failed to get reading progress:", e)
    return null
  }
}

// Handle read link clicks on the home page
function handleReadClick(event, slug) {
  event.preventDefault()

  const progress = getReadingProgress(slug)
  if (progress) {
    // Navigate to the last read chapter
    window.location.href = `/works/${slug}/chapters/${progress}/`
  } else {
    // Navigate to the work's title page
    window.location.href = `/works/${slug}/`
  }
}

// Handle start/continue reading button on work page
function handleStartContinueReading(event, slug, firstChapterOrder) {
  event.preventDefault()

  const progress = getReadingProgress(slug)
  if (progress) {
    // Navigate to the last read chapter
    window.location.href = `/works/${slug}/chapters/${progress}/`
  } else {
    // Navigate to the first chapter
    window.location.href = `/works/${slug}/chapters/${firstChapterOrder}/`
  }
}

// Initialize progress tracking
function initProgressTracking() {
  console.log("Initializing progress tracking")

  // Save progress if on a chapter page
  const chapterPage = document.querySelector("[data-chapter-page]")
  if (chapterPage) {
    const slug = chapterPage.getAttribute("data-work-slug")
    const chapterOrder = chapterPage.getAttribute("data-chapter-order")
    if (slug && chapterOrder) {
      console.log(`Found chapter page: ${slug}, chapter ${chapterOrder}`)
      saveReadingProgress(slug, chapterOrder)
    }
  }

  // Update read links on home page
  const readLinks = document.querySelectorAll("[data-read-link]")
  readLinks.forEach((link) => {
    const slug = link.getAttribute("data-slug")
    if (slug) {
      link.addEventListener("click", (e) => handleReadClick(e, slug))
    }
  })

  // Update start/continue reading button on work page
  const startReadingBtn = document.querySelector("[data-start-reading]")
  if (startReadingBtn) {
    const slug = startReadingBtn.getAttribute("data-slug")
    const firstChapterOrder = startReadingBtn.getAttribute("data-first-chapter")
    if (slug && firstChapterOrder) {
      const progress = getReadingProgress(slug)
      if (progress) {
        startReadingBtn.textContent = "Continue Reading"
      }
      startReadingBtn.addEventListener("click", (e) => handleStartContinueReading(e, slug, firstChapterOrder))
    }
  }

  // Update progress page
  const progressPage = document.querySelector("[data-progress-page]")
  if (progressPage) {
    const slug = progressPage.getAttribute("data-work-slug")
    const chapterCount = progressPage.getAttribute("data-chapter-count")
    if (slug && chapterCount) {
      const progress = getReadingProgress(slug)
      const progressText = document.getElementById("reading-progress")
      const continueBtn = document.getElementById("continue-reading")
      const startBtn = document.getElementById("start-reading")

      if (progress) {
        if (progressText) {
          progressText.textContent = `You've read up to chapter ${progress} of ${chapterCount}.`
        }
        if (continueBtn) {
          continueBtn.style.display = "block"
          continueBtn.addEventListener("click", (e) => {
            e.preventDefault()
            window.location.href = `/works/${slug}/chapters/${progress}/`
          })
        }
        if (startBtn) {
          startBtn.style.display = "none"
        }
      } else {
        if (progressText) {
          progressText.textContent = "You haven't started reading this work yet."
        }
        if (continueBtn) {
          continueBtn.style.display = "none"
        }
        if (startBtn) {
          startBtn.style.display = "block"
        }
      }
    }
  }
}

// Run initialization when DOM is loaded
document.addEventListener("DOMContentLoaded", initProgressTracking)

// For static site navigation, we need to handle page changes
// This is a workaround for the lack of SPA navigation in a static site
window.addEventListener("click", (e) => {
  // Check if the click was on a link
  const link = e.target.closest("a")
  if (
    link &&
    link.href &&
    link.href.includes("/chapters/") &&
    !link.hasAttribute("data-read-link") &&
    !link.hasAttribute("data-start-reading")
  ) {
    // This is a chapter link, save the current page before navigating
    const chapterPage = document.querySelector("[data-chapter-page]")
    if (chapterPage) {
      const slug = chapterPage.getAttribute("data-work-slug")
      const chapterOrder = chapterPage.getAttribute("data-chapter-order")
      if (slug && chapterOrder) {
        saveReadingProgress(slug, chapterOrder)
      }
    }
  }
})

// Additional initialization for when the page is shown (helps with back/forward navigation)
window.addEventListener("pageshow", (e) => {
  // Initialize again when page is shown (including from bfcache)
  if (e.persisted) {
    console.log("Page restored from bfcache, reinitializing")
    initProgressTracking()
  }
})
