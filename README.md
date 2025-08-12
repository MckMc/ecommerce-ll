Instalar MongoDB Community Server.

Asegurarse de que el servicio está corriendo:

Windows: services.msc → MongoDB Server → Start.

macOS (Homebrew): brew services start mongodb-community@7.0

Linux (apt): sudo systemctl start mongod

Crear un archivo .env en la raíz del proyecto con: MONGO_URL=mongodb://127.0.0.1:27017/ecommerce

Usar 127.0.0.1 (IPv4) evita problemas con ::1
