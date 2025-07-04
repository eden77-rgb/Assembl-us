const buttons = document.querySelectorAll("nav button");
const sections = document.querySelectorAll("section");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        sections.forEach(s => s.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById(btn.dataset.tab).classList.add("active");
    });
});


document.querySelectorAll('pre code').forEach(block => {
    if (block.classList.contains('numbered')) {
        return;
    }

    const lines = block.textContent.replace(/\r\n/g, '\n').split('\n');
    block.innerHTML = lines.map(line => {
        if (/^\s*int\b/i.test(line)) {
            return `<span class="lime">${line || ' '}</span>`;
        }

        else {
            return `<span>${line || ' '}</span>`;
        }
    }).join('');
    block.classList.add('numbered');
});


const exosConsignes = [
    `; Exercice 1\n; Écris une instruction\n; Génère une interruption logicielle de numéro 0x80\n`,
    `; Exercice 2\n; Donne un exemple d’interruption matérielle.\n; Donne un exemple d’interruption logicielle.`,
    `; Exercice 3\n; Propose une modification si nécessaire : INT 5\n`
];

const exoTabs = document.querySelectorAll('.exo-tab');
const exoContents = document.querySelectorAll('.exo-content');
const validerBtn = document.getElementById('valider-exo');
const codeEditor = document.getElementById('code-editor');

let currentExo = 1;

if (codeEditor && exosConsignes[0]) {
    codeEditor.value = exosConsignes[0];
}


exoTabs.forEach(tab => {
    tab.addEventListener('click', function () {
        if (this.disabled) return;
        document.querySelector('.exo-tab.active').classList.remove('active');
        tab.classList.add('active');
        document.querySelector('.exo-content.active').classList.remove('active');
        document.querySelector(`.exo-content[data-exo="${tab.dataset.exo}"]`).classList.add('active');
        currentExo = Number(tab.dataset.exo);
        codeEditor.value = exosConsignes[currentExo - 1];
    });
});


validerBtn.addEventListener('click', function () {
    if (codeEditor.value.trim().length == 0) {
        alert("Écris d'abord une réponse !");
        return;
    }

    const sujet = exosSujet[currentExo - 1];
    const code = codeEditor.value;

    fetch(`/api?sujet=${encodeURIComponent(sujet)}&code=${encodeURIComponent(code)}`)
        .then(res => res.json())
        .then(data => {
            if (data.code === 0) { 
                if (currentExo < exoTabs.length) {
                    const nextTab = document.querySelector(`.exo-tab[data-exo="${currentExo + 1}"]`);
                    nextTab.disabled = false;
                    nextTab.classList.add('active');
                    exoTabs[currentExo - 1].classList.remove('active');
                    document.querySelector('.exo-content.active').classList.remove('active');
                    document.querySelector(`.exo-content[data-exo="${currentExo + 1}"]`).classList.add('active');
                    codeEditor.value = exosConsignes[currentExo];
                    currentExo += 1;
                } 
                
                else {
                    codeEditor.value = "; Bravo, tu as fini tous les exercices !";
                }
            } 
            
            else {
                alert("Ta réponse n'est pas correcte :\n" + (data.erreur || 'Corrige ton code.'));
            }
        });
});

const textarea = document.getElementById('code-editor');
const lineNumbers = document.getElementById('line-numbers');

function updateLineNumbers() {
    const lines = textarea.value.split('\n').length;
    lineNumbers.textContent = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
}

textarea.addEventListener('input', updateLineNumbers);
textarea.addEventListener('change', updateLineNumbers);

if (typeof exoTabs != "undefined") {
    exoTabs.forEach(tab => {
        tab.addEventListener('click', updateLineNumbers);
    });
}

updateLineNumbers();



const exosSujet = [
    `; Exercice 1\n; Écris une instruction\n; Génère une interruption logicielle de numéro 0x80\n`,
    `; Exercice 2\n; Donne un exemple d’interruption matérielle.\n; Donne un exemple d’interruption logicielle.`,
    `; Exercice 3\n; Propose une modification si nécessaire : INT 5\n`
];

const boutonConsole = document.getElementById("goto-console")
const textarea1 = document.getElementById("code-editor")
const terminal = document.getElementById("console-terminal")

function getExerciceActifIndex() {
    const tabActive = document.querySelector('.exo-tab.active');
    if (tabActive) {
        return parseInt(tabActive.getAttribute('data-exo'), 10) - 1;
    }
    return 0;
}

boutonConsole.addEventListener("click", async () => {
    const sujet = exosSujet[getExerciceActifIndex()]
    const code = textarea1.value;

    fetch(`/api?sujet=${encodeURIComponent(sujet)}&code=${encodeURIComponent(code)}`)
        .then(res => res.json())
        .then(data => {
            console.clear()
            console.log("Amélioration :", data.amelioration);
            console.log("Code :", data.code);
            console.log("Erreur :", data.erreur);

            terminal.style.display = "block";
            data.code == 1 ? terminal.style.color = "#f44336" : terminal.style.color = "lime"
            terminal.textContent =
                (data.code !== undefined ? `Code de retour : ${data.code}\n` : "") +
                (data.erreur && data.code == 1 ? `Erreur : ${data.erreur}\n` : "") +
                (data.amelioration ? `Astuce : ${data.amelioration}\n` : "");
        });
})
