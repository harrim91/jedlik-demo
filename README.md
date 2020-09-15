# Jedlik Demo

## Jedlik

This repo contains an example application demonstrating the [Jedlik](https://github.com/peak-ai/jedlik) ODM in action.

Jedlik is a ODM for working with AWS DynamoDB in Node, written in TypeScript.

It aims to provide 3 main benefits over using the AWS SDK for working with DynamoDB.

1. **A much more intuitive interface for JavaScript developers** - If, while writing a DynamoDB query, you've ever thought _"This is so stupid, I would rather quit my job as a software engineer and go and live in the mountains rather than have to type `ExpressionAttributeValues` one more time. I wish somebody would make DynamoDB nicer"_, then Jedlik is for you.

2. **Data Modelling Capabilities** - if you like libraries like `Sequelize` or `Mongoose`, which let you build Models of your data, let you interact with them in an object-oriented way, and can even perform validations on your data before writing it to the database, then Jedlik is for you.

3. **TypeScript support** - Jedlik allows you to provide custom type definitions to your models, which will fill your code editor with auto-completions and give you all of the benefits of TypeScript.

This example is based on the examples given in this [awesome talk about Data Modelling in DynamoDB from AWS re:Invent 2019](https://www.youtube.com/watch?v=DIQVJqiSUkE) by [Alex DeBrie](https://github.com/alexdebrie)

## Running the example service

### Prerequisites

- You should have `node` and `npm` installed on your computer. In your terminal run `npm --version` to check this - if not [install it](https://nodejs.org/en).
- You should have `docker` and `docker-compose` installed on your computer. In your terminal run `docker --version` and `docker-compose --version` to check this - if not [install it](https://www.docker.com/products/docker-desktop).
- You should have the AWS CLI installed. In your terminal run `aws --version` to check this - [if not, install it](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)

### Getting Started

- Clone this repository: `git clone git@github.com/harrim91/jedlik-demo.git`
- Install the dependencies - `npm install`
- Run the service - `npm start` this will start Dockerized versions of the API and DynamoDB local. It will also create the required DynamoDB table, if it doesn't exist.
- Send a http request to the service `curl http://localhost:3000` - you should get a welcome message back from the server. If not, keep trying! - it can take a minute to start because it's using `nodemon` and `ts-node` to compile the code in real time! The good thing about this is if you make any changes to the code, you should see them (almost) immediately!

### Once you're done

- run `npm stop` to turn it all off

## The Code

The main `express` app is defined in `src/index.ts` this maps the http requests to a request handler function defined in the `src/controllers` directory. Each file in this directory has a corresponding `.old.ts` file, which shows how you would write the equivalent code using the AWS SDK. Hopefully you'll agree that the `jedlik` code is much nicer to read and more intuitive to use!

The `src/models.ts` file contains all of the `jedlik` model definitions - `Users`, `Orders` and `OrderItems`.

Each model has a type definition, defining the data attributes of that entity, as well as a [`Joi`](https://www.npmjs.com/package/joi) schema.

These features allow you to code faster and with increased confidence. If you compare the "old" way to the Jedlik way:

- There is no need to constantly type out the same boilerplate code over and over again
- Using Jedlik models gives you TypeScript as a safety net - when you're reading and writing attributes, you don't need to know or look up what attributes are in your data, and what types they are - Jedlik tells you.
- Jedlik validates your data against the given schema before writing it to the database. The "old" examples don't do this - if you wanted to do it, it would be a lot more boilerplate code, and a lot more fragmented. Jedlik gives you this functionality out of the box, and in one place - you define your model in one place, and re-use it throughout your codebase.
