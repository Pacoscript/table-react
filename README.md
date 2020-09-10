This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Para arrancar la APP

* clonar repositorio
* entrar en la carpeta table-react
* yarn install para instalar dependencias
* yarn start para arrancar el proyecto


### Funcionalidad tabla

* La tabla muestra una serie de filas correspondientes a un archivo JSON que el componente recibe como fuente de datos
* Está pensada para que funcione con json de gran tamaño. No renderiza todos los elementos, sólo los veinte primeros y si hacemos scroll hasta la parte baja de la barra renderiza otros 20 añadiéndolos a los existentes
* Se puede elegir el lenguaje, se ha hecho un proveedor de traducciones básico que sirva para toda la APP. Si fuera una SPA con varias páginas usará los mismos recursos para hacer las traducciones en todas las páginas. Por eso la funcionalidad del mismo se encuentra en App.js.
* En el caso de la grabación muestra un icono en lugar de un texto dependiendo de si su valor es true o false
* La tabla se puede ordenar por cualquier columna pulsando sobre el header de la columna. Si se vuelve a pulsar ordena en sentido inverso
* Se pueden agrupar los elementos por árbol de primer nivel. La tabla aparece ordenada y se puede ver los elementos pulsando en el icono "+" si se quieren replegar volveríamos  a pulsar "+".

### Arreglos pendientes
* Cabeceras: debería quedarse fijada cuando hacemos scroll, habría que configurar las propiedades position correctamente.
* Botones e iconos dinámicos que cambien cuando ordenamos columnas o agrupamos o desagrupamos.
* Mostrar agrupados no funciona correctamente. Es inestable por algún error de base que queda pendiente de depurar.
* Hacer que la tabla sea más responsive de lo que es actualmente, por ejemplo haciendo que las celdas que tienen mucha información no la dibujen completa y al poner el ratón sobre la celda muestre un tooltip con toda la información. por ejemplo para la celda "Texto". Media Querys.