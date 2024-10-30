import projets from "../data/projets.json";

const generateModalContent = (projet) => {
  const holder = document.querySelector(".modale-holder");
  const contenuHolder = document.querySelector(".modale-contenu");
  const closeBtn = document.querySelector("[data-modal-close]");

  const header = holder.querySelector("header");

  if (header.querySelector("h2")) {
    header.querySelector("h2").remove();
  }

  // titre
  const title = document.createElement("h2");
  title.innerText = projet.name;
  header.prepend(title);

  contenuHolder.innerHTML = "";

  // image
  const img = document.createElement("img");
  img.src = projet.img;
  img.alt = projet.imgAlt;
  contenuHolder.append(img);

  // div infosHolder qui contient tous les éléments HTML
  const infosHolder = document.createElement("div");
  infosHolder.className = "info-holder";
  infosHolder.classList.add(
    "flex",
    "flex-column",
    "justify-between",
    "flex-grow"
  );

  // div qui contient le type de stack
  const typeStackHolder = document.createElement("div");
  typeStackHolder.classList.add("type-stack-holder", "flex", "justify-between");

  const typeP = document.createElement("p");
  typeP.innerText = projet.type;
  typeP.classList.add("categorie-projet", "flex");
  typeStackHolder.append(typeP);

  const stackHolder = document.createElement("ul");
  stackHolder.classList.add("stack-holder", "flex");
  const stackItems = projet.stack;

  stackItems.forEach((item) => {
    const liElement = document.createElement("li");
    liElement.innerText = item;
    stackHolder.append(liElement);
  });

  typeStackHolder.append(stackHolder);
  infosHolder.append(typeStackHolder);

  //description
  const descriptionHolder = document.createElement("div");
  descriptionHolder.className = "description-holder";
  const descriptionText = document.createElement("p");
  descriptionText.innerText = projet.description;
  descriptionHolder.append(descriptionText);
  infosHolder.append(descriptionHolder);

  // liens
  const liensHolder = document.createElement("div");
  liensHolder.classList.add("liens-holder", "flex", "gap-10");

  const ulElement = document.createElement("ul");

  const projetLiens = projet.liens;
  for (let lien in projetLiens) {
    const liElement = document.createElement("li");
    const aElement = document.createElement("a");

    aElement.innerText = "Voir sur " + lien.toUpperCase();
    aElement.href = projetLiens[lien];
    aElement.target = "_blank";

    // aElement.append(iElement);
    liElement.append(aElement);
    ulElement.append(liElement);
  }

  liensHolder.append(ulElement);
  infosHolder.append(liensHolder);
  contenuHolder.append(infosHolder);

  // Montrer la modale
  holder.classList.remove("hidden");

  // Fermer la modale
  closeBtn.addEventListener("click", () => {
    holder.classList.add("hidden");
  });
};

// Mosaïque de projets
const generateProjetsList = () => {
  const holder = document.querySelector(".projets-holder");

  projets.forEach((projet) => {
    const cardHolder = document.createElement("div");
    cardHolder.classList.add("flex", "justify-between", "flex-column");

    const header = document.createElement("header");
    const title = document.createElement("h2");
    title.innerText = projet.name;
    header.append(title);
    cardHolder.append(header);

    const img = document.createElement("img");
    img.src = projet.img;
    img.alt = projet.imgAlt;
    cardHolder.append(img);

    const typeP = document.createElement("p");
    typeP.innerText = projet.type;
    cardHolder.append(typeP);

    const modalBtn = document.createElement("button");
    modalBtn.innerText = "En savoir plus";
    modalBtn.setAttribute(
      "aria-label",
      modalBtn.innerText + " - " + projet.name
    );
    cardHolder.append(modalBtn);
    modalBtn.addEventListener("click", () => {
      generateModalContent(projet);
    });

    holder.append(cardHolder);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  generateProjetsList();
});
