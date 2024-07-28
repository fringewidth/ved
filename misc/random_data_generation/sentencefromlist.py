def sentenceFromList(lst):
  if len(lst) == 1:
    return lst[0]
  elif len(lst) == 2:
    return lst[0] + " and " + lst[1]
  else:
    return lst[0] + ", " + sentenceFromList(lst[1:-1]) + " and " + lst[-1]