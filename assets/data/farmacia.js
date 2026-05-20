const productosFarmacia = [
    {
        id: 1,
        nombre: "Vitamina C 1000mg",
        precio: "S/ 25.00",
        descripcion: "Refuerzo inmunológico de alta potencia. Ayuda a prevenir resfriados y fortalece las defensas naturales del organismo.",
        categoria: "Vitaminas",
        icono: "fa-capsules",
        imagen: "",
        detalles: "Frasco con 60 tabletas efervescentes. Dosis diaria recomendada: 1 tableta. Sabor naranja natural.",
        caracteristicas: ["Alta absorción", "Sabor natural", "Sin gluten", "Apto veganos"]
    },
    {
        id: 2,
        nombre: "Paracetamol 500mg",
        precio: "S/ 12.50",
        descripcion: "Analgésico y antipirético eficaz para el alivio del dolor leve a moderado y reducción de fiebre.",
        categoria: "Medicamentos",
        icono: "fa-pills",
        imagen: "",
        detalles: "Caja con 20 comprimidos. Dosis: 1-2 comprimidos cada 6-8 horas. No exceder 8 comprimidos al día.",
        caracteristicas: ["Rápida acción", "Alivio efectivo"]
    },
    // ... (continuar hasta 30 productos)
    {
        id: 30,
        nombre: "Termómetro Digital",
        precio: "S/ 45.00",
        descripcion: "Termómetro digital de lectura rápida y precisa. Pantalla LCD grande y fácil de leer.",
        categoria: "Equipos Médicos",
        icono: "fa-thermometer",
        imagen: "",
        detalles: "Lectura en 10 segundos. Memoria de última lectura. Incluye estuche protector y pilas.",
        caracteristicas: ["Lectura rápida", "Precisión ±0.1°C", "Alarma de fiebre", "Apagado automático"]
    }
];

