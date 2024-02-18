import random

def generate_details(field):
    name = random.choice([f"International Journal of {field}", f"Advances in {field}", f"Journal of {field} Quaterly"])
    issn = "".join(random.choice("abcdefghijklmnopqrstuvwxyz1234567890") for _ in range(10))
    publisher = random.choice(["Springer", "Elsevier", "IEEE", "Wiley", "Taylor & Francis"])
    impact_factor = round(random.uniform(0.5, 5), 2)
    website = random.choice([name.lower().replace(" ", "") + ".com", "".join([i[0] for i in name.lower().split(' ')]) + ".com"])
    country = random.choice(["United States", "United Kingdom", "Canada", "Australia", "New Zealand", "Ireland", "South Africa", "India", "Singapore"])
    language = random.choice(["English", "English + others"])
    contact_email = random.choice(["editor", "info", "contact"]) + f"@{website}"
    review_process = random.choice(["Single-blind", "Double-blind", "Open"])

    return [name, issn, publisher, impact_factor, website, country, language, contact_email, review_process]

for i in generate_details("Computer Science"):
    print(i)

