# Fashion-Ecommerce

HEROKU URL(Live DEMO) : https://fashion-ecommerce.herokuapp.com/

## Run Server(Express.js)
npm run server

## Run Client(React)
npm run client

## PROBLEM STATEMENT
Your task is to create a React app where products will be displayed along with certain filter options. Selection of the filters should generate an API call to the ExpressJS backend which would in turn query the MongoDB database and generate the required result. Here are a few filters that need to be implemented.

### Filter 1
List all products where discount percentage is greater than, smaller than or equal to n. There will be a text field along with a dropdown where the user inputs a number n and an operator (i.e. "greater than", "smaller than", "equal" etc.)

### Filter 2
List all products which contain a specific string as their brand name. It will be a text field where the user will enter the brand name to be searched for. 

### Filter 3
List all products which are in or out of stock. This can be determined using the "stock" key in the data. The filter will contain a boolean field indicating whether to list items that are in or out of stock.

### Filter 4
List all products that were created between a certain range of dates. i.e. use the "created_at" field to list only the product whose "created_at" field lies within the range specified by the user. You can use a calendar component if you want.

### Combination of filters
Your filters should be stackable, i.e. any combination of filters can be applied at once. Here are a few examples of how such a POST request could look : 

{
    filters: [
        { key: 'discount', value: 10, operator: 'greater_than' },
        { key: 'discount', value: 20, operator: 'smaller_than' },
        { key: 'brand', value: 'nike', operator: 'contains' }
    ]
}

The above request would list all Nike products whose discount percentage is between 10 and 20.

These are just a few examples, your backend should be able to handle all such possible combinations.
