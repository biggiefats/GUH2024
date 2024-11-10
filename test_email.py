import random
import string
import sys
import os
from email.message import EmailMessage
import ssl
import smtplib
from send_email import email_sender


def main():

    #Asks user for the application
    app = input("What application do you need a password for?")
    first = check_app(app)


    #Asks user for password length and returns password
    length = input("length of password of 7-15 characters: ")
    if validity(length) == True:
        length = int(length) - 1
        password = generate(first, length)
        print(f"Password: {password}")
        ask_file = input("Would you like to add this to your file of saved passwords?").lower()
        if ask_file == "yes" or ask_file == "y":
            file(password, app)
        else:
            sys.exit("Have a nice day!")



#Validates user input for application
#returns first letter
def check_app(app):
    if app.isalnum() == False:
        raise ValueError("Incorrect format")
    else:
        app = app.capitalize()
        return app[0]


#Validates user input for length
def validity(length: int):
    if length.isdigit() == False:
        raise ValueError("Incorrect format")
    elif int(length) > 15:
        raise ValueError("Length too long")
    elif int(length) < 7:
        raise ValueError("Length too short")
    return True


#Generates password using randon module
def generate(first, length):
    characters = list("&!%#*$" + string.ascii_letters + string.digits)
    random.shuffle(characters)
    code = []
    for i in range(int(length)):
        code.append(random.choice(characters))
    output = ''.join(code)
    password = f"{first}{output}"
    return password


#returns file of saved passwords if called
def file(password, app):
    with open("passwords.txt", "a+") as file:
        file.write(f"{app.capitalize()}: {password}\n")

    #Sends email with passwords to the user's email
    receiver = input("What is your email?")
    with open("passwords.txt", "r") as file:
        text = file.read()
    email_sender(receiver, text)


if __name__ == "__main__":
    main()