from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User

@api_view(['POST'])
def register_user(request):
    name = request.data.get('name')
    email = request.data.get('email')
    password = request.data.get('password')

    print("Received:", "name: ", name, "email: ", email, "password: ", password)

    user = User.objects.create(
        username = name,
        email = email,
        password = password
    )

    print('user: ', user)

    user.save()
    
    # You can add saving to DB here
    
    return Response({'message': 'User registered successfully'})
