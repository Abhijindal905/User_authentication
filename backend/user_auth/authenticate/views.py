from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import status

@api_view(['POST'])
def register_user(request):
    name = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not name or not email or not password:
        return Response({'error': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=name).exists():
        return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already registered.'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(
        username=name,
        email=email,
        password=password   #by using the create_user the password is automatically hashed
    )

    return Response({'message': 'User registered successfully', 'username': name}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'All Fields are required'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = authenticate(request, username=username, password=password)

    if user is not None:
        return Response({'message': 'Login successful', 'username': username}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)
    
