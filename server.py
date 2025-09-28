from livereload import Server, shell

# Crea servidor y observa index.html
server = Server()
server.watch('index.html')
server.watch('servicios.html')
server.watch('equipo.html')
server.watch('sobre.html')
server.watch('styles.css')
server.watch('contacto.html')
server.watch('javascript.js')
#server.watch('*.js')

# Sirve en el puerto 5500
server.serve(root='.', port=8000)

