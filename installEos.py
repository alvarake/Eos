import os

print("Activando el CLI de webOS")
os.system("source ~/.profile")
print("Borrando paquetes anteriores")
os.system("rm -rf eos_0.0.1_all.ipk dist/")
print("Haciendo Paquete Enact")
os.system("enact pack")
print("Copiando archivos de configuración")
os.system("cp config/* dist/")
print("Empaquetando para la Raspberry")
os.system("ares-package dist")
print("Instalando Eos en la Raspberry")
os.system("ares-install --device RaspAlvarake eos_0.0.1_all.ipk")
print("Abriendo Depurador")
os.system("ares-inspect --device RaspAlvarake --app eos --open")


