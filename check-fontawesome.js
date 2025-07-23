/**
 * Script para verificar si Font Awesome se está cargando correctamente
 */

document.addEventListener('DOMContentLoaded', function() {
    // Crear un elemento para mostrar el estado
    const statusDiv = document.createElement('div');
    statusDiv.style.position = 'fixed';
    statusDiv.style.top = '10px';
    statusDiv.style.left = '10px';
    statusDiv.style.padding = '10px';
    statusDiv.style.background = 'rgba(0,0,0,0.7)';
    statusDiv.style.color = 'white';
    statusDiv.style.zIndex = '9999';
    statusDiv.style.borderRadius = '5px';
    statusDiv.style.fontSize = '14px';
    document.body.appendChild(statusDiv);
    
    // Verificar si Font Awesome está cargado
    const fontAwesomeLoaded = document.querySelector('link[href*="font-awesome"]');
    
    if (fontAwesomeLoaded) {
        statusDiv.innerHTML += '<p>✅ Font Awesome CSS está enlazado</p>';
    } else {
        statusDiv.innerHTML += '<p>❌ Font Awesome CSS NO está enlazado</p>';
    }
    
    // Verificar si los webfonts están cargados
    const fontFaceSet = document.fonts;
    
    if (fontFaceSet && fontFaceSet.check) {
        // Verificar si la fuente 'Font Awesome 6 Brands' está cargada
        const isBrandsLoaded = fontFaceSet.check('1em "Font Awesome 6 Brands"');
        statusDiv.innerHTML += '<p>' + (isBrandsLoaded ? '✅' : '❌') + ' Font Awesome 6 Brands ' + (isBrandsLoaded ? 'está cargada' : 'NO está cargada') + '</p>';
        
        // Verificar si la fuente 'Font Awesome 6 Free' está cargada
        const isFreeLoaded = fontFaceSet.check('1em "Font Awesome 6 Free"');
        statusDiv.innerHTML += '<p>' + (isFreeLoaded ? '✅' : '❌') + ' Font Awesome 6 Free ' + (isFreeLoaded ? 'está cargada' : 'NO está cargada') + '</p>';
    } else {
        statusDiv.innerHTML += '<p>⚠️ No se puede verificar el estado de las fuentes</p>';
    }
    
    // Verificar si los iconos se renderizan correctamente
    const testIcon = document.createElement('i');
    testIcon.className = 'fab fa-whatsapp';
    document.body.appendChild(testIcon);
    
    setTimeout(function() {
        const computedStyle = window.getComputedStyle(testIcon, ':before');
        const content = computedStyle.getPropertyValue('content');
        
        if (content && content !== 'none' && content !== '""') {
            statusDiv.innerHTML += '<p>✅ Los iconos se renderizan correctamente</p>';
        } else {
            statusDiv.innerHTML += '<p>❌ Los iconos NO se renderizan correctamente</p>';
        }
        
        // Eliminar el icono de prueba
        document.body.removeChild(testIcon);
    }, 500);
});