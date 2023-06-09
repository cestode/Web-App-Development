import logging
from django.urls import reverse
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from lab.celery import app

@app.task
def send_verification_email(email):
   send_mail(
            'Thank you for your registartion!!!!',
            'from@smaller.dev',
            [email],
            fail_silently=True,
        )