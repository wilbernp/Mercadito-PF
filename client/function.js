// {
//     "products": 
//          repeat(8, {
//                "id": index(),
//                "name": lastname(),
//                "seller":firstname(),
//             "price":function(){
//                 return Math.floor(Math.random() * (100 - 0) + 0)
//             },
//            "stock": function(){
//             return Math.floor(Math.random() * (100 - 0) + 0)
//         },
//            "sales": function(){
//             return Math.floor(Math.random() * (100 - 0) + 0)
//         },
//            "category":function(){
//              let categ = [
//            {
//                "tecnologia": [
//                    {
//                        "name": "celulares"
//                    },
//                    {
//                        "name": "laptops_y_computadores"
//                    },
//                    {
//                        "name": "consolas_de_videojuegos"
//                    },
//                    {
//                        "name": "audio_y_video"
//                    }
//                ]
//            },
//            {
//                "electrodomesticos": [
//                    {
//                        "name": "refrigeracion"
//                    },
//                    {
//                        "name": "lavado"
//                    },
//                    {
//                        "name": "cocina"
//                    },
//                    {
//                        "name": "limpieza"
//                    }
//                ]
//            },

//            {
//                "moda": [
//                    {
//                        "name": "moda_hombre"
//                    },
//                    {
//                        "name": "moda_mujer"
//                    },
//                    {
//                        "name": "moda_infantil"
//                    }
//                ]
//            }
//        ]
//              let random = categ[Math.floor(Math.random() * (categ.length - 0) + 0)]
//              let random2
//              let keys
//              for (const key in random) {
//                 random2 = random[key][Math.floor(Math.random() * (random[key].length - 0) + 0)];
//                 keys = key
//             }
//              return random2.name
            
//            },
//            "description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, consequatur sit in modi rerum ipsa ipsam illum earum similique neque quasi, accusantium est maiores officiis reiciendis ut aliquid vel molestiae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, consequatur sit in modi rerum ipsa ipsam illum earum similique neque quasi, accusantium est maiores officiis reiciendis ut aliquid vel molestiae."
//          }),
//      "categories":function(){
//        const categories = ["tecnologia", "electrodomesticos", "moda"]
   
//        const tecnologia = ["celulares", "laptops_y_computadores", "consolas_de_videojuegos", "audio_y_video"]
   
//        const electrodomesticos=["refrigeracion", "lavado", "cocina", "limpieza"]
   
//        const moda = ["moda_hombre", "moda_mujer", "moda_infantil"]
   
//        function create (key, value){
//            return{
//                [key]:value.map(v => {
//                    return{
//                        name: v
//                    }
//                })
//            }
//        }
   
//        return categories.map(c => {
//            switch (c) {
//                case "tecnologia":
//                    return create("tecnologia", tecnologia)
       
//                case "electrodomesticos":
//                    return create("electrodomesticos", electrodomesticos)
   
//                case "moda":
//                    return create("moda", moda)
       
//                default:
//                    break;
//            }
//        })
//    }
//    }