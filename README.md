# url 缩短服务
## REST API
### /v1/shorten
For a long URL, /v3/shorten encodes a URL and returns a short one.

Parameters

* longUrl is a long URL to be shortened (example: http://betaworks.com/).

Notes

* Long URLs should be URL-encoded. You can not include a longUrl in the request that has '&', '?', '#', ' ', or other reserved parameters without first encoding it.
* Long URLs should not contain spaces: any longUrl with spaces will be rejected. All spaces should be either percent encoded (%20) or plus encoded (+). Note that tabs, newlines and trailing spaces are all indications of errors. Please remember to strip leading and trailing whitespace from any user input before shortening.
* Long URLs must have a slash between the domain and the path component. For example, http://example.com?query=parameter is invalid, and instead should be formatted as http://example.com/?query=parameter

Output

* url is the actual link that should be used
* hash is a identifier for long_url which is unique to the given account.
* long_url is an echo back of the longUrl request parameter. This may not always be equal to the URL requested. That's because some URL normalization may occur (e.g., due to encoding differences, or case differences in the domain). This long_url will always be functionally identical the the request parameter.

###Examples

curl http://127.0.0.1:3001/v1/shorten?longUrl=http%3A%2F%2Fwww.sina.com.cn
{
  "status_code": 200,
  "data": {
    "url": "http://127.0.0.1:3001/JvXCrk",
    "hash": "JvXCrk",
    "long_url": "http://www.sina.com.cn"
  },
  "status_txt": "OK"
}
