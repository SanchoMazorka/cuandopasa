import requests
response = requests.get("https://api.publicapis.org/entries")
print(response.status_code)
