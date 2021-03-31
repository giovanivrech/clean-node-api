# List Surveys

> ## Success case:
1. ✅ Receives a request of type **GET** on route **/api/surveys**
2. ✅ Validates if the request was made by a user
3. ✅ Returns **204** if there is no survey
4. ✅ Returns **200** with the survey data

> ## Exceptions:
1. ✅ Returns error **404** if the API does not exist
2. ✅ Returns error **403** if not a user
3. ✅ Returns error **500** if an error occurs when trying to list the polls
