const display = document.getElementById("display");
display.textContent = "0";
const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    handleButtonClick(value);
  });
});

// Fonction pour gérer le clic sur un bouton (ou une touche du clavier)
function handleButtonClick(value) {
  // Si on appuie sur "C" (réinitialisation)
  if (value === "C") {
    display.textContent = "0";
  }
  // Si on appuie sur "=" (évaluation de l'expression)
  else if (value === "=") {
    try {
      display.textContent = math.evaluate(display.textContent);
    } catch (error) {
      display.textContent = "Error";
    }
  }
  // Si on appuie sur un chiffre ou un opérateur
  else {
    // Ajouter la valeur si l'affichage n'est pas "0"
    if (display.textContent === "0" && value !== ".") {
      display.textContent = value;
    } else {
      // Empêcher plusieurs points dans un même nombre
      if (value === "." && !display.textContent.includes(".")) {
        display.textContent += value;
      } else if (value !== "." || display.textContent !== "0") {
        display.textContent += value;
      }
    }
  }
}

// Écouteur d'événements pour détecter les touches du clavier
document.addEventListener("keydown", (event) => {
  const key = event.key;

  // Gestion des touches numériques, opérateurs, parenthèses et point
  if (key >= "0" && key <= "9") {
    handleButtonClick(key); // Ajoute le chiffre au display
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    handleButtonClick(key); // Ajoute l'opérateur au display
  } else if (key === "Enter") {
    handleButtonClick("="); // Simule le clic sur "="
  } else if (key === "Backspace") {
    handleButtonClick("C"); // Simule le clic sur "C"
  } else if (key === "(" || key === ")") {
    handleButtonClick(key); // Ajoute les parenthèses au display
  } else if (key === ".") {
    handleButtonClick("."); // Ajoute un point décimal
  }
});
