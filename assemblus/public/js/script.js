const lines = document.querySelectorAll('.line');
const scrollText = document.getElementById('scrollText');

const alreadyTyped = new Set()

function typeLine(line, text) {
    let index = 0

    function typeChar() {
        if (index < text.length) {
            line.textContent += text[index]
            index += 1

            setTimeout(typeChar, 30)
        }
    }

    typeChar()
}

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
        scrollText.classList.add('hidden');
    }

    lines.forEach((line, i) => {
        const trigger = 200 + i * 200;
        const text_line = line.dataset.text

        if (scrollY > trigger && !alreadyTyped.has(line)) {

            line.classList.add('visible');
            typeLine(line, text_line)
            alreadyTyped.add(line)
        }
    });
});

const bouton = document.getElementById("BtnPush")
bouton.addEventListener("click", () => {
    history.pushState(null, "", "/cours")
    window.scrollTo(0, 0)
    location.reload()
})