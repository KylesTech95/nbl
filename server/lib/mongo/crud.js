const { writeFileSync,readFileSync, appendFileSync, write } = require('node:fs');
const path = require('path');
const {Team,Player} = require('./schema.js');


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
    console.log(values)
    if(values.find(v=>!/^(\[?(Mixed|String|Number|Date|Boolean)\]?)?$/g.test(v))){
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

        message = `${comment}\n${message}` // combine comment and message

        // overwrite new file
        let file = readFileSync(path.resolve(__dirname,'schema.js'),'utf-8')
        let lines = file.split`\n`
        let ending = lines.indexOf(...lines.filter(ln => /^\/\/_____*schema_end/i.test(ln)));// get the index from file
        writeLineToFile(path.resolve(__dirname,'schema.js'), ending, message)
        
            // now create the model with the new schema
            createModel(path.resolve(__dirname,'schema.js'),schema_name)
}
// create model
const createModel = async (path,schema_name) => {
        let file = readFileSync(path,'utf-8'); // read the file
        let schema = [schema_name[0].toUpperCase(),schema_name.replace(/Schema$/gi,'').slice(1)].join``;
        let lines = file.split`\n` // array of lines
        let fil = lines.filter(ln => /Schema\)\;?/g.test(ln))
        let filres = fil[fil.length-1]
        let ending = lines.indexOf(filres);// get the index from file
        let output = `const ${schema} = model("${schema}", ${schema_name});` // output message for model
        writeLineToFile(path, ending+1, output); // update file
        exportModule(path,schema) // update module exports
        
}
// create instance of a model (Player)
const createInstance = (Model,payload={}) => {
    let instance = new Model(payload) // plug object key/values into model and store in instance variable
    return instance;
}


// read
//___________________________________________________________________

// find all instances
const findAll = async (Model, options={}) => {
    let data = await Model.find(options);
    console.log(data);
    process.nextTick(()=>process.exit(0))
}







// update
//___________________________________________________________________

const updateOne = async (Model,filter={},update={},options={}) => {
    let response = await Model.updateOne(filter,update,options);
    if(!response)console.error('UPDATE - something went wrong')
    process.nextTick(()=>process.exit(0))
}
// update many
async function updateMany(Model,filter={},update={},options={}) {
    let response = await Model.updateMany(filter,update,options);
    if(!response)console.error('UPDATE - something went wrong')
    process.nextTick(()=>process.exit(0))
}
// save data
const saveData = async (data) => {
    await data.save();
    process.nextTick(()=>process.exit(0))
}

// delete
//___________________________________________________________________

const deleteAll = async (model, options = {}) => {
    await model.deleteMany(options); // deletes anything
        process.nextTick(()=>process.exit(0))

}







// update file on line
const writeLineToFile = async(path,line,output,options={})=> {
    let file = readFileSync(path,'utf-8'),lines = file.split`\n`, ending = lines[line];
    console.log("before: "+lines.length)
    
    // splice
    lines.splice(line,1,`${output}\n${options.type=='module' ? '' : ending||''}`) // splice the current array
    let modFile = lines.join`\n`; // bring the file together
    writeFileSync(path,modFile,'utf-8') // write modified file to same file
    console.log("after: "+modFile.split`\n`.length)

    let diff = Math.abs(modFile.split`\n`.length - lines.length);
    console.log("Difference in Length:\n"+diff)
}
// update module exports
const exportModule = (path,schema) => {
    if(!path || !schema) {
        return false;
    }
    let file = readFileSync(path,'utf-8');
    let lines = file.split`\n`;
    
    let ending = lines.indexOf(lines.filter(ln => /module\.exports/gi.test(ln))[0]);// get the index from file
    lines[ending] = lines[ending].replace(/(\})/g,`, ${schema} $1`);

    writeLineToFile(path,ending,lines[ending],{type:'module'}) // update module.exports
}
// test create schema
// createSchema('game',{g_id:"String",created_date:"Date",active:"Boolean",completed:"Boolean",canceled:"Boolean",duration:"Number"})
// createSchema('Car',{brand:'String',model:"String",year:"Number", milage:'Number'}) // test
// createInstance(Player,{
//     p_id:33,
//     created_date:new Date().toISOString(),
//     player_name:'sharry',
//     wins:3,
//     losses:5,
//     total:3
// })





module.exports = {saveData, createInstance, updateOne, updateMany, findAll, deleteAll}