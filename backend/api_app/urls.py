from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup),
    path('login/', views.login),
    path('save-score/', views.save_score),
    path('leaderboard/', views.leaderboard),
]