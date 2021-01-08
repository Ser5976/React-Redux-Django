from dj_rest_auth.views import LoginView


class CustomLoginView(LoginView):
    def get_response(self):
        original_response = super().get_response()
        data = {"user_id": self.user.id, "status": "success"}
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
