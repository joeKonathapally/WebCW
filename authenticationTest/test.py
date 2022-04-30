
from email.quoprimime import body_check
import requests
#query = {'lat':'45', 'lon':'180'}
email="jamesBond@gmail.com"
# response = requests.post('https://httpbin.org/post', data = {'Email':email})
response = requests.post('http://localhost:2000/findUserByEmail', data = {'Email':email})
# Update an existing resource
# requests.put('https://httpbin.org/put', data = {'key':'value'})

# print(response.headers["date"]) 

print(response.text)

#response.content() # Return the raw bytes of the data payload
#response.text() # Return a string representation of the data payload
#response.json()
#print(response)