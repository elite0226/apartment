from django.conf import settings
from django.contrib.auth.models import User

from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from api.models import UserConfig


class UserConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserConfig
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    config = UserConfigSerializer(required=False)

    class Meta:
        model = User
        fields = [
            'id',
            'first_name',
            'last_name',
            'username',
            'email',
            'password',
            'config'
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def to_internal_value(self, data):
        role = data.get('role', None)
        parsed_data = super().to_internal_value(data)
        if role is not None:
            parsed_data['role'] = int(role)

        return parsed_data

    def create(self, validated_data):
        user = User(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()

        role = validated_data.get('role', UserConfig.USER_ROLE_CLIENT)
        UserConfig.objects.create(user=user, role=role)

        return user

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        if validated_data.get('role') is not None:
            instance.config.role = validated_data['role']
            instance.config.save()

        return instance