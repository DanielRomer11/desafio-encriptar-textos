document.addEventListener('DOMContentLoaded', () => {
    const botonEncriptar = document.querySelector('.encriptar');
    const botonDesencriptar = document.querySelector('.desencriptar');
    const botonCopiar = document.getElementById('copiar');
    const textareaEncriptado = document.getElementById('texto__encriptado');
    const textareaEncriptar = document.getElementById('texto__encriptar');
    const mensajeEncriptado = document.querySelector('.presentacion__mensaje_encriptado');
    const imagen = document.querySelector('.presentacion__mensaje_encriptado__imagen');
    const texto = document.querySelector('.presentacion__mensaje_encriptado__texto');

    function validarTexto(texto) {
        return /^[a-z\s]*$/.test(texto);
    }

    function actualizarVisibilidad() {
        const isTextoVisible = textareaEncriptado.value.trim() !== "";
        mensajeEncriptado.style.display = isTextoVisible ? 'flex' : 'none';
        textareaEncriptado.style.display = isTextoVisible ? 'block' : 'none';
        botonCopiar.style.display = isTextoVisible ? 'block' : 'none';
        imagen.style.display = isTextoVisible ? 'none' : 'block';
        texto.style.display = isTextoVisible ? 'none' : 'block';
    }

    function mostrarBotonCopiar() {
        botonCopiar.style.display = 'block'; 
        botonCopiar.disabled = false; 
    }

    function ocultarBotonCopiar() {
        botonCopiar.style.display = 'none'; 
        botonCopiar.disabled = true; 
    }

    function mostrarMensajeError(mostrar) {
        if (mostrar) {
            textareaEncriptado.placeholder = 'Solo puedes ingresar letras minúsculas sin acentos ni caracteres especiales.';
            textareaEncriptado.style.borderColor = 'red'; // 
        } else {
            textareaEncriptado.placeholder = 'El texto aparecerá aquí...';
            textareaEncriptado.style.borderColor = ''; 
        }
    }

    function procesarTexto() {
        const textoOriginal = textareaEncriptar.value;
        if (!validarTexto(textoOriginal)) {
            mostrarMensajeError(true);
            textareaEncriptado.value = '';
            ocultarBotonCopiar();
            return false;
        } else {
            mostrarMensajeError(false);
            return true;
        }
    }

    botonEncriptar.addEventListener('click', () => {
        if (procesarTexto()) {
            textareaEncriptado.value = encriptarTexto(textareaEncriptar.value);
            actualizarVisibilidad();
            mostrarBotonCopiar();
        }
    });

    botonDesencriptar.addEventListener('click', () => {
        if (procesarTexto()) {
            textareaEncriptado.value = desencriptarTexto(textareaEncriptado.value);
            actualizarVisibilidad();
            mostrarBotonCopiar();
        }
    });

    textareaEncriptado.addEventListener('input', () => {
        if (validarTexto(textareaEncriptado.value)) {
            mostrarMensajeError(false);
        } else {
            mostrarMensajeError(true);
        }
    });

    botonCopiar.addEventListener('click', copiarAlPortapapeles);

    function encriptarTexto(texto) {
        const sustituciones = [
            ["e", "enter"],
            ["i", "imes"],
            ["a", "ai"],
            ["o", "ober"],
            ["u", "ufat"]
        ];
        return sustituciones.reduce((acc, [letra, codigo]) =>
            acc.replaceAll(letra, codigo), texto);
    }

    function desencriptarTexto(texto) {
        const sustituciones = [
            ["enter", "e"],
            ["imes", "i"],
            ["ai", "a"],
            ["ober", "o"],
            ["ufat", "u"]
        ];
        return sustituciones.reduce((acc, [codigo, letra]) =>
            acc.replaceAll(codigo, letra), texto);
    }

    function copiarAlPortapapeles() {
        navigator.clipboard.writeText(textareaEncriptado.value).then(() => {
        });
    }
});
