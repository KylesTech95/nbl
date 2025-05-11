const { writeFileSync,readFileSync, appendFileSync, write } = require('node:fs');
const path = require('path');


// create
//___________________________________________________________________
// create schema 
const createSchema = async (schema_name='',object={}) => {
    let values = Object.values(object);
    //The Mixed type allows us to store any kind of data in a field. This is useful 
    //for situations where the structure of the data may change or is dynamic.
    if(typeof(object) != 'object' || typeof(schema_name) != 'string'){
        console.error({error:'check your datatypes'})
        return false;
    } 
    if(values.find(v=>!/^(\[?(Mixed|String|Number|Date)\]?)?$/g.test(v))){
        console.error({error:'check your object values'})
        return false;
    }
    // continue
    let schema = 'Schema'; // declare the schema's name
        schema_name = schema_name.replace(/_?schema/gi,'') // if schema is alreay included in the name, replace it
        schema_name+=schema //default schema var to the end of string
    
    let comment = `\n// ${schema_name}\n// Create on ${new Date().toISOString()}`
    let message = `const ${schema_name} = new Schema(${JSON.stringify(object)
        .replace(/\"/g,'')
        .replace(/(\{)/,'$1\n')
        .replace(/(\})/,'\n$1')
        .replace(/(\,)/g,'$1\n')})` // construct message to write to file
        // writeFileSync(path.resolve(__dirname,'schema.js'), message, 'utf-8'); // write to schema.js

        message = `${comment}\n${message}` // combine comment and message
        // appendFileSync(path.resolve(__dirname,'schema.js'), message, 'utf-8'); // write to schema.js

        // overwrite new file
        let file = readFileSync(path.resolve(__dirname,'schema.js'),'utf-8')
        let lines = file.split`\n`
        let ending = lines.indexOf(...lines.filter(ln => /^\/\/_____*schema_end/i.test(ln)));// get the index from file
        writeLineToFile(path.resolve(__dirname,'schema.js'), ending, message)
        
        setTimeout(()=>{
            // now create the model with the new schema
            createModel(path.resolve(__dirname,'schema.js'),schema_name)
        },100)

}
// create model
const createModel = async (path,schema_name) => {
    console.log(schema_name)
let schema = [schema_name[0].toUpperCase(),schema_name.replace(/Schema$/gi,'').slice(1)].join``;
console.log(schema)
let file = readFileSync(path,'utf-8')
        let lines = file.split`\n`
        let ending = lines.lastIndexOf(...lines.filter(ln => /Schema\)\;?$/i.test(ln)));// get the index from file
        let output = `const ${schema} = model("${schema}", ${schema_name});` // output message for model
        writeLineToFile(path, ending, output, {type:'model'}); // update file
        
        // exportModule(path,schema) // update module exports
}








// read
//___________________________________________________________________






// update
//___________________________________________________________________
// save data
const saveData = async (instance) => await instance.save();






// delete
//___________________________________________________________________






// update file on line
const writeLineToFile = async(path,line,output,options={})=> {
    let file = readFileSync(path,'utf-8'),lines = file.split`\n`, ending = lines[line];

    // splice
    lines.splice(line,1,`${output}\n${ending||''}`) // splice the current array
    const modFile = lines.join`\n`; // bring the file together
    writeFileSync(path,modFile,'utf-8') // write modified file to same file
}
// update module exports
const exportModule = (path,schema) => {
    if(!path || !schema) {
        console.log('check parameters')
        return false;
    }
    let file = readFileSync(path,'utf-8');
    let lines = file.split`\n`;
    let ending = lines.indexOf(...lines.filter(ln => /module\.exports/i.test(ln)));// get the index from file
    lines[ending] = lines[ending].replace(/(\})/g,`,${schema}$1`);
    // console.log(lines[ending])
}





// test create schema
createSchema('one',{one:'String',two:'Number', three:'[Date]'}) // test
createSchema('two',{one:'String',two:'Number', three:'[Date]'}) // test