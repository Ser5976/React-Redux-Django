from dj_rest_auth.views import LoginView
from dj_rest_auth.registration.views import RegisterView


class CustomLoginView(LoginView):
    def get_response(self):
        original_response = super().get_response()
        data = {"user_id": self.user.id, "username": self.user.username,
                'role': self.user.role, "status": "success",
                'is_admin': self.user.is_admin}
        original_response.data.update(data)
        # add cookie to response
        # token = original_response.data.get('key')
        # original_response.set_cookie(
        #     'auth_token',
        #     token,
        #     httponly=True,
        #     samesite='strict'
        # )
        return original_response


class CustomRegisterView(RegisterView):
    def get_response_data(self, user):
        original_response = super().get_response_data(user)
        data = {"user_id": user.id, "username": user.username,
                'role': user.role, "status": "success",
                'is_admin': user.is_admin}
        original_response.update(data)
        # add cookie to response
        # token = original_response.data.get('key')
        # original_response.set_cookie(
        #     'auth_token',
        #     token,
        #     httponly=True,
        #     samesite='strict'
        # )
        return original_response
