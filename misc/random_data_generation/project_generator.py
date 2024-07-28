import json
from mistral_api import exp_backoff
import random
from sentencefromlist import sentenceFromList

# load users
users = json.load(open('ved/misc/random_data_generation/users.json'))

def generate_project():
  collaborators = random.sample(users, random.randint(2, 5))
  fields = [field for collaborator in collaborators for field in collaborator['fields']]
  fields = list(set(fields))
  paper_fields = random.sample(fields, random.randint(2, 3))
  primary_field = random.choice(paper_fields)
 
 # generate until you get it right
  while True:
    try:
      prompt = """
      Find me the JSON of a research project that's primarily in the field of <primary_field> but also intersects between <all_fields>. 
      The project should have the following structure:
        ```json
        {
          "title": <title>,
          "description": <description>,
        }
        ```
        Do not respond with any other text other than the JSON file.
      """

      response = exp_backoff(prompt
                  .replace("<primary_field>", primary_field)
                  .replace("<all_fields>", sentenceFromList(paper_fields)),
model="qwen/qwen-2-7b-instruct:free"
)
      
      project = json.loads(response)
      break
    except KeyboardInterrupt:
      raise
    except:
      print("Invalid response. Trying again...")
      continue

  project["primary_field"] = primary_field
  project["fields"] = paper_fields
  project["collaborators"] = [collaborator["email"] for collaborator in collaborators]
  
  return project

projects = []

with open('ved/misc/random_data_generation/projects.json', 'w') as f:
  for i in range(200):
    print(f"*** Generating project {i + 1} ***")
    project = generate_project()
    projects.append(project)
    print(project)
    projects.append(project)
    f.write(json.dumps(projects) + '<sep>\n')
    print("*** Done ***")
    
