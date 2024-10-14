# Trivia API

The Open Trivia Database provides a completely free JSON API for use in programming projects. Use of this API does not require an API Key, just generate the URL below and use it in your own application to retrieve trivia questions.

All data provided by the API is available under the Creative Commons Attribution-ShareAlike 4.0 International License.

## API Documentation

### Getting Started

To get started using the Open Trivia DB API, use this URL: `https://opentdb.com/api.php?amount=10`. For more settings or help using the API, read along below. Alternatively, you can use the helper form to craft your specific query.

### Session Tokens

Session Tokens are unique keys that will help keep track of the questions the API has already retrieved. By appending a Session Token to an API Call, the API will never give you the same question twice. Over the lifespan of a Session Token, there will eventually reach a point where you have exhausted all the possible questions in the database. At this point, the API will respond with the appropriate "Response Code". From here, you can either "Reset" the Token, which will wipe all past memory, or you can ask for a new one.

*Session Tokens will be deleted after 6 hours of inactivity.*

Using a Session Token: `https://opentdb.com/api.php?amount=10&token=YOURTOKENHERE`

Retrieve a Session Token: `https://opentdb.com/api_token.php?command=request`

Reset a Session Token: `https://opentdb.com/api_token.php?command=reset&token=YOURTOKENHERE`

### Response Codes

The API appends a "Response Code" to each API Call to help tell developers what the API is doing.

- Code 0: **Success** - Returned results successfully.
- Code 1: **No Results** - Could not return results. The API doesn't have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)
- Code 2: **Invalid Parameter** - Contains an invalid parameter. Arguments passed in aren't valid. (Ex. Amount = Five)
- Code 3: **Token Not Found** - Session Token does not exist.
- Code 4: **Token Empty** - Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.
- Code 5: **Rate Limit** - Too many requests have occurred. Each IP can only access the API once every 5 seconds.

### Encoding Types

The Open Trivia DB may contain questions which contain Unicode or Special Characters. For this reason, the API returns results in an encoded format. You can specify the desired encoding format using the examples below. If the encode type is not present in the URL, it will follow the default encoding.

API Call with Encode Type (urlLegacy, url3986, base64): `https://opentdb.com/api.php?amount=10&encode=url3986`

Example Sentence (Non Encoded): "Don't forget that π = 3.14 & doesn't equal 3."

- **Default Encoding (HTML Codes):** `Don't forget that π = 3.14 & doesn't equal 3.`
- **Legacy URL Encoding:** `Don%27t+forget+that+%CF%80+%3D+3.14+%26+doesn%27t+equal+3.`
- **URL Encoding (RFC 3986):** `Don%27t%20forget%20that%20%CF%80%20%3D%203.14%20%26%20doesn%27t%20equal%203.`
- **Base64 Encoding:** `RG9uJ3QgZm9yZ2V0IHRoYXQgz4AgPSAzLjE0ICYgZG9lc24ndCBlcXVhbCAzLg==`

## Helper API Tools

There are some functions in the API which can be useful to developers.

- **Category Lookup:** Returns the entire list of categories and ids in the database.
  `https://opentdb.com/api_category.php`
- **Category Question Count Lookup:** Returns the number of questions in the database, in a specific category.
  `https://opentdb.com/api_count.php?category=CATEGORY_ID_HERE`
- **Global Question Count Lookup:** Returns the number of ALL questions in the database. Total, Pending, Verified, and Rejected.
  `https://opentdb.com/api_count_global.php`

## Limitations

- Only 1 Category can be requested per API Call. To get questions from any category, don't specify a category.
- A Maximum of 50 Questions can be retrieved per call.