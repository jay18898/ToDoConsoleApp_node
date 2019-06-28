const sql = require('mssql')
const config = require('./config')

crud.insertTODO =  async function (task_name,userDate,userDesc) {
    try {
       let pool =  await sql.connect(config)
       let result1 =  await pool.request().query(`INSERT INTO db_todo (task_name,date, description,status) VALUES ('${task_name}','${userDate}','${userDesc}','Pending')`)
       console.dir(result1)
       sql.close()
   
   } catch (err) {
       console.log(err)
   }
}

crud.updateTODO =  async function (id) {

   try {
       let pool =  await sql.connect(config)
       let result1 =  await pool.request().query(`UPDATE db_todo
       SET status = 'Completed'
       WHERE id = ${id}`)
       console.dir(result1)
       sql.close()
   
   } catch (err) {
       console.log(err)
   }
}


crud.selectTODO = async ()=>{
   try{
       let pool =  await sql.connect(config)
       let result1 =  await pool.request().query('select * from db_todo')
       sql.close()
       console.dir(result1)
   }
   catch(err)
   {
       console.log(err)
   }
}

crud.deleteTODO =  async function (id) {

   try {
       let pool =  await sql.connect(config)
       let result1 =  await pool.request().query(`DELETE FROM db_todo WHERE id=${id};`)
       console.dir(result1)
       sql.close()
   
   } catch (err) {
       console.log(err)
   }
}