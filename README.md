### Django_react

## deployment

Download git and Any tools for git if need for example (SourceTree, tortoisegit) install it
create folder for projects and clone project

FOR WINDOWS

# install git
1. https://git-for-windows.github.io/

# clone project
2. git clone https://bitbucket.org/textcycle/textcycle.git

# install Python
4. Download python3 version https://www.python.org/downloads/release/python-363/ install it

# create virtual environments
5. https://docs.python.org/3/library/venv.html#creating-virtual-environments

6. python3 -m venv c:/projects/project/venv

7. go to folder venv

8. cd venv/Scripts & activate

9. cd ../..

# install python libraries
10. pip install -r requirements.txt

# create file '.env' and copy&paste in it DATABASE_URL=postgres...
12. https://dashboard.heroku.com/apps/textcycle/settings -> Reveal config vars

# add username and password to file textcycle/settings.py
11.
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'textcycle',
        'USER': 'username',
        'PASSWORD': 'password',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}
# go to folder textcycle
12. cd textcycle

# create virtualenv
13. virtualenv -p python3 env

# activate virtualenv
14. source venv/bin/activate

# install python libraries
15. pip install -r backend/requirements.txt

16. python manage.py makemigrations

python manage.py migrate

# run npm server
17. npm start --prefix frontend

# run project with database on local
17. python manage.py runserver

