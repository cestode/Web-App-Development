from django.contrib import admin

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User,Link

admin.site.register(Link)

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('username','email','sex', 'birth_date', 'is_online')

admin.site.register(User, UserProfileAdmin)
