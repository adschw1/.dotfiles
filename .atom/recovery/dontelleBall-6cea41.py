import random
import time
choices=[
"Yes, of course",
"Without a doubt, yes",
"You can count on it.",
"For sure!",
"Probably Not",
"Ask me later",
"I'm not sure",
"I can't tell you right now",
"I'll tell you after my nap.",
"No way!"
"I don't think so."
"Without a doubt, no."
"The answer is clearly NO."
]
while True:
    input("Ask the mighty 8-Ball a question")
    for i in range(0,3):
        print("Shaking...")
        time.sleep(1)
    print(random.choice(choices))
