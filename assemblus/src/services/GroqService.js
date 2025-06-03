import Groq from "groq-sdk"

export async function getData(apiKey, sujet, code) {
    const groq = new Groq({ apiKey: apiKey });

    const prompt = `
    Agis comme un terminal NASM/Linux.
    Tu vas recevoir un énoncé suivi d'un code assembleur NASM.

    Dans le cas d'un code complet :
        - Compile et exécute le code comme si tu étais dans un terminal Linux avec nasm et ld.
    
    Dans le cas d'une parti de code :
        - Verifie si la syntaxe est correct

    Ensuite, réponds TOUJOURS au format JSON suivant :

    {
    "code": 0, // 0 si compilation/exécution OK, 1 si erreur
    "erreur": "", // message d’erreur si erreur, sinon ""
    "amelioration": "" // suggestion d’amélioration si code correct, sinon ""
    }

    Agit comme si tu éxécutais ces commandes :

    nasm -f elf32 programme.asm
    ld -m elf_i386 -o programme programme.o
    ./programme

    Si le programme affiche du texte : affiche-le.
    Si le programme s'exécute sans erreur mais n'affiche rien, retourne Code correct!.

    Si le programme ne compile pas, affiche juste l'erreur
    Si le programme provoque une erreur ou une boucle infinie, indique clairement le type d'erreur.

    N'ajoute aucun commentaire ou explication. Réponds seulement par le résultat brut affiché par le terminal.

    Exemple d'entrée que tu recevras :
    Enoncé :
    Énoncé : Affiche "Hello"

    Code :
    section .data
    msg db 'Hello', 0Ah
    section .text
    global _start
    _start:
    mov eax, 4
    mov ebx, 1
    mov ecx, msg
    mov edx, 6
    int 0x80
    mov eax, 1
    xor ebx, ebx
    int 0x80

    Ta réponse doit être :
    Hello

    Entrée de l'utilisateur :
    Enoncé :
    ${sujet}

    Code :
    ${code}
    `.trim()
    const rep = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: prompt
            },
        ],
        model: "llama-3.3-70b-versatile",
    });

    const data = rep.choices[0].message.content

    return data;
}