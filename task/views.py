from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from django.http import HttpResponse
from django.db import IntegrityError
from django.contrib.auth.decorators import login_required
import requests

def home(request):
    return render(request, 'index.html')

def signup(request):
    if request.user.is_authenticated:
        return redirect('dash')

    if request.method == 'GET':
        return render(request, 'signup.html', {
            'form': UserCreationForm
        })
    else:
        if request.POST['password1'] == request.POST['password2']:
            try: 
                user = User.objects.create_user(
                    username=request.POST['username'],
                    password=request.POST['password1'])
                user.save()
                login(request, user)
                return redirect('dash')
            except IntegrityError:
                return render(request, 'signup.html', {
                    'form': UserCreationForm,
                    'error': 'El usuario ya existe'
                })
        return render(request, 'signup.html', {
            'form': UserCreationForm,
            'error': 'Contraseñas no cohinciden'
        })

@login_required(login_url='/login')
def dash(request):
    return render(request, 'dash.html')

def salir(request):
    logout(request)
    return redirect('login')

def entrar(request):
    if request.user.is_authenticated:
        return redirect('dash')
    
    if request.method == "GET":
        return render(request, 'login.html', {
            'form': AuthenticationForm
        })
    else:
        user = authenticate(
            request, username=request.POST['username'], password=request.POST['password'])
        if user is None:
            return render(request, 'login.html', {
            'form': AuthenticationForm,
            'error' : 'Nombre de usuario o contraseña es incorrecto'
        })
        else:
            login(request, user)
            return redirect('dash')


def verDatos(request):
    response = requests.get('https://test-gliv.onrender.com/verDatos')

    if response.status_code == 200:
        data = response.json()
        # Pasa los datos a la plantilla
        return render(request, 'tu_plantilla.html', {'trade_alerts': [data]})
    else:
        # En caso de error al obtener datos
        return render(request, 'tu_plantilla.html', {'error': 'Error al obtener datos'})