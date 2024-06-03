document.addEventListener("DOMContentLoaded", function() {
    // Hacer una solicitud HTTP GET para obtener el archivo JSON
    fetch('http://localhost:5000/history_tweets.json')
        .then(response => response.json())  // Convertir la respuesta a JSON
        .then(data => {
            // Obtener la lista en la que se mostrarán los datos
            const listaSentimientos = document.getElementById('lista-sentimientos');

            // Iterar sobre los datos obtenidos y crear elementos <div> para cada uno
            data.forEach(entry => {
                const listItem = document.createElement('div');
                listItem.textContent = entry.tweet;  // Suponiendo que 'tweet' es la clave para el texto del tweet

                // Determinar la imagen PNG basada en el valor de sentimiento
                const imagen = entry.sentiment === 0 ? 'angry_face.png' : 'happy_face.png';
                const imgElement = document.createElement('img');
                imgElement.src = `../img/${imagen}`; // Ruta a las imágenes
                imgElement.alt = entry.sentiment === 0 ? 'Cara enojada' : 'Cara feliz';
                imgElement.style.width = '100px'; // Establecer el ancho de la imagen
                imgElement.style.height = '100px'; // Establecer la altura de la imagen

                listItem.appendChild(imgElement); // Agregar la imagen al elemento <div>
                listaSentimientos.appendChild(listItem);  // Agregar el elemento <div> a la lista
            });
        })
        .catch(error => console.error('Error al obtener los datos:', error));
});
