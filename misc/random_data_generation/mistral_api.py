# asks a heavily nerfed version of Mistral AI a prompt until it returns a valid response. 
# exponentailly backs off on the number of retries.

import requests
import os 
import time
import json

def askMistral(prompt):
    response = requests.post(
  url="https://openrouter.ai/api/v1/chat/completions",
  headers={
    "Authorization": f"Bearer {os.environ['OPEN_ROUNTER_KEY']}",
  },
  data=json.dumps({
    "model": "mistralai/mistral-7b-instruct:free", 
    "messages": [
      {"role": "user", "content": prompt}
    ]
  })
)
    try:
      return response.json()["choices"][0]["message"]["content"]
    except KeyError:
       return 0
    
def exp_backoff(prompt):
  interval = 1
  while True:
    time.sleep(interval)
    ans = askMistral(prompt)
    if ans==0:
       print('Rate limit. Backing off and trying again...')
       interval *= 2
    else:
       return ans