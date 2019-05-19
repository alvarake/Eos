import os

print("###################################################")

print("Borrando paquetes anteriores")
print("Ejecutando: 'cd app; npm run clean'")
os.system("cd app; npm run clean")

print("###################################################")

print("Haciendo Paquete Enact")
print("Ejecutando: 'cd app; enact pack'")
os.system("cd app; enact pack")

print("###################################################")
try:
    
    print("Empaquetando para la Raspberry")
    print("Ejecutando: 'ares-package app/dist service'")
    os.system("ares-package app/dist service")

    print("###################################################")

    print("Instalando Eos en la Raspberry")
    print("Ejecutando: 'ares-install --device RaspAlvarake eos_0.0.1_all.ipk'")
    os.system("ares-install --device RaspAlvarake eos_0.0.1_all.ipk")

    print("###################################################")

    print("Abriendo Depurador")
    print("Ejecutando: 'ares-inspect --device RaspAlvarake --app eos --open'")
    os.system("ares-inspect --device RaspAlvarake --app eos --open")

except:
    print("Ha habido un fallo con los comandos 'ares'")
    print("Intenta ejecutar desde ~ 'source .profile' y prueba otra vez")


