import random
import json
import re
from mistral_api import exp_backoff

def sentenceFromList(lst):
  if len(lst) == 1:
    return lst[0]
  elif len(lst) == 2:
    return lst[0] + " and " + lst[1]
  else:
    return lst[0] + ", " + sentenceFromList(lst[1:-1]) + " and " + lst[-1]

country_name_cache = {}

def generate_user():
  # the main prompt to generate the JSON file.
  prompt = """
  Find me the JSON file for a <characteristic> worker named <name> from <country> working on <fields>. The JSON file should have the following structure:
  {
    "first_name": <their first name>,
    "middle_name": <their middle name if any>,
    "last_name": <their last name>,
    "affiliation": <their affiliation>,
    "bio": <a 100 word bio in first person>,
    "contact_details" {
      <a list of fields, but not email.>
    }
    "years of experience": <a number>,
    "city": <a city from <country> >,

  }
  Do not respond with any other text other than the JSON file.
  """
  while True:
    # it seems there is a constant seed for the return answer on mistral's side, which results in the same outputs for the same inputs.
    # we add some old fashioned randomness to the prompts to get a more diverse set of outputs.
    # additionally, the AI struggles with generating different names for the same country in the JSON format, but excels at generating full names without any context.
    # so we generate a list of names from a country choose one at random, which we substitute in the prompt
    try:
      characteristic = random.choice(["young", "experienced", "senior", "junior", "mid-career", "early-career", "late-career", "established", "emerging", "rising", "veteran"])
      country = random.choice(["India", "USA", "UK", "Canada", "Australia", "Germany", "France", "Japan", "China", "South Korea"])

      if country not in country_name_cache:
        names = exp_backoff("Generate fifty full names with middle names from <country> as a python list. Do not include any other text.".replace("<country>", country))
        names = json.loads(re.search(r"\[.*?\]", names, re.DOTALL).group(0))
        country_name_cache[country] = names
      
      name = random.choice(country_name_cache[country])
      
      fields = []


      for _ in range(random.randint(1, 3) + (random.random() > 0.7)):
          fields.append(random.choice(["Computer Science", "Artificial Intelligence", "Machine Learning", "Data Science", "Physics", "Quantum Mechanics", "Electrical Engineering", "Climate Sciences", "Cybersecurity", "Human-Computer Interaction", "Augmented Reality", "Virtual Reality", "Internet of Things", "Networking", "Particle Physics", "Sciences", "Economics", "Graphics", "Humanities"]))
      
      fields_in_sentence = sentenceFromList(fields)
      
      answer = exp_backoff(prompt
                      .replace("<<characteristic>>", characteristic)
                      .replace("<fields>", fields_in_sentence)
                      .replace("<country>", country)
                      .replace("<name>", name)
      )

      # check if answer is valid JSON and return it.
      
      user = json.loads(answer)
    except KeyboardInterrupt:
      raise
    except:
      print("Failed to generate user. Retrying.")
      continue
    
    user["fields"] = fields
    return user
  
users = []

# make yourself some green tea while this runs.
with open("users.json", "w") as f: # in case it throws an error
  for i in range(400):
    print(f"*** User {i+1} ***")
    users.append(generate_user())
    print(users[-1])
    print("******")
    json.dump(users, f, indent=2)