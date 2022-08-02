let arr = [
    "name",
    "price",
    "stock",
    "description",
    "image",
    "almacenamiento",
    "ram",
    "marca",
    "modelo",
    "bateria",
    "frecuencia",
    "resolucion",
    "duracion_bateria",
    "potencia",
    "litros",
    "RPM",
    "capacidad_de_lavado",
    "tipo"
]

let obj ={
    "procesador": {
      "marca": "Kirin",
      "linea": "980",
      "nucleos": 8,
      "velocidad": "2.6GHz"
    },
    "_id": "62cec7a23c5ed2ec3330d310",
    "id": "7",
    "name": "Huawei N-47 128GB 6GB RAM",
    "seller": "Bill",
    "price": 87,
    "stock": 20,
    "sales": 20,
    "category": "celulares",
    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, consequatur sit in modi rerum ipsa ipsam illum earum similique neque quasi, accusantium est maiores officiis reiciendis ut aliquid vel molestiae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, consequatur sit in modi rerum ipsa ipsam illum earum similique neque quasi, accusantium est maiores officiis reiciendis ut aliquid vel molestiae.",
    "image": "https://http2.mlstatic.com/D_NQ_NP_685518-MCO43442275759_092020-V.jpg",
    "marca": "Huawei",
    "almacenamiento": "128",
    "ram": 6,
    "bateria": 5000,
    "modelo": "N-47"
  }

let nuevo = []
  for (const key in obj) {
    if (arr.includes(key)) {
        nuevo.push(key)
    }
  }

nuevo.map(n => {
    if (n === "procesador") {
        <h3>procesador</h3>
        return(
            <h1>{n.marca}</h1>
        )
    }
    return(
        <h3>{n}: {obj[n]}</h3>
    )
})