var readline = require('./read.js')
var crud  = require('../server.js')
// var selectTODO  = require('../server.js')


var userChoice;

var TODO = function(ans){
    console.log('-------Console Based Todo Application---------')
console.log('1.Enter Todo task\n2.View Todo Task\n3.Delete todo task\n4.Change Status\n5.Exit');
    readline.question(`Please Enter your Choice: `, (choice) => {
        userChoice = choice;
      
        ch()
       })

     
        var ch = function(){
   
    if(userChoice==1)
    {
        var userTask='',userDate='',userDesc='';
        console.log('you selected:'+userChoice)
          
            readline.question(`Task Name:`, (task) => {
            userTask = task;
            console.log(userTask)
            readline.question(`Description: `, (desc) => {
                userDesc = desc;
                readline.question(`Date(YYYY-MM-DD): `, (date) => {
                    userDate = date;
                   
                  crud.insertTODO(userTask,userDate,userDesc).then((result)=>{
                    console.log("successfully submited todo task")
                    readline.question(`Do You Want To Continue.! (Y|N)`, (ans) => {
                        if(ans=='Y'|| ans=='y'){TODO(ans)
                        }
                          else
                          {
                            console.log('Good Bye')
                            process.exit()
                          }
                        
                    })
                        
                    }).catch(err => {  console.log(err)})
                
                    })
                    })
                })
              
         
          

    }
    else if(userChoice==2)
    {
        crud.selectTODO().then((result)=>{
       
          var resArray = result  
          
          console.log("==================select todo==================");    
         

          console.log("=================================================");
          console.log("ID"+ " | "+"          TASKS         "+" | "+"Date"+" | "+"DESCRIPTION"+" | "+"STATUS");
          console.log("=================================================");
          resArray.map((value,key)=>{
            console.log(value.id+" | "+value.task_name+" | "+convert(value.date)+" | "+value.description+" | "+value.status);
            console.log("----------------------------------------------------");
          })


            readline.question(`Do You Want To Continue.!  (Y|N)`, (ans) => {
                if(ans=='Y'|| ans=='y'){TODO(ans)
                }
                else
                {
                  console.log('Good Bye')
                  process.exit()
                }
            })
                
            }).catch(err => {  console.log(err)})
        
    }
    else if(userChoice==3)
    {
        readline.question(`Enter TODO ID number`, (id) => {
             
            crud.deleteTODO(id).then((result)=>{
                    readline.question(`Do You Want To Continue.! (Y|N)`, (ans) => {
                    if(ans=='Y'|| ans=='y'){TODO(ans)
                    }
                    else
                          {
                            console.log('Good Bye')
                            process.exit()
                          }
                })
                    
                }).catch(err => {  console.log(err)})
        })
    }
    else if(userChoice==4)
    {
        readline.question(`Enter TODO ID number`, (id) => {
             
            crud.updateTODO(id).then((result)=>{
                    readline.question(`Do You Want To Continue.! (Y|N)`, (ans) => {
                    if(ans=='Y'|| ans=='y'){TODO(ans)
                    }
                    else
                    {
                      console.log('Good Bye')
                      process.exit()
                    }
                })
                    
                }).catch(err => {  console.log(err)})
        })
    }
    else if(userChoice ==5)
    {
        console.log('Good Bye..!')
        readline.close()
        process.exit()
    }
    else
    {
        console.log('Wrong input.!')
        
        readline.question(`Do You Want To Continue.! (Y|N)`, (ans) => {
            if(ans=='Y' || ans=='y'){TODO(ans)
            }
            else
            {
              console.log('Good Bye')
              process.exit()
            }
    })
}
    
}

}
   
TODO()

function convert(str) {
  var date = new Date(str),
      mnth = ("0" + (date.getMonth()+1)).slice(-2),
      day  = ("0" + date.getDate()).slice(-2);
  return [ day, mnth, date.getFullYear() ].join("-");
}
  