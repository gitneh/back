(async () => {
    console.log("IIFE")
    const admin = require("firebase-admin") 
    const { getFirestore } = require("firebase-admin/firestore") 
  
    const serviceAccount = require("../sdk.json")
  
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://segundoProyecto.firebaseio.com"
    })
  
    const db = getFirestore()
  
    console.log("CONECTADO")
  
    const query = db.collection("productos")
    const data = await query.get()
    let docs = data.docs
  
    let id = 0
    for (let d of docs) {
      console.log(d.data(), d.id)
      id = d.id 
    }
  
    id++
    console.log(id)
  
    const doc = query.doc("1") 
    await doc.create({ release: 2010, name: "Play" }) 
    await doc.update({ release: 2020 })
  
    await doc.delete() 
  
  
    console.log("TERMINADO")
  
  })()