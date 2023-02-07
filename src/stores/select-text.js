function obtener_textarea() {
    return document.getElementById("texto_html")
}

function obtener_área_resultado() {
    return document.getElementById("resultado")
}

function procesar_selección(texto, inicio_selección, fin_selección) {
    var fin_texto = texto.length
    var inicio = texto.slice(0, inicio_selección)
    var centro = texto.slice(inicio_selección, fin_selección)
    var fin = texto.slice(fin_selección, fin_texto)
    centro = "<b><big>" + centro + "</big></b>"
    return inicio + centro + fin
}

function procesar_selección_html() {
    var área_texto = obtener_textarea()
    var texto = área_texto.value
    var inicio = área_texto.selectionStart
    var fin = área_texto.selectionEnd
    obtener_área_resultado().innerHTML = procesar_selección(texto, inicio, fin)
}

function agregar_eventos(elemento_html) {
    var eventos = ["keyup", "keydown", "mousedown", "mouseup", "mousemove"]
    for (var i in eventos) {
        elemento_html.addEventListener(eventos[i], procesar_selección_html)
    }
}
agregar_eventos(obtener_textarea())
//
//
//
//
var textarea = document.getElementById("texto_html");
var eventos = ["keyup", "keydown", "mousedown", "mouseup", "mousemove"]
for (var i in eventos) {
    elemento_html.addEventListener(eventos[i], () => {
        var texto = textarea.value
        var inicio = textarea.selectionStart
        var fin = textarea.selectionEnd
        var fin_texto = texto.length
       
        var inicio = texto.slice(0, inicio)
       
        var centro = texto.slice(inicio, fin)
       
        var fin = texto.slice(fin_selección, fin_texto)
        // centro = "<b><big>" + centro + "</big></b>"
        console.log(inicio + centro + fin);
    });
}