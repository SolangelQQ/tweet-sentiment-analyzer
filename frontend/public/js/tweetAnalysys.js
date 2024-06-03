document.getElementById('tweetForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let tweet = document.getElementById('tweet').value;

    let xhr = new XMLHttpRequest();
    let url = 'http://localhost:5000/classify';
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            let resultDiv = document.getElementById('result');

            // Limpiar el contenido anterior del resultDiv
            resultDiv.innerHTML = '';

            // Cambiar el estilo del borde del cuadro de texto y agregar la imagen según el sentimiento
            let tweetInput = document.getElementById('tweet');
            if (response.sentiment === 0) {
                tweetInput.style.boxShadow = '0 0 10px #FA5252';
                resultDiv.innerHTML = '<br><img src="../img/angry_face.png" alt="Angry face" style="width:250px;height:250px;">';
            } else if (response.sentiment === 4) {
                tweetInput.style.boxShadow = '0 0 10px #1fb141';
                resultDiv.innerHTML = '<br><img src="../img/happy_face.png" alt="Happy face" style="width:250px;height:250px;">';
            }
        }
    };

    let data = JSON.stringify({ 'tweet': tweet });
    xhr.send(data);
});
