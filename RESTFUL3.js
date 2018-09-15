var sqlite3=require('sqlite3').verbose();
var db=new sqlite3.Database('./testdb.db',(err)=>{if(err)throw err;console.log('connected');})
var sqlq='';
var newfirstname='';
var newlastname='';
var targetid='';
var jsontoreturn='';
var express=require('express');
var app=express();
// /id/display/info   , /id/newfirstname/newname , /id/newlastname/newname , /id/delete/info
app.get('/:id/:action/:optional',(req,res)=>{
		targetid=req.params.id;





		//for adding user

			if(String(req.params.id)=="adduser"){
			newfirstname=req.params.action;
			newlastname=req.params.optional;
			sqlq="INSERT INTO userinfo(firstname,lastname) VALUES(? ,?)";
			db.run(sqlq,[newfirstname,newlastname],function(err){if(err)throw err;jsontoreturn={'newuseradded':'ok'};});
			res.json({'user':'aded'});
		}
			





	switch(String(req.params.action)){
			case "newfirstname":
			newfirstname=req.params.optional;
			sqlq="UPDATE userinfo set firstname=? WHERE _id=?";
			db.run(sqlq,[newfirstname,targetid],function(err){ if(err)throw err; jsontoreturn={'firstnameudpated':'ok'};res.json(jsontoreturn);});

			break;

			case "newlastname":
			newlastname=req.params.optional;
			sqlq="UPDATE userinfo set lastname=? WHERE _id=?";
			db.run(sqlq,[newlastname,targetid],function(err){ if(err)throw err; jsontoreturn={'lastnameudpated':'ok'};res.json(jsontoreturn);});
			break;





			case "display":
			console.log('display visited');
			sqlq="SELECT firstname,lastname from userinfo WHERE _id=?";
			console.log("target id is "+targetid);
			db.get(sqlq,targetid,(err,row)=>{ if(err)throw err;
			console.log(row.firstname +row.lastname);
			var objInfo={firstname:row.firstname,lastname:row.lastname};
			res.json(objInfo);

			});//end of each




	}//check what link is visited to for query


});//ends all checking for info display



app.listen(8081);