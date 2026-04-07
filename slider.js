document.addEventListener("DOMContentLoaded", () => {
  const projects = [
    {
      code: "OU01",
      name: "OUTFIT",
      image: "img/project-01.png",
      model: "img/3Dproject01.glb",
      page: "project01.html",
      alt: "Проект OU01 Outfit",
      genres: ["Одежда", "Лекала", "3D-design", "Мокапы"],
      year: "2025"
    },
    {
      code: "OU02",
      name: "OUTFIT",
      image: "img/project-02.png",
      model: "img/3Dproject02.glb",
      page: "project02.html",
      alt: "Проект OU02 Outfit",
      genres: ["Одежда", "Лекала", "3D-design", "Мокапы"],
      year: "2025"
    },
    {
      code: "OU03",
      name: "OUTFIT",
      image: "img/project-03.png",
      model: "img/3Dproject03.glb",
      page: "project03.html",
      alt: "Проект OU03 Outfit",
      genres: ["Одежда", "Лекала", "3D-design", "Мокапы"],
      year: "2025"
    },
    {
      code: "OU04",
      name: "OUTFIT",
      image: "img/project-04.png",
      model: "img/3Dproject04.glb",
      page: "project04.html",
      alt: "Проект OU04 Outfit",
      genres: ["Одежда", "Лекала", "3D-design", "Мокапы"],
      year: "2025"
    },
    {
      code: "OU05",
      name: "OUTFIT",
      image: "img/project-05.png",
      model: "img/3Dproject05.glb",
      page: "project05.html",
      alt: "Проект OU05 Outfit",
      genres: ["Одежда", "Лекала", "3D-design", "Мокапы"],
      year: "2025"
    },
    {
      code: "OU06",
      name: "OUTFIT",
      image: "img/project-06.png",
      model: "img/3Dproject06.glb",
      page: "project06.html",
      alt: "Проект OU06 Outfit",
      genres: ["Одежда", "Лекала", "3D-design", "Мокапы"],
      year: "2025"
    }
  ];

  const projectsList = document.getElementById("projectsList");
  const cards = Array.from(document.querySelectorAll(".project-card"));
  const nextButton = document.getElementById("nextProjectButton");
  const prevButton = document.getElementById("prevProjectButton");
  const projectPage = document.querySelector(".project-page");
  const header = document.querySelector(".header");

  const modal = document.getElementById("project3dModal");
  const modalOverlay = document.getElementById("project3dOverlay");
  const modalClose = document.getElementById("project3dClose");
  const modelViewer = document.getElementById("project3dViewer");
  const modalTitle = document.getElementById("project3dTitle");

  const projectsPerSlide = 2;
  const totalSlides = Math.ceil(projects.length / projectsPerSlide);

  let currentSlide = 0;
  let isAnimating = false;

  function getHeaderOffset() {
    return header ? header.offsetHeight + 18 : 0;
  }

  function scrollToProjectsTop() {
    if (!projectPage) return;

    const targetTop =
      projectPage.getBoundingClientRect().top + window.scrollY - getHeaderOffset();

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: "smooth"
    });
  }

  function openModelModal(projectData) {
    if (!modal || !modelViewer || !modalTitle) return;

    modelViewer.setAttribute("src", projectData.model);
    modelViewer.setAttribute("alt", `3D модель ${projectData.code} ${projectData.name}`);
    modalTitle.textContent = `${projectData.code} ${projectData.name}`;
    modal.classList.add("project-modal--active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function closeModelModal() {
    if (!modal || !modelViewer) return;

    modal.classList.remove("project-modal--active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    setTimeout(() => {
      modelViewer.setAttribute("src", "");
    }, 200);
  }

  function renderCard(cardElement, projectData) {
    const numberElement = cardElement.querySelector(".project-card__number");
    const nameElement = cardElement.querySelector(".project-card__name");
    const genresElement = cardElement.querySelector(".project-card__genres");
    const yearElement = cardElement.querySelector(".project-card__year");
    const imageElement = cardElement.querySelector(".project-card__image");
    const imageLinkElement = cardElement.querySelector(".project-card__image-link");
    const buttonElement = cardElement.querySelector(".project-card__button");

    if (!numberElement || !nameElement || !genresElement || !yearElement || !imageElement || !imageLinkElement || !buttonElement) {
      return;
    }

    numberElement.textContent = projectData.code;
    nameElement.textContent = projectData.name;
    yearElement.textContent = projectData.year;
    imageElement.src = projectData.image;
    imageElement.alt = projectData.alt;

    imageLinkElement.href = projectData.page;
    imageLinkElement.setAttribute(
      "aria-label",
      `Открыть страницу проекта ${projectData.code}`
    );

    genresElement.innerHTML = "";

    projectData.genres.forEach((genre) => {
      const item = document.createElement("li");
      item.textContent = genre;
      genresElement.appendChild(item);
    });

    buttonElement.onclick = () => {
      openModelModal(projectData);
    };
  }

  function renderSlide() {
    const startIndex = currentSlide * projectsPerSlide;

    cards.forEach((card, index) => {
      const projectData = projects[startIndex + index];

      if (!projectData) {
        card.style.display = "none";
        return;
      }

      card.style.display = "";
      renderCard(card, projectData);
    });
  }

  function setOutAnimation() {
    cards.forEach((card) => {
      card.classList.remove("is-changing-in");
      card.classList.add("is-changing-out");
    });
  }

  function setInAnimation() {
    cards.forEach((card) => {
      card.classList.remove("is-changing-out");
      card.classList.add("is-changing-in");
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        cards.forEach((card) => {
          card.classList.remove("is-changing-in");
        });
      });
    });
  }

  function changeSlide(direction) {
    if (isAnimating) return;

    isAnimating = true;

    if (projectsList) {
      projectsList.classList.add("is-locked");
    }

    scrollToProjectsTop();
    setOutAnimation();

    setTimeout(() => {
      currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
      renderSlide();
      setInAnimation();

      setTimeout(() => {
        isAnimating = false;

        if (projectsList) {
          projectsList.classList.remove("is-locked");
        }
      }, 380);
    }, 320);
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      changeSlide(1);
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      changeSlide(-1);
    });
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeModelModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", closeModelModal);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal && modal.classList.contains("project-modal--active")) {
      closeModelModal();
    }

    if (event.key === "ArrowRight") {
      changeSlide(1);
    }

    if (event.key === "ArrowLeft") {
      changeSlide(-1);
    }
  });

  renderSlide();
});