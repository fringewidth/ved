import random, openpyxl

def generate_details(field):
    name = random.choice([f"International Journal of {field}", f"Advances in {field}", f"Journal of {field} Quarterly"])
    issn = "".join(random.choice("abcdefghijklmnopqrstuvwxyz1234567890") for _ in range(10))
    publisher = random.choice(["Springer", "Elsevier", "IEEE", "Wiley", "Taylor & Francis"])
    impact_factor = round(random.uniform(0.5, 5), 2)
    website = random.choice([name.lower().replace(" ", "") + ".com", "".join([i[0] for i in name.lower().split(' ')]) + ".com"])
    country = random.choice(["United States", "United Kingdom", "Canada", "Australia", "New Zealand", "Ireland", "South Africa", "India", "Singapore"])
    language = random.choice(["English", "English + others"])
    contact_email = random.choice(["editor", "info", "contact"]) + f"@{website}"
    review_process = random.choice(["Single-blind", "Double-blind", "Open"])

    return [name, issn, publisher, impact_factor, website, country, language, contact_email, review_process, field]

src_wb = openpyxl.load_workbook("D:\journal_fields.xlsx")
src_ws = src_wb.active
dest_wb = openpyxl.Workbook()
dest_ws = dest_wb.active

for i in range(1, src_ws.max_row+1):
    field = src_ws.cell(row=i, column=1).value
    details = generate_details(field)
    dest_ws.append(details)

dest_wb.save("D:\journals.xlsx")

