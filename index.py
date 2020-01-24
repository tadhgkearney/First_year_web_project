#!/usr/local/bin/python3

from cgitb import enable 
enable()

from cgi import FieldStorage
username =''
puzzle=''
form_data = FieldStorage()
if len(form_data)!=0:
    difficulty = form_data.getlist('difficulty')
    username = escape(form_data.getfirst('username', '').strip())
    if(difficulty == -1):
        score = form_data.getfirst('score')
        seconds = form_data.getfirst('seconds')
        try:
            connection = db.connect('localhost','tjk3', 'oogho6Ee', '2021_tjk3')
            cursor = connection.cursor(db.cursors.DictCursor)
            cursor.execute(""" INSERT INTO scores (username,score,time)
                            VALUES (%s,%i,%i)""",(username,score,seconds))
            connection.commit()
            cursor.close()
            connection.close()
        except db.Error:
            puzzle = """"We are experiencing some technical difficulties.
                    Please call back later.""""
    else:
        puzzle="""<div id="bigCanvas">
                        <canvas id="canvas" width="960px" height="720px"></canvas>
                        <div id="stats">
                            <p id="moves">moves: 0</p>
                            <p id="time">time: 0</p>
                            <p>username: %s</p>
                        </div>
                        <div id="finished">
                            <p>original:</p>
                            <img src="times-small.jpg"/>
                        <div>
                </div>""" % (username)
else:
    puzzle = """<div id="hiddenCanvas">
	    <canvas id="canvas" width="960px" height="720px" hidden></canvas>
	    </div>"""


print('Content-Type: text/html')
print()

print("""
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <title>Slide Puzzle</title>
            <link rel="stylesheet" href="slide_puzzle.css">
            <script src="slide_puzzle.js"></script>
	    <!--<meta name="viewport" content="initial-scale=1.0, width=device-width" />-->
        </head>
        <body>
            <form id="form" action="index.py" method="get">
                <p>Difficulty: </p>
                <input type="radio" name="difficulty" id="difficulty" value=3 id="easy" checked/>
                <label for="easy">Easy</label>
                <input type="radio" name="difficulty" id="difficulty" value=4 id="hard" />
                <label for="hard">Hard</label>
                <p>Username: </p>
                <input type="text" name="username" id="username" value = "%s"/>
                <input type="submit" id="submit"/>
            </form>
            %s
        </body>
    </html>""" % (username,puzzle))
