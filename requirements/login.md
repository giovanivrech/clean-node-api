# Login

> ## Success case:
1. ✅ Receives a request of type **POST** on route **/api/login**
2. ✅ Validates required **email** and **password** data
3. ✅ Validates that the **email** field is a valid email
4. ✅ Searches the user with the email and password provided
5. ✅ Generates an access token from the user ID
6. ✅ Updates user data with the generated access token
7. ✅ Returns **200** with the access token

> ## Exceptions:
1. ✅ Returns error **404** if the API does not exist
2. ✅ Returns error **400** if **email** or **password** is not supplied by the client
3. ✅ Returns error **400** if the **email** field is an invalid email address
4. ✅ Returns error **401** if it does not find a user with the given data
5. ✅ Returns error **500** if an error occurs when trying to generate the access token
6. ✅ Returns error **500** if an error occurs when trying to update the user with the generated access token
