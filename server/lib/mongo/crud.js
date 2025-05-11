const { writeFileSync, appendFileSync, write } = require('node:fs');
const path = require('path');

// create
//___________________________________________________________________
// schema and model
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

        message = `${comment}\n${message}`
        appendFileSync(path.resolve(__dirname,'schema.js'), message, 'utf-8'); // write to schema.js
}

createSchema('test',{one:'String',two:'Number', three:'[Date]'}) // test



// read
//___________________________________________________________________






// update
//___________________________________________________________________







// delete
//___________________________________________________________________







