const { writeFileSync, appendFileSync, write } = require('node:fs');
const path = require('path');

// create
//___________________________________________________________________
// schema and model
const createSchema = async (schema_name='',object={}) => {
    if(typeof(object)!='object' || typeof(schema_name)!='string'){
        console.log('check your datatypes')
        return false;
    } 
    // continue
    let schema = 'Schema'; // declare the schema's name
        schema_name = schema_name.replace(/_?schema/gi,'') // if schema is alreay included in the name, replace it
        schema_name+=schema //default schema var to the end of string
    let message = `\nconst ${schema_name} = new Schema(${JSON.stringify(object)})` // construct message to write to file
        // writeFileSync(path.resolve(__dirname,'schema.js'), message, 'utf-8'); // write to schema.js
        appendFileSync(path.resolve(__dirname,'schema.js'), message, 'utf-8'); // write to schema.js
}

createSchema('afkjlnadsf','wt') // test



// read
//___________________________________________________________________






// update
//___________________________________________________________________







// delete
//___________________________________________________________________







