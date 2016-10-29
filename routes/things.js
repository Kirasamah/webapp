
var fs = require('fs');

exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM things',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('things',{page_title:"MyThings",data:rows});
                
           
         });
         

    });
  
};

exports.add = function(req, res){
  res.render('add_thing',{page_title:"Add Things"});
};

exports.edit = function(req, res){
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM things WHERE id = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_thing',{page_title:"Edit things",data:rows});
                
           
         });
         

    }); 
};


exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            name    : input.name,
            description : input.description,
            latitude   : input.latitude,
            longitude   : input.longitude 
        
        };
        
        var query = connection.query("INSERT INTO things set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/things');
          
        });
        

    
    });
};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            name    : input.name,
            description : input.description,
            latitude   : input.latitude,
            longitude   : input.longitude 
        
        };
        console.log(data);
        connection.query("UPDATE things set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/things');
          
        });
    
    });
};


exports.delete_thing = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM things  WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/things');
             
        });
        
     });
};

exports.map = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    var name;
    var description;
    var latitude;
    var longitude;
    
    req.getConnection(function (err, connection){
        
        connection.query("SELECT name,description,latitude,longitude FROM things WHERE id = ? ",[id], function(err, rows)
        {
            if(err)
                console.log("Error viewing map : %s ",err );
            
            name = rows[0].name;
            description = rows[0].description;
            latitude = rows[0].latitude;
            longitude = rows[0].longitude;
            
            fs.readFile('map.html', 'utf8', function(err, data){
                if (err) throw err;
                data = data.replace("[name]", name);
                data = data.replace("[name]", name);
                data = data.replace("[description]", description);
                data = data.replace("[latitude]", latitude);
                data = data.replace("[latitude]", latitude);
                data = data.replace("[longitude]", longitude);
                data = data.replace("[longitude]", longitude);
                data = data.replace("[latitude]", latitude);
                data = data.replace("[longitude]", longitude);
                res.send(data);
            });
            
        });
    });
};