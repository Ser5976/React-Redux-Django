### Django_react

## deployment

Бизнес проект с Django и React

FOR WINDOWS

# установите git
1. https://git-for-windows.github.io/

# клонируйте проект
2. git clone https://github.com/Dima216/Django_react

# поставьте Python
3. Download python3 version https://www.python.org/downloads/release/python-39/ install it

# создайте виртуальную среду
4. python -m venv venv
   c:\>python -m venv c:\path\to\venv
   c:\>c:\Python39\python -m venv c:\path\to\venv

# активируйте виртуальную среду
5. venv\Scripts\activate.bat
   c:\path\to\venv\Scripts\activate.bat

# поставьте библиотеки Python
6. pip install -r backend\requirements.txt

# запустите миграции
7. python backend\manage.py migrate

# создайте суперпользователя
8. python backend\manage.py createsuperuser

# запустите локальный сервер Джанго
9. python manage.py runserver

# запустите nodejs на другом терминале
10. npm start --prefix assets
