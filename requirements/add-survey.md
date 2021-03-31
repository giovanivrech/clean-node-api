# Create Survey

> ## Success case:
1. ✅ Receives a request of type **POST** on route **/api/surveys**
2. ✅ Validates that the request was made by an admin
3. ✅ Validates mandatory **question** and **answers** data
4. ✅ Create a survey with the data provided

> ## Exceptions:
1. ✅ Returns error **404** if the API does not exist
2. ✅ Returns error **403** if user is not admin
3. ✅ Returns error **400** if **question** or **answers** are not supplied by the client
4. ✅ Returns error **500** if an error occurs when trying to create the survey
