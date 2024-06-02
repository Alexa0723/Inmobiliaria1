document.addEventListener('DOMContentLoaded', function() {
    const registrarPropiedadForm = document.getElementById('registrarPropiedadForm');
    const transaccionForm = document.getElementById('transaccionForm');
    const generarReporteButton = document.getElementById('generarReporte');
    const reporteResultado = document.getElementById('reporteResultado');

    let propiedades = [];
    let transacciones = [];

    registrarPropiedadForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const tipoPropiedad = event.target.tipoPropiedad.value;
        const ubicacion = event.target.ubicacion.value;
        const precio = parseFloat(event.target.precio.value);
        const propiedadID = 'P' + (propiedades.length + 1);
        
        const nuevaPropiedad = {
            propiedadID,
            tipoPropiedad,
            ubicacion,
            precio
        };
        
        propiedades.push(nuevaPropiedad);
        alert('Propiedad registrada con ID: ' + propiedadID);
        registrarPropiedadForm.reset();
    });

    transaccionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const propiedadID = event.target.propiedadID.value;
        const tipoTransaccion = event.target.tipoTransaccion.value;
        const famoso = event.target.famoso.value;
        const fecha = new Date().toLocaleDateString();

        const propiedad = propiedades.find(p => p.propiedadID === propiedadID);

        if (!propiedad) {
            alert('Propiedad no encontrada');
            return;
        }

        const transaccion = {
            propiedadID,
            tipoTransaccion,
            famoso,
            fecha,
            precio: propiedad.precio
        };

        transacciones.push(transaccion);
        
        alert('Transacción realizada');
        transaccionForm.reset();
    });

    generarReporteButton.addEventListener('click', function() {
        let reporteHTML = '<h3>Reporte de Transacciones</h3>';
        reporteHTML += '<ul>';

        transacciones.forEach(transaccion => {
            reporteHTML += `<li>${transaccion.tipoTransaccion} de la propiedad ${transaccion.propiedadID} por ${transaccion.famoso} el ${transaccion.fecha} por un valor de ${transaccion.precio}</li>`;
        });

        reporteHTML += '</ul>';
        reporteResultado.innerHTML = reporteHTML;
    });
});
