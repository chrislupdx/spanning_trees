import secrets
#this is a graph generator
print("generates a graph")

f = open("sampletext.txt", "x")

#susan = "thoatetaet asdf asdf"
#bill = "sdfasdf asdfdf 3"
#f.write(susan + "\n")
#f.write(bill + "\n")

def gengraph(num):
    didgraph = {}
    cities = []
    for x in range(num):
       cityName = secrets.token_hex(4)
       cities.append(cityName)

gengraph(4)