// Extender a 30 productos con datos variados
const productosExtraFarmacia = [
    { id: 3, nombre: "Ibuprofeno 400mg", precio: "S/ 15.00", descripcion: "Antiinflamatorio no esteroideo para alivio del dolor e inflamación.", categoria: "Medicamentos", icono: "fa-pills", caracteristicas: ["Antiinflamatorio", "Alivio duradero"] },
    { id: 4, nombre: "Omeprazol 20mg", precio: "S/ 18.00", descripcion: "Protector gástrico para tratar acidez y reflujo.", categoria: "Medicamentos", icono: "fa-capsules", caracteristicas: ["Protección gástrica", "24h de alivio"] },
    { id: 5, nombre: "Loratadina 10mg", precio: "S/ 22.00", descripcion: "Antihistamínico no sedante para alergias estacionales.", categoria: "Antialérgicos", icono: "fa-tablets", caracteristicas: ["No produce sueño", "24h de efecto"] },
    { id: 6, nombre: "Alcohol en Gel 70%", precio: "S/ 8.00", descripcion: "Desinfectante de manos con alcohol al 70%. Elimina el 99.9% de gérmenes.", categoria: "Desinfectantes", icono: "fa-pump-soap", caracteristicas: ["99.9% efectividad", "Con glicerina"] },
    { id: 7, nombre: "Mascarillas KN95", precio: "S/ 35.00", descripcion: "Paquete de 10 mascarillas de alta filtración.", categoria: "Protección", icono: "fa-head-side-mask", caracteristicas: ["Filtración 95%", "Ajuste cómodo"] },
    { id: 8, nombre: "Jarabe para Tos", precio: "S/ 14.00", descripcion: "Jarabe expectorante sabor miel y limón.", categoria: "Medicamentos", icono: "fa-bottle-droplet", caracteristicas: ["Natural", "Sabor agradable"] },
    { id: 9, nombre: "Vendas Elásticas", precio: "S/ 10.00", descripcion: "Vendas de compresión para lesiones deportivas.", categoria: "Primeros Auxilios", icono: "fa-bandage", caracteristicas: ["Elástica", "10cm x 4m"] },
    { id: 10, nombre: "Suero Oral", precio: "S/ 6.50", descripcion: "Sobres de rehidratación oral para prevenir deshidratación.", categoria: "Hidratación", icono: "fa-glass-water", caracteristicas: ["Sabor natural", "3 sobres"] },
    { id: 11, nombre: "Curitas Pack 40u", precio: "S/ 7.00", descripcion: "Curitas adhesivas hipoalergénicas.", categoria: "Primeros Auxilios", icono: "fa-bandage", caracteristicas: ["Hipoalergénicas", "Variedad de tamaños"] },
    { id: 12, nombre: "Complejo B", precio: "S/ 28.00", descripcion: "Suplemento de vitaminas del complejo B para energía.", categoria: "Vitaminas", icono: "fa-capsules", caracteristicas: ["Energía natural", "60 tabletas"] },
    { id: 13, nombre: "Agua Oxigenada", precio: "S/ 5.50", descripcion: "Antiséptico para limpieza de heridas superficiales.", categoria: "Desinfectantes", icono: "fa-flask", caracteristicas: ["120ml", "Uso tópico"] },
    { id: 14, nombre: "Guantes de Látex", precio: "S/ 18.00", descripcion: "Caja de 50 guantes descartables.", categoria: "Protección", icono: "fa-gloves", caracteristicas: ["Talla M", "Sin polvo"] },
    { id: 15, nombre: "Colágeno Hidrolizado", precio: "S/ 55.00", descripcion: "Suplemento para articulaciones y piel.", categoria: "Suplementos", icono: "fa-jar", caracteristicas: ["Tipo I y III", "300g"] },
    { id: 16, nombre: "Protector Solar FPS 50", precio: "S/ 38.00", descripcion: "Protección solar facial de amplio espectro.", categoria: "Cuidado Personal", icono: "fa-sun", caracteristicas: ["No graso", "Resistente al agua"] },
    { id: 17, nombre: "Jeringas 5ml", precio: "S/ 12.00", descripcion: "Paquete de 10 jeringas estériles.", categoria: "Equipos Médicos", icono: "fa-syringe", caracteristicas: ["Estériles", "Desechables"] },
    { id: 18, nombre: "Agua Micelar", precio: "S/ 29.00", descripcion: "Limpiador facial suave para todo tipo de piel.", categoria: "Cuidado Personal", icono: "fa-droplet", caracteristicas: ["Sin alcohol", "200ml"] },
    { id: 19, nombre: "Tijeras Quirúrgicas", precio: "S/ 20.00", descripcion: "Tijeras de acero inoxidable para uso médico.", categoria: "Equipos Médicos", icono: "fa-scissors", caracteristicas: ["Acero inoxidable", "Esterilizables"] },
    { id: 20, nombre: "Bálsamo Labial", precio: "S/ 9.00", descripcion: "Hidratante labial con vitamina E y aloe vera.", categoria: "Cuidado Personal", icono: "fa-lips", caracteristicas: ["SPF 15", "Hidratación 12h"] },
    { id: 21, nombre: "Aspirina 100mg", precio: "S/ 16.00", descripcion: "Antiagregante plaquetario para prevención cardiovascular.", categoria: "Medicamentos", icono: "fa-tablets", caracteristicas: ["Dosis baja", "30 comprimidos"] },
    { id: 22, nombre: "Algodón Hidrófilo", precio: "S/ 6.00", descripcion: "Rollo de algodón 100% puro para uso médico.", categoria: "Primeros Auxilios", icono: "fa-cloud", caracteristicas: ["100% algodón", "500g"] },
    { id: 23, nombre: "Sábila Gel", precio: "S/ 14.00", descripcion: "Gel de aloe vera puro para quemaduras e irritaciones.", categoria: "Cuidado Personal", icono: "fa-leaf", caracteristicas: ["99% aloe vera", "200ml"] },
    { id: 24, nombre: "Tensiómetro Digital", precio: "S/ 89.00", descripcion: "Monitor de presión arterial automático de brazo.", categoria: "Equipos Médicos", icono: "fa-heart-pulse", caracteristicas: ["Pantalla grande", "Memoria 60 lecturas"] },
    { id: 25, nombre: "Gasas Estériles", precio: "S/ 8.00", descripcion: "Paquete de 20 gasas quirúrgicas estériles.", categoria: "Primeros Auxilios", icono: "fa-square", caracteristicas: ["10x10cm", "Estériles"] },
    { id: 26, nombre: "Vitamina D3 2000UI", precio: "S/ 32.00", descripcion: "Suplemento para salud ósea y sistema inmune.", categoria: "Vitaminas", icono: "fa-sun", caracteristicas: ["Alta potencia", "90 cápsulas"] },
    { id: 27, nombre: "Antigripal Forte", precio: "S/ 19.00", descripcion: "Medicamento combinado para síntomas de gripe.", categoria: "Medicamentos", icono: "fa-pills", caracteristicas: ["Día y noche", "12 comprimidos"] },
    { id: 28, nombre: "Talco Medicado", precio: "S/ 11.00", descripcion: "Talco antiséptico para pies y cuerpo.", categoria: "Cuidado Personal", icono: "fa-jar", caracteristicas: ["Antiséptico", "150g"] },
    { id: 29, nombre: "Oxímetro de Pulso", precio: "S/ 65.00", descripcion: "Medidor de saturación de oxígeno y pulso.", categoria: "Equipos Médicos", icono: "fa-fingerprint", caracteristicas: ["Lectura rápida", "Pantalla OLED"] },
];

// Combinar arrays
productosFarmacia.push(...productosExtraFarmacia);