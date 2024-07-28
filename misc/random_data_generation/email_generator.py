import random
import json

existing_emails = {}
with open('ved/misc/random_data_generation/users.json', 'r') as f:
    data = json.loads(f.read())
    for user in data:
        email = "".join(user['first_name'].split()).lower() + "." + "".join(user['last_name'].split()).lower() + "@example.com"
        if(email in existing_emails):
            split = email.split("@")
            email = split[0] + str(random.randint(1, 28)) + str(random.randint(1, 12)) + str(random.randint(65, 99)) + "@" + split[1]      
        existing_emails[email] = True

        user['email'] = email
    
with open('ved/misc/random_data_generation/users.json', 'w') as f:
    f.write(json.dumps(data, indent=4))
