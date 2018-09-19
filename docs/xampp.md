# XAMPP 
Per abilitare l'utilizzo di Python con XAMPP in Ubuntu eseguire i seguenti passaggi: 
- Creare in `htdocs` un file chiamato `index.py`:
```python
#!/usr/bin/python
# coding=utf-8


print('Content-type: text/html\r\n\r')
print("<h1>Python Script is now enabled! :D</h1>")
print("I can view this in my browser yay!!")
```
- Editare il file: `/opt/lampp/etc/httpd.conf`
    - Aggiungere `.py` alla seguente riga:
    
        ```AddHandler cgi-script .cgi .pl```
    - Aggiungere `index.py`
        ```
        <IfModule dir_module>
        DirectoryIndex index.php ...         
        </IfModule>
        ```
- Dare i permessi `chmod +x /opt/lampp/htdocs/index.py`
- Riavviare XAMPP
- Lanciare `localhost/index.py`

**NOTA:** Per editare il file, si possono usare i vari comandi a seconda della versione di Ubuntu: 
- `sudo vim httpd.conf`
- `gksudo gedit httpd.conf`
- `gedit admin:///opt/lampp/etc/httpd.conf`

**NOTA2:** In caso di errore vedere il log del file: `/opt/lampp/logs`