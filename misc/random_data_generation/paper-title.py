import random
import numpy as np
import requests
import json
import os
import openpyxl
import re

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
    return response.json()["choices"][0]["message"]["content"]


def generate_paper(project_title, field):
    title = askMistral(f"what would the title of a paper for a research project called \"{project_title}\" in the field {field} be? Be creative and realistic. Generate a single title")
    abstract = askMistral(f"Generate an abstract for a paper entitled '{title}'. Generate nothing else.")
    doi = generate_doi()
    url = generate_url(doi)
    citations = generate_citations(title)
    return [project_title, title, abstract, doi, url, citations]

def generate_doi():
  return f"10.1111/{''.join([random.choice('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ') for i in range(11)])}"

def generate_url(doi):
    return f"https://doi.org/{doi}"

def generate_citations(title):
   return max(0, int(np.random.normal(loc=150, scale=100)) + 5*len(title) + np.random.randint(10, 50) * np.random.randint(-1,1))

filePath = "D:\projects.xlsx"
src_ws = openpyxl.load_workbook(filePath).active

dest_wb = openpyxl.Workbook()
dest_ws = dest_wb.active

for i in range(2, src_ws.max_row + 1):
   proj_title = src_ws.cell(row=i, column=1).value
   proj_field = src_ws.cell(row=i, column=3).value
   for j in range(random.randint(1,3)):
      dest_ws.append(generate_paper(proj_title, proj_field))



