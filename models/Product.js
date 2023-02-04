const mongoose = require ('mongoose')


const ProductsSchema = new mongoose.Schema(
    {
    title: { type: String, required: true , unique:true},
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array},
    size: { type: String},
    color: { type: String},
    price: { type: Number, required: true },   
},
{timestamps: true}
)

module.exports = mongoose.model('Products', ProductsSchema)


//Codigo para pruebas copiar y pegar en insomnia o postman
// {	
//     "title":"prod1" ,
//     "desc": "notiene",
//     "img":"nohay" ,
//     "categories":["remera","nada"],
//     "size":"32" ,
//     "color": "rojo",
//     "price": "5000"
// }