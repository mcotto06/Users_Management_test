
# Users Management

It is a frontend web application that allows to perform CRUD operations with users, using a public API and its endpoints.


## Run Locally

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/mcotto06/Users_Management

# Go into the repository
$ cd users

# Install dependencies
$ npm install

# Run the app
$ npm server -o
```



## API Reference

#### Get all users

```http
  GET https://gorest.co.in/public-api/users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | `int` | Current page number |
| `per_page` | `int` | Quantity per page |

#### Get user by ID

```http
  GET https://gorest.co.in/public-api/users/{id}
```

| Parameter | Type | Description |
| :-------- | :------- | :-------------------------------- |
| `id` | `int` |  Id of user. **Required** |

#### Create User

```http
  POST https://gorest.co.in/public-api/users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | Name of user. **Required** |
| `email` | `string` | Email of user. **Required** |
| `gender` | `string` | Gender of user. **Required** |
| `status` | `string` | Status of user. **Required** |

#### Update User

```http
  PUT https://gorest.co.in/public-api/users/{id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` |  Id of user. **Required** |
| `name` | `string` | Name of user. **Required** |
| `email` | `string` | Email of user. **Required** |
| `gender` | `string` | Gender of user. **Required** |
| `status` | `string` | Status of user. **Required** |

#### Delete User

```http
  DELETE https://gorest.co.in/public-api/users/{id}
```

| Parameter | Type | Description |
| :-------- | :------- | :-------------------------------- |
| `id` | `int` |  Id of user. **Required** |


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`url`

`token`

`production`


## Deployment

To deploy this project run

```bash
  npm run deploy
```


## How To Use

**Login Page**

The user must insert his username and password. For this project the authentication was done in a "hardcoded" way, so the username is adm and the password is 123456. Once the inserted parameters are validated, the token is saved in memory and then redirected to the main page (User-List), otherwise an authentication error message will be displayed to the user. The permanent token for user authentication is hardcoded in the environments. 

**User List**

When the component starts (ngOnInit) it queries the api to find all users. By default the pagination is 10 per page. The api returns to the user a "Status Code", if the code is 200 then it fills the component list. 

This page has a "toolbar" we have our "logout" button. If the user presses it, the session is set to "null" in the "local storage" as well as the token and redirects you to (Login Page). In the list of users we have the action column which has several options, they refer to a "Dialog" type component. 

This "Dialog" is dynamic because through it we can see the user's information, create, update and delete the user.
We also have the "Create User" button, when pressed it loads a "Dialog", which includes 2 inputs (Name, Email) and 2 selects (Gender, Active). All fields are required and have their respective validations. 

Name - Cannot be less than 3 characters.

Email - Email must be valid.

Gender - Must have a gender selected.

Active - Must indicate if the user is active or not.

Once the fields are validated, the "Create" button will be enabled and the user will be able to create the new user. It is important to know that the api response for the post returns a "Status Code" and the object that contains the new user, if the code is 201 (Insert) automatically closes the modal and refreshes the list of users.

In the same way it is used to update the user, making first a call to the api that brings us the user information and then insert it in the internal components of the "Dialog". This way has all the required fields. Once the information is updated the component closes automatically and refreshes the list of users.

Finally we have the way to delete the user, we only need to confirm the process and when the user is deleted the list is refreshed.

## Authors

- Miguel F. Cotto Gonzalez

