"use strict";
const DynamoDB = require("aws-sdk/clients/dynamodb"); // according to best practices, we import only the client for dynamodb and not the whole sdk which we do not need

const documentClient = new DynamoDB.DocumentClient({ region: "us-east-1" });

const tableName = process.env.NOTES_TABLE_NAME;

module.exports.createNote = async (event, context, callback) => {
  let data = JSON.parse(event.body);
  let notesId = data.id;
  console.log(`The note id received is ${data.id}`);
  console.log(`the table name is ${tableName}`);

  try {
    const params = {
      TableName: tableName,
      Item: {
        // when creating a note or adding items to dynamoDB, we pass the items object
        notesId,
        title: data.title,
        body: data.body,
      },
      // we will use a conditionExpression to check if a note with the same id exist. If it does, then we will fail the dynamodb put operation
      conditionExpression: "attribute_not_exists(notesId)", // using the conditionExpression to always check if the same notes ID exist. the expression will resolve to true if the ID doesnt exist so it can put the item
    };

    console.log(`We are putting the following ${params.Item.notesId} `);
    await documentClient.put(params).promise(); // with the putItem API, if an item with the same primary key already exist dynamoDB will overwrite it

    callback(null, {
      statusCode: 201,
      body: JSON.stringify(`A new note with ID ${notesId} has been created!`),
    });
  } catch (error) {
    console.error(error);
    callback(null, {
      statusCode: 500,
      body: JSON.stringify(error.message),
    });
    throw new Error(error);
  }
};
module.exports.updateNote = async (event, context, callback) => {
  // const { id: notesId } = event.pathParameters;
  const notesId = event.pathParameters.id;
  let data = JSON.parse(event.body);
  console.log(
    `The note ID is ${notesId} and we are updating the title to: ${data.title}, and body to ${data.body}`
  );

  const params = {
    TableName: tableName,
    Key: { notesId }, // to update an item, you have to specify the primary key of the item.
    UpdateExpression: "set #title = :title, #body = :body", // we use placeholders for title and body because DynamoDB has a lot of reserved words here and we don't want to always check the list
    ExpressionAttributeNames: {
      // here, we define the actual variable names of the placeholders
      "#title": "title",
      "#body": "body",
    },
    ExpressionAttributeValues: {
      ":title": data.title,
      ":body": data.body,
    },
    conditionExpression: "attribute_exists(notesId)", // always check if the record to be updated exist so that we don't try to update something that doesn't exist.
  };
  console.log(`we will update the following params: ${params.Key}`);
  await documentClient.update(params).promise();
  callback(null, {
    statusCode: 201,
    body: JSON.stringify(`A new note with ID ${notesId} has been updated!`),
  });

  try {
  } catch (error) {
    console.log(error);
    callback(null, {
      statusCode: 500,
      body: JSON.stringify(error.message),
    });
    throw new Error(error);
  }
};
module.exports.deleteNote = async (event, context, callback) => {
  // const { id: notesId } = event.pathParameters;
  const notesId = event.pathParameters.id;
  console.log(`Note with ID: ${notesId} will be deleted`);

  try {
    const params = {
      TableName: tableName,
      Key: { notesId },
      conditionExpression: "attribute_exists(notesId)", // we will check if the notesId exist before deleting the note
    };
    await documentClient.delete(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(`Note with ID: ${notesId} has been deleted!`),
    };
  } catch (error) {
    console.log(error.message);
    // callback(null, {
    //   statusCode: 500,
    //   body: JSON.stringify(error.message),
    // });
    throw new Error(error);
  }
};
module.exports.getAllNotes = async (event, context, callback) => {
  console.log(JSON.stringify(event));
  console.log(event);
  const params = {
    TableName: tableName,
  };
  try {
    const allNotes = await documentClient.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(allNotes.Items),
    };
  } catch (error) {
    console.log(error);
  }
};
