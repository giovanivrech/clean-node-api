# Answer Survey

> ## Success case:
1. ✅ Receives a request of type **PUT** on route **/api/surveys/{survey_id}/results**
2. ✅ Validates if the request was made by a **user**.
3. ✅ Validates the **survey_id** parameter
4. ✅ Validates if the **answer** field is a valid response
5. ✅ **Create** a survey result with the data provided if you don't have a record
6. ✅ **Updates** a survey result with the data provided if you already have a record
7. ✅ Returns **200** with the survey result data

> ## Exceptions:
1. ✅ Returns error **404** if the API does not exist
2. ✅ Returns error **403** if not a user
3. ✅ Returns error **403** if the survey_id passed in the URL is invalid
4. ✅ Returns error **403** if the response sent by the client is an invalid response
5. ✅ Returns error **500** if an error occurs when trying to create the survey result
6. ✅ Returns error **500** if an error occurs when trying to update the survey result
7. ✅ Returns error **500** if an error occurs when trying to load the survey
