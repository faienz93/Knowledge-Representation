#!/usr/bin/python
# coding=utf-8

# Insert a single Professor inside the database and then redirect to a form
# REF: https://stackoverflow.com/questions/45958834/how-to-redirect-a-page-to-another-page-in-python-3-cgi

import cgi, cgitb
form = cgi.FieldStorage()
ciao = form.getvalue('nome')


print('Content-type: text/html\r\n\r')
print("<h1> %s </h1>"%(ciao))
redirectURL = "http://localhost/Knowledge-Representation/"
print('<html>')
print('  <head>')
print('    <meta http-equiv="refresh" content="0;url='+str(redirectURL)+'" />') 
print('  </head>')
print('</html>')





