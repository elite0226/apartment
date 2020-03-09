from django.db import models
from django.contrib.auth.models import User


class UserConfig(models.Model):
    USER_ROLE_CLIENT = 'CLIENT'
    USER_ROLE_REALTOR = 'REALTOR'
    USER_ROLE_ADMIN = 'ADMIN'

    USER_ROLE_CHOICES = (
        (USER_ROLE_CLIENT, 'Client'),
        (USER_ROLE_REALTOR, 'Realtor'),
        (USER_ROLE_ADMIN, 'Admin')
    )

    user = models.OneToOneField(User, related_name='config', on_delete=models.CASCADE)
    role = models.CharField(choices=USER_ROLE_CHOICES, max_length=10, default=USER_ROLE_CLIENT)
