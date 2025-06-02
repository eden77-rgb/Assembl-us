const chap1 = document.getElementById("1")
const chap2 = document.getElementById("2")
const chap3 = document.getElementById("3")
const chap4 = document.getElementById("4")
const chap5 = document.getElementById("5")
const chap6 = document.getElementById("6")

chap1.addEventListener("click", () => {
    const urlPath = location.pathname
    history.pushState(null, "", `${urlPath}/chapitre1`)
    location.reload()
})

chap2.addEventListener("click", () => {
    const urlPath = location.pathname
    history.pushState(null, "", `${urlPath}/chapitre2`)
    location.reload()
})

chap3.addEventListener("click", () => {
    const urlPath = location.pathname
    history.pushState(null, "", `${urlPath}/chapitre3`)
    location.reload()
})

chap4.addEventListener("click", () => {
    const urlPath = location.pathname
    history.pushState(null, "", `${urlPath}/chapitre4`)
    location.reload()
})

chap5.addEventListener("click", () => {
    const urlPath = location.pathname
    history.pushState(null, "", `${urlPath}/chapitre5`)
    location.reload()
})

chap6.addEventListener("click", () => {
    const urlPath = location.pathname
    history.pushState(null, "", `${urlPath}/chapitre6`)
    location.reload()
})