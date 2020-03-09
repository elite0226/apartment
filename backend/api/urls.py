from django.urls import path, include, re_path
from rest_framework import routers

from api.views import LoginView, SignupView, UserViewSet


router = routers.SimpleRouter()
router.register(r'user', UserViewSet, basename="user")

urlpatterns = [
    path('login/', LoginView.as_view(), name="login"),
    path('signup/', SignupView.as_view(), name="signup"),
    re_path(r'^', include(router.urls))
]
