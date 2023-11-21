//Lidar com a visualização de um livro específico
document.addEventListener('DOMContentLoaded', function () {
    const verMaisButtons = document.querySelectorAll('.verMaisLivro');

    verMaisButtons.forEach(a => {
        a.addEventListener('click', function () {
            const bookId = a.getAttribute('data-book-id');
            window.location.href = `/books/detalhesLivro/${bookId}`;
        });
    });
});


//Lidar com o registo de utilzador
document.addEventListener('DOMContentLoaded', async function (event) {

    const registrationForm = document.getElementById("registrationForm");

    if (registrationForm) {
        registrationForm.addEventListener("submit", async function (event) {

            event.preventDefault();
            const submitButton = document.getElementById("submitButton");
            const formData = new FormData(event.target);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            try {
                const response = await fetch("/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    // Se a resposta for bem-sucedida, redireciona para /books
                    const result = await response.json();
                    console.log(result.message);
                    setTimeout(() => {
                        window.location.href = "/books";
                    }, 1000);
                } else {
                    // Se o status for 400 (Bad Request), assume que a mensagem de erro é uma string
                    const errorMessage = await response.json();
                    console.error(errorMessage.error);
                    const messageContainer = document.getElementById("messageContainer");
                    messageContainer.innerText = errorMessage.error;
                }
            } catch (error) {
                console.error("Erro ao processar a solicitação:", error);
            }
        })
    }
});