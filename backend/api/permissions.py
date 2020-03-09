from rest_framework import permissions

from api.models import UserConfig


class IsAdminRole(permissions.BasePermission):
    def has_permission(self, request, view):
        try:
            return request.user.config.role == UserConfig.USER_ROLE_ADMIN
        except:
            return False
