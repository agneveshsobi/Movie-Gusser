from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .models import Score

# SIGNUP
@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not email or not password:
        return Response({'error': 'All fields are required'}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already taken'}, status=400)

    user = User.objects.create_user(username=username, email=email, password=password)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key, 'username': user.username}, status=201)


# LOGIN
@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Invalid credentials'}, status=400)

    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key, 'username': user.username})


# SAVE SCORE
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_score(request):
    category = request.data.get('category')
    points = request.data.get('points')

    score = Score.objects.create(
        user=request.user,
        category=category,
        points=points
    )
    return Response({'message': 'Score saved!', 'score': points}, status=201)


# LEADERBOARD
@api_view(['GET'])
def leaderboard(request):
    from django.db.models import Sum
    scores = (
        Score.objects
        .values('user__username')
        .annotate(total=Sum('points'))
        .order_by('-total')[:10]
    )
    return Response(list(scores))