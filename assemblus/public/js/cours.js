const h1 = document.querySelector("h1")
const text = h1.textContent
h1.textContent = ""
h1.style.textAlign = "left"

let index = 0

function typeChar() {
    if (index < text.length) {
        h1.textContent += text[index]
        index += 1

        setTimeout(typeChar, 30)     
    }
}

typeChar()

for (let i = 1; i <= 6; i++) {
    const chapId = document.getElementById(i.toString())

    chapId.addEventListener("click", () => {
        const urlPath = location.pathname
        history.pushState(null, "", `${urlPath}/chapitre${i.toString()}`)
        location.reload()
    })
}